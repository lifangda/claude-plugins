#!/usr/bin/env python3
"""
检查experienced-engineer插件的文件是否已整合(可能使用不同路径/名称)
"""

import os
import glob

# experienced-engineer插件的文件列表
experienced_engineer_files = {
    "agents": [
        "api-architect.md",
        "code-quality-reviewer.md",
        "database-architect.md",
        "devops-engineer.md",
        "documentation-writer.md",
        "performance-engineer.md",
        "security-specialist.md",
        "tech-lead.md",
        "testing-specialist.md",
        "ux-ui-designer.md"
    ],
    "commands": [
        "code-explain.md",
        "update-claude.md"
    ],
    "hooks": [
        "hooks.json"
    ]
}

print("检查experienced-engineer插件文件是否已整合\n")
print("=" * 60)

base_dir = "cli-tool/components"
found_count = 0
missing_count = 0
missing_files = []

# 检查agents
print("\n【Agents检查】")
for filename in experienced_engineer_files["agents"]:
    # 搜索文件
    search_pattern = f"{base_dir}/**/agents/**/{filename}"
    matches = glob.glob(search_pattern, recursive=True)

    if matches:
        print(f"✓ {filename} - 已存在: {matches[0]}")
        found_count += 1
    else:
        print(f"✗ {filename} - 未找到")
        missing_count += 1
        missing_files.append(("agent", filename))

# 检查commands
print("\n【Commands检查】")
for filename in experienced_engineer_files["commands"]:
    search_pattern = f"{base_dir}/**/commands/**/{filename}"
    matches = glob.glob(search_pattern, recursive=True)

    if matches:
        print(f"✓ {filename} - 已存在: {matches[0]}")
        found_count += 1
    else:
        print(f"✗ {filename} - 未找到")
        missing_count += 1
        missing_files.append(("command", filename))

# 检查hooks
print("\n【Hooks检查】")
for filename in experienced_engineer_files["hooks"]:
    # hooks.json是通用名,需要特殊处理
    if filename == "hooks.json":
        # 检查是否有experienced-engineer相关的hooks
        search_pattern = f"{base_dir}/**/hooks/**/*.json"
        all_hooks = glob.glob(search_pattern, recursive=True)
        print(f"? {filename} - 需要手动检查内容 (找到{len(all_hooks)}个hook文件)")
        # 不计入missing,因为可能已经整合但名称不同
    else:
        search_pattern = f"{base_dir}/**/hooks/**/{filename}"
        matches = glob.glob(search_pattern, recursive=True)

        if matches:
            print(f"✓ {filename} - 已存在: {matches[0]}")
            found_count += 1
        else:
            print(f"✗ {filename} - 未找到")
            missing_count += 1
            missing_files.append(("hook", filename))

# 统计
total_files = len(experienced_engineer_files["agents"]) + len(experienced_engineer_files["commands"]) + len(experienced_engineer_files["hooks"])

print("\n" + "=" * 60)
print("统计结果:")
print(f"- 总文件数: {total_files}")
print(f"- 已找到: {found_count}")
print(f"- 未找到: {missing_count}")
print(f"- 需手动检查: 1 (hooks.json)")
print(f"- 整合率: {(found_count/total_files*100):.1f}%")

if missing_files:
    print("\n未找到的文件列表:")
    for file_type, filename in missing_files:
        print(f"  - [{file_type}] {filename}")
