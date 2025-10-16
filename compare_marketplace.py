#!/usr/bin/env python3
"""
对比claude-code-marketplace仓库,找出未整合的插件
"""

import os
import json
from pathlib import Path

# 读取已整合的marketplace.json
with open(".claude-plugin/marketplace.json", "r", encoding="utf-8") as f:
    marketplace = json.load(f)

# 提取所有已整合的文件名(不含路径和扩展名)
integrated_files = set()

# 从完整包中提取
complete_package = None
for plugin in marketplace["plugins"]:
    if plugin["name"] == "claude-plugins-complete":
        complete_package = plugin
        break

if complete_package:
    # 提取agents
    for agent in complete_package.get("agents", []):
        filename = os.path.basename(agent).replace(".md", "")
        integrated_files.add(filename)

    # 提取commands
    for command in complete_package.get("commands", []):
        filename = os.path.basename(command).replace(".md", "")
        integrated_files.add(filename)

    # 提取hooks
    for hook in complete_package.get("hooks", []):
        filename = os.path.basename(hook).replace(".json", "")
        integrated_files.add(filename)

print(f"已整合的文件数: {len(integrated_files)}")

# 扫描claude-code-marketplace仓库
marketplace_dir = "/tmp/claude-code-marketplace/plugins"
marketplace_plugins = []

if os.path.exists(marketplace_dir):
    for plugin_name in os.listdir(marketplace_dir):
        plugin_path = os.path.join(marketplace_dir, plugin_name)
        if os.path.isdir(plugin_path):
            marketplace_plugins.append(plugin_name)

print(f"Marketplace插件总数: {len(marketplace_plugins)}")

# 找出未整合的插件
unintegrated = []
for plugin_name in sorted(marketplace_plugins):
    # 检查是否已整合(通过文件名匹配)
    if plugin_name not in integrated_files:
        unintegrated.append(plugin_name)

print(f"\n未整合的插件数: {len(unintegrated)}")

if unintegrated:
    print("\n未整合的插件列表:")
    for i, plugin in enumerate(unintegrated, 1):
        # 检查插件目录结构
        plugin_path = os.path.join(marketplace_dir, plugin)
        has_agents = os.path.exists(os.path.join(plugin_path, "agents"))
        has_commands = os.path.exists(os.path.join(plugin_path, "commands"))
        has_hooks = os.path.exists(os.path.join(plugin_path, "hooks"))

        components = []
        if has_agents:
            agents_count = len([f for f in os.listdir(os.path.join(plugin_path, "agents")) if f.endswith(".md")])
            components.append(f"{agents_count}个agent{'s' if agents_count > 1 else ''}")
        if has_commands:
            commands_count = len([f for f in os.listdir(os.path.join(plugin_path, "commands")) if f.endswith(".md")])
            components.append(f"{commands_count}个command{'s' if commands_count > 1 else ''}")
        if has_hooks:
            hooks_count = len([f for f in os.listdir(os.path.join(plugin_path, "hooks")) if f.endswith(".json")])
            components.append(f"{hooks_count}个hook{'s' if hooks_count > 1 else ''}")

        component_info = ", ".join(components) if components else "空插件"
        print(f"{i}. {plugin} ({component_info})")

# 统计
print(f"\n统计:")
print(f"- Marketplace总插件: {len(marketplace_plugins)}")
print(f"- 已整合插件: {len(marketplace_plugins) - len(unintegrated)}")
print(f"- 未整合插件: {len(unintegrated)}")
print(f"- 整合率: {((len(marketplace_plugins) - len(unintegrated)) / len(marketplace_plugins) * 100):.1f}%")
