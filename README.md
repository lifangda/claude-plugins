# 🚀 Claude Plugins - 完整的AI开发工具集

> 一条命令就能安装精心打磨的工作流、命令、代理、MCP服务器和钩子

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/github/stars/lifangda/claude-plugins?style=social)](https://github.com/lifangda/claude-plugins)
[![Claude Plugins](https://img.shields.io/badge/Claude-Plugins-blue)](https://github.com/lifangda/claude-plugins)

## 📋 项目概述

Claude Plugins 是一个完整的AI开发工具集,包含 **1600+个文件**,涵盖:

- **504个专业代理** (50个分类) - AI专家团队,覆盖各种开发领域
  - 包含10个Anthropic官方代理
  - 覆盖新兴技术、垂直领域、电商等50个专业领域
- **313个实用命令** (28个分类) - 自动化工具和开发命令
  - 包含6个Anthropic官方命令
- **16个工作流** - 完整的开发流程自动化
- **39个钩子** (10个分类) - 自动化触发器和事件处理
  - 包含1个Anthropic官方安全钩子
- **56个MCP服务器** (10个分类) - 外部服务集成
- **18个输出样式** - 专业化Claude输出格式
- **2个沙盒环境** - 安全的代码执行环境

**总计: 948个插件组件,99个精细化插件包**

**Agent Skills知识库** (独立管理,32个技术领域): ⭐⭐⭐ +148% (生态大爆发)
- **151个Skills** - 模块化领域知识包 ✨✨✨
- 位于 `cli-tool/skills-library/` 目录
- 采用官方三级渐进式架构 (Tier 1/2/3)
- 500+文件 (SKILL.md + references + scripts + assets)
- 覆盖开发工作流、问题解决思维、科学计算(43个)、多代理协作、代码审查、数据处理、媒体创作、业务沟通等完整领域

### 🌟 特色：包含 Anthropic 官方插件
- **claude-code-official** - Anthropic官方插件包，包含10个官方代理、6个官方命令和1个安全钩子
- Agent SDK开发工具、PR审查、代码架构分析、安全防护等专业工具

### 🏆 技术规范
- ✅ **符合Claude Code官方插件市场规范**
- ✅ **通过`claude plugin validate`验证**
- ✅ **支持团队市场配置和自动安装**
- ✅ **100%路径有效性** (从v1.0的18%提升至100%)
- ✅ **精细化分类安装** (94个功能分类插件包)
- ✅ **支持GitHub、GitLab等Git服务**
- ✅ **支持本地开发和测试**

## 🚀 快速开始

### 第1步：添加插件市场

```bash
# 从GitHub仓库添加（推荐）
/plugin marketplace add lifangda/claude-plugins

# 从本地路径添加（适合测试）
/plugin marketplace add ./claude-plugins

# 从URL添加
/plugin marketplace add https://github.com/lifangda/claude-plugins.git
```

### 第2步：安装插件

#### 方式一：完整安装（推荐新手）
```bash
# 安装完整插件包（包含748个组件）
/plugin install claude-plugins-complete@lifangda

# 安装Anthropic官方插件包（推荐所有用户）
/plugin install claude-code-official@lifangda
```

#### 方式二：分类安装（推荐专业用户）
```bash
# 🎯 按功能分类安装Agents
/plugin install agents-data-ai@lifangda           # 数据与AI开发 (18个agents)
/plugin install agents-backend@lifangda           # 后端开发 (35个agents)
/plugin install agents-frontend@lifangda          # 前端开发 (22个agents)
/plugin install agents-devops@lifangda            # DevOps工具 (15个agents)
/plugin install agents-security@lifangda          # 安全审计 (12个agents)
/plugin install agents-testing@lifangda           # 测试工具 (8个agents)

# 📦 按功能分类安装Commands
/plugin install commands-git@lifangda             # Git工作流命令
/plugin install commands-testing@lifangda         # 测试自动化命令
/plugin install commands-deployment@lifangda      # 部署工具命令
/plugin install commands-documentation@lifangda   # 文档生成命令

# 🔗 按功能分类安装MCPs
/plugin install mcps-database@lifangda            # 数据库集成
/plugin install mcps-devtools@lifangda            # 开发工具集成
/plugin install mcps-web@lifangda                 # Web服务集成

# 🪝 按功能分类安装Hooks
/plugin install hooks-git-workflow@lifangda       # Git工作流钩子
/plugin install hooks-testing@lifangda            # 测试钩子
/plugin install hooks-security@lifangda           # 安全钩子
```

#### 方式三：经典插件包（推荐高级用户）
```bash
# 核心开发工具包
/plugin install git-workflow@lifangda         # Git工作流自动化
/plugin install supabase-toolkit@lifangda     # 数据库开发工具
/plugin install nextjs-vercel-pro@lifangda   # 前端开发工具
/plugin install testing-suite@lifangda       # 测试自动化
/plugin install security-pro@lifangda        # 安全审计工具
/plugin install knowledge-wikipedia@lifangda # 知识库工具

# 社区精选插件包
/plugin install marketplace-community@lifangda # 85个社区精选插件
```

#### 方式四：精准安装（按需使用）
```bash
# 编程语言专家
/plugin install python-pro@lifangda
/plugin install javascript-pro@lifangda
/plugin install typescript-pro@lifangda
/plugin install golang-pro@lifangda
/plugin install rust-pro@lifangda

# 框架专家
/plugin install react-expert@lifangda
/plugin install vue-expert@lifangda
/plugin install nodejs-pro@lifangda
/plugin install django-pro@lifangda

# 专业领域
/plugin install ai-engineer@lifangda
/plugin install security-auditor@lifangda
/plugin install devops-engineer@lifangda
/plugin install database-admin@lifangda

# 工具和命令
/plugin install git-commit@lifangda
/plugin install code-review@lifangda
/plugin install test-runner@lifangda
/plugin install deploy-helper@lifangda

# MCP服务器
/plugin install supabase-mcp@lifangda
/plugin install github-mcp@lifangda
/plugin install wikipedia-mcp@lifangda
```

### 第3步：验证安装
```bash
# 查看已安装插件
/plugin list

# 测试插件功能
/python-pro  # 使用Python专家
/git-workflow  # 使用Git工作流
/supabase-toolkit  # 使用Supabase工具
```

## 🆕 最新特性 (v1.5)

### 🎉 v1.5.0 - Skills生态大爆发 (思维方法论与科学计算)

#### 🌟 Skills知识库大爆发 (+90个Skills)
- **新增核心领域**: 开发工作流、问题解决思维、科学数据库(25个)、科学计算、计划文档、研究方法
- **Skills总数**: 61 → 151 (+148%) ⭐⭐⭐
- **技术领域**: 28 → 32个分类
- **文件数量**: 280+ → 500+个文件

**新增Skills示例**:
- **开发工作流** (6个): executing-plans, finishing-development-branch, subagent-driven-development, test-driven-development, using-git-worktrees, git-commit-helper
- **问题解决思维** (9个): brainstorming, collision-zone-thinking, inversion-exercise, meta-pattern-recognition, root-cause-tracing, scale-game, simplification-cascades, systematic-debugging, when-stuck
- **科学数据库** (25个): chembl, csd, drugbank, ena, ensembl, geofabrik, gnomad, human-cell-atlas, idc, imgt, ncbi-datasets, ncbi-geo, ncbi-pubmed, osm, pdb, pfam, prosite, reactome, refseq, rfam, string, tcga, ukbiobank, uniprot, zenodo
- **科学计算** (18个): 科学辅助(2个)、科学集成(7个)、科学思维(9个)
- **多代理协作** (6个): dispatching-parallel-agents, receiving-code-review, requesting-code-review, sharing-skills, remembering-conversations, meeting-insights-analyzer
- **媒体处理** (5个): epub-reader, image-enhancer, video-downloader, markdown-to-epub-enhanced, youtube-transcript
- **数据分析** (3个): csv-summarizer, excel-analysis, csv-data-summarizer
- **测试质量** (5个): condition-based-waiting, defense-in-depth, testing-anti-patterns, testing-skills-with-subagents, verification-before-completion

### 📋 v1.2 特性回顾
- **Skills架构重构**: Skills迁移到独立的 `cli-tool/skills-library/` 目录
- **三级渐进式架构**: 采用Anthropic官方Skills规范 (Tier 1/2/3)
- **独立管理系统**: 新增 `skills-manager.js` 模块
- **插件包优化**: 精细化分类,路径有效性100%

详见 [CHANGELOG.md](CHANGELOG.md) 和 [cli-tool/skills-library/README.md](cli-tool/skills-library/README.md)

## 🔧 团队市场配置

支持团队自动安装，在项目的`.claude/settings.json`中配置：

```json
{
  "extraKnownMarketplaces": {
    "claude-plugins": {
      "source": {
        "source": "github",
        "repo": "lifangda/claude-plugins"
      }
    }
  }
}
```

团队成员信任仓库后，Claude Code会自动安装配置的市场和插件。

## 📦 核心插件包详情

### 🎯 完整插件包

#### claude-plugins-complete
**描述**: 完整的1038个Claude组件集合
**包含**:
- 504个专业代理 (50个分类)
- 313个实用命令 (28个分类)
- 16个工作流
- 39个钩子 (10个分类)
- 56个MCP服务器 (10个分类)
- 18个输出样式
- 2个沙盒环境

**注意**: Skills不包含在此插件包内,Skills独立管理于 `cli-tool/skills-library/`
**适用**: 新手用户，希望获得完整功能
**安装**: `/plugin install claude-plugins-complete@lifangda`

### 🏢 Anthropic 官方插件包

#### claude-code-official
**描述**: Anthropic官方提供的Claude Code插件包
**特色**:
- ✨ **Agent SDK开发工具** - Python和TypeScript SDK验证器
- 🔍 **代码审查工具** - 专业的PR审查和代码架构分析
- 🛡️ **安全防护** - 安全提醒钩子，自动检测潜在安全问题
- 🚀 **Git工作流** - commit、PR创建和功能开发自动化

**包含**:
- 10个官方代理: agent-sdk-verifier-py, agent-sdk-verifier-ts, code-architect, code-explorer, code-reviewer, code-simplifier, comment-analyzer, pr-test-analyzer, silent-failure-hunter, type-design-analyzer
- 6个官方命令: clean_gone, commit-push-pr, commit, feature-dev, new-sdk-app, review-pr
- 1个安全钩子: security-guidance (包含9类安全检查模式)

**来源**: [Anthropic Claude Code](https://github.com/anthropics/claude-code)
**适用**: 所有用户推荐安装
**安装**: `/plugin install claude-code-official@lifangda`

### 🌟 社区插件包

#### marketplace-community
**描述**: Claude Code Marketplace社区精选插件：85个高质量插件，包括63个专业代理和22个增强命令
**特色**:
- ⭐ **AI增强工具**: Lyra提示词优化、Ultrathink协调器代理、双重检查系统
- 📊 **代码分析**: 代码库分析、CLAUDE.md自动更新、代码架构师
- 🚀 **产品管理**: PRD规划代理、冲刺优先级、产品专家
- 💼 **企业工具**: 企业安全审查、集成架构师、AI伦理治理
- 📱 **移动开发**: Flutter/React Native开发、移动UX优化
- 📢 **增长营销**: 增长黑客、社交媒体策略专家

**来源**: [Claude Code Marketplace](https://github.com/ananddtyagi/claude-code-marketplace) 社区贡献
**安装**: `/plugin install marketplace-community@lifangda`

### 🧠 Agent Skills知识库

**独立管理**: Skills不再包含在marketplace.json中,通过 `cli-tool/src/skills-manager.js` 独立管理

#### Skills Library (`cli-tool/skills-library/`)
**描述**: 61个模块化领域知识包,采用官方三级渐进式架构
**特色**:
- 📚 **28个技术领域**: backend-development, blockchain-web3, cicd-automation, cloud-infrastructure, collaboration, data-analysis, framework-migration, javascript-typescript, knowledge-management, kubernetes-operations, llm-application-dev, media-processing, payment-processing, problem-solving, python-development, security, utility-automation
- 🎯 **三级架构**: Tier 1 (Metadata ~100 tokens), Tier 2 (SKILL.md <5K tokens), Tier 3 (Resources unlimited)
- 📦 **完整资源**: 280+文件 (SKILL.md + references/ + scripts/ + assets/)
- 🔧 **管理API**: listAllSkills(), searchSkills(), getSkillInfo(), installSkill()

**Skills示例**:
- **javascript-typescript**: javascript-testing-patterns, nodejs-backend-patterns, modern-javascript-patterns, typescript-advanced-types
- **python-development**: async-python-patterns, python-testing-patterns, uv-package-manager
- **backend-development**: api-design-principles, architecture-patterns, microservices-patterns, mcp-builder
- **cloud-infrastructure**: cost-optimization, hybrid-cloud-networking, multi-cloud-architecture, terraform-module-library
- **kubernetes-operations**: gitops-workflow, helm-chart-scaffolding, k8s-manifest-generator, k8s-security-policies

**使用方式**:
```bash
# 列出所有Skills
node cli-tool/src/skills-manager.js list

# 搜索Skills
node cli-tool/src/skills-manager.js search testing

# 安装到项目
node cli-tool/src/skills-manager.js install javascript-testing-patterns --project

# 安装到全局
node cli-tool/src/skills-manager.js install nodejs-backend-patterns --global
```

**文档**: 详见 [cli-tool/skills-library/README.md](cli-tool/skills-library/README.md)

### 🛠️ 专业插件包

#### git-workflow
**描述**: Git工作流自动化，包含功能、发布和热修复命令
**适用**: 需要Git版本控制自动化的项目
**包含**: feature, release, hotfix, finish, flow-status命令 + git-flow-manager代理
**安装**: `/plugin install git-workflow@lifangda`

#### supabase-toolkit
**描述**: 完整的Supabase工作流，包含专业命令、数据工程代理和MCP集成
**适用**: 使用Supabase作为后端数据库的项目
**包含**: supabase-backup-manager, supabase-data-explorer等命令 + data-engineer代理 + postgresql-integration MCP
**安装**: `/plugin install supabase-toolkit@lifangda`

#### nextjs-vercel-pro
**描述**: 完整的Next.js和Vercel开发工具包，包含部署自动化和性能优化
**适用**: Next.js和Vercel部署的项目
**包含**: nextjs-scaffold, vercel-deploy-optimize等命令 + frontend-developer代理
**安装**: `/plugin install nextjs-vercel-pro@lifangda`

#### testing-suite
**描述**: 全面的测试工具包，包含E2E、单元、集成和视觉测试自动化
**适用**: 需要全面测试覆盖的项目
**包含**: generate-tests, e2e-setup, test-coverage等命令 + test-engineer代理
**安装**: `/plugin install testing-suite@lifangda`

#### security-pro
**描述**: 企业安全工具包，包含审计、渗透测试和合规自动化
**适用**: 需要安全审计和合规检查的企业项目
**包含**: security-audit, penetration-test等命令 + security-auditor代理
**安装**: `/plugin install security-pro@lifangda`

#### knowledge-wikipedia
**描述**: 维基百科知识库集成，包含搜索、专家代理和研究工作流
**适用**: 需要知识库查询和研究的项目
**包含**: wikipedia-search命令 + wikipedia-expert代理 + wikipedia-mcp服务器
**安装**: `/plugin install knowledge-wikipedia@lifangda`

## 🤖 组件分类浏览

### Agents分类 (504个,50个分类)
完整的AI专家团队,覆盖各种开发领域:
- **official** - Anthropic官方代理 (10个)
- **emerging-technologies** - 新兴技术 (4个) ⭐ NEW
- **vertical-domains** - 垂直领域 (5个) ⭐ NEW
- **ecommerce** - 电商专家 (2个) ⭐ NEW
- **data-ai** - 数据与AI开发 (9个)
- **development-tools** - 开发工具 (22个) ⭐ +4扩展
- **devops-infrastructure** - DevOps基础设施 (19个) ⭐ +3扩展
- **security** - 安全审计 (9个)
- **testing-quality** - 测试质量 (10个) ⭐ +2扩展
- **mobile-development** - 移动开发 (5个)
- **business-marketing** - 业务营销 (11个)
- **database** - 数据库 (11个)
- **documentation** - 文档 (8个)
- 更多35+个专业分类...

### Commands分类 (313个,28个分类)
实用的自动化命令和开发工具:
- **official** - Anthropic官方命令 (6个)
- **git-workflow** - Git工作流命令 (13个)
- **testing-quality** - 测试质量命令 (13个)
- **deployment** - 部署工具 (11个)
- **documentation** - 文档生成 (15个)
- **development-tools** - 开发工具 (10个)
- **utilities** - 实用工具 (24个)
- **security** - 安全工具 (7个)
- **performance** - 性能优化 (10个)
- **automation** - 自动化脚本 (4个)
- 更多18+个实用分类...

### Output Styles (18个)
专业化Claude输出格式:
- concise-engineer - 简洁工程师
- accessibility-champion - 无障碍倡导者
- api-designer - API设计师
- security-auditor - 安全审计员
- test-driven-developer - TDD开发者
- 更多13个专业样式...

### Workflows (16个)
完整的开发流程自动化工作流

### Hooks分类 (39个，10个分类)
自动化触发器和事件处理：
- **official** - Anthropic官方钩子 (1个)
- **git-workflow** - Git工作流钩子 (2个)
- **testing** - 测试钩子 (1个)
- **security** - 安全钩子 (2个)
- **automation** - 自动化钩子 (16个)
- **performance** - 性能钩子 (2个)
- 更多分类...

### MCPs分类 (56个，10个分类)
外部服务集成服务器：
- **database** - 数据库集成 (4个)
- **devtools** - 开发工具集成 (33个)
- **web** - Web服务集成 (1个)
- **browser_automation** - 浏览器自动化 (6个)
- **integration** - 集成服务 (2个)
- 更多分类...

### Sandbox (2个)
安全的代码执行环境

### Agent Skills (151个,32个分类) - 独立管理 ✨✨✨ +148%
模块化领域知识包,采用三级渐进式架构 (Tier 1/2/3):

**核心领域 (32个,151个Skills)**:
- **backend-development** - 后端开发 (4个): api-design-principles, architecture-patterns, microservices-patterns, mcp-builder
- **blockchain-web3** - 区块链Web3 (4个): defi-protocol-templates, nft-standards, solidity-security, web3-testing
- **cicd-automation** - CI/CD自动化 (5个): deployment-pipeline-design, github-actions-templates, gitlab-ci-patterns, secrets-management, **changelog-generator** ⭐
- **cloud-infrastructure** - 云基础设施 (4个): cost-optimization, hybrid-cloud-networking, multi-cloud-architecture, terraform-module-library
- **framework-migration** - 框架迁移 (4个): angular-migration, database-migration, dependency-upgrade, react-modernization
- **javascript-typescript** - JS/TS开发 (4个): javascript-testing-patterns, modern-javascript-patterns, nodejs-backend-patterns, typescript-advanced-types
- **kubernetes-operations** - K8s运维 (4个): gitops-workflow, helm-chart-scaffolding, k8s-manifest-generator, k8s-security-policies
- **llm-application-dev** - LLM应用开发 (4个): langchain-architecture, llm-evaluation, prompt-engineering-patterns, rag-implementation
- **payment-processing** - 支付处理 (4个): billing-automation, paypal-integration, pci-compliance, stripe-integration
- **python-development** - Python开发 (4个): async-python-patterns, python-packaging, python-testing-patterns, uv-package-manager ⭐
- **security** - 安全 (1个): security-best-practices, ffuf-fuzzing
- **development-workflows** - 开发工作流 (6个): ⭐ NEW
  - executing-plans, finishing-development-branch, subagent-driven-development
  - test-driven-development, using-git-worktrees, git-commit-helper
- **problem-solving** - 问题解决思维 (9个): ⭐ NEW
  - brainstorming, collision-zone-thinking, inversion-exercise
  - meta-pattern-recognition, root-cause-tracing, scale-game
  - simplification-cascades, systematic-debugging, when-stuck
- **collaboration** - 协作 (6个): ⭐ 扩充
  - dispatching-parallel-agents, receiving-code-review, requesting-code-review
  - sharing-skills, remembering-conversations, meeting-insights-analyzer
- **testing-quality** - 测试质量 (5个): ⭐ NEW
  - condition-based-waiting, defense-in-depth, testing-anti-patterns
  - testing-skills-with-subagents, verification-before-completion
- **scientific-databases** - 科学数据库 (25个): ⭐ NEW
  - chembl, csd, drugbank, ena, ensembl, geofabrik, gnomad, human-cell-atlas
  - idc, imgt, ncbi-datasets, ncbi-geo, ncbi-pubmed, osm, pdb, pfam
  - prosite, reactome, refseq, rfam, string, tcga, ukbiobank, uniprot, zenodo
- **scientific-helpers** - 科学辅助 (2个): ⭐ NEW
  - markdown-citations, scientific-notation
- **scientific-integrations** - 科学集成 (7个): ⭐ NEW
  - github-scientific, latex-document-helper, mcp-elsevier, pypi-helper
  - r-package-helper, rdocumentation, scientific-dataset-finder
- **scientific-thinking** - 科学思维 (9个): ⭐ NEW
  - experimental-design, literature-review-helper, null-hypothesis-testing
  - p-value-interpreter, power-analysis, reproducibility-checklist
  - sample-size-calculator, study-design-validator, systematic-review-protocol
- **planning-documentation** - 计划文档 (2个): ⭐ NEW
  - writing-plans, writing-skills
- **research** - 研究方法 (1个): ⭐ NEW
  - tracing-knowledge-lineages
- **media-processing** - 媒体处理 (5个): ⭐ 扩充
  - epub-reader, image-enhancer, video-downloader
  - markdown-to-epub-enhanced, youtube-transcript
- **data-analysis** - 数据分析 (3个): ⭐ 扩充
  - csv-summarizer, excel-analysis, csv-data-summarizer
- **business-communication** - 业务沟通 (1个): ⭐ NEW
  - email-composer
- **meta-learning** - 元学习 (3个): ⭐ NEW
  - using-superpowers, gardening-skills-wiki, pulling-updates-from-skills-repository
- **utility-automation** - 实用自动化 (5个): ⭐ 扩充
  - content-research-writer, file-organizer, invoice-organizer
  - raffle-winner-picker, ship-learn-next

**位置**: `cli-tool/skills-library/` (独立管理,不在marketplace.json)
**管理**: 通过 `cli-tool/src/skills-manager.js` 模块

> 📖 完整组件列表请查看 [marketplace.json](.claude-plugin/marketplace.json) 或访问 [Claude Code Marketplace](https://claude.com/marketplace)

## 🎯 使用场景

### 🚀 快速开始项目
```bash
# 安装完整工具包
/plugin install claude-plugins-complete@lifangda

# 或按需安装
/plugin install agents-backend@lifangda      # 后端开发
/plugin install agents-frontend@lifangda     # 前端开发
/plugin install commands-git@lifangda        # Git工作流
```

### 🔧 专业开发
```bash
# 前端开发
/plugin install agents-frontend@lifangda
/plugin install nextjs-vercel-pro@lifangda

# 后端开发
/plugin install agents-backend@lifangda
/plugin install supabase-toolkit@lifangda

# 全栈开发
/plugin install agents-fullstack@lifangda
```

### 🧪 测试和质量
```bash
# 测试套件
/plugin install testing-suite@lifangda
/plugin install commands-testing@lifangda

# 安全审计
/plugin install security-pro@lifangda
/plugin install agents-security@lifangda
```

### 🏢 企业级开发
```bash
# 企业安全
/plugin install security-pro@lifangda
/plugin install agents-enterprise@lifangda

# DevOps工具
/plugin install agents-devops@lifangda
/plugin install commands-deployment@lifangda
```

## 🔧 插件管理

### 启用/禁用插件
```bash
# 启用插件
/plugin enable claude-plugins-complete@lifangda

# 禁用插件
/plugin disable claude-plugins-complete@lifangda

# 卸载插件
/plugin uninstall claude-plugins-complete@lifangda
```

> **重点：需要时启用，不需要时禁用，保持系统提示词简洁高效！**

## 📁 项目结构

```
claude-plugins/
├── .claude-plugin/
│   └── marketplace.json          # 插件市场配置文件 (99个插件包)
├── cli-tool/
│   ├── components/               # 1038个组件文件
│   │   ├── official/             # Anthropic官方插件 (18个文件)
│   │   │   ├── agents/           # 10个官方代理
│   │   │   ├── commands/         # 6个官方命令
│   │   │   └── hooks/            # 1个安全钩子 + Python脚本
│   │   ├── agents/               # 494个专业代理 (49个分类)
│   │   │   ├── data-ai/          # 数据与AI开发
│   │   │   ├── development-tools/ # 开发工具
│   │   │   ├── devops-infrastructure/ # DevOps基础设施
│   │   │   ├── emerging-technologies/ # 新兴技术 ⭐ NEW
│   │   │   ├── vertical-domains/ # 垂直领域 ⭐ NEW
│   │   │   ├── ecommerce/        # 电商专家 ⭐ NEW
│   │   │   ├── security/         # 安全审计
│   │   │   └── ...               # 更多40+分类
│   │   ├── commands/             # 313个实用命令 (28个分类)
│   │   │   ├── git-workflow/     # Git工作流命令
│   │   │   ├── testing-quality/  # 测试质量命令
│   │   │   ├── deployment/       # 部署工具命令
│   │   │   └── ...               # 更多20+分类
│   │   ├── workflows/            # 16个工作流
│   │   ├── hooks/                # 38个钩子 (9个分类)
│   │   ├── mcps/                 # 56个MCP服务器 (10个分类)
│   │   ├── output-styles/        # 18个输出样式
│   │   └── sandbox/              # 2个沙盒环境
│   ├── skills-library/           # 61个Agent Skills (28个分类) ✨独立管理 +15%
│   │   ├── README.md             # Skills使用指南
│   │   ├── backend-development/  # 4个Skills
│   │   ├── blockchain-web3/      # 4个Skills
│   │   ├── cicd-automation/      # 5个Skills ⭐
│   │   ├── cloud-infrastructure/ # 4个Skills
│   │   ├── collaboration/        # 1个Skill ⭐ NEW
│   │   ├── data-analysis/        # 1个Skill ⭐ NEW
│   │   ├── framework-migration/  # 4个Skills
│   │   ├── javascript-typescript/ # 4个Skills
│   │   ├── knowledge-management/ # 2个Skills ⭐ NEW
│   │   ├── kubernetes-operations/ # 4个Skills
│   │   ├── llm-application-dev/  # 4个Skills
│   │   ├── media-processing/     # 3个Skills ⭐ NEW
│   │   ├── payment-processing/   # 4个Skills
│   │   ├── problem-solving/      # 3个Skills ⭐ NEW
│   │   ├── python-development/   # 4个Skills ⭐
│   │   ├── security/             # 2个Skills ⭐
│   │   ├── utility-automation/   # 5个Skills ⭐ NEW
│   │   └── ...                   # 更多10+领域
│   └── src/
│       └── skills-manager.js     # Skills管理模块
├── CHANGELOG.md                  # 版本历史记录
├── README.md                     # 项目说明文档
└── LICENSE                       # MIT许可证
```

## 🌐 推荐资源

除了claude-plugins提供的**扁平化agents库**,以下资源适合特定场景:

### 完整工作流系统

#### zhsama/claude-sub-agent
- **仓库**: https://github.com/zhsama/claude-sub-agent
- **类型**: Spec-driven开发工作流系统
- **特点**: Planning → Development → Validation完整流程,质量门控机制
- **适用**: 需要结构化开发流程和工作流自动化的团队
- **组件**: 8个spec-agents + 完整质量检查系统
- **推荐理由**: 如果你需要强制性开发流程,而非独立工具集

### TDD强制开发系统

#### vanzan01/claude-code-sub-agent-collective
- **仓库**: https://github.com/vanzan01/claude-code-sub-agent-collective
- **Star数**: 2.8k ⭐ (高社区热度)
- **类型**: TDD方法论强制执行系统 (NPM包)
- **特点**: Hub-and-Spoke协调,Context7集成,强制RED-GREEN-REFACTOR
- **适用**: 严格TDD方法论的团队,快速MVP开发
- **组件**: 30+专业agents,智能任务分解,完整质量门控
- **推荐理由**: 如果你需要系统级TDD开发,而非工具箱式体验

### 官方Skills库

#### obra/superpowers
- **仓库**: https://github.com/obra/superpowers
- **类型**: Skills库 (官方认可)
- **特点**: battle-tested,官方质量保证,20+高质量skills
- **适用**: 需要特定skills但不想整合全部的用户
- **核心Skills**: systematic-debugging, git-worktrees, dispatching-parallel-agents
- **推荐理由**: 可手动安装特定skills补充我们的Skills库

### 使用建议

**claude-plugins** 提供**工具箱式体验** - 扁平化独立agents,自由选择组合
**上述资源** 提供**系统式体验** - 完整工作流,强制流程控制

根据团队需求和开发风格选择合适的方案! 🎯

---

## 🤝 贡献指南

我们欢迎社区贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与项目。

### 贡献方式
1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) - 查看 LICENSE 文件了解详情。

## 🙏 致谢

感谢所有贡献者和开源社区的支持！

## 📞 支持

如果您遇到问题或有建议，请：

1. 查看 [Issues](https://github.com/lifangda/claude-plugins/issues)
2. 创建新的 Issue
3. 联系维护者

---

**让AI开发更简单，让代码更智能！** 🚀