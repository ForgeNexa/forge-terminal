package pty

import (
	"fmt"
	"os"
	"os/exec"
	"runtime"
	"sync"

	"github.com/creack/pty"
)

// Session represents an authentic OS PTY session.
type Session struct {
	ID      string
	Cmd     *exec.Cmd
	PtyFile *os.File
	Shell   string
	Cwd     string
	mu      sync.Mutex
	closed  bool
}

// DetectDefaultShell identifies the host default shell.
func DetectDefaultShell() string {
	if runtime.GOOS == "windows" {
		if path, err := exec.LookPath("pwsh.exe"); err == nil {
			return path
		}
		if path, err := exec.LookPath("powershell.exe"); err == nil {
			return path
		}
		return "cmd.exe"
	}

	if shell := os.Getenv("SHELL"); shell != "" {
		if _, err := os.Stat(shell); err == nil {
			return shell
		}
	}

	for _, candidate := range []string{"/bin/zsh", "/bin/bash", "/bin/sh"} {
		if _, err := os.Stat(candidate); err == nil {
			return candidate
		}
	}

	return "/bin/sh"
}

// Start creates and launches a genuine pseudo-terminal.
func Start(id string, shell string, cwd string, rows, cols uint16) (*Session, error) {
	if shell == "" {
		shell = DetectDefaultShell()
	}

	cmd := exec.Command(shell)
	if cwd != "" {
		cmd.Dir = cwd
	}
	cmd.Env = append(os.Environ(), "TERM=xterm-256color")

	// Start genuine OS PTY
	ptmx, err := pty.StartWithSize(cmd, &pty.Winsize{
		Rows: rows,
		Cols: cols,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to start pty: %w", err)
	}

	return &Session{
		ID:      id,
		Cmd:     cmd,
		PtyFile: ptmx,
		Shell:   shell,
		Cwd:     cwd,
	}, nil
}

// Resize adjusts rows and columns of the PTY.
func (s *Session) Resize(rows, cols uint16) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.closed {
		return fmt.Errorf("session is closed")
	}

	return pty.Setsize(s.PtyFile, &pty.Winsize{
		Rows: rows,
		Cols: cols,
	})
}

// Write sends input bytes directly into the PTY.
func (s *Session) Write(p []byte) (int, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.closed {
		return 0, fmt.Errorf("session is closed")
	}
	return s.PtyFile.Write(p)
}

// Read receives output bytes from the PTY.
func (s *Session) Read(p []byte) (int, error) {
	return s.PtyFile.Read(p)
}

// Close gracefully terminates the PTY session and child processes.
func (s *Session) Close() error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.closed {
		return nil
	}
	s.closed = true

	_ = s.PtyFile.Close()
	if s.Cmd != nil && s.Cmd.Process != nil {
		_ = s.Cmd.Process.Kill()
		_ = s.Cmd.Wait()
	}
	return nil
}
