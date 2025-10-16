#!/usr/bin/env python3
"""
整合experienced-engineer插件
"""

import os
import shutil

# 源目录
SOURCE_DIR = "/tmp/claude-code-marketplace/plugins/experienced-engineer"
# 目标目录
TARGET_DIR = "cli-tool/components"

# 需要整合的文件映射 (源文件 -> 目标路径)
# 只整合未存在的文件
files_to_integrate = {
    # Agents (7个新文件)
    "agents/api-architect.md": "agents/architecture/api-architect.md",
    "agents/code-quality-reviewer.md": "agents/testing-quality/code-quality-reviewer.md",
    "agents/documentation-writer.md": "agents/documentation/documentation-writer.md",
    "agents/security-specialist.md": "agents/security/security-specialist.md",
    "agents/tech-lead.md": "agents/development-tools/tech-lead.md",
    "agents/testing-specialist.md": "agents/testing-quality/testing-specialist.md",
    "agents/ux-ui-designer.md": "agents/design-creative/ux-ui-designer.md",

    # Commands (1个新文件)
    "commands/update-claude.md": "commands/utilities/update-claude.md",
}

stats = {"agents": 0, "commands": 0, "errors": []}

print("=" * 60)
print("开始整合 experienced-engineer 插件")
print("=" * 60)

for source_file, target_file in files_to_integrate.items():
    source_path = os.path.join(SOURCE_DIR, source_file)
    target_path = os.path.join(TARGET_DIR, target_file)

    # 检查源文件是否存在
    if not os.path.exists(source_path):
        stats["errors"].append(f"源文件不存在: {source_file}")
        continue

    # 检查目标文件是否已存在
    if os.path.exists(target_path):
        print(f"⊘ {target_file} - 已存在,跳过")
        continue

    # 创建目标目录
    target_dir = os.path.dirname(target_path)
    os.makedirs(target_dir, exist_ok=True)

    # 复制文件
    try:
        shutil.copy2(source_path, target_path)

        # 统计
        if "agents/" in target_file:
            stats["agents"] += 1
        elif "commands/" in target_file:
            stats["commands"] += 1

        print(f"✓ {target_file}")
    except Exception as e:
        stats["errors"].append(f"复制失败 {source_file}: {str(e)}")

print("\n" + "=" * 60)
print("整合完成!")
print(f"新增 agents: {stats['agents']}")
print(f"新增 commands: {stats['commands']}")

if stats["errors"]:
    print(f"\n错误数: {len(stats['errors'])}")
    for error in stats["errors"]:
        print(f"  - {error}")
else:
    print("\n✅ 所有文件成功整合!")
