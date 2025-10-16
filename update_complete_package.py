#!/usr/bin/env python3
"""
更新claude-plugins-complete完整包,添加新整合的文件
"""

import json

# 读取marketplace.json
with open(".claude-plugin/marketplace.json", "r", encoding="utf-8") as f:
    marketplace = json.load(f)

# 需要添加到完整包的新文件 (7个agents + 2个commands)
new_files = {
    "agents": [
        "./agents/devops-infrastructure/monitoring-observability-specialist.md",
        "./agents/testing-quality/api-tester.md",
        "./agents/enterprise/compliance-automation-specialist.md",
        "./agents/enterprise/data-privacy-engineer.md"
    ],
    "commands": [
        "./commands/git-workflow/code-review-assistant.md",
        "./commands/git-workflow/github-issue-fix.md"
    ]
}

# 更新完整包
for plugin in marketplace["plugins"]:
    if plugin["name"] == "claude-plugins-complete":
        added_agents = 0
        added_commands = 0

        # 添加agents
        existing_agents = set(plugin["agents"])
        for agent in new_files["agents"]:
            if agent not in existing_agents:
                plugin["agents"].append(agent)
                added_agents += 1
                print(f"✓ 添加agent: {agent}")

        # 添加commands
        existing_commands = set(plugin["commands"])
        for command in new_files["commands"]:
            if command not in existing_commands:
                plugin["commands"].append(command)
                added_commands += 1
                print(f"✓ 添加command: {command}")

        # 统计
        total_agents = len(plugin["agents"])
        total_commands = len(plugin["commands"])
        total_workflows = len(plugin.get("workflows", []))
        total_hooks = len(plugin.get("hooks", []))
        total_mcps = len(plugin.get("mcps", []))

        # 更新描述
        plugin["description"] = f"完整的Claude插件生态系统:{total_agents}个AI代理、{total_commands}个开发命令、{total_workflows}个工作流、{total_hooks}个自动化钩子、{total_mcps}个MCP服务器,一条命令即可安装使用"

        print(f"\n已更新描述: {plugin['description']}")
        print(f"成功添加 {added_agents} 个agents, {added_commands} 个commands!")
        break

# 保存更新后的marketplace.json
with open(".claude-plugin/marketplace.json", "w", encoding="utf-8") as f:
    json.dump(marketplace, f, indent=2, ensure_ascii=False)

print("\n✅ marketplace.json已更新!")
