# Forge Terminal (`forge-terminal`)

[![CI](https://github.com/ForgeNexa/forge-terminal/actions/workflows/ci.yml/badge.svg)](https://github.com/ForgeNexa/forge-terminal/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Forge Terminal** is a high-performance desktop terminal emulator featuring authentic operating-system pseudo-terminal (PTY) sessions, multi-tab multiplexing, split panes, and Go process supervision under the **ForgeNexa** developer ecosystem.

---

## Architecture & Subsystems

1. **PTY Supervisor (`supervisor/pkg/pty`)**:
   - Spawns genuine operating system pseudo-terminals (`/bin/zsh`, `/bin/bash`, `pwsh.exe`) using `creack/pty`.
   - Supports live window resizing (`Winsize`), non-blocking stream I/O, and guaranteed clean process teardown without orphaned child processes.
2. **Multiplexed Interface (`web/`)**:
   - Multi-tab management, horizontal & vertical split panes, and xterm.js rendering integration.

---

## Testing & Verification

```bash
# Test the Go PTY supervisor
cd supervisor && go test -v ./...

# Build the web interface
cd web && bun install && bun run build
```
