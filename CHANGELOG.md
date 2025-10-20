# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2025-10-17

### 🎉 Major Changes
- 🚀 **Agent Skills三级架构优化** - 采用渐进式信息披露架构,优化token使用
- 📉 **Token使用大幅降低** - Skills文件token减少70% (从150K降至45K)
- 📁 **Skills文件拆分完成** - 9个最大Skills文件拆分为SKILL.md + references
- 📚 **新增使用指南** - SKILLS_GUIDE.md和SKILLS_OPTIMIZATION_SUMMARY.md

### ✨ Added
- 🏗️ **三级架构系统**:
  - Tier 1: YAML frontmatter (always loaded, ~100 tokens)
  - Tier 2: SKILL.md (overview, ~5K tokens)
  - Tier 3: references/*.md (on-demand loading)
- 📄 **83个新文件创建**:
  - 9个优化的SKILL.md文件 (每个~250-300行)
  - 74个references文件 (详细内容按需加载)
- 📖 **文档更新**:
  - SKILLS_GUIDE.md - Agent Skills使用指南
  - SKILLS_OPTIMIZATION_SUMMARY.md - 优化工作总结

### 🔧 Changed - Skills Architecture
**已优化的Skills (9个):**

1. **javascript-testing-patterns** (1025行)
   - SKILL.md: 262行
   - references: 5个 (unit-testing, mocking, integration-testing, frontend-testing, test-utilities)
   - Token优化: ~20K → ~5K

2. **nodejs-backend-patterns** (1020行)
   - SKILL.md: 250行
   - references: 6个 (architecture, middleware, error-handling, database, auth, caching)
   - Token优化: ~20K → ~5K

3. **python-testing-patterns** (907行)
   - SKILL.md: 268行
   - references: 8个 (unit-testing, fixtures, parameterization, mocking, async-testing, property-based, database-testing, best-practices, ci-cd)
   - Token优化: ~18K → ~5K

4. **modern-javascript-patterns** (911行)
   - SKILL.md: 268行
   - references: 10个 (arrow-functions, destructuring, spread-rest, promises, async-await, functional-programming, higher-order-functions, modern-operators, classes-modules, iterators-generators, performance)
   - Token优化: ~18K → ~5K

5. **uv-package-manager** (831行)
   - SKILL.md: 280行
   - references: 9个 (getting-started, virtual-environments, package-management, python-management, lockfiles, ci-cd, docker, performance, workflows, migration)
   - Token优化: ~16K → ~5K

6. **typescript-advanced-types** (717行)
   - SKILL.md: ~250行
   - references: 8个 (generics, conditional-types, mapped-types, template-literals, utility-types, advanced-patterns, type-inference, best-practices, common-pitfalls)
   - Token优化: ~14K → ~5K

7. **async-python-patterns** (694行)
   - SKILL.md: ~270行
   - references: 9个 (core-concepts, basic-patterns, error-handling, timeouts-cancellation, advanced-patterns, concurrency-patterns, synchronization, real-world-apps, performance, common-pitfalls, testing)
   - Token优化: ~13K → ~5K

8. **microservices-patterns** (585行)
   - SKILL.md: ~250行
   - references: 9个 (service-decomposition, communication-patterns, saga-pattern, resilience-patterns, api-gateway, event-driven, data-management, best-practices, common-pitfalls)
   - Token优化: ~12K → ~5K

### 📁 Directory Structure
```
skills/
├── javascript-typescript/
│   ├── javascript-testing-patterns/
│   ├── nodejs-backend-patterns/
│   ├── modern-javascript-patterns/
│   └── typescript-advanced-types/
├── python-development/
│   ├── python-testing-patterns/
│   ├── uv-package-manager/
│   └── async-python-patterns/
└── backend-development/
    └── microservices-patterns/
```

### 🎯 Performance Improvements
- **Token减少**: 70% reduction for optimized skills
- **加载速度**: 仅加载SKILL.md overview,详细内容按需获取
- **可维护性**: 模块化references,易于更新和扩展

### 📊 Statistics
- **优化文件**: 9个 (所有800+行大文件)
- **新创建文件**: 83个 (9 SKILL.md + 74 references)
- **Token优化**: 150K → 45K (for SKILL.md files)
- **剩余Skills**: 22个 (均<600行,保持原状)

### 📝 Documentation
- SKILLS_GUIDE.md - 完整使用指南
- SKILLS_OPTIMIZATION_SUMMARY.md - 优化工作总结
- CLAUDE.md - 新增Agent Skills三级架构章节

## [1.1.0] - 2025-10-16

### 🎉 Major Changes
- 🔄 **重构marketplace.json配置** - 从集合式插件包改为基于目录结构的分类插件包
- ✅ **路径有效性提升** - 从18%提升到100% (修复837个无效路径)
- 📦 **插件包优化** - 从167个集合式插件包优化为97个精细化分类插件包
- 🎯 **Anthropic官方插件集成** - 新增claude-code-official官方插件包 (18个官方文件)
- 🧠 **Agent Skills知识库整合** - 新增31个模块化领域知识包 ✨

### ✨ Added
- 📊 **新增诊断分析工具** - 自动检测配置完整性和路径有效性
- 📋 **新增完整性验证机制** - 确保所有配置与物理文件同步
- 🎯 **按需安装支持** - 用户可按功能分类安装特定插件包
- 🧠 **Agent Skills组件** - 31个专业技能包,覆盖9个核心技术领域
  - Backend Development (3个): API设计、架构模式、微服务
  - Blockchain Web3 (4个): DeFi、NFT、智能合约安全
  - CI/CD Automation (4个): 部署流水线、GitHub Actions、GitLab CI
  - Cloud Infrastructure (4个): 成本优化、混合云、多云架构、Terraform
  - Framework Migration (4个): Angular/React/Database迁移
  - JavaScript/TypeScript (4个): 现代JS模式、Node.js后端、TS高级类型
  - Kubernetes Operations (4个): GitOps、Helm、K8s清单生成
  - Payment Processing (1个): Stripe集成
  - Python Development (3个): 异步模式、测试模式、uv包管理器
- 📦 **skills-collection插件包** - 一键安装所有Agent Skills
- 📖 **整合文档** - WSHOBSON_SKILLS_INTEGRATION_REPORT.md, WSHOBSON_GAP_ANALYSIS.md

### 🔧 Changed
- 📁 **目录结构重组** - agents和commands按功能分类组织
- 🔗 **路径格式统一** - 所有路径使用相对于components的格式
- 📖 **文档更新** - README.md、CLAUDE.md统计数据完全同步
- 📊 **新增skills目录** - cli-tool/components/skills/,包含9个分类子目录

### 🐛 Fixed
- 🐛 **修复837个无效路径** - 所有配置路径现在100%有效
- 🐛 **修复agents根目录散乱** - 77个文件已按功能分类整理
- 🐛 **修复配置不一致** - marketplace.json完全同步物理目录结构
- 🐛 **填补Skills空白** - wshobson/agents仓库查漏补缺,新增31个Agent Skills

### 📊 Statistics
- **Agents**: 280个 (47个分类,包含10个官方代理)
- **Commands**: 306个 (28个分类,包含6个官方命令)
- **Workflows**: 16个
- **Hooks**: 39个 (10个分类,包含1个官方安全钩子)
- **MCPs**: 56个 (10个分类)
- **Output Styles**: 18个
- **Agent Skills**: 31个 (9个分类) ✨新增
- **Sandbox**: 2个
- **总组件**: 748个
- **总文件**: 833个
- **插件包**: 97个

### 🎯 Installation
```bash
# 完整安装 (748个组件)
/plugin install claude-plugins-complete@lifangda

# Anthropic官方插件包
/plugin install claude-code-official@lifangda

# Agent Skills技能包 ✨新增
/plugin install skills-collection@lifangda

# 分类安装
/plugin install agents-data-ai@lifangda
/plugin install commands-testing@lifangda
/plugin install mcps-database@lifangda
```

### 🔗 Integration Sources
- **Anthropic官方**: [anthropics/claude-code](https://github.com/anthropics/claude-code)
- **Agent Skills**: [wshobson/agents](https://github.com/wshobson/agents) (查漏补缺)
- **社区精选**: [ananddtyagi/claude-code-marketplace](https://github.com/ananddtyagi/claude-code-marketplace)
- **Output Styles**: [ccoutputstyles/ccoutputstyles](https://github.com/ccoutputstyles/ccoutputstyles)
- **企业命令**: [ccplugins-com/ccplugins](https://github.com/ccplugins-com/ccplugins)

### 📝 Reports
- WSHOBSON_SKILLS_INTEGRATION_REPORT.md - Agent Skills整合完整报告
- WSHOBSON_GAP_ANALYSIS.md - wshobson/agents查漏补缺分析
- INTEGRATED_SOURCES.md - 已整合仓库过滤清单

## [1.0.0] - 2025-10-13

### 🎉 Initial Release
- 🚀 **首次发布** - 完整的Claude插件生态系统
- 📦 **763个文件** - 涵盖所有开发领域
- ✅ **官方规范** - 符合Claude Code插件市场标准
- 🔧 **即装即用** - 一条命令安装所有插件
