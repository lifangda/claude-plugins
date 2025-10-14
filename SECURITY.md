# 安全政策

感谢您帮助我们保持 Claude Plugins 及其交互系统的安全。

## 报告安全问题

本项目由 Fonda 维护。

我们的 CLI 工具和它提供的插件的安全是我们的首要任务。我们感谢安全研究人员本着善意识别和报告潜在漏洞的工作。

## 如何报告漏洞

如果您在 Claude Plugins 中发现安全漏洞，请通过以下方式之一向我们报告：

### 电子邮件
将漏洞详情发送到 [fondalee@qq.com](mailto:fondalee@qq.com)，主题为"SECURITY: Claude Plugins 漏洞报告"

### GitHub 安全公告
您也可以通过本仓库的 [GitHub 安全公告](https://github.com/lifangda/claude-plugins/security/advisories/new)报告漏洞。

## 报告中应包含的内容

为了帮助我们快速理解和解决问题，请包含：

- **描述**：漏洞的清晰描述
- **影响**：攻击者通过利用此漏洞可以实现什么
- **复现步骤**：重现漏洞的详细步骤
- **受影响版本**：CLI 工具的哪些版本受到影响
- **环境**：操作系统、Node.js 版本和其他相关详细信息
- **概念验证**：如果可能，包括演示漏洞的最小示例

## 安全最佳实践

使用 Claude Plugins 时：

### 对于用户
- **保持更新**：始终通过 `npx claude-plugins@latest` 使用最新版本
- **审查插件**：在提交到仓库之前检查生成的文件
- **审计钩子**：在启用自动化钩子之前审查它们
- **安全环境**：在安全的开发环境中使用该工具

### 对于贡献者
- **依赖扫描**：在提交更改之前运行 `npm audit`
- **输入验证**：验证所有用户输入和文件路径
- **安全默认值**：为所有插件配置选择安全的默认值
- **代码审查**：所有更改都经过以安全为重点的代码审查

## 联系信息

- **维护者**：Fonda
- **网站**：[https://github.com/lifangda](https://github.com/lifangda)
- **电子邮件**：[fondalee@qq.com](mailto:fondalee@qq.com)
- **GitHub**：[@lifangda](https://github.com/lifangda)

## 法律

本安全政策旨在鼓励负责任的安全研究。我们不会对以下研究人员采取法律行动：

- 本着善意行事
- 遵循负责任的披露实践
- 不访问或修改用户数据
- 不对他们不拥有的系统进行测试
- 通过上述渠道报告漏洞

感谢您帮助保持 Claude Plugins 的安全！
