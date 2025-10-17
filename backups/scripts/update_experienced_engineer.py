#!/usr/bin/env python3
"""
更新marketplace.json以包含experienced-engineer插件的新文件
"""

import json

# 读取marketplace.json
with open(".claude-plugin/marketplace.json", "r", encoding="utf-8") as f:
    marketplace = json.load(f)

# 新增的文件
new_files = {
    "agents": [
        "./agents/architecture/api-architect.md",
        "./agents/testing-quality/code-quality-reviewer.md",
        "./agents/documentation/documentation-writer.md",
        "./agents/security/security-specialist.md",
        "./agents/development-tools/tech-lead.md",
        "./agents/testing-quality/testing-specialist.md",
        "./agents/design-creative/ux-ui-designer.md"
    ],
    "commands": [
        "./commands/utilities/update-claude.md"
    ]
}

# 需要更新的分类包
package_updates = {
    "agents-architecture": {
        "add": ["./agents/architecture/api-architect.md"],
        "description_template": "Architecture 专业代理插件包 - {count}个专业代理"
    },
    "agents-testing-quality": {
        "add": [
            "./agents/testing-quality/code-quality-reviewer.md",
            "./agents/testing-quality/testing-specialist.md"
        ],
        "description_template": "Testing Quality 专业代理插件包 - {count}个专业代理"
    },
    "agents-documentation": {
        "add": ["./agents/documentation/documentation-writer.md"],
        "description_template": "Documentation 专业代理插件包 - {count}个专业代理"
    },
    "agents-security": {
        "add": ["./agents/security/security-specialist.md"],
        "description_template": "Security 专业代理插件包 - {count}个专业代理"
    },
    "agents-development-tools": {
        "add": ["./agents/development-tools/tech-lead.md"],
        "description_template": "Development Tools 专业代理插件包 - {count}个专业代理"
    },
    "agents-design-creative": {
        "add": ["./agents/design-creative/ux-ui-designer.md"],
        "description_template": "Design Creative 专业代理插件包 - {count}个专业代理"
    },
    "commands-utilities": {
        "add": ["./commands/utilities/update-claude.md"],
        "description_template": "Utilities 命令工具包 - {count}个专业命令"
    }
}

updated_packages = 0
added_agents = 0
added_commands = 0

print("=" * 60)
print("更新分类插件包")
print("=" * 60)

# 更新各个分类包
for plugin in marketplace["plugins"]:
    if plugin["name"] in package_updates:
        update_info = package_updates[plugin["name"]]

        for new_item in update_info["add"]:
            # 检查是否已存在
            target_list = plugin.get("agents", []) if "agents" in plugin["name"] else plugin.get("commands", [])

            if new_item not in target_list:
                target_list.append(new_item)
                if "agents" in plugin["name"]:
                    added_agents += 1
                else:
                    added_commands += 1
                print(f"✓ 添加到 {plugin['name']}: {new_item}")

        # 更新描述
        count = len(plugin.get("agents", [])) if "agents" in plugin["name"] else len(plugin.get("commands", []))
        plugin["description"] = update_info["description_template"].format(count=count)
        updated_packages += 1

print(f"\n更新了 {updated_packages} 个分类包")

# 更新完整包
print("\n" + "=" * 60)
print("更新完整插件包")
print("=" * 60)

for plugin in marketplace["plugins"]:
    if plugin["name"] == "claude-plugins-complete":
        # 添加agents
        for agent in new_files["agents"]:
            if agent not in plugin["agents"]:
                plugin["agents"].append(agent)
                print(f"✓ 添加agent: {agent}")

        # 添加commands
        for command in new_files["commands"]:
            if command not in plugin["commands"]:
                plugin["commands"].append(command)
                print(f"✓ 添加command: {command}")

        # 统计并更新描述
        total_agents = len(plugin["agents"])
        total_commands = len(plugin["commands"])
        total_workflows = len(plugin.get("workflows", []))
        total_hooks = len(plugin.get("hooks", []))
        total_mcps = len(plugin.get("mcps", []))

        plugin["description"] = f"完整的Claude插件生态系统:{total_agents}个AI代理、{total_commands}个开发命令、{total_workflows}个工作流、{total_hooks}个自动化钩子、{total_mcps}个MCP服务器,一条命令即可安装使用"

        print(f"\n已更新完整包描述:")
        print(f"  - Agents: {total_agents}")
        print(f"  - Commands: {total_commands}")
        break

# 更新metadata
marketplace["metadata"]["description"] = f"完整的Claude插件生态系统：{total_agents}个专业代理、{total_commands}个开发命令、{total_workflows}个工作流、{total_hooks}个钩子、{total_mcps}个MCP服务器，专业化分类，即装即用"

print(f"\n已更新metadata描述")

# 保存
with open(".claude-plugin/marketplace.json", "w", encoding="utf-8") as f:
    json.dump(marketplace, f, indent=2, ensure_ascii=False)

print("\n" + "=" * 60)
print("✅ marketplace.json更新完成!")
print(f"新增: {added_agents} agents, {added_commands} commands")
print("=" * 60)
