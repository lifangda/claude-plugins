# Claude Plugins 插件市场系统说明

## 📦 什么是插件市场系统？

插件市场系统是Claude Plugins项目的**核心配置管理系统**，定义在本目录的 `marketplace.json` 文件中。

**重要**: 插件市场系统**仅包含6种组件类型**，不包含Skills！

## 🎯 插件系统包含的6种组件

| 组件类型 | 数量 | 安装位置 | 说明 |
|---------|------|---------|------|
| **Agents** | 504个 | `.claude/agents/` | 专业代理，提供专业领域能力 |
| **Commands** | 313个 | `.claude/commands/` | 实用命令，执行特定任务 |
| **Workflows** | 16个 | `.claude/workflows/` | 工作流程，自动化流程 |
| **Hooks** | 39个 | `.claude/settings.json` | 钩子配置，事件触发 |
| **MCPs** | 56个 | `.mcp.json` | MCP服务器，外部服务集成 |
| **Output Styles** | 18个 | `.claude/output-styles/` | 输出样式，格式化输出 |
| **总计** | **1038个组件** | - | - |

## 🔌 插件市场的工作原理

### 1. 配置定义 (marketplace.json)

```json
{
  "plugins": [
    {
      "name": "python-development-complete",
      "source": "claude-plugins",
      "version": "1.4.0",
      "agents": ["agents/data-ai/python-pro.md", "..."],
      "commands": ["commands/testing/generate-tests.md", "..."],
      "workflows": ["workflows/tdd-workflow.md"],
      "hooks": ["hooks/git-workflow/pre-commit-tests.json"],
      "mcps": ["mcps/database/postgresql.json"],
      "output-styles": ["output-styles/python-report.json"]
    }
  ]
}
```

### 2. 组件下载流程

当用户执行 `/plugin install python-development-complete@lifangda` 时：

1. **读取配置**: 从marketplace.json读取插件定义
2. **下载组件**: 从GitHub下载每个组件文件
   - 基础URL: `https://raw.githubusercontent.com/lifangda/claude-plugins/main/cli-tool/components/`
   - 示例: `agents/data-ai/python-pro.md` → 下载到 `.claude/agents/python-pro.md`
3. **安装到本地**: 保存到对应的Claude Code配置目录
4. **合并配置**: MCP和Hooks需要合并到现有配置文件

### 3. 目录结构映射

**GitHub源文件结构** (分类组织):
```
cli-tool/components/
├── agents/
│   ├── official/
│   ├── data-ai/
│   ├── development-tools/
│   └── ...
├── commands/
│   ├── official/
│   ├── git-workflow/
│   ├── testing/
│   └── ...
├── workflows/
├── hooks/
├── mcps/
└── output-styles/
```

**用户本地安装结构** (扁平化):
```
.claude/
├── agents/
│   ├── python-pro.md
│   ├── code-reviewer.md
│   └── ...
├── commands/
│   ├── generate-tests.md
│   ├── git-commit.md
│   └── ...
├── workflows/
├── output-styles/
└── settings.json (包含hooks配置)

.mcp.json (包含mcps配置)
```

## 📊 99个精细化插件包

插件市场提供99个不同粒度的插件包：

### 完整包 (2个)
- `claude-plugins-complete` - 所有1038个组件
- `claude-code-official` - 18个Anthropic官方组件

### 功能分类包 (95个)
按组件类型和功能领域细分：
- **Agents分类** (50包): backend-development, data-ai, security, testing-quality...
- **Commands分类** (28包): git-workflow, testing, deployment, documentation...
- **Workflows分类** (1包): workflows-collection
- **Hooks分类** (10包): git-workflow, testing, security, automation...
- **MCPs分类** (10包): database, devtools, web, browser_automation...
- **Output Styles分类** (1包): output-styles-collection

### 经典插件包 (6个)
- `git-workflow` - Git工作流完整工具链
- `supabase-toolkit` - Supabase开发工具包
- `nextjs-vercel-pro` - Next.js + Vercel专业包
- `testing-suite` - 测试完整套件
- `security-pro` - 安全专业包
- `knowledge-wikipedia` - 知识库工具

### 社区精选包 (1个)
- `marketplace-community` - 85个社区精选插件

## ⚠️ 插件系统 vs Skills系统

### ❌ Skills **不属于**插件系统

**关键差异对比**:

| 维度 | 插件系统 | Skills系统 |
|-----|---------|-----------|
| **配置文件** | `.claude-plugin/marketplace.json` | 无 (独立管理) |
| **管理模块** | `cli-tool/src/index.js` | `cli-tool/src/skills-manager.js` |
| **存储位置** | `cli-tool/components/` | `cli-tool/skills-library/` |
| **安装方式** | 从GitHub下载 | 本地文件复制 |
| **安装命令** | `/plugin install <插件包>@lifangda` | `node cli-tool/src/skills-manager.js install <skill-name>` |
| **组件数量** | 1038个组件 (6种类型) | 68个技能包 (独立计数) |
| **适用对象** | Claude Code配置 | Agent知识库 |

### ✅ 正确的表述

**正确** ✅:
- "插件市场包含1038个组件 (Agents、Commands等6种类型)"
- "Skills通过skills-manager独立管理,共68个技能包"
- "项目提供两个独立系统: 插件系统和Skills系统"
- "安装插件: /plugin install xxx@lifangda"
- "安装Skill: node cli-tool/src/skills-manager.js install xxx"

**错误** ❌:
- "插件市场包含Skills" (Skills不在marketplace.json)
- "通过插件市场安装Skills" (Skills不通过插件市场)
- "1106个组件" (不应合并1038+68)
- "一条命令安装所有组件包括Skills" (两个系统独立安装)

## 🛠️ 使用示例

### 安装插件包
```bash
# 通过Claude Code插件市场
/plugin install python-development-complete@lifangda

# 或通过CLI工具
node cli-tool/bin/create-claude-config.js --agent python-pro
node cli-tool/bin/create-claude-config.js --command generate-tests
```

### 查看可用插件
```bash
# 列出所有插件包
node cli-tool/bin/create-claude-config.js --list

# 按类型查看组件
node cli-tool/src/command-stats.js  # 查看Commands统计
node cli-tool/src/hook-stats.js     # 查看Hooks统计
node cli-tool/src/mcp-stats.js      # 查看MCPs统计
```

### 批量安装
```bash
# 安装多个组件
node cli-tool/bin/create-claude-config.js \
  --agent python-pro \
  --agent code-reviewer \
  --command generate-tests \
  --mcp postgresql
```

## 📚 相关文档

- **Skills系统说明**: 详见 `cli-tool/skills-library/README.md`
- **Skills管理器**: 详见 `cli-tool/src/skills-manager.js` 文件顶部注释
- **系统对比文档**: 详见 `docs/SKILLS_VS_PLUGINS_COMPARISON.md`
- **贡献指南**: 详见 `docs/CONTRIBUTOR_GUIDE.md`

## 🔄 维护说明

### 添加新组件到插件市场

1. **创建组件文件**: 在 `cli-tool/components/` 对应分类目录下创建
2. **更新marketplace.json**: 在相���插件包中添加组件路径
3. **验证路径**: 运行路径验证工具确保100%有效
4. **生成统计**: 运行 `python generate_components_json.py`
5. **提交**: 提交到GitHub main分支

### 注意事项

- ⚠️ **绝对不要**在marketplace.json中添加Skills相关路径
- ⚠️ **绝对不要**将Skills混入插件统计数量
- ⚠️ **始终区分**两个系统的独立性
- ✅ 保持路径相对于 `cli-tool/components/` 目录
- ✅ 使用分类子目录组织源文件
- ✅ 安装时扁平化到用户配置目录

---

**最后更新**: 2025-01-XX (v1.4.0)
**维护者**: Claude Plugins Team
