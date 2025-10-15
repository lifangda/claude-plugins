#!/usr/bin/env python3
"""
验证 marketplace.json 中的所有路径是否有效
检查每个插件包的 agents、commands、workflows、hooks、mcps 路径
"""

import json
import os
from pathlib import Path
from collections import defaultdict

# 配置
MARKETPLACE_FILE = '.claude-plugin/marketplace.json'
COMPONENTS_DIR = 'cli-tool/components'

def load_marketplace():
    """加载 marketplace.json"""
    with open(MARKETPLACE_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def verify_paths(marketplace_data):
    """验证所有路径"""
    results = {
        'total_plugins': 0,
        'total_paths': 0,
        'valid_paths': 0,
        'invalid_paths': 0,
        'issues': defaultdict(list)
    }

    plugins = marketplace_data.get('plugins', [])
    results['total_plugins'] = len(plugins)

    print(f"开始验证 {len(plugins)} 个插件包...")
    print("=" * 80)

    for plugin in plugins:
        plugin_name = plugin.get('name', 'Unknown')
        print(f"\n检查插件: {plugin_name}")

        # 检查各种组件类型
        component_types = ['agents', 'commands', 'workflows', 'hooks', 'mcps', 'mcpServers', 'sandbox']

        for component_type in component_types:
            paths = plugin.get(component_type, [])

            if not paths:
                continue

            print(f"  {component_type}: {len(paths)} 个文件")

            for path in paths:
                results['total_paths'] += 1

                # 移除开头的 ./
                clean_path = path.lstrip('./')

                # 构建完整路径
                full_path = os.path.join(COMPONENTS_DIR, clean_path)

                # 检查文件是否存在
                if os.path.exists(full_path):
                    results['valid_paths'] += 1
                else:
                    results['invalid_paths'] += 1
                    issue = f"  ❌ {path} (不存在: {full_path})"
                    results['issues'][plugin_name].append(issue)
                    print(issue)

    return results

def print_summary(results):
    """打印验证摘要"""
    print("\n" + "=" * 80)
    print("验证摘要:")
    print("=" * 80)
    print(f"插件包总数: {results['total_plugins']}")
    print(f"路径总数: {results['total_paths']}")
    print(f"有效路径: {results['valid_paths']}")
    print(f"无效路径: {results['invalid_paths']}")
    print(f"路径有效率: {results['valid_paths'] / results['total_paths'] * 100:.2f}%")

    if results['issues']:
        print(f"\n发现 {len(results['issues'])} 个插件包存在问题:")
        for plugin_name, issues in results['issues'].items():
            print(f"\n{plugin_name}:")
            for issue in issues:
                print(issue)
    else:
        print("\n✅ 所有路径验证通过!")

def generate_fix_report(results):
    """生成修复建议报告"""
    if not results['issues']:
        return

    report_file = 'marketplace_fix_report.txt'
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write("Marketplace.json 路径修复报告\n")
        f.write("=" * 80 + "\n\n")

        for plugin_name, issues in results['issues'].items():
            f.write(f"插件: {plugin_name}\n")
            f.write(f"问题数量: {len(issues)}\n")
            for issue in issues:
                f.write(f"{issue}\n")
            f.write("\n")

    print(f"\n修复报告已保存到: {report_file}")

def main():
    """主函数"""
    print("Marketplace.json 完整性验证工具")
    print("=" * 80)

    # 检查文件是否存在
    if not os.path.exists(MARKETPLACE_FILE):
        print(f"错误: 找不到 {MARKETPLACE_FILE}")
        return

    if not os.path.exists(COMPONENTS_DIR):
        print(f"错误: 找不到 {COMPONENTS_DIR}")
        return

    # 加载并验证
    marketplace_data = load_marketplace()
    results = verify_paths(marketplace_data)

    # 打印摘要
    print_summary(results)

    # 生成修复报告
    if results['invalid_paths'] > 0:
        generate_fix_report(results)

if __name__ == '__main__':
    main()
