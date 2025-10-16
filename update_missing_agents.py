#!/usr/bin/env python3
"""
批量添加缺失的社区agents到对应的分类插件包中
"""

import json

# 读取marketplace.json
with open(".claude-plugin/marketplace.json", "r", encoding="utf-8") as f:
    marketplace = json.load(f)

# 需要添加的agents映射表
updates = {
    "agents-devops-infrastructure": {
        "add": ["./agents/devops-infrastructure/monitoring-observability-specialist.md"],
        "new_count": 16,  # 15 + 1
        "description": "Devops Infrastructure 专业代理插件包 - 16个专业代理"
    },
    "agents-testing-quality": {
        "add": ["./agents/testing-quality/api-tester.md"],
        "new_count": 6,  # 5 + 1
        "description": "Testing Quality 专业代理插件包 - 6个专业代理"
    },
    "agents-enterprise": {
        "add": [
            "./agents/enterprise/compliance-automation-specialist.md",
            "./agents/enterprise/data-privacy-engineer.md"
        ],
        "new_count": 6,  # 4 + 2
        "description": "Enterprise 专业代理插件包 - 6个专业代理"
    }
}

# 更新插件包
updated = 0
for plugin in marketplace["plugins"]:
    if plugin["name"] in updates:
        update_info = updates[plugin["name"]]

        # 更新描述
        plugin["description"] = update_info["description"]

        # 添加新agents到列表
        existing_agents = set(plugin["agents"])
        for new_agent in update_info["add"]:
            if new_agent not in existing_agents:
                plugin["agents"].append(new_agent)
                updated += 1
                print(f"✓ 添加到 {plugin['name']}: {new_agent}")

# 保存更新后的marketplace.json
with open(".claude-plugin/marketplace.json", "w", encoding="utf-8") as f:
    json.dump(marketplace, f, indent=2, ensure_ascii=False)

print(f"\n成功添加 {updated} 个agents到分类包!")
print("✅ marketplace.json已更新!")
