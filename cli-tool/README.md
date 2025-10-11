[![npm version](https://img.shields.io/npm/v/claude-plugins.svg)](https://www.npmjs.com/package/claude-plugins)
[![npm downloads](https://img.shields.io/npm/dt/claude-plugins.svg)](https://www.npmjs.com/package/claude-plugins)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/lifangda/claude-plugins/blob/main/CONTRIBUTING.md)
[![GitHub stars](https://img.shields.io/github/stars/lifangda/claude-plugins.svg?style=social&label=Star)](https://github.com/lifangda/claude-plugins)

# Claude Code Templates

**CLI tool for configuring and monitoring Claude Code** - Quick setup for any project with framework-specific commands and real-time monitoring dashboard.

## 🚀 Quick Start

```bash
# Interactive setup (recommended)
npx claude-plugins@latest

# Real-time analytics dashboard
npx claude-plugins@latest --analytics

# System health check
npx claude-plugins@latest --health-check
```

## ✨ Core Features

- **📋 Smart Project Setup** - Auto-detect and configure any project with framework-specific commands
- **📊 Real-time Analytics** - Monitor Claude Code sessions with live state detection and performance metrics
- **🔍 Health Check** - Comprehensive system validation with actionable recommendations
- **🧩 Individual Components** - Install specialized agents, commands, and MCPs individually
- **🌍 Global Agents** - Create AI agents accessible from anywhere using Claude Code SDK

## 🎯 What You Get

| Component | Description | Example |
|-----------|-------------|---------|
| **CLAUDE.md** | Project-specific Claude Code configuration | Framework best practices, coding standards |
| **Commands** | Custom slash commands for development tasks | `/generate-tests`, `/check-file`, `/optimize-bundle` |
| **Agents** | AI specialists for specific domains | API security audit, React performance, database optimization |
| **MCPs** | External service integrations | GitHub, databases, development tools |
| **Analytics** | Real-time monitoring dashboard | Live session tracking, usage statistics, exports |

## 🛠️ Supported Technologies

| Language | Frameworks | Status |
|----------|------------|---------|
| **JavaScript/TypeScript** | React, Vue, Angular, Node.js | ✅ Ready |
| **Python** | Django, Flask, FastAPI | ✅ Ready |
| **Common** | Universal configurations | ✅ Ready |
| **Go** | Gin, Echo, Fiber | 🚧 Coming Soon |
| **Rust** | Axum, Warp, Actix | 🚧 Coming Soon |

## 🌍 Global Agents (Claude Code SDK Integration)

Create AI agents that can be executed from anywhere using the Claude Code SDK:

```bash
# Create a global agent (one-time setup)
npx claude-plugins@latest --create-agent customer-support

# Use the agent from anywhere
customer-support "Help me with ticket #12345"
sre-logs "Analyze error patterns in app.log"  
code-reviewer "Review this PR for security issues"
```

### Available Global Agents

| Agent | Usage | Description |
|-------|-------|-------------|
| `customer-support` | `customer-support "query"` | AI customer support specialist |
| `api-security-audit` | `api-security-audit "analyze endpoints"` | Security auditing for APIs |
| `react-performance-optimization` | `react-performance-optimization "optimize components"` | React performance expert |
| `database-optimization` | `database-optimization "improve queries"` | Database performance tuning |

### Global Agent Management

```bash
# List installed global agents
npx claude-plugins@latest --list-agents

# Update an agent to latest version
npx claude-plugins@latest --update-agent customer-support

# Remove an agent
npx claude-plugins@latest --remove-agent customer-support
```

### How It Works

1. **Download Agent**: Fetches the latest agent from GitHub
2. **Generate Executable**: Creates a Node.js script that calls Claude Code SDK
3. **Add to PATH**: Makes the agent available globally in your shell
4. **Ready to Use**: Execute `agent-name "your prompt"` from any directory

The agents use the Claude Code SDK internally to provide specialized AI assistance with domain-specific knowledge and best practices.

## 📖 Documentation

**[📚 Complete Documentation](https://github.com/lifangda/claude-plugins)** - Comprehensive guides, examples, and API reference

Quick links:
- [Getting Started](https://github.com/lifangda/claude-plugins#quick-start) - Installation and first steps
- [Project Setup](https://github.com/lifangda/claude-plugins#installation) - Configure your projects
- [Analytics Dashboard](https://github.com/lifangda/claude-plugins#features) - Real-time monitoring
- [Individual Components](https://github.com/lifangda/claude-plugins#plugin-categories) - Agents, Commands, MCPs
- [CLI Options](https://github.com/lifangda/claude-plugins#usage) - All available commands

## 🤝 Contributing

We welcome contributions! Browse available templates and components at **[GitHub Repository](https://github.com/lifangda/claude-plugins)**, then check our [contributing guidelines](https://github.com/lifangda/claude-plugins/blob/main/CONTRIBUTING.md).

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **🌐 Browse Components**: [GitHub Repository](https://github.com/lifangda/claude-plugins)
- **📚 Documentation**: [GitHub Repository](https://github.com/lifangda/claude-plugins)
- **🐛 Issues**: [GitHub Issues](https://github.com/lifangda/claude-plugins/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/lifangda/claude-plugins/discussions)

---

**⭐ Found this useful? Give us a star to support the project!**