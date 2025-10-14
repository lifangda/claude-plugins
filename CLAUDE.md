# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Claude Plugins 是一个 Node.js CLI 工具,用于管理和安装 Claude Code 配置组件。项目包含 600+ 个组件:249个AI代理、252个命令、15个工作流、40个钩子、55个MCP服务器和3个沙盒环境。

**核心功能:**
- 组件安装系统 (agents, commands, mcps, settings, hooks)
- Claude Code 插件市场配置
- 实时分析仪表板
- E2B 沙盒执行环境

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

## 核心架构

### 1. CLI 入口系统 (`cli-tool/bin/create-claude-config.js` 和 `cli-tool/src/index.js`)

**主要功能流程:**
- `showMainMenu()` - 交互式主菜单 (Analytics, Chats, Agents, Setup, Health Check)
- `createClaudeConfig()` - 核心配置创建函数
- 组件安装函数: `installIndividualAgent()`, `installIndividualCommand()`, `installIndividualMCP()`, `installIndividualSetting()`, `installIndividualHook()`
- `installMultipleComponents()` - 批量组件安装,支持共享安装位置选择
- `executeSandbox()` - E2B 沙盒执行环境

**关键特性:**
- 所有组件从 GitHub main 分支下载: `https://raw.githubusercontent.com/lifangda/claude-plugins/main/cli-tool/components/`
- 支持分类路径 (如 `security/api-security-audit`) 和直接路径 (如 `python-pro`)
- Settings 和 Hooks 支持多位置安装: user (~/.claude), project (.claude), local (.claude/settings.local.json), enterprise

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

**Statusline 特殊处理:**
- Statusline 组件 (如 `statusline/context-monitor`) 会同时下载 JSON 配置和对应的 Python 脚本
- Python 脚本安装到 `.claude/scripts/` 目录
- 代码位置: `cli-tool/src/index.js:installIndividualSetting()` 行 603-654

**MCP 配置合并:**
- 自动移除 `description` 字段避免配置冗余
- 深度合并 `mcpServers` 对象保留现有配置
- 代码位置: `cli-tool/src/index.js:installIndividualMCP()` 行 517-601

### 3. 插件市场系统 (`.claude-plugin/marketplace.json`)

**结构:**
- 定义 600+ 个插件包的元数据
- 每个插件包含: name, source, description, version, agents[], commands[], workflows[], hooks[], mcps[]
- 支持 Claude Code 插件市场规范

**核心插件包:**
- `claude-plugins-complete` - 完整 614 个组件
- `git-workflow` - Git 工作流自动化
- `supabase-toolkit` - 完整 Supabase 工作流
- `nextjs-vercel-pro` - Next.js/Vercel 开发工具
- `testing-suite` - 全面测试工具包
- `security-pro` - 企业安全工具包
- `knowledge-wikipedia` - 维基百科知识库集成

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
- 组件按类别组织 (如 `agents/security/`, `commands/testing/`)
- 安装时自动提取类别和文件名
- 安装到扁平目录结构 (agents/, commands/ 等)

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

## 组件生成

**生成组件目录:**
```bash
python generate_components_json.py
```
- 扫描所有组件目录
- 排除 `.py` 文件 (作为后台依赖)
- 生成 `docs/components.json`

## 发布前检查清单

1. 所有测试通过: `npm test`
2. 组件目录已更新: `python generate_components_json.py`
3. 无硬编码路径或敏感信息
4. 版本号已更新
5. Git 提交包含所有相关文件

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
