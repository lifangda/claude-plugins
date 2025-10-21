# Agent Skills 使用指南

## 📖 概述

Agent Skills 是 Claude Code 的模块化领域知识系统,提供按需加载的专业技能包。

### 🎯 三级信息披露架构

Skills 采用渐进式信息披露架构,优化token使用:

```
Tier 1: YAML frontmatter (always loaded, ~100 tokens)
├── name: 技能名称
└── description: 技能描述

Tier 2: SKILL.md (overview, ~5K tokens)
├── When to Use This Skill
├── Quick Start
├── Core Concepts (with links to references)
└── Best Practices Summary

Tier 3: references/*.md (on-demand, detailed content)
├── reference1.md (detailed patterns)
├── reference2.md (detailed examples)
└── reference3.md (advanced topics)
```

### ✨ 优化效果

- **Token减少**: 70% reduction (from 15-20K to ~5K per skill)
- **加载速度**: 仅加载overview,详细内容按需获取
- **可维护性**: 模块化组织,易于更新和扩展

## 📦 技能包分类

### 🏗️ 后端开发 (3个)
- **api-design-principles** - RESTful API设计、GraphQL、API版本控制
- **architecture-patterns** - 微服务、事件驱动、CQRS、DDD
- **microservices-patterns** - 服务拆分、通信模式、弹性模式 ⭐已优化

### ⛓️ 区块链Web3 (4个)
- **defi-protocol-templates** - DeFi协议模板和最佳实践
- **nft-standards** - NFT标准(ERC-721、ERC-1155)
- **solidity-security** - Solidity安全模式和审计
- **web3-testing** - Web3测试工具和模式

### 🔄 CI/CD自动化 (4个)
- **deployment-pipeline-design** - 部署流水线设计
- **github-actions-templates** - GitHub Actions模板
- **gitlab-ci-templates** - GitLab CI模板
- **secrets-management** - 密钥管理最佳实践

### ☁️ 云基础设施 (4个)
- **cloud-cost-optimization** - 云成本优化策略
- **hybrid-cloud-patterns** - 混合云架构模式
- **multi-cloud-architecture** - 多云架构设计
- **terraform-modules** - Terraform模块化最佳实践

### 📦 框架迁移 (4个)
- **angular-migration** - Angular迁移指南
- **database-migration** - 数据库迁移模式
- **dependency-upgrade** - 依赖升级策略
- **react-modernization** - React现代化升级

### 💻 JavaScript/TypeScript (4个)
- **javascript-testing-patterns** - Jest/Vitest测试模式 ⭐已优化
- **modern-javascript-patterns** - ES6+现代JS模式 ⭐已优化
- **nodejs-backend-patterns** - Node.js后端架构 ⭐已优化
- **typescript-advanced-types** - TS高级类型系统 ⭐已优化

### ⚙️ Kubernetes运维 (4个)
- **gitops-workflow** - GitOps工作流实践
- **helm-chart-scaffolding** - Helm Chart脚手架
- **k8s-manifest-generator** - K8s清单生成器
- **k8s-security-policies** - K8s安全策略

### 💳 支付处理 (1个)
- **stripe-integration** - Stripe支付集成

### 🐍 Python开发 (3个)
- **async-python-patterns** - asyncio异步模式 ⭐已优化
- **python-testing-patterns** - pytest测试模式 ⭐已优化
- **uv-package-manager** - uv包管理器使用 ⭐已优化

**⭐已优化**: 采用三级架构,token优化完成

## 🚀 安装使用

### 安装整个Skills集合

```bash
/plugin install skills-collection@lifangda
```

### 按需安装单个技能

```bash
# 安装到用户级别 (~/.claude/skills/)
cp -r cli-tool/components/skills/javascript-typescript/modern-javascript-patterns ~/.claude/skills/

# 或者使用符号链接(方便开发)
ln -s $(pwd)/cli-tool/components/skills/javascript-typescript/modern-javascript-patterns ~/.claude/skills/
```

### 验证安装

```bash
# 检查skills目录
ls -la ~/.claude/skills/

# 应该看到类似结构:
# modern-javascript-patterns/
#   ├── SKILL.md
#   └── references/
#       ├── arrow-functions.md
#       ├── destructuring.md
#       └── ...
```

## 💡 使用示例

### 场景1: 学习TypeScript高级类型

1. **查看概览** (自动加载 SKILL.md, ~5K tokens):
   ```
   User: "我想学习TypeScript的高级类型"
   Claude: [加载 typescript-advanced-types/SKILL.md]
            "让我介绍TypeScript的高级类型系统..."
            [显示Quick Start和核心概念]
   ```

2. **深入学习** (按需加载 references):
   ```
   User: "详细讲解泛型"
   Claude: [加载 references/generics.md]
            "让我详细解释TypeScript泛型..."
            [完整的泛型教程和示例]
   ```

3. **实践应用**:
   ```
   User: "如何实现类型安全的API客户端?"
   Claude: [加载 references/advanced-patterns.md]
            "这里是类型安全API客户端的实现..."
            [详细的代码示例]
   ```

### 场景2: 构建异步Python应用

1. **入门** (SKILL.md):
   ```
   User: "如何使用Python asyncio?"
   Claude: [加载 async-python-patterns/SKILL.md]
            "这里是asyncio的快速入门..."
   ```

2. **深入模式** (references):
   ```
   User: "生产者-消费者模式怎么实现?"
   Claude: [加载 references/concurrency-patterns.md]
            "这里是完整的生产者-消费者实现..."
   ```

## 📚 最佳实践

### 1. 渐进式学习

- 先阅读 SKILL.md 了解概览
- 根据需要深入 references 查看详细内容
- 使用Quick Start快速上手

### 2. 按需加载

- 不要一次性加载所有references
- 根据具体问题加载相应reference
- 利用Claude的上下文窗口优势

### 3. 组合使用

```
User: "用TypeScript + Node.js + 异步模式构建API"

Claude可以组合使用:
- typescript-advanced-types (类型系统)
- nodejs-backend-patterns (后端架构)
- async-python-patterns (异步模式 - 概念通用)
```

### 4. 保持更新

```bash
# 定期更新skills
cd ~/.claude/skills/
git pull  # 如果使用git clone

# 或重新安装
/plugin install skills-collection@lifangda --force
```

## 🔧 开发者指南

### 创建新的Skill

1. **创建目录结构**:
```bash
mkdir -p skills/category/skill-name/references
```

2. **创建SKILL.md**:
```markdown
---
name: skill-name
description: Brief description for skill selection
---

# Skill Name

## When to Use This Skill
- Use case 1
- Use case 2

## Quick Start
[Brief examples]

## Core Concepts
[Overview with links to references]

## Best Practices
[Summary]
```

3. **创建references**:
```bash
# 按主题创建reference文件
touch references/topic1.md
touch references/topic2.md
```

4. **遵循三级架构原则**:
- SKILL.md: ~300行, ~5K tokens
- references: 详细内容,按主题拆分
- 链接清晰,便于按需加载

### 贡献Skill

1. Fork仓库
2. 创建新skill分支
3. 按上述结构创建skill
4. 测试token使用量
5. 提交PR

## 📊 性能监控

### 检查Token使用

```bash
# 检查SKILL.md大小
wc -l skills/*/SKILL.md

# 应该控制在 ~300行
# 对应 ~5K tokens
```

### 优化建议

如果SKILL.md超过400行:
1. 将详细示例移到references
2. 简化Quick Start
3. 概念概览仅保留要点
4. 使用链接指向references

## ❓ 常见问题

**Q: Skills和Agents有什么区别?**
A:
- Skills: 领域知识库,提供参考和模式
- Agents: 执行特定任务的专家

**Q: 如何知道该用哪个Skill?**
A: 查看 SKILL.md 的 "When to Use This Skill" 部分

**Q: 可以同时使用多个Skills吗?**
A: 可以,Claude会智能组合相关知识

**Q: Skills会自动更新吗?**
A: 需要手动更新,运行 `/plugin install skills-collection@lifangda --force`

## 🔗 相关资源

- [Claude Code 文档](https://docs.claude.com/en/docs/claude-code)
- [Skills优化总结](SKILLS_OPTIMIZATION_SUMMARY.md)
- [贡献指南](CONTRIBUTING.md)

---

**让AI学习更高效,让开发更智能!** 🚀
