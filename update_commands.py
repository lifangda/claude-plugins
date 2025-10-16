#!/usr/bin/env python3
"""
添加2个社区commands到git-workflow插件包
"""

import json

# 读取marketplace.json
with open(".claude-plugin/marketplace.json", "r", encoding="utf-8") as f:
    marketplace = json.load(f)

# 需要添加的commands
new_commands = [
    "./commands/git-workflow/code-review-assistant.md",
    "./commands/git-workflow/github-issue-fix.md"
]

# 更新git-workflow包
for plugin in marketplace["plugins"]:
    if plugin["name"] == "commands-git-workflow":
        # 检查是否已存在
        existing = set(plugin["commands"])
        added = 0

        for cmd in new_commands:
            if cmd not in existing:
                plugin["commands"].append(cmd)
                added += 1
                print(f"✓ 添加到 commands-git-workflow: {cmd}")

        # 更新描述中的数量
        current_count = len(plugin["commands"])
        plugin["description"] = f"Git Workflow 命令工具包 - {current_count}个专业命令"
        print(f"\n已更新描述: {plugin['description']}")
        print(f"成功添加 {added} 个commands!")
        break

# 保存更新后的marketplace.json
with open(".claude-plugin/marketplace.json", "w", encoding="utf-8") as f:
    json.dump(marketplace, f, indent=2, ensure_ascii=False)

print("\n✅ marketplace.json已更新!")
