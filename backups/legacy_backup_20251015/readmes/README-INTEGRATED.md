# Claude Plugins - 整合版

**一条命令就能安装精心打磨的工作流、命令、代理、MCP服务器和钩子**

这是一个整合了多个开源Claude插件项目的统一仓库，包含了：

## 📦 整合内容

### 来自 wshobson/agents 项目：
- **83个专业AI代理** - 涵盖架构、语言、基础设施、质量、数据/AI、文档、业务运营和SEO
- **15个多代理工作流** - 复杂操作的多代理协调系统
- **42个开发工具** - 专注于特定任务的实用工具

### 来自 davila7/claude-code-templates 项目：
- **完整的CLI工具链** - 包含agents、commands、hooks、settings、mcps等组件
- **分类组织** - 按功能领域组织的组件结构
- **MCP服务器集成** - 外部服务集成配置

## 🚀 快速开始

### 安装方式

```bash
# 克隆仓库
git clone https://github.com/lifangda/claude-plugins.git
cd claude-plugins

# 在Claude Code中使用 /plugin 命令安装插件
/plugin install claude-code-essentials
/plugin install git-workflow
/plugin install supabase-toolkit
/plugin install nextjs-vercel-pro
/plugin install testing-suite
/plugin install security-pro
/plugin install ai-ml-toolkit
/plugin install devops-automation
/plugin install documentation-generator
/plugin install performance-optimizer
/plugin install project-management-suite
```

## 📁 项目结构

```
claude-plugins/
├── .claude-plugin/
│   └── marketplace.json          # 统一的插件市场配置
├── cli-tool/
│   └── components/
│       ├── agents/              # AI代理 (整合自两个项目)
│       │   ├── development-team/
│       │   ├── data-ai/
│       │   ├── security/
│       │   ├── database/
│       │   ├── devops-infrastructure/
│       │   ├── development-tools/
│       │   ├── business-marketing/
│       │   └── ...
│       ├── commands/            # 命令工具
│       │   ├── integrated-tools/  # 来自tools/目录
│       │   ├── git/
│       │   ├── database/
│       │   ├── testing/
│       │   └── ...
│       ├── workflows/           # 工作流 (来自workflows/目录)
│       ├── hooks/               # 钩子
│       ├── mcps/               # MCP服务器
│       └── settings/           # 设置
├── agents/                     # 原始agents目录 (已整合)
├── tools/                      # 原始tools目录 (已整合)
├── workflows/                  # 原始workflows目录 (已整合)
└── README.md
```

## 🎯 可用插件

### 核心插件
- **claude-code-essentials** - 日常开发必备工具
- **git-workflow** - Git工作流自动化
- **testing-suite** - 全面测试工具包
- **security-pro** - 企业级安全工具包

### 开发工具
- **nextjs-vercel-pro** - Next.js和Vercel开发工具包
- **supabase-toolkit** - Supabase数据库工具包
- **ai-ml-toolkit** - AI和机器学习开发套件
- **devops-automation** - DevOps自动化套件

### 生产力工具
- **documentation-generator** - 自动化文档生成
- **performance-optimizer** - 性能优化套件
- **project-management-suite** - 项目管理工具包

## 🔧 使用示例

### 安装特定插件
```bash
/plugin install security-pro
```

### 使用AI代理
```
"使用security-auditor扫描OWASP漏洞"
"让backend-architect设计认证API"
"请performance-engineer优化这个数据库查询"
```

### 多代理工作流
```
"实现用户仪表板与实时分析"
→ backend-architect → graphql-architect → frontend-developer → mobile-developer → test-automator → security-auditor → performance-engineer → deployment-engineer
```

## 📝 贡献

欢迎贡献新的agents、commands、workflows或MCP服务器！

1. 在相应的目录中创建新文件
2. 更新marketplace.json配置
3. 提交Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- **wshobson/agents** - 提供了83个专业AI代理和15个工作流
- **davila7/claude-code-templates** - 提供了完整的CLI工具链和组件结构

---

**⭐ 如果这个项目对你有帮助，请给我们一个星标！**

🙌 I'm ready!
