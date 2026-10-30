# Forge Terminal — High-Throughput Multiplexed Terminal Emulator

[![Forge Terminal Screenshot](assets/forge-terminal.svg)](https://forgenexa.github.io/)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Go Supervisor](https://img.shields.io/badge/Go%20Supervisor-1.23+-00ADD8?style=flat-square&logo=go)](https://golang.org)
[![Xterm.js](https://img.shields.io/badge/xterm.js-6.0+-F05032?style=flat-square)](https://xtermjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![CI](https://github.com/ForgeNexa/forge-terminal/actions/workflows/ci.yml/badge.svg)](https://github.com/ForgeNexa/forge-terminal/actions/workflows/ci.yml)

> **"Authentic OS pseudoterminals with zero orphaned processes."**  
> An open-source, local-first multiplexed terminal emulator built on native Go PTY session supervision and GPU-accelerated web rendering.

---

## 🏷️ Tags & Hashtags

`#ForgeNexa` `#ForgeTerminal` `#TerminalEmulator` `#PTY` `#DeveloperTools` `#DevTools` `#GoLang` `#React19` `#TypeScript` `#xtermjs` `#OpenSource` `#LocalFirst`

---

## ✨ Features

- **Genuine OS PTY Sessions**: Real pseudoterminal allocation using `creack/pty` supporting interactive shells (`/bin/zsh`, `/bin/bash`, `cmd.exe`).
- **Supervised Lifecycle**: Zero zombie processes — automatically tears down child processes upon terminal closure.
- **Dynamic Split Panes**: Horizontal and vertical tiling with independent scrollback buffers.
- **Modern Theme & Typography**: High-contrast 2026 dark themes with custom font ligatures.

---

## 🛠️ Build & Development

```bash
# Test the Go PTY Supervisor
cd supervisor
go test -v ./...

# Build the React 19 Terminal Workbench
cd ../web
bun install --frozen-lockfile
bun run build
```

---

## 🌐 Part of ForgeNexa

Forge Terminal is a standalone component of the [ForgeNexa Developer Tools Ecosystem](https://forgenexa.github.io/).

- [Forge IDE](https://github.com/ForgeNexa/forge-ide) — Code editor with Monaco and Go daemon
- [Forge API](https://github.com/ForgeNexa/forge-api) — High-throughput API testing client
- [Forge Git](https://github.com/ForgeNexa/forge-git) — Visual commit graph DAG and diff viewer
- [Forge Hub](https://github.com/ForgeNexa/forge-hub) — Unified ecosystem launcher
- [Forge Core](https://github.com/ForgeNexa/forge-core) — Shared Go systems foundation

---

## 📄 License

MIT © [ForgeNexa](https://forgenexa.github.io)
