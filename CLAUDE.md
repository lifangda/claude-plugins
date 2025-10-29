# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Claude Plugins 是一个 Node.js CLI 工具,用于管理和安装 Claude Code 配置组件。

**当前版本**: v1.5

**组件统计** (1099个组件,1600+文件):
- 504个专业代理 (50个分类)
  - 包含10个Anthropic官方代理
  - 覆盖新兴技术、垂直领域、电商等50个专业领域
- 313个实用命令 (28个分类)
  - 包含6个Anthropic官方命令
- 16个工作流
- 39个钩子 (10个分类)
  - 包含1个Anthropic官方安全钩子
- 56个MCP服务器 (10个分类)
- 18个输出样式
- 2个沙盒环境
- **插件系统组件总计**: 948个

**Agent Skills知识库** (独立管理,151个技能包): ⭐⭐⭐ +148% (生态大爆发)
- 位于 `cli-tool/skills-library/` 目录
- 采用官方三级渐进式架构 (Tier 1: Metadata ~100 tokens, Tier 2: SKILL.md <5K tokens, Tier 3: Resources unlimited)
- 32个技术领域分类
- 500+文件 (SKILL.md + references + scripts + assets)
- 覆盖开发工作流(6个)、问题解决思维(9个)、科学数据库(25个)、科学计算(18个)、多代理协作、代码审查、数据处理、媒体创作等完整领域

**核心功能:**
- 组件安装系统 (agents, commands, mcps, workflows, hooks, output-styles)
- **Agent Skills管理系统** (list, search, install) ✨独立系统 - 151个Skills
- Claude Code 插件市场配置 (99个精细化插件包)
- 实时分析仪表板
- E2B 沙盒执行环境
- **Anthropic官方插件集成** (18个官方文件)
- **Output Styles系统** (18个专业输出样式)
- **科学计算整合** (43个科学Skills)

## 常用命令

### 开发命令
```bash
# 安装依赖
npm install

# 运行 CLI 工具
npm start
node cli-tool/bin/create-claude-config.js

# 启动分析仪表板
npm run analytics:start
# 浏览器访问 http://localhost:3333
```

### 测试命令
```bash
npm test                    # 运行所有测试
npm run test:watch          # 监视模式
npm run test:coverage       # 覆盖率报告
npm run analytics:test      # 分析模块测试
```

### 发布工作流
```bash
npm version patch           # 1.0.0 -> 1.0.1
npm version minor           # 1.0.1 -> 1.1.0
npm version major           # 1.1.0 -> 2.0.0
npm publish
```

### 组件测试
```bash
# 测试单个组件安装
node cli-tool/bin/create-claude-config.js --agent python-pro
node cli-tool/bin/create-claude-config.js --command generate-tests
node cli-tool/bin/create-claude-config.js --mcp github-integration
```

### Skills管理
```bash
# 列出所有Skills
node cli-tool/src/skills-manager.js list

# 搜索Skills
node cli-tool/src/skills-manager.js search <keyword>

# 安装Skill到项目
node cli-tool/src/skills-manager.js install <skill-name> --project

# 安装Skill到全局
node cli-tool/src/skills-manager.js install <skill-name> --global
```

## 核心架构

### 1. CLI 入口系统 (`cli-tool/bin/create-claude-config.js` 和 `cli-tool/src/index.js`)

**主要功能流程:**
- `showMainMenu()` - 交互式主菜单 (Analytics, Chats, Agents, Setup, Health Check)
- `createClaudeConfig()` - 核心配置创建函数
- 组件安装函数: `installIndividualAgent()`, `installIndividualCommand()`, `installIndividualMCP()`, `installIndividualSetting()`, `installIndividualHook()`
- `installMultipleComponents()` - 批量组件安装,支持共享安装位置选择
- `executeSandbox()` - E2B 沙盒执行环境

**Skills管理模块** (`cli-tool/src/skills-manager.js`):
- `listAllSkills()` - 列出所有可用Skills
- `searchSkills(keyword)` - 按关键词搜索Skills
- `getSkillInfo(skillName, category)` - 获取Skill详细信息
- `installSkill(skillName, location, category)` - 安装Skill到项目或全局
- `listSkillsByCategory()` - 按分类列出Skills

**关键特性:**
- 所有组件从 GitHub main 分支下载: `https://raw.githubusercontent.com/lifangda/claude-plugins/main/cli-tool/components/`
- 支持分类路径 (如 `security/api-security-audit`) 和直接路径 (如 `python-pro`)
- Settings 和 Hooks 支持多位置安装: user (~/.claude), project (.claude), local (.claude/settings.local.json), enterprise
- **Skills独立管理**: Skills不从GitHub下载,直接从本地 `cli-tool/skills-library/` 复制到安装位置

### 2. 组件系统

**组件类型和安装位置:**
```
Agents   → .claude/agents/
Commands → .claude/commands/
MCPs     → .mcp.json (合并配置)
Settings → .claude/settings.json 或 settings.local.json
Hooks    → .claude/settings.json 或 settings.local.json
Workflows → .claude/workflows/
```

**Skills安装位置** (独立管理):
```
Skills (Project) → .claude/skills/
Skills (Global)  → ~/.claude/skills/
```
- Skills从 `cli-tool/skills-library/` 本地复制
- 保持完整目录结构: SKILL.md + references/ + scripts/ + assets/
- 支持项目级和全局级安装

**Statusline 特殊处理:**
- Statusline 组件 (如 `statusline/context-monitor`) 会同时下载 JSON 配置和对应的 Python 脚本
- Python 脚本安装到 `.claude/scripts/` 目录
- 代码位置: `cli-tool/src/index.js:installIndividualSetting()` 行 603-654

**MCP 配置合并:**
- 自动移除 `description` 字段避免配置冗余
- 深度合并 `mcpServers` 对象保留现有配置
- 代码位置: `cli-tool/src/index.js:installIndividualMCP()` 行 517-601

### 3. 插件市场系统 (`.claude-plugin/marketplace.json`)

**v1.2 重大改进:**
- **Skills架构重构**: Skills从components目录迁移到独立的 `skills-library/` 目录
- 采用官方三级渐进式架构 (Tier 1: Metadata, Tier 2: SKILL.md, Tier 3: Resources)
- 从97个插件包优化为96个 (移除skills-collection,Skills独立管理)
- 路径有效性保持100%
- **集成Anthropic官方插件** (claude-code-official包)

**结构:**
- 每个插件包含: name, source, description, version, agents[], commands[], workflows[], hooks[], mcps[]
- Skills不再包含在marketplace.json中,通过skills-manager.js独立管理
- 支持 Claude Code 插件市场规范

**插件包类型:**
1. **完整插件包**: `claude-plugins-complete` (748个组件)
2. **官方插件包**: `claude-code-official` (18个Anthropic官方文件)
3. **功能分类包**: `agents-backend`, `commands-git`, `mcps-database` 等 (47+28+10+10个分类)
4. **经典插件包**: `git-workflow`, `supabase-toolkit`, `nextjs-vercel-pro`, `testing-suite`, `security-pro`, `knowledge-wikipedia`
5. **社区精选包**: `marketplace-community` (85个社区精选插件)

### 4. 分析仪表板架构 (`cli-tool/src/analytics.js`)

**模块化架构 (4阶段重构):**

**后端模块** (`cli-tool/src/analytics/`):
```
core/
  ├── StateCalculator.js        # 会话状态检测
  ├── ProcessDetector.js        # 进程检测和关联
  ├── ConversationAnalyzer.js   # 消息解析分析
  ├── FileWatcher.js            # 实时文件监控
  └── AgentAnalyzer.js          # Agent 分析
data/
  └── DataCache.js              # 多级缓存系统
notifications/
  ├── WebSocketServer.js        # WebSocket 管理
  └── NotificationManager.js    # 事件驱动通知
utils/
  └── PerformanceMonitor.js     # 性能监控
```

**前端架构** (`cli-tool/src/analytics-web/`):
```
components/
  ├── DashboardPage.js          # 主仪表板
  ├── ConversationTable.js      # 会话列表
  ├── Charts.js                 # 数据可视化
  ├── AgentAnalytics.js         # Agent 分析视图
  └── [其他组件]
services/
  ├── StateService.js           # 响应式状态管理
  ├── DataService.js            # API 通信 + 缓存
  └── WebSocketService.js       # 实时通信
```

**实时通信:**
- WebSocket 服务器端口 3333
- 支持会话状态变化通知
- 回退到轮询机制
- 浏览器通知集成

### 5. E2B 沙盒系统

**架构:**
- Python launcher: `cli-tool/components/sandbox/e2b/e2b-launcher.py`
- 支持本地和远程组件安装
- 15分钟超时,支持 ESC 取消
- 自动文件下载到用户目录

**使用:**
```bash
node cli-tool/bin/create-claude-config.js --sandbox e2b --prompt "创建一个 web 应用" --agent python-pro
```

**环境要求:**
- Python 3.11+ (推荐) 或 python3
- E2B_API_KEY 环境变量
- ANTHROPIC_API_KEY 环境变量

## 重要实现细节

### 路径处理规范
- **始终使用相对路径**: `.claude/scripts/`, `.claude/agents/` 等
- **使用 `path.join()`** 确保跨平台兼容性
- **从不硬编码用户目录或绝对路径**

### Hook 配置格式
- 使用 Claude Code 数组格式
- 每个 hook 类型包含 matcher 和 hooks 数组
- 旧格式会自动转换为新格式
- 代码位置: `cli-tool/src/index.js` 行 1127-1169

### 组件分类系统

**v1.2 目录结构重组:**
- 所有组件按实际功能分类组织到子目录
- **新增official目录**: 存放Anthropic官方插件
- **独立skills-library目录**: Agent Skills知识库 (不在components内) ✨
- Agents: 47个功能分类 (official, data-ai, development-tools, devops-infrastructure, security, testing-quality, mobile-development, business-marketing, database, documentation 等)
- Commands: 28个功能分类 (official, git-workflow, testing, deployment, documentation, security, performance, automation 等)
- Hooks: 10个功能分类 (official, git-workflow, testing, security, automation, performance 等)
- MCPs: 10个功能分类 (database, devtools, web, browser_automation, integration 等)

**路径格式:**
- 官方组件物理路径: `cli-tool/components/official/agents/code-reviewer.md`
- 用户组件物理路径: `cli-tool/components/agents/data-ai/ai-engineer.md`
- marketplace.json路径: `official/agents/code-reviewer.md` 或 `agents/data-ai/ai-engineer.md` (相对于components目录)
- 安装目标位置: `.claude/agents/code-reviewer.md` 或 `.claude/agents/ai-engineer.md` (扁平结构)

**安装流程:**
- 从分类路径读取: `official/agents/code-reviewer.md` 或 `agents/data-ai/ai-engineer.md`
- 提取文件名: `code-reviewer.md` 或 `ai-engineer.md`
- 安装到扁平目录: `.claude/agents/code-reviewer.md` 或 `.claude/agents/ai-engineer.md`

### Agent Skills 架构 (`cli-tool/skills-library/`)

**v1.2 Skills独立管理系统:**
- **独立目录**: Skills从 `components/skills/` 迁移到 `cli-tool/skills-library/`
- **官方架构**: 采用三级渐进式架构 (Anthropic官方规范)
- **独立管理**: 通过 `skills-manager.js` 模块管理,不依赖marketplace.json
- **完整迁移**: 39个Skills,174个文件 (SKILL.md + references + scripts + assets)
- **11个技术领域**: backend-development, blockchain-web3, cicd-automation, cloud-infrastructure, framework-migration, javascript-typescript, kubernetes-operations, llm-application-dev, payment-processing, python-development, security

**三级渐进式架构:**
```
Tier 1: YAML frontmatter (always loaded, ~100 tokens)
├── name: Skill名称
├── description: 简要描述
├── version: 版本号
└── tags: 标签分类

Tier 2: SKILL.md body (loaded when triggered, <5K tokens)
├── When to Use This Skill
├── Quick Start
├── Core Concepts (with links to Tier 3)
└── Best Practices Summary

Tier 3: Bundled Resources (loaded as needed, unlimited)
├── references/*.md - 详细文档和实现模式
├── scripts/*.sh - 可执行脚本
└── assets/* - 模板和资源文件
```

**Skills Library目录结构:**
```
cli-tool/skills-library/
├── README.md (使用指南)
├── backend-development/
│   ├── api-design-principles/
│   ├── architecture-patterns/
│   └── microservices-patterns/
├── blockchain-web3/
│   ├── defi-protocol-templates/
│   └── solidity-security/
├── javascript-typescript/
│   ├── javascript-testing-patterns/
│   │   ├── SKILL.md
│   │   └── references/ (5个详细文档)
│   ├── nodejs-backend-patterns/
│   │   ├── SKILL.md
│   │   └── references/ (6个详细文档)
│   └── modern-javascript-patterns/
├── python-development/
│   ├── async-python-patterns/
│   ├── python-testing-patterns/
│   └── uv-package-manager/
└── [其他7个领域分类]
```

**Skills管理API:**
```javascript
const skillsManager = require('./cli-tool/src/skills-manager.js');

// 列出所有Skills
const allSkills = skillsManager.listAllSkills();

// 搜索Skills
const searchResults = skillsManager.searchSkills('testing');

// 获取详细信息
const skillInfo = skillsManager.getSkillInfo('javascript-testing-patterns');

// 安装到项目
skillsManager.installSkill('javascript-testing-patterns', 'project');

// 安装到全局
skillsManager.installSkill('nodejs-backend-patterns', 'global');
```

**使用指南:**
- 详见 [cli-tool/skills-library/README.md](cli-tool/skills-library/README.md) - Skills Library使用说明

### 错误处理模式
- 所有异步操作使用 try/catch
- 网络操作包含回退机制
- 404 错误显示可用组件建议
- 使用 chalk 进行彩色错误输出

## 技术栈

**核心依赖:**
- Node.js 14+
- Express.js (Web 服务器)
- WebSocket (ws 库)
- Chokidar (文件监控)
- Commander (CLI 框架)
- Inquirer (交互式提示)

**前端:**
- Vanilla JavaScript (无框架依赖)
- Chart.js (数据可视化)
- WebSocket Client

**测试:**
- Jest (测试框架)
- 支持 unit, integration, e2e 测试

## 模块系统规范

- 使用 CommonJS: `module.exports`, `require()`
- 类使用 PascalCase: `StateCalculator`
- 函数/变量使用 camelCase: `getUserData`
- 常量使用 UPPER_SNAKE_CASE: `API_BASE_URL`
- 私有方法前缀下划线: `_privateMethod`

## 组件生成和验证

### 生成组件目录
```bash
python generate_components_json.py
```
- 扫描所有组件目录
- 排除 `.py` 文件 (作为后台依赖)
- 生成 `docs/components.json`

### 路径验证诊断
**v1.1 新增功能:**
- 自动检测配置完整性和路径有效性
- 验证所有marketplace.json路径与物理文件同步
- 生成诊断报告: `DIAGNOSTIC_REPORT.md`
- 确保100%路径有效性

## 发布前检查清单

1. 运行测试: `npm test`
2. 生成组件目录: `python generate_components_json.py`
3. 验证路径有效性: 运行诊断工具检查100%路径有效
4. 更新版本号: `npm version patch|minor|major`
5. 更新 CHANGELOG.md: 记录版本变更
6. 更新 README.md: 同步统计数据和版本号
7. 验证 marketplace.json: 确保与物理目录结构同步
8. Git 提交: 包含所有相关文件
9. 发布: `npm publish`

## 调试技巧

**测试组件安装:**
```bash
# 本地测试 CLI
npm link
claude-plugins --agent python-pro

# 测试分析仪表板
npm run analytics:start
# 检查浏览器控制台错误
```

**检查语法:**
```bash
node --check cli-tool/src/analytics.js
node --check cli-tool/src/index.js
```

**调试 E2B 沙盒:**
- 查看 `cli-tool/components/sandbox/e2b/SANDBOX_DEBUGGING.md`
- 检查 Python 环境: `python3 --version` 或 `python3.11 --version`
- 验证 API keys: `echo $E2B_API_KEY`, `echo $ANTHROPIC_API_KEY`

## 版本历史

详见 [CHANGELOG.md](CHANGELOG.md) 获取完整版本历史和更新日志。

**当前版本**: v1.5
- **Skills生态大爆发**: 整合7个高质量Skills仓库
- **Skills大幅增长**: 从61个增至151个 (+90, +148%)
- **科学计算整合**: 新增43个科学计算Skills (数据库25个+计算18个)
- **开发工作流完善**: 新增6个完整开发循环Skills
- **思维方法论**: 新增9个问题解决思维框架
- **多代理协作**: 新增6个协作与代码审查Skills
- **插件系统稳定**: 948个组件保持高质量
- 总组件达1099个,完整生态系统

**v1.2** (前版本)
- **Skills架构重构**: Skills迁移到独立的 `skills-library/` 目录
- **三级渐进式架构**: 采用Anthropic官方Skills规范 (Tier 1/2/3)
- **独立管理系统**: 新增 `skills-manager.js` 模块
- 96个精细化分类插件包
- 集成Anthropic官方插件 (18个官方文件)
