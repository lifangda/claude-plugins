#!/usr/bin/env python3
"""
移除marketplace.json中的所有skills引用

此脚本会:
1. 读取marketplace.json
2. 移除所有插件包中的skills数组
3. 移除skills-collection插件包
4. 保存更新后的文件
"""

import json
import os
import sys

def remove_skills_from_marketplace():
    """从marketplace.json移除所有skills引用"""

    marketplace_path = '.claude-plugin/marketplace.json'
    backup_path = 'backups/20251020-skills-refactor/marketplace-before-removal.json'

    # 检查文件是否存在
    if not os.path.exists(marketplace_path):
        print(f"❌ 错误: {marketplace_path} 不存在")
        sys.exit(1)

    # 读取marketplace.json
    print(f"📖 读取 {marketplace_path}...")
    with open(marketplace_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 统计信息
    total_skills_removed = 0
    packages_modified = 0

    # 遍历所有插件包
    new_plugins = []
    for pkg in data.get('plugins', []):
        pkg_name = pkg.get('name', 'unknown')

        # 跳过skills-collection插件包
        if pkg_name == 'skills-collection':
            print(f"🗑️  移除插件包: {pkg_name}")
            continue

        # 移除skills数组
        if 'skills' in pkg:
            skills_count = len(pkg['skills'])
            if skills_count > 0:
                total_skills_removed += skills_count
                packages_modified += 1
                print(f"🧹 清理插件包 '{pkg_name}': 移除 {skills_count} 个skills")
            del pkg['skills']

        new_plugins.append(pkg)

    # 更新plugins列表
    data['plugins'] = new_plugins

    # 更新metadata描述(移除Skills相关内容)
    if 'metadata' in data:
        old_desc = data['metadata'].get('description', '')
        # 移除Skills相关描述
        new_desc = old_desc.replace('、31个Agent Skills', '').replace(', 31个Agent Skills', '')
        data['metadata']['description'] = new_desc

    # 保存更新后的文件
    print(f"\n💾 保存更新后的 {marketplace_path}...")
    with open(marketplace_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    # 显示统计信息
    print(f"\n✅ 完成!")
    print(f"📊 统计:")
    print(f"   - 修改的插件包数量: {packages_modified}")
    print(f"   - 移除的skills引用: {total_skills_removed}")
    print(f"   - 移除的插件包: skills-collection")
    print(f"\n📦 备份位置: {backup_path}")
    print(f"✅ marketplace.json已更新")

if __name__ == '__main__':
    remove_skills_from_marketplace()
