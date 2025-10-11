# Claude Code Sandbox Components

Execute Claude Code in isolated cloud environments for secure code generation and development.

## Available Sandbox Providers

### E2B Sandbox (`e2b`)
Run Claude Code in E2B's secure cloud environment with pre-configured development tools.

**Component**: `e2b/claude-code-sandbox.md`

**Files Created**:
- `.claude/sandbox/e2b-launcher.py` - Python launcher script
- `.claude/sandbox/requirements.txt` - Python dependencies
- `.claude/sandbox/.env.example` - Environment variables template

## Quick Start

```bash
# Simple execution with API keys as parameters (recommended)
npx claude-plugins@latest --sandbox e2b \
  --e2b-api-key your_e2b_key \
  --anthropic-api-key your_anthropic_key \
  --prompt "Create a React todo app"

# With components installation
npx claude-plugins@latest --sandbox e2b \
  --e2b-api-key your_e2b_key \
  --anthropic-api-key your_anthropic_key \
  --agent frontend-developer \
  --command setup-react \
  --prompt "Create a modern todo app with TypeScript"

# Or use environment variables (set E2B_API_KEY and ANTHROPIC_API_KEY)
npx claude-plugins@latest --sandbox e2b --prompt "Create a React todo app"
```

## Environment Setup

1. **Get API Keys**:
   - E2B API Key: https://e2b.dev/dashboard
   - Anthropic API Key: https://console.anthropic.com

2. **Create Environment File**:
   ```bash
   # In your project/.claude/sandbox/.env
   E2B_API_KEY=your_e2b_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

3. **Install Python Requirements** (handled automatically):
   - Python 3.11+
   - E2B Python SDK
   - python-dotenv

## How It Works

1. **Component Download**: Downloads sandbox launcher and requirements
2. **Environment Check**: Validates Python 3.11+ installation
3. **Dependencies**: Installs E2B Python SDK automatically
4. **Sandbox Creation**: Creates E2B sandbox with Claude Code template
5. **Component Installation**: Installs any specified agents/commands/mcps/settings/hooks inside sandbox
6. **Prompt Execution**: Runs your prompt through Claude Code in the isolated environment
7. **Result Display**: Shows complete output and generated files
8. **Cleanup**: Automatically destroys sandbox after execution

## Usage Examples

### Basic Web Development
```bash
npx claude-plugins@latest --sandbox e2b --prompt "Create an HTML page with modern CSS animations"
```

### Full Stack with Components  
```bash
npx claude-plugins@latest --sandbox e2b \
  --agent fullstack-developer \
  --command setup-node \
  --prompt "Create a Node.js API with JWT authentication"
```

### Data Analysis
```bash
npx claude-plugins@latest --sandbox e2b \
  --agent data-scientist \
  --prompt "Analyze this CSV data and create visualizations"
```

### Security Audit
```bash
npx claude-plugins@latest --sandbox e2b \
  --agent security-auditor \
  --command security-audit \
  --prompt "Review this codebase for security vulnerabilities"
```

## Security Benefits

- ✅ **Complete Isolation**: Code runs in separate cloud environment
- ✅ **No Local Impact**: Zero risk to your local system or files
- ✅ **Temporary Environment**: Sandbox destroyed after execution
- ✅ **Controlled Access**: Only specified components are installed
- ✅ **API Key Security**: Keys never leave your local environment

## Future Sandbox Providers

## ✅ Production Ready Features (v1.20.3+)

### Enhanced E2B Integration
- **Automatic File Download**: Generated files are automatically downloaded to local `./e2b-output/` directory
- **Extended Timeouts**: 15-minute sandbox lifetime with intelligent timeout management
- **Detailed Logging**: Step-by-step execution monitoring with debugging information
- **Environment Verification**: Automatic checks for Claude Code installation and permissions
- **Error Recovery**: Retry logic for connection issues and comprehensive error handling

### Advanced Debugging Tools
- **Real-time Monitor** (`e2b-monitor.py`): System resource monitoring and performance analysis
- **Debug Guide** (`SANDBOX_DEBUGGING.md`): Comprehensive troubleshooting documentation
- **Sandbox State Tracking**: Live monitoring of file system changes and process execution

The system is designed to support multiple sandbox providers:

- **E2B** (`--sandbox e2b`) - ✅ **Fully Implemented** - Cloud-based isolated execution environment
- **Docker** (`--sandbox docker`) - 🔄 Future - Local containerized execution
- **AWS CodeBuild** (`--sandbox aws`) - 🔄 Future - AWS-based sandbox environment
- **GitHub Codespaces** (`--sandbox github`) - 🔄 Future - GitHub's cloud development environment
- **Custom** (`--sandbox custom`) - 🔄 Future - User-defined sandbox configurations

## Troubleshooting

### Python Not Found
```bash
# Install Python 3.11+
brew install python3  # macOS
# or visit https://python.org/downloads
```

### API Keys Not Set
```bash
# Create .env file in .claude/sandbox/
echo "E2B_API_KEY=your_key_here" >> .claude/sandbox/.env
echo "ANTHROPIC_API_KEY=your_key_here" >> .claude/sandbox/.env
```

### Dependencies Installation Failed
```bash
# Manual installation
cd .claude/sandbox
pip3 install -r requirements.txt
```

## Component Architecture

```
claude-plugins/
└── cli-tool/
    └── components/
        └── sandbox/
            ├── e2b/                           # E2B provider
            │   ├── claude-code-sandbox.md     # Component documentation
            │   ├── e2b-launcher.py            # Python launcher script
            │   ├── requirements.txt           # Python dependencies
            │   └── .env.example               # Environment template
            ├── docker/                        # Future: Docker provider
            ├── aws/                           # Future: AWS provider
            └── README.md                      # This file
```

The sandbox system integrates seamlessly with the existing Claude Code Templates component architecture, allowing any combination of agents, commands, MCPs, settings, and hooks to be installed and used within the secure sandbox environment.