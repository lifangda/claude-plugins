# Claude Plugins 贡献者指南

欢迎为Claude Plugins项目做出贡献！本指南将帮助您正确地添加组件、更新文档,并避免常见错误。

## 🎯 核心原则

### ⚠️ 最重要的规则

**永远记住: 项目有两个完全独立的系统!**

1. **插件系统** (Plugin System) - 1038个组件,通过marketplace.json管理
2. **Skills系统** (Skills System) - 68个技能包,独立管理

**在贡献时,必须明确你正在操作的是哪个系统,绝对不要混淆!**

## 📚 开始之前必读

强烈建议先阅读以下文档:

1. **系统对比** (必读 ⭐⭐⭐):
   - `docs/SKILLS_VS_PLUGINS_COMPARISON.md`
   - 理解两个系统的所有差异

2. **插件市场说明** (添加插件组件时必读):
   - `.claude-plugin/MARKETPLACE_README.md`
   - 理解marketplace.json工作原理

3. **Skills库说明** (添加Skills时必读):
   - `cli-tool/skills-library/README.md`
   - 理解Skills三级架构

4. **项目开发指南**:
   - `CLAUDE.md`
   - 理解项目整体架构

## 🔧 贡献类型

### 1. 添加插件组件 (Agents/Commands/Workflows/Hooks/MCPs/Output Styles)

#### 步骤 1: 创建组件文件

**位置**: `cli-tool/components/`

根据组件类型选择正确的分类目录:

```bash
# Agents (47个分类)
cli-tool/components/agents/
├── official/                    # Anthropic官方代理
├── data-ai/                     # 数据与AI
├── development-tools/           # 开发工具
├── devops-infrastructure/       # DevOps基础设施
├── security/                    # 安全
└── ... (其他43个分类)

# Commands (28个分类)
cli-tool/components/commands/
├── official/                    # Anthropic官方命令
├── git-workflow/                # Git工作流
├── testing/                     # 测试
├── deployment/                  # 部署
└── ... (其他24个分类)

# Workflows
cli-tool/components/workflows/

# Hooks (10个分类)
cli-tool/components/hooks/
├── official/
├── git-workflow/
├── testing/
├── security/
└── ... (其他6个分类)

# MCPs (10个分类)
cli-tool/components/mcps/
├── database/
├── devtools/
├── web/
└── ... (其他7个分类)

# Output Styles
cli-tool/components/output-styles/
```

**命名规范**:
- 使用 kebab-case: `python-pro.md`, `generate-tests.md`
- Agents/Commands: `.md` 文件
- Hooks/MCPs/Output Styles: `.json` 文件
- 文件名简洁且描述性强

**示例 - 创建新Agent**:
```bash
# 1. 选择合适的分类目录
cd cli-tool/components/agents/data-ai/

# 2. 创建.md文件
touch rust-expert.md
```

```markdown
# Rust Expert

You are a Rust programming expert specializing in systems programming, performance optimization, and safe concurrency.

## Core Expertise
- Memory safety and ownership
- Async programming with Tokio
- Performance optimization
- ...

## When to Use
Use this agent when working with Rust projects...
```

#### 步骤 2: 更新marketplace.json

**位置**: `.claude-plugin/marketplace.json`

找到或创建合适的插件包,添加组件路径:

```json
{
  "name": "rust-development-complete",
  "source": "claude-plugins",
  "description": "Complete Rust development toolkit",
  "version": "1.4.0",
  "agents": [
    "agents/data-ai/rust-expert.md",      // 新添加的组件
    "agents/data-ai/rust-pro.md"
  ],
  "commands": [
    "commands/testing/rust-test-gen.md"
  ]
}
```

**重要**:
- 路径相对于 `cli-tool/components/` 目录
- 保持分类子目录: `agents/data-ai/rust-expert.md`
- 安装时自动扁平化: `.claude/agents/rust-expert.md`

#### 步骤 3: 验证路径有效性

```bash
# 运行路径验证工具
python generate_components_json.py

# 检查输出,确保:
# - 新组件路径存在
# - 没有路径错误
# - 统计数量正确
```

#### 步骤 4: 测试安装

```bash
# 测试单个组件安装
node cli-tool/bin/create-claude-config.js --agent rust-expert

# 检查:
# - 文件是否正确下载到 .claude/agents/rust-expert.md
# - 内容是否完整
```

#### 步骤 5: 更新文档

**更新组件统计** (如果需要):

在以下文件中更新组件数量:
- `README.md` (关键统计部分)
- `CLAUDE.md` (组件统计部分)
- `CHANGELOG.md` (版本更新记录)

**示例 - README.md更新**:
```markdown
## 核心统计 (v1.4)

**插件系统**:
- 505个Agents (50个分类) ⬅️ 更新: 504 → 505
- 313个Commands (28个分类)
- ...
- 总计: 1039个组件 ⬅️ 更新: 1038 → 1039
```

#### 步骤 6: 提交PR

```bash
git add cli-tool/components/agents/data-ai/rust-expert.md
git add .claude-plugin/marketplace.json
git add README.md CLAUDE.md  # 如果更新了统计
git commit -m "feat(agents): add Rust Expert agent to data-ai category

- Add rust-expert.md to data-ai category
- Update rust-development-complete plugin bundle
- Update component statistics (1038 → 1039)"
git push origin feature/add-rust-expert
```

### 2. 添加Skills技能包

#### 步骤 1: 选择技术领域分类

**位置**: `cli-tool/skills-library/`

���前28个技术领域:
```
├── backend-development/
├── blockchain-web3/
├── cicd-automation/
├── cloud-infrastructure/
├── collaboration-tools/
├── data-analysis/
├── framework-migration/
├── javascript-typescript/
├── knowledge-management/
├── kubernetes-operations/
├── llm-application-dev/
├── media-processing/
├── payment-processing/
├── problem-solving/
├── python-development/
├── security/
├── utilities-automation/
└── ... (其他11个领域)
```

如果需要新分类,请先讨论并获得批准。

#### 步骤 2: 创建Skill目录结构

遵循Anthropic官方三级架构:

```bash
cd cli-tool/skills-library/rust-development/
mkdir rust-async-patterns
cd rust-async-patterns

# 创建基础结构
touch SKILL.md
mkdir references
mkdir scripts
mkdir assets
```

#### 步骤 3: 编写SKILL.md

遵循三级架构模板:

```markdown
---
name: Rust Async Patterns
description: Comprehensive guide to async programming in Rust with Tokio
version: 1.0.0
tags: [rust, async, tokio, concurrency]
category: rust-development
author: Your Name
created: 2025-01-XX
updated: 2025-01-XX
---

# Rust Async Patterns

## When to Use This Skill

Use this skill when:
- Building async applications with Tokio
- Implementing concurrent systems in Rust
- Working with async streams and channels
- Optimizing async performance

## Quick Start

1. **Basic async function**:
   ```rust
   async fn fetch_data() -> Result<Data, Error> {
       // Implementation
   }
   ```

2. **Using Tokio runtime**:
   ```rust
   #[tokio::main]
   async fn main() {
       // Async code
   }
   ```

## Core Concepts

### 1. Async/Await Basics
Learn the fundamentals of async/await syntax in Rust.
📄 See: [references/async-await-basics.md](references/async-await-basics.md)

### 2. Tokio Runtime
Understanding Tokio's async runtime.
📄 See: [references/tokio-runtime.md](references/tokio-runtime.md)

### 3. Async Channels
Communication between async tasks.
📄 See: [references/async-channels.md](references/async-channels.md)

### 4. Error Handling
Best practices for error handling in async code.
📄 See: [references/error-handling.md](references/error-handling.md)

## Best Practices Summary

- Always handle errors properly in async code
- Use bounded channels to prevent memory issues
- Leverage `tokio::select!` for concurrent operations
- Profile async code for performance bottlenecks

## Common Patterns

1. **Request-Response Pattern**: See [references/request-response.md](references/request-response.md)
2. **Background Worker Pattern**: See [references/background-worker.md](references/background-worker.md)
3. **Stream Processing**: See [references/stream-processing.md](references/stream-processing.md)

## Tools & Scripts

- Setup script: [scripts/setup-tokio.sh](scripts/setup-tokio.sh)
- Performance profiler: [scripts/async-profiler.sh](scripts/async-profiler.sh)

## Templates

- Basic async service: [assets/async-service-template.rs](assets/async-service-template.rs)
- Channel example: [assets/channel-example.rs](assets/channel-example.rs)

---

For detailed documentation, see the `references/` directory.
```

#### 步骤 4: 创建Tier 3资源

在 `references/` 目录创建详细文档:

```bash
cd references/

# 创建详细参考文档
touch async-await-basics.md
touch tokio-runtime.md
touch async-channels.md
touch error-handling.md
touch request-response.md
touch background-worker.md
touch stream-processing.md
```

在 `scripts/` 目录创建可执行脚本:

```bash
cd ../scripts/

# 创建辅助脚本
touch setup-tokio.sh
chmod +x setup-tokio.sh

touch async-profiler.sh
chmod +x async-profiler.sh
```

在 `assets/` 目录创建模板:

```bash
cd ../assets/

# 创建代码模板
touch async-service-template.rs
touch channel-example.rs
```

#### 步骤 5: 更新Skills README

**位置**: `cli-tool/skills-library/README.md`

添加新Skill到对应分类:

```markdown
### Rust Development (4个Skills) ⬅️ 更新数量

| Skill名称 | 说明 | 版本 |
|----------|------|------|
| rust-async-patterns | Rust异步编程模式 | 1.0.0 | ⬅️ 新添加
| rust-ownership-patterns | Rust所有权模式 | 1.0.0 |
| rust-error-handling | Rust错误处理 | 1.0.0 |
| rust-performance-optimization | Rust性能优化 | 1.0.0 |
```

更新总计统计:

```markdown
## 📊 Skills统计

- **总计**: 69个Skills ⬅️ 更新: 68 → 69
- **技术领域**: 28个分类
- **文件数量**: 285+ ⬅️ 估算更新
```

#### 步骤 6: 测试安装

```bash
# 测试安装到项目
node cli-tool/src/skills-manager.js install rust-async-patterns --project

# 检查:
# - 目录是否复制到 .claude/skills/rust-async-patterns/
# - SKILL.md和所有resources是否完整
# - 文件权限是否正确 (scripts需要可执行)

# 测试安装到全局
node cli-tool/src/skills-manager.js install rust-async-patterns --global

# 检查:
# - 目录是否复制到 ~/.claude/skills/rust-async-patterns/
```

#### 步骤 7: 提交PR

```bash
git add cli-tool/skills-library/rust-development/rust-async-patterns/
git add cli-tool/skills-library/README.md
git commit -m "feat(skills): add Rust Async Patterns skill

- Add comprehensive async programming guide for Rust
- Include Tokio runtime patterns and best practices
- Add 7 detailed reference documents
- Add setup and profiling scripts
- Add code templates for common patterns
- Update Skills statistics (68 → 69)"
git push origin feature/add-rust-async-skill
```

### 3. 更新文档

#### 文档更新检查清单

**添加插件组件时**:
- [ ] 更新 `.claude-plugin/marketplace.json`
- [ ] 更新 `README.md` (如果数量变化)
- [ ] 更新 `CLAUDE.md` (如果数量变化)
- [ ] 更新 `CHANGELOG.md` (版本发布时)
- [ ] **不要**修改Skills相关文档
- [ ] **不要**修改 `skills-library/` 目录

**添加Skills时**:
- [ ] 更新 `cli-tool/skills-library/README.md`
- [ ] **不要**修改 `marketplace.json`
- [ ] **不要**修改 `README.md` 中的插件统计
- [ ] **不要**修改 `CLAUDE.md` 中的插件统计

#### 术语使用规范

**插件系统相关**:
- ✅ "插件组件"
- ✅ "通过插件市场安装"
- ✅ "1038个组件"
- ✅ "Agents/Commands等6种组件类型"
- ❌ "插件包含Skills"
- ❌ "1106个组件"

**Skills系统相关**:
- ✅ "Skills技能包"
- ✅ "通过skills-manager安装"
- ✅ "68个Skills"
- ✅ "Agent知识库"
- ❌ "通过插件市场安装Skills"
- ❌ "Skills是插件的一种"

**统计数据**:
- ✅ "插件系统: 1038个组件, Skills系统: 68个技能包"
- ✅ "项目提供1038个插件组件和68个Skills"
- ❌ "项目有1106个组件"
- ❌ "总计1106个组件"

## 🔍 PR审查检查点

### 自审检查

提交PR前,请自行检查:

#### 插件组件PR
- [ ] 文件位于 `cli-tool/components/` 正确的分类目录
- [ ] 文件名使用kebab-case
- [ ] 路径已添加到 `marketplace.json`
- [ ] 路径相对于 `components/` 目录
- [ ] 运行过路径验证工具,无错误
- [ ] 测试过安装流程
- [ ] 组件统计已更新 (如需要)
- [ ] **没有**修改Skills相关文件
- [ ] **没有**在文档中混淆Skills和插件

#### Skills PR
- [ ] 目录位于 `cli-tool/skills-library/` 正确的领域分类
- [ ] 包含完整的三级架构 (SKILL.md + references + scripts + assets)
- [ ] SKILL.md包含正确的YAML frontmatter
- [ ] Tier 2内容小于5K tokens
- [ ] Scripts有可执行权限
- [ ] `skills-library/README.md` 已更新
- [ ] 测试过安装流程 (project和global)
- [ ] **没有**修改 `marketplace.json`
- [ ] **没有**修改插件系统统计

#### 文档PR
- [ ] 清晰区分插件系统和Skills系统
- [ ] 使用正确的术语
- [ ] 统计数据分别列出,不混合
- [ ] 安装示例使用正确的命令
- [ ] 没有误导性表述

### 常见拒绝原因

❌ **会被拒绝的PR**:

1. **混淆系统**:
   - 在marketplace.json中添加Skills路径
   - 在Skills目录添加插件组件
   - 文档中混淆两个系统

2. **路径错误**:
   - 使用绝对路径
   - 路径与物理文件不匹配
   - 分类目录错误

3. **统计错误**:
   - 合并插件和Skills统计
   - 更新错误的统计数字
   - 遗漏必要的统计更新

4. **格式错误**:
   - Skills缺少YAML frontmatter
   - Tier 2内容超过5K tokens
   - 文件命名不符合规范

5. **测试不充分**:
   - 未测试安装流程
   - 路径验证失败
   - 功能不完整

## 🧪 测试指南

### 插件组件测试

```bash
# 1. 语法检查
node --check cli-tool/src/index.js

# 2. 路径验证
python generate_components_json.py

# 3. 单组件安装测试
node cli-tool/bin/create-claude-config.js --agent <组件名>

# 4. 批量安装测试
node cli-tool/bin/create-claude-config.js \
  --agent <组件1> \
  --agent <组件2> \
  --command <组件3>

# 5. 检查安装结果
ls -la .claude/agents/
ls -la .claude/commands/
cat .claude/agents/<组件名>.md

# 6. 运行测试套件 (如果有)
npm test
```

### Skills测试

```bash
# 1. 语法检查
node --check cli-tool/src/skills-manager.js

# 2. 列出Skills
node cli-tool/src/skills-manager.js list

# 3. 搜索Skills
node cli-tool/src/skills-manager.js search <关键词>

# 4. 安装到项目
node cli-tool/src/skills-manager.js install <skill-name> --project

# 5. 检查安装结果
ls -la .claude/skills/<skill-name>/
cat .claude/skills/<skill-name>/SKILL.md
ls -la .claude/skills/<skill-name>/references/

# 6. 安装到全局
node cli-tool/src/skills-manager.js install <skill-name> --global

# 7. 检查全局安装
ls -la ~/.claude/skills/<skill-name>/

# 8. 检查脚本权限
ls -la .claude/skills/<skill-name>/scripts/
# 应该看到 -rwxr-xr-x
```

## 📝 Commit Message规范

遵循Conventional Commits规范:

### 插件组件
```
feat(agents): add Python Data Science Expert agent

- Add python-data-science.md to data-ai category
- Update python-development-complete plugin bundle
- Update Agents statistics (504 → 505)
```

```
feat(commands): add Docker Compose Generator command

- Add docker-compose-gen.md to deployment category
- Update devops-toolkit plugin bundle
- Add template generation support
```

### Skills
```
feat(skills): add FastAPI Development Patterns skill

- Add comprehensive FastAPI development guide
- Include async endpoint patterns
- Add dependency injection examples
- Add 5 reference documents and 3 scripts
- Update Skills statistics (68 → 69)
```

### 文档
```
docs: clarify distinction between plugins and skills

- Update README.md to separate system statistics
- Add warning about system independence
- Fix mixed terminology in changelog
```

### 修复
```
fix(marketplace): correct path for security-audit agent

- Fix typo in marketplace.json path
- Update from agents/securityaudit.md to agents/security/security-audit.md
```

## 🚀 发布流程

### 版本升级

遵循语义化版本控制 (Semantic Versioning):

- **Patch** (1.4.0 → 1.4.1): 错误修复,文档更新
- **Minor** (1.4.0 → 1.5.0): 新增组件,新增Skills
- **Major** (1.4.0 → 2.0.0): 破坏性变更,架构重构

```bash
# Patch版本
npm version patch

# Minor版本
npm version minor

# Major版本
npm version major
```

### 发布前检查清单

- [ ] 运行所有测试: `npm test`
- [ ] 路径验证通过: `python generate_components_json.py`
- [ ] 更新 `CHANGELOG.md`
- [ ] 更新 `README.md` 统计数据
- [ ] 更新 `CLAUDE.md` 统计数据
- [ ] Git提交所有变更
- [ ] 创建版本标签: `git tag v1.x.x`
- [ ] 推送到远程: `git push && git push --tags`
- [ ] 发布到npm: `npm publish`

## 🤝 获取帮助

### 文档资源

1. **系统对比**: `docs/SKILLS_VS_PLUGINS_COMPARISON.md`
2. **插件市场**: `.claude-plugin/MARKETPLACE_README.md`
3. **Skills指南**: `cli-tool/skills-library/README.md`
4. **开发指南**: `CLAUDE.md`
5. **纠错计划**: `docs/SKILLS_VS_PLUGINS_CORRECTION_PLAN.md`

### 代码资源

1. **插件管理器**: `cli-tool/src/index.js` (查看文件头部注释)
2. **Skills管理器**: `cli-tool/src/skills-manager.js` (查看文件头部注释)
3. **市场配置**: `.claude-plugin/marketplace.json`

### 问题讨论

如果遇到以下情况,请在GitHub Issues讨论:

- 不确定应该添加插件还是Skill
- 需要创建新的分类目录
- 发现系统混淆的问题
- 有架构改进建议

## 📖 示例PR

### 优秀的插件组件PR示例

```
Title: feat(agents): add Go Microservices Expert agent

Description:
添加Go微服务开发专家Agent,提供微服务架构设计、gRPC通信、服务发现等专业能力。

Changes:
- ✅ 创建 cli-tool/components/agents/development-tools/go-microservices.md
- ✅ 更新 .claude-plugin/marketplace.json
  - 添加到 go-development-complete 插件包
- ✅ 测试安装流程成功
- ✅ 更新 README.md Agents统计 (504 → 505)
- ✅ 更新 CLAUDE.md 组件统计

Testing:
```bash
node cli-tool/bin/create-claude-config.js --agent go-microservices
# ✓ 安装成功到 .claude/agents/go-microservices.md
```

Checklist:
- [x] 路径验证通过
- [x] marketplace.json更新正确
- [x] 统计数据更新
- [x] 没有修改Skills相关文件
- [x] 测试通过
```

### 优秀的Skills PR示例

```
Title: feat(skills): add GraphQL API Design skill

Description:
添加GraphQL API设计技能包,涵盖schema设计、resolver实现、性能优化等内容。

Changes:
- ✅ 创建 cli-tool/skills-library/backend-development/graphql-api-design/
  - SKILL.md (Tier 1 + 2, 4.2K tokens)
  - references/ (6个详细文档)
  - scripts/ (schema-validator.sh, resolver-generator.sh)
  - assets/ (schema-template.graphql, resolver-template.js)
- ✅ 更新 cli-tool/skills-library/README.md
  - 添加到 backend-development 分类
  - 更新统计 (68 → 69)

Testing:
```bash
# 项目级安装
node cli-tool/src/skills-manager.js install graphql-api-design --project
# ✓ 成功安装到 .claude/skills/graphql-api-design/

# 全局级安装
node cli-tool/src/skills-manager.js install graphql-api-design --global
# ✓ 成功安装到 ~/.claude/skills/graphql-api-design/

# 验证脚本权限
ls -la .claude/skills/graphql-api-design/scripts/
# ✓ 脚本有可执行权限
```

Checklist:
- [x] 完整三级架构
- [x] YAML frontmatter正确
- [x] Tier 2 < 5K tokens
- [x] Skills README更新
- [x] 没有修改marketplace.json
- [x] 没有修改插件系统文件
- [x] 测试通过
```

## ⚡ 快速参考

### 目录速查

| 类型 | 源码位置 | 配置文件 | 安装目标 |
|-----|---------|---------|---------|
| Agents | `components/agents/` | `marketplace.json` | `.claude/agents/` |
| Commands | `components/commands/` | `marketplace.json` | `.claude/commands/` |
| Workflows | `components/workflows/` | `marketplace.json` | `.claude/workflows/` |
| Hooks | `components/hooks/` | `marketplace.json` | `.claude/settings.json` |
| MCPs | `components/mcps/` | `marketplace.json` | `.mcp.json` |
| Output Styles | `components/output-styles/` | `marketplace.json` | `.claude/output-styles/` |
| **Skills** | `skills-library/` | **无** | `.claude/skills/` 或 `~/.claude/skills/` |

### 命令速查

```bash
# 插件系统
/plugin install <包名>@lifangda                          # Claude Code安装
node cli-tool/bin/create-claude-config.js --agent <名称> # CLI安装Agent
node cli-tool/bin/create-claude-config.js --command <名称> # CLI安装Command
python generate_components_json.py                       # 路径验证

# Skills系统
node cli-tool/src/skills-manager.js list                # 列出所有Skills
node cli-tool/src/skills-manager.js search <关键词>      # 搜索Skills
node cli-tool/src/skills-manager.js install <名称> --project  # 项目级安装
node cli-tool/src/skills-manager.js install <名称> --global   # 全局级安装
```

### 术语速查

| 正确 ✅ | 错误 ❌ |
|--------|--------|
| "插件系统包含1038个组件" | "插件系统包含1106个组件" |
| "Skills通过skills-manager安装" | "Skills通过插件市场安装" |
| "插件系统包含6种组件类型" | "插件系统包含7种组件类型" |
| "68个Skills技能包" | "68个Skills插件" |
| "两个独立系统" | "统一的组件系统" |

---

**感谢您的贡献! 🎉**

如有问题,请参考文档或在GitHub Issues讨论。

**最后更新**: 2025-01-XX (v1.4.0)
**维护者**: Claude Plugins Team
