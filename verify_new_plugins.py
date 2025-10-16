#!/usr/bin/env python3
"""
验证22个新整合插件文件的路径有效性
"""

import os
import json

# 基础路径
BASE_DIR = "cli-tool/components"

# 22个新整合的文件
NEW_FILES = {
    "agents": [
        "official/agents/backend-architect.md",
        "official/agents/code-reviewer-claude.md",
        "official/agents/database-performance-optimizer.md",
        "devops-infrastructure/monitoring-observability-specialist.md",
        "testing-quality/api-tester.md",
        "database/database-performance-optimizer.md",
        "design-creative/ui-designer.md",
        "enterprise/compliance-automation-specialist.md",
        "enterprise/data-privacy-engineer.md",
    ],
    "commands": [
        "official/commands/commit-claude.md",
        "git-workflow/code-review-assistant.md",
        "git-workflow/github-issue-fix.md",
    ],
    "hooks": [
        "official/hooks/security-guidance.json",
    ]
}

# 从 ccplugins 仓库下载的完整文件列表(实际路径)
ALL_NEW_FILES = [
    # Official files (3个: 1 renamed agent, 1 renamed command, 1 renamed hook)
    "official/agents/code-reviewer-claude.md",  # RENAMED from code-reviewer.md
    "official/commands/commit-claude.md",  # RENAMED from commit.md
    "official/hooks/security-guidance.json",  # RENAMED from hooks.json

    # Community agents (8个独立插件)
    "agents/development-team/backend-architect.md",  # 来自backend-architect插件
    "agents/devops-infrastructure/monitoring-observability-specialist.md",  # 来自monitoring-observability-specialist插件
    "agents/testing-quality/api-tester.md",  # 来自api-tester插件
    "agents/database/database-performance-optimizer.md",  # 来自database-performance-optimizer插件
    "agents/design-creative/ui-designer.md",  # 来自ui-designer插件
    "agents/enterprise/compliance-automation-specialist.md",  # 来自compliance-automation-specialist插件
    "agents/enterprise/data-privacy-engineer.md",  # 来自data-privacy-engineer插件

    # Community commands (2个)
    "commands/git-workflow/code-review-assistant.md",  # 来自code-review-assistant插件
    "commands/git-workflow/github-issue-fix.md",  # 来自github-issue-fix插件
]

stats = {
    "total": 0,
    "valid": 0,
    "invalid": 0,
    "missing_files": []
}

print("=" * 60)
print("验证22个新整合插件文件")
print("=" * 60)

for file_path in ALL_NEW_FILES:
    stats["total"] += 1
    full_path = os.path.join(BASE_DIR, file_path)

    if os.path.exists(full_path):
        stats["valid"] += 1
        print(f"✓ {file_path}")
    else:
        stats["invalid"] += 1
        stats["missing_files"].append(file_path)
        print(f"✗ {file_path} - 文件不存在")

print("\n" + "=" * 60)
print("验证结果统计")
print("=" * 60)
print(f"总文件数: {stats['total']}")
print(f"有效路径: {stats['valid']}")
print(f"无效路径: {stats['invalid']}")
print(f"路径有效性: {(stats['valid']/stats['total']*100):.1f}%")

if stats["missing_files"]:
    print("\n缺失文件列表:")
    for f in stats["missing_files"]:
        print(f"  - {f}")
else:
    print("\n✅ 所有文件路径验证通过!")

# 验证 marketplace.json 中的路径配置
print("\n" + "=" * 60)
print("验证 marketplace.json 配置")
print("=" * 60)

with open(".claude-plugin/marketplace.json", "r", encoding="utf-8") as f:
    marketplace = json.load(f)

# 查找 claude-code-official 插件包
official_package = None
for plugin in marketplace["plugins"]:
    if plugin["name"] == "claude-code-official":
        official_package = plugin
        break

if official_package:
    print(f"\n✓ 找到 claude-code-official 插件包")
    print(f"  - Agents: {len(official_package.get('agents', []))} 个")
    print(f"  - Commands: {len(official_package.get('commands', []))} 个")
    print(f"  - Hooks: {len(official_package.get('hooks', []))} 个")

    # 验证新文件是否在配置中
    agents_in_config = official_package.get("agents", [])

    new_official_agents = [
        "./official/agents/backend-architect.md",
        "./official/agents/database-performance-optimizer.md"
    ]

    print("\n检查新的官方 agents 是否在配置中:")
    for agent in new_official_agents:
        if agent in agents_in_config:
            print(f"  ✓ {agent}")
        else:
            print(f"  ✗ {agent} - 未找到")

    # 检查重命名的文件
    renamed_file = "./official/agents/code-reviewer-claude.md"
    if renamed_file in agents_in_config:
        print(f"  ✓ {renamed_file} (已重命名)")
    else:
        print(f"  ✗ {renamed_file} (已重命名) - 未找到")

else:
    print("✗ 未找到 claude-code-official 插件包")

print("\n" + "=" * 60)
print("验证完成!")
print("=" * 60)
