package pty

import (
	"bytes"
	"io"
	"strings"
	"testing"
	"time"
)

func TestPTY_StartExecuteAndResize(t *testing.T) {
	session, err := Start("test-1", "", "", 24, 80)
	if err != nil {
		t.Fatalf("failed to start PTY session: %v", err)
	}
	defer session.Close()

	if err := session.Resize(40, 100); err != nil {
		t.Fatalf("resize failed: %v", err)
	}

	// Send an echo command to the genuine PTY
	testToken := "FORGENEXA_TERMINAL_TEST_OK"
	command := "echo " + testToken + "\n"
	if _, err := session.Write([]byte(command)); err != nil {
		t.Fatalf("write to PTY failed: %v", err)
	}

	buf := make([]byte, 2048)
	var output bytes.Buffer

	// Read output with timeout
	deadline := time.Now().Add(2 * time.Second)
	found := false

	for time.Now().Before(deadline) {
		n, err := session.Read(buf)
		if n > 0 {
			output.Write(buf[:n])
			if strings.Contains(output.String(), testToken) {
				found = true
				break
			}
		}
		if err != nil && err != io.EOF {
			break
		}
		time.Sleep(20 * time.Millisecond)
	}

	if !found {
		t.Fatalf("expected PTY output containing '%s', got '%s'", testToken, output.String())
	}
}
