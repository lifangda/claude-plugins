# 🚀 Claude Plugins - 完整的AI开发工具集

> 一条命令就能安装精心打磨的工作流、命令、代理、MCP服务器和钩子

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/github/stars/lifangda/claude-plugins?style=social)](https://github.com/lifangda/claude-plugins)
[![Claude Plugins](https://img.shields.io/badge/Claude-Plugins-blue)](https://github.com/lifangda/claude-plugins)

## 📋 项目概述

Claude Plugins 是一个完整的AI开发工具集，包含 **763个文件**，涵盖：

- **312个专业代理** - AI专家团队，覆盖各种开发领域
- **274个实用命令** - 自动化工具和开发命令
- **15个工作流** - 完整的开发流程自动化
- **40个钩子** - 自动化触发器和事件处理
- **55个MCP服务器** - 外部服务集成
- **3个沙盒环境** - 安全的代码执行环境
- **64个设置配置** - 项目配置和自定义设置

### 🏆 技术规范
- ✅ **符合Claude Code官方插件市场规范**
- ✅ **通过`claude plugin validate`验证**
- ✅ **支持团队市场配置和自动安装**
- ✅ **完整的组件路径配置**
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
# 安装完整插件包（包含699个插件）
/plugin install claude-plugins-complete@lifangda
```

#### 方式二：功能分类插件包（推荐专业用户）
```bash
# 🎯 AI增强工具
/plugin install ai-optimization@lifangda      # Lyra、Ultrathink、Double-check

# 📊 代码分析
/plugin install code-analysis@lifangda        # 代码库分析、架构师、文档生成

# 🚀 产品管理
/plugin install product-management@lifangda   # PRD专家、冲刺规划、产品销售

# 💼 企业工具
/plugin install enterprise@lifangda           # 企业安全、集成架构、法律合规

# 📱 移动开发
/plugin install mobile-development@lifangda   # Flutter、React Native、移动UX

# ✅ 测试质量
/plugin install testing-quality@lifangda     # 测试分析、单元测试生成、Bug侦探

# 📢 营销增长
/plugin install marketing-growth@lifangda    # 增长黑客、社交媒体策略

# 🔗 集成API
/plugin install integration-api@lifangda     # MCP专家、n8n工作流、OpenAPI

# 核心开发工具包
/plugin install git-workflow@lifangda        # Git工作流自动化
/plugin install supabase-toolkit@lifangda     # 数据库开发工具
/plugin install nextjs-vercel-pro@lifangda   # 前端开发工具
/plugin install testing-suite@lifangda       # 测试自动化
/plugin install security-pro@lifangda        # 安全审计工具
/plugin install knowledge-wikipedia@lifangda # 知识库工具
```

#### 方式三：精准安装（推荐高级用户）
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
/plugin

# 测试插件功能
/python-pro  # 使用Python专家
/git-workflow  # 使用Git工作流
/supabase-toolkit  # 使用Supabase工具
```

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
**描述**: 完整的699个Claude插件集合，包括312个代理、274个命令、15个工作流、40个钩子、55个MCP服务器和3个沙盒环境
**适用**: 新手用户，希望获得完整功能
**安装**: `/plugin install claude-plugins-complete@lifangda`

### 🌟 社区插件包（NEW!）

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

## 🤖 专业代理分类

### 编程语言专家
- **python-pro**: Python开发专家
- **javascript-pro**: JavaScript开发专家
- **typescript-pro**: TypeScript开发专家
- **golang-pro**: Go语言开发专家
- **rust-pro**: Rust系统编程专家
- **java-pro**: Java企业级开发专家
- **cpp-pro**: C++高性能开发专家
- **c-pro**: C语言系统编程专家
- **csharp-pro**: C#企业级开发专家
- **php-pro**: PHP Web开发专家
- **ruby-pro**: Ruby开发专家
- **scala-pro**: Scala函数式编程专家
- **elixir-pro**: Elixir并发编程专家
- **sql-pro**: SQL数据库专家

### 框架和工具专家
- **react-expert**: React前端开发专家
- **vue-expert**: Vue.js前端开发专家
- **nodejs-pro**: Node.js后端开发专家
- **django-pro**: Django Python Web框架专家
- **fastapi-pro**: FastAPI高性能API框架专家
- **flutter-expert**: Flutter跨平台移动开发专家
- **unity-developer**: Unity游戏开发专家
- **ios-developer**: iOS原生开发专家
- **mobile-developer**: 移动端开发专家

### 专业领域专家
- **ai-engineer**: AI工程专家
- **ml-engineer**: 机器学习专家
- **data-engineer**: 数据工程专家
- **data-scientist**: 数据科学家
- **blockchain-developer**: 区块链开发专家
- **security-auditor**: 安全审计专家
- **devops-engineer**: DevOps工程专家
- **cloud-architect**: 云架构专家
- **database-admin**: 数据库管理专家
- **ui-ux-designer**: UI/UX设计专家

### 业务领域专家
- **business-analyst**: 商业分析师
- **product-strategist**: 产品策略专家
- **marketing-specialist**: 营销专家
- **customer-support**: 客户支持专家
- **legal-advisor**: 法律顾问
- **hr-pro**: 人力资源专家
- **sales-automator**: 销售自动化专家
- **risk-manager**: 风险管理专家
- **payment-integration**: 支付集成专家

## 🛠️ 命令工具分类

### 自动化工具
- **automation**: 自动化工具插件包
- **deployment**: 部署工具插件包
- **git-workflow**: Git工作流插件包
- **testing**: 测试工具插件包
- **security**: 安全工具插件包
- **performance**: 性能工具插件包
- **utilities**: 实用工具插件包

### 开发工具
- **nextjs-vercel**: Next.js和Vercel工具
- **documentation**: 文档工具
- **project-management**: 项目管理工具
- **setup**: 设置工具

## 🔄 工作流分类

- **data-driven-feature**: 数据驱动功能工作流
- **feature-development**: 功能开发工作流
- **full-review**: 完整审查工作流
- **full-stack-feature**: 全栈功能工作流
- **git-workflow**: Git工作流
- **improve-agent**: 代理改进工作流
- **incident-response**: 事件响应工作流
- **legacy-modernize**: 遗留系统现代化工作流
- **ml-pipeline**: 机器学习管道工作流
- **multi-platform**: 多平台工作流
- **performance-optimization**: 性能优化工作流
- **security-hardening**: 安全加固工作流
- **smart-fix**: 智能修复工作流
- **tdd-cycle**: TDD测试驱动开发循环工作流
- **workflow-automate**: 工作流自动化

## 🪝 钩子分类

- **automation**: 自动化钩子
- **development-tools**: 开发工具钩子
- **git-workflow**: Git工作流钩子
- **git**: Git钩子
- **performance**: 性能钩子
- **post-tool**: 后置工具钩子
- **pre-tool**: 前置工具钩子
- **security**: 安全钩子
- **testing**: 测试钩子

## 🔗 MCP服务器分类

- **browser_automation**: 浏览器自动化MCP
- **database**: 数据库MCP
- **deepgraph**: DeepGraph MCP
- **devtools**: 开发工具MCP
- **filesystem**: 文件系统MCP
- **integration**: 集成服务MCP
- **marketing**: 营销工具MCP
- **productivity**: 生产力工具MCP
- **web**: Web服务MCP
- **knowledge**: 知识库MCP（维基百科）

## 🏖️ 沙盒环境

- **e2b**: E2B沙盒环境，提供安全的代码执行环境

## 🎯 使用场景

### 🚀 快速开始项目
```bash
# 安装完整工具包
/plugin install claude-plugins-complete@lifangda

# 开始开发
/python-pro  # Python专家
/react-expert  # React专家
/git-workflow  # Git工作流
```

### 🔧 专业开发
```bash
# 前端开发
/plugin install nextjs-vercel-pro@lifangda
/plugin install react-expert@lifangda

# 后端开发
/plugin install python-pro@lifangda
/plugin install supabase-toolkit@lifangda

# 全栈开发
/plugin install claude-plugins-complete@lifangda
```

### 🧪 测试和质量
```bash
# 测试套件
/plugin install testing-suite@lifangda

# 安全审计
/plugin install security-pro@lifangda
```

### 🏢 企业级开发
```bash
# 企业安全
/plugin install security-pro@lifangda

# 合规检查
/plugin install compliance-specialist@lifangda
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
│   └── marketplace.json          # 插件市场配置文件
├── cli-tool/
│   └── components/               # 692个文件
│       ├── agents/               # 249个专业代理
│       ├── commands/             # 252个实用命令
│       ├── workflows/            # 15个工作流
│       ├── hooks/                # 40个钩子
│       ├── mcps/                 # 55个MCP服务器
│       └── sandbox/              # 3个沙盒环境
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