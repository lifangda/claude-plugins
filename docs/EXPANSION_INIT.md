# 扩充初始化指南（Plugins 与 Skills）

目标：在继续从网上扩充前，确保不混淆、不过度设计、不重复添加。

核心边界（请严格遵守）：
- Plugins（插件）：以存在 `.claude-plugin/plugin.json` 的目录为准；包含 agents、commands、hooks、MCP 等组件；通过 `/plugin install ...` 管理与安装。
- Skills（技能）：以 `SKILL.md` 为准；已迁移并独立管理于 `cli-tool/skills-library/`（详见 README 的 v1.2 重构说明）。Skills 不包含在插件包内。

目录规范：
- 新增 Skills 仅放入 `cli-tool/skills-library/**`（或临时集成 `temp_integration/v1.4_skills/**`）。禁止在任何插件目录内出现 `SKILL.md`。
- 新增 Plugins 必须包含 `.claude-plugin/plugin.json`，并且不应出现在 `cli-tool/skills-library/**` 下（避免与 Skills 混放）。

命名规范：
- 使用 kebab-case（例如：`code-reviewer`, `markdown-to-epub`）。
- 名称需全局唯一；避免与现有 Skills 名称或 Plugins 名称冲突。

重复与混淆的判定：
- 重复：同名的 Skill（`SKILL.md` 父目录名相同）或同名的 Plugin（`.claude-plugin` 父目录名相同）。
- 混淆：在插件目录内出现 `SKILL.md`，或在 Skills 目录内出现 `.claude-plugin/plugin.json`。

验证工具：
- 运行 `bash "scripts/validate-expansion.sh"` 查看现有数量、重复项与混淆警报。

扩充流程（KISS & YAGNI）：
1) 明确来源：仅收集当前需要的、无重复的 Skills 或 Plugins。
2) 放置到正确目录并遵守命名规范。
3) 运行验证脚本，确认无重复与混淆。
4) 更新对应 README 或索引清单（必要时），避免过度变更。

参考要点（来自项目文档）：
- README 指出：Skills 独立管理，已迁移到 `cli-tool/skills-library/`，不包含在插件包内。
- 插件包支持 `marketplace` 与社区来源，但请保持组件类型边界清晰。

原则落实：
- KISS：仅保留必需的初始化与校验步骤，避免复杂流程。
- YAGNI：不引入额外的模板或自动化，按需扩充与校验。
- DRY：统一通过一个脚本进行数量统计与重复/混淆检测。
- SOLID：脚本单一职责，文档负责规则说明，后续扩充工具可独立演进。

