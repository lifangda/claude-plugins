# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-10-13

### 🎉 Major Changes
- 🔄 **重构marketplace.json配置** - 从集合式插件包改为基于目录结构的分类插件包
- ✅ **路径有效性提升** - 从18%提升到100% (修复837个无效路径)
- 📦 **插件包优化** - 从167个集合式插件包优化为94个精细化分类插件包

### ✨ Added
- 📊 **新增诊断分析工具** - 自动检测配置完整性和路径有效性
- 📋 **新增完整性验证机制** - 确保所有配置与物理文件同步
- 🎯 **按需安装支持** - 用户可按功能分类安装特定插件包

### 🔧 Changed
- 📁 **目录结构重组** - agents和commands按功能分类组织
- 🔗 **路径格式统一** - 所有路径使用相对于components的格式
- 📖 **文档更新** - README.md统计数据完全同步

### 🐛 Fixed
- 🐛 **修复837个无效路径** - 所有配置路径现在100%有效
- 🐛 **修复agents根目录散乱** - 77个文件已按功能分类整理
- 🐛 **修复配置不一致** - marketplace.json完全同步物理目录结构

### 📊 Statistics
- **Agents**: 269个 (46个分类)
- **Commands**: 275个 (27个分类)  
- **Workflows**: 16个
- **Hooks**: 39个 (9个分类)
- **MCPs**: 56个 (10个分类)
- **Sandbox**: 2个 (1个分类)
- **总组件**: 657个
- **总文件**: 737个

### 🎯 Installation
```bash
# 完整安装
/plugin install claude-plugins-complete@lifangda

# 分类安装
/plugin install agents-data-ai@lifangda
/plugin install commands-testing@lifangda
/plugin install mcps-database@lifangda
```

## [1.0.0] - 2025-10-13

### 🎉 Initial Release
- 🚀 **首次发布** - 完整的Claude插件生态系统
- 📦 **763个文件** - 涵盖所有开发领域
- ✅ **官方规范** - 符合Claude Code插件市场标准
- 🔧 **即装即用** - 一条命令安装所有插件
