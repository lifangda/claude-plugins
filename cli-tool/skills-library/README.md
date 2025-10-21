# Skills Library

This directory contains official Agent Skills for Claude Code, organized by technical domain.

## What are Skills?

Skills are modular knowledge packages that Claude can load on-demand. They use a **three-tier progressive architecture**:

- **Tier 1: Metadata** (always loaded, ~100 tokens) - YAML frontmatter for matching
- **Tier 2: SKILL.md** (loaded when triggered, <5K tokens) - Core guidance
- **Tier 3: Resources** (loaded as needed) - scripts/, references/, assets/

## Directory Structure

```
skills-library/
├── backend-development/      # API design, microservices, architecture
├── blockchain-web3/           # DeFi, NFT, Solidity security
├── cicd-automation/           # CI/CD pipelines, deployment
├── cloud-infrastructure/      # Multi-cloud, cost optimization
├── framework-migration/       # Framework upgrades, migrations
├── javascript-typescript/     # Modern JS/TS patterns, testing
├── kubernetes-operations/     # K8s, Helm, GitOps
├── llm-application-dev/       # LangChain, RAG, prompt engineering
├── payment-processing/        # Stripe, PayPal, billing
├── python-development/        # Async patterns, testing, packaging
└── security/                  # Security best practices
```

## How to Install Skills

Skills are installed to your project or global Claude configuration:

### Project Installation
```bash
claude-plugins --skill <skill-name> --project
```

### Global Installation
```bash
claude-plugins --skill <skill-name> --global
```

### List All Skills
```bash
claude-plugins --list-skills
```

### Search Skills
```bash
claude-plugins --search-skills <keyword>
```

## Skill Structure

Each skill follows this structure:

```
skill-name/
├── SKILL.md           # Main skill file with Tier 1 & 2
├── scripts/           # Executable scripts (Tier 3)
├── references/        # Detailed documentation (Tier 3)
└── assets/            # Templates and resources (Tier 3)
```

## Sources

Skills are sourced from:
- [wshobson/agents](https://github.com/wshobson/agents) - Official Anthropic Skills repository
- Community contributions (with proper attribution)

## License

See individual skill directories for specific licenses.
