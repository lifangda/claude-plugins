# Skills Library

This directory contains official Agent Skills for Claude Code, organized by technical domain.

## What are Skills?

Skills are modular knowledge packages that Claude can load on-demand. They use a **three-tier progressive architecture**:

- **Tier 1: Metadata** (always loaded, ~100 tokens) - YAML frontmatter for matching
- **Tier 2: SKILL.md** (loaded when triggered, <5K tokens) - Core guidance
- **Tier 3: Resources** (loaded as needed) - scripts/, references/, assets/

## Directory Structure

```
skills-library/ (151个Skills, 32个技术领域)
├── backend-development/      # API设计、微服务、架构 (4个)
├── blockchain-web3/           # DeFi、NFT、Solidity安全 (4个)
├── cicd-automation/           # CI/CD流水线、部署 (5个)
├── cloud-infrastructure/      # 多云、成本优化 (4个)
├── collaboration/             # 多代理协作、代码审查 (6个) ⭐ NEW
├── data-analysis/             # CSV、Excel数据分析 (3个) ⭐ NEW
├── development-workflows/     # 开发工作流、TDD、Git (6个) ⭐ NEW
├── framework-migration/       # 框架升级、迁移 (4个)
├── javascript-typescript/     # 现代JS/TS模式、测试 (4个)
├── knowledge-management/      # 知识图谱、文章提取 (2个)
├── kubernetes-operations/     # K8s、Helm、GitOps (4个)
├── llm-application-dev/       # LangChain、RAG、提示工程 (4个)
├── media-processing/          # EPUB、图片、视频处理 (5个) ⭐ NEW
├── meta-learning/             # 元学习、Skills管理 (3个) ⭐ NEW
├── payment-processing/        # Stripe、PayPal、计费 (4个)
├── planning-documentation/    # 计划编写、文档编写 (2个) ⭐ NEW
├── problem-solving/           # 思维方法论、系统化调试 (9个) ⭐ NEW
├── python-development/        # 异步模式、测试、打包 (4个)
├── research/                  # 知识溯源 (1个) ⭐ NEW
├── scientific-databases/      # 25个科学数据库 (25个) ⭐ NEW
├── scientific-helpers/        # 科学计算辅助 (2个) ⭐ NEW
├── scientific-integrations/   # 科学工具集成 (7个) ⭐ NEW
├── scientific-thinking/       # 科学思维方法 (9个) ⭐ NEW
├── security/                  # 安全最佳实践 (1个)
├── testing-quality/           # 测试质量、验证 (5个) ⭐ NEW
├── utility-automation/        # 实用自动化工具 (5个)
└── official-skills/           # Anthropic官方Skills (7个)
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
- [obra/superpowers](https://github.com/obra/superpowers) - 开发工作流、代码审查、测试质量 (18个)
- [obra/superpowers-skills](https://github.com/obra/superpowers-skills) - 问题解决思维、架构模式 (11个)
- [Aeases/claude-scientific-skills](https://github.com/Aeases/claude-scientific-skills) - 科学计算生态 (43个)
- [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - 媒体处理、自动化 (8个)
- [wshobson/agents](https://github.com/wshobson/agents) - Backend、Python、AI领域 (45个)
- [anthropics/skills](https://github.com/anthropics/skills) - 官方Skills (8个)
- Community contributions (with proper attribution)

## License

See individual skill directories for specific licenses.
