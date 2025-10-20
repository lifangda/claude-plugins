# 🚀 Claude Plugins - 完整的AI开发工具集

> 一条命令就能安装精心打磨的工作流、命令、代理、MCP服务器和钩子

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/github/stars/lifangda/claude-plugins?style=social)](https://github.com/lifangda/claude-plugins)
[![Claude Plugins](https://img.shields.io/badge/Claude-Plugins-blue)](https://github.com/lifangda/claude-plugins)

## 📋 项目概述

Claude Plugins 是一个完整的AI开发工具集,包含 **857个文件**,涵盖:

- **284个专业代理** (47个分类) - AI专家团队,覆盖各种开发领域
  - 包含10个Anthropic官方代理
  - 包含4个来自wshobson/agents的高质量专业代理 ✨新增
- **313个实用命令** (28个分类) - 自动化工具和开发命令
  - 包含6个Anthropic官方命令
  - 包含7个来自awesome-claude-code的精选命令 ✨新增
- **16个工作流** - 完整的开发流程自动化
- **39个钩子** (10个分类) - 自动化触发器和事件处理
  - 包含1个Anthropic官方安全钩子
- **56个MCP服务器** (10个分类) - 外部服务集成
- **18个输出样式** - 专业化Claude输出格式
- **36个Agent Skills** (10个分类) - 模块化领域知识包 ✨增强
  - 包含5个来自Anthropic官方skills仓库 ✨新增
- **2个沙盒环境** - 安全的代码执行环境

**总计: 764个组件,97个精细化插件包**

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

# 安装Agent Skills知识包（31个专业技能包）✨新增
/plugin install skills-collection@lifangda
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

## 🆕 最新特性

### 🎉 重大改进
- **路径有效性提升**: 从18%提升到100% (修复837个无效路径)
- **插件包优化**: 从167个集合式插件包优化为97个精细化分类插件包
- **Agent Skills集成**: 新增31个模块化领域知识包 (wshobson/agents仓库查漏补缺) ✨
- **按需安装**: 支持按功能分类精准安装，避免安装不需要的组件
- **目录重构**: 所有组件按实际功能分类组织，便于管理和维护

### ✨ 新增功能
- 📊 **诊断分析工具** - 自动检测配置完整性和路径有效性
- 📋 **完整性验证机制** - 确保所有配置与物理文件同步
- 🎯 **精细化分类** - 47个agents分类、28个commands分类、10个MCPs分类
- 📖 **版本历史** - 新增CHANGELOG.md记录版本变更
- 🧠 **Agent Skills** - 31个专业技能包,覆盖9个核心技术领域

详见 [CHANGELOG.md](CHANGELOG.md)

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
**描述**: 完整的748个Claude插件集合
**包含**:
- 280个专业代理 (47个分类)
- 306个实用命令 (28个分类)
- 16个工作流
- 39个钩子 (10个分类)
- 56个MCP服务器 (10个分类)
- 18个输出样式
- 31个Agent Skills (9个分类) ✨新增
- 2个沙盒环境

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

#### skills-collection ✨新增
**描述**: Agent Skills 技能集合 - 31个专业技能包,覆盖9个核心技术领域
**特色**:
- 🏗️ **后端开发**: API设计、架构模式、微服务 (3个)
- ⛓️ **区块链Web3**: DeFi、NFT、智能合约安全 (4个)
- 🔄 **CI/CD自动化**: 部署流水线、GitHub Actions、GitLab CI (4个)
- ☁️ **云基础设施**: 成本优化、混合云、多云架构、Terraform (4个)
- 📦 **框架迁移**: Angular/React/Database迁移、依赖升级 (4个)
- 💻 **JavaScript/TypeScript**: 现代JS模式、Node.js后端、TS高级类型 (4个)
- ⚙️ **Kubernetes运维**: GitOps、Helm、K8s清单生成 (4个)
- 💳 **支付处理**: Stripe集成 (1个)
- 🐍 **Python开发**: 异步模式、测试模式、uv包管理器 (3个)

**来源**: [wshobson/agents](https://github.com/wshobson/agents) 查漏补缺整合
**适用**: 需要按需加载特定领域知识的开发者
**安装**: `/plugin install skills-collection@lifangda`

## 🤖 组件分类浏览

### Agents分类 (280个,47个分类)
完整的AI专家团队,覆盖各种开发领域:
- **official** - Anthropic官方代理 (10个)
- **data-ai** - 数据与AI开发 (9个)
- **development-tools** - 开发工具 (18个)
- **devops-infrastructure** - DevOps基础设施 (16个)
- **security** - 安全审计 (9个)
- **testing-quality** - 测试质量 (8个)
- **mobile-development** - 移动开发 (5个)
- **business-marketing** - 业务营销 (11个)
- **database** - 数据库 (11个)
- **documentation** - 文档 (8个)
- 更多35+个专业分类...

### Commands分类 (306个,28个分类)
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

### Agent Skills (31个,9个分类) ✨新增
模块化领域知识包,渐进式信息披露架构:
- **backend-development** - 后端开发 (3个)
- **blockchain-web3** - 区块链Web3 (4个)
- **cicd-automation** - CI/CD自动化 (4个)
- **cloud-infrastructure** - 云基础设施 (4个)
- **framework-migration** - 框架迁移 (4个)
- **javascript-typescript** - JS/TS开发 (4个)
- **kubernetes-operations** - K8s运维 (4个)
- **payment-processing** - 支付处理 (1个)
- **python-development** - Python开发 (3个)

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
│   └── marketplace.json          # 插件市场配置文件 (97个插件包)
├── cli-tool/
│   └── components/               # 748个组件文件
│       ├── official/             # Anthropic官方插件 (18个文件)
│       │   ├── agents/           # 10个官方代理
│       │   ├── commands/         # 6个官方命令
│       │   └── hooks/            # 1个安全钩子 + Python脚本
│       ├── agents/               # 270个专业代理 (46个分类)
│       │   ├── data-ai/          # 数据与AI开发
│       │   ├── development-tools/ # 开发工具
│       │   ├── devops-infrastructure/ # DevOps基础设施
│       │   ├── security/         # 安全审计
│       │   └── ...               # 更多40+分类
│       ├── commands/             # 300个实用命令 (27个分类)
│       │   ├── git-workflow/     # Git工作流命令
│       │   ├── testing-quality/  # 测试质量命令
│       │   ├── deployment/       # 部署工具命令
│       │   └── ...               # 更多20+分类
│       ├── workflows/            # 16个工作流
│       ├── hooks/                # 38个钩子 (9个分类)
│       ├── mcps/                 # 56个MCP服务器 (10个分类)
│       ├── output-styles/        # 18个输出样式
│       ├── skills/               # 31个Agent Skills (9个分类) ✨新增
│       └── sandbox/              # 2个沙盒环境
├── CHANGELOG.md                  # 版本历史记录
├── README.md                     # 项目说明文档
└── LICENSE                       # MIT许可证
```

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