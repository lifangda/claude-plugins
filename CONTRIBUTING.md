# 🤝 贡献指南

感谢您对 Claude Plugins 项目的关注！我们欢迎社区贡献，无论是代码、文档、测试还是其他形式的贡献。

## 📋 贡献方式

### 🐛 报告问题
如果您发现了bug或有功能请求，请：

1. 查看 [Issues](https://github.com/lifangda/claude-plugins/issues) 确认问题未被报告
2. 创建新的 Issue，包含：
   - 清晰的问题描述
   - 复现步骤
   - 预期行为 vs 实际行为
   - 环境信息（操作系统、Claude版本等）

### 🔧 代码贡献
如果您想贡献代码：

1. **Fork 项目**
   ```bash
   # 克隆您的fork
   git clone https://github.com/您的用户名/claude-plugins.git
   cd claude-plugins
   ```

2. **创建功能分支**
   ```bash
   git checkout -b feature/您的功能名称
   ```

3. **开发您的功能**
   - 遵循现有的代码风格
   - 添加必要的测试
   - 更新相关文档

4. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   ```

5. **推送并创建PR**
   ```bash
   git push origin feature/您的功能名称
   # 然后在GitHub上创建Pull Request
   ```

### 📝 文档贡献
文档贡献包括：

- 改进README.md
- 添加使用示例
- 翻译文档
- 修复拼写错误
- 添加API文档

### 🧪 测试贡献
测试贡献包括：

- 添加单元测试
- 添加集成测试
- 改进测试覆盖率
- 修复测试问题

## 📏 代码规范

### 插件开发规范

#### 代理插件 (Agents)
```markdown
# 插件名称

## 描述
简洁明了的描述，说明插件的功能和用途。

## 功能特性
- 特性1：详细说明
- 特性2：详细说明
- 特性3：详细说明

## 使用场景
- 场景1：何时使用
- 场景2：适用情况
- 场景3：最佳实践

## 示例
```bash
# 使用示例
/your-command
```

## 注意事项
- 重要提醒1
- 重要提醒2
- 重要提醒3
```

#### 命令插件 (Commands)
```markdown
# 命令名称

## 功能
命令的主要功能和用途。

## 参数
- `param1`: 参数1的说明
- `param2`: 参数2的说明

## 示例
```bash
# 基本使用
/command-name param1 param2

# 高级使用
/command-name --option value
```

## 输出
命令的输出格式和内容说明。
```

#### 工作流插件 (Workflows)
```markdown
# 工作流名称

## 概述
工作流的整体描述和目的。

## 步骤
1. **步骤1**: 详细说明
2. **步骤2**: 详细说明
3. **步骤3**: 详细说明

## 输入
- 输入1：说明
- 输入2：说明

## 输出
- 输出1：说明
- 输出2：说明

## 配置
工作流的配置选项和参数。
```

### 文件命名规范

- **代理插件**: `kebab-case.md` (如: `python-pro.md`)
- **命令插件**: `kebab-case.md` (如: `git-commit.md`)
- **工作流插件**: `kebab-case.md` (如: `feature-development.md`)
- **钩子插件**: `kebab-case.json` (如: `auto-git-add.json`)
- **MCP服务器**: `kebab-case.json` (如: `supabase.json`)

### 目录结构规范

```
cli-tool/components/
├── agents/
│   ├── programming-languages/    # 编程语言专家
│   ├── frameworks/              # 框架专家
│   ├── domains/                 # 专业领域专家
│   └── business/                # 业务领域专家
├── commands/
│   ├── automation/              # 自动化工具
│   ├── deployment/              # 部署工具
│   ├── testing/                 # 测试工具
│   └── utilities/               # 实用工具
├── workflows/
├── hooks/
├── mcps/
└── sandbox/
```

## 🔄 提交流程

### 提交信息规范
使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型 (type)**:
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例**:
```
feat(agents): 添加Python开发专家代理
fix(commands): 修复Git工作流命令错误
docs(readme): 更新安装指南
```

### Pull Request 规范

1. **标题**: 清晰描述PR的内容
2. **描述**: 详细说明更改内容
3. **关联Issue**: 如果修复了issue，请关联
4. **测试**: 确保所有测试通过
5. **文档**: 更新相关文档

#### PR模板
```markdown
## 更改描述
简要描述此PR的更改内容。

## 更改类型
- [ ] 新功能
- [ ] Bug修复
- [ ] 文档更新
- [ ] 代码重构
- [ ] 测试更新
- [ ] 其他

## 测试
- [ ] 已测试新功能
- [ ] 已测试现有功能
- [ ] 已更新测试用例

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 已更新相关文档
- [ ] 已添加必要的测试
- [ ] 所有测试通过
```

## 🏷️ 标签系统

我们使用以下标签来分类Issues和PRs：

### Issue标签
- `bug`: 错误报告
- `enhancement`: 功能请求
- `documentation`: 文档相关
- `question`: 问题咨询
- `help-wanted`: 需要帮助
- `good-first-issue`: 适合新手的issue

### PR标签
- `ready-for-review`: 准备审查
- `work-in-progress`: 进行中
- `needs-testing`: 需要测试
- `breaking-change`: 破坏性更改

## 🧪 测试指南

### 运行测试
```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- --grep "特定测试名称"

# 运行测试并生成覆盖率报告
npm run test:coverage
```

### 测试规范
- 每个新功能都应该有对应的测试
- 测试覆盖率应保持在80%以上
- 使用描述性的测试名称
- 测试应该独立且可重复

## 📚 文档指南

### 文档类型
1. **README.md**: 项目主要文档
2. **API文档**: 插件API说明
3. **使用指南**: 详细使用说明
4. **示例**: 代码示例和教程

### 文档规范
- 使用清晰简洁的语言
- 提供完整的示例
- 保持文档更新
- 使用Markdown格式

## 🎯 贡献优先级

我们特别欢迎以下类型的贡献：

### 高优先级
- 🐛 Bug修复
- 📚 文档改进
- 🧪 测试覆盖
- 🔧 性能优化

### 中优先级
- ✨ 新功能
- 🎨 UI/UX改进
- 🌐 国际化支持
- 🔗 集成支持

### 低优先级
- 🎨 代码美化
- 📝 注释改进
- 🗂️ 文件重组

## 🏆 贡献者认可

我们重视每一位贡献者！贡献者将被：

- 在README中列出
- 在发布说明中提及
- 获得贡献者徽章
- 受邀参与项目决策

## 📞 获取帮助

如果您在贡献过程中遇到问题：

1. 查看 [Issues](https://github.com/lifangda/claude-plugins/issues)
2. 在Discussions中提问
3. 联系维护者
4. 查看现有文档

## 📄 许可证

通过贡献代码，您同意您的贡献将在MIT许可证下发布。

## 🙏 感谢

感谢您对Claude Plugins项目的贡献！每一个贡献都让项目变得更好。

---

**让我们一起构建更好的AI开发工具！** 🚀
