#!/usr/bin/env python3
"""
从ccplugins提取12个新插件并整合到项目中
"""

import os
import shutil
import json

# 源目录
SOURCE_DIR = "/tmp/awesome-claude-code-plugins/plugins"
# 目标目录
TARGET_DIR = "cli-tool/components"

# 12个需要整合的插件及其分类
plugins = {
    # Anthropic官方插件 (4个)
    "agent-sdk-dev": {"type": "official", "has_agents": True, "has_commands": True},
    "pr-review-toolkit": {"type": "official", "has_agents": True, "has_commands": True},
    "commit-commands": {"type": "official", "has_agents": False, "has_commands": True},
    "security-guidance": {"type": "official", "has_agents": False, "has_hooks": True},

    # 社区优质插件 (8个)
    "monitoring-observability-specialist": {"type": "agents/devops-infrastructure"},
    "api-tester": {"type": "agents/testing-quality"},
    "code-review-assistant": {"type": "commands/git-workflow"},
    "database-performance-optimizer": {"type": "agents/database"},
    "ui-designer": {"type": "agents/design-creative"},
    "github-issue-fix": {"type": "commands/git-workflow"},
    "compliance-automation-specialist": {"type": "agents/enterprise"},
    "data-privacy-engineer": {"type": "agents/enterprise"}
}

stats = {"agents": 0, "commands": 0, "hooks": 0, "errors": []}

for plugin_name, config in plugins.items():
    plugin_path = os.path.join(SOURCE_DIR, plugin_name)

    if not os.path.exists(plugin_path):
        stats["errors"].append(f"插件不存在: {plugin_name}")
        continue

    print(f"\n处理插件: {plugin_name}")

    # 处理agents
    agents_path = os.path.join(plugin_path, "agents")
    if os.path.exists(agents_path):
        agent_files = [f for f in os.listdir(agents_path) if f.endswith(".md")]
        for agent_file in agent_files:
            source = os.path.join(agents_path, agent_file)

            # 确定目标目录
            if config.get("type") == "official":
                target_dir = os.path.join(TARGET_DIR, "official/agents")
            else:
                target_dir = os.path.join(TARGET_DIR, config["type"])

            os.makedirs(target_dir, exist_ok=True)
            target = os.path.join(target_dir, agent_file)

            # 复制文件
            shutil.copy2(source, target)
            stats["agents"] += 1
            print(f"  ✓ 复制 agent: {agent_file} -> {target_dir}")

    # 处理commands
    commands_path = os.path.join(plugin_path, "commands")
    if os.path.exists(commands_path):
        command_files = [f for f in os.listdir(commands_path) if f.endswith(".md")]
        for command_file in command_files:
            source = os.path.join(commands_path, command_file)

            # 确定目标目录
            if config.get("type") == "official":
                target_dir = os.path.join(TARGET_DIR, "official/commands")
            else:
                target_dir = os.path.join(TARGET_DIR, config["type"])

            os.makedirs(target_dir, exist_ok=True)
            target = os.path.join(target_dir, command_file)

            # 复制文件
            shutil.copy2(source, target)
            stats["commands"] += 1
            print(f"  ✓ 复制 command: {command_file} -> {target_dir}")

    # 处理hooks
    hooks_path = os.path.join(plugin_path, "hooks")
    if os.path.exists(hooks_path):
        hook_files = [f for f in os.listdir(hooks_path) if f.endswith(".json")]
        for hook_file in hook_files:
            source = os.path.join(hooks_path, hook_file)

            # hooks放到official目录
            target_dir = os.path.join(TARGET_DIR, "official/hooks")
            os.makedirs(target_dir, exist_ok=True)
            target = os.path.join(target_dir, hook_file)

            # 复制文件
            shutil.copy2(source, target)
            stats["hooks"] += 1
            print(f"  ✓ 复制 hook: {hook_file} -> {target_dir}")

print("\n" + "="*50)
print("整合完成!")
print(f"新增 agents: {stats['agents']}")
print(f"新增 commands: {stats['commands']}")
print(f"新增 hooks: {stats['hooks']}")

if stats["errors"]:
    print("\n错误:")
    for error in stats["errors"]:
        print(f"  - {error}")
