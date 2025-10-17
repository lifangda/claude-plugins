#!/usr/bin/env python3
import json
import os
from pathlib import Path

def verify_marketplace_paths():
    """验证marketplace.json中所有路径的有效性"""
    with open('.claude-plugin/marketplace.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    total_paths = 0
    valid_paths = 0
    invalid_paths = []
    
    components_dir = Path('cli-tool/components')
    
    for plugin in data.get('plugins', []):
        for key in ['agents', 'commands', 'workflows', 'hooks', 'mcps', 'mcpServers', 'sandbox', 'settings', 'skills']:
            if key in plugin:
                for path in plugin[key]:
                    total_paths += 1
                    # 移除开头的 "./"
                    clean_path = path.lstrip('./')
                    full_path = components_dir / clean_path
                    
                    if full_path.exists():
                        valid_paths += 1
                    else:
                        invalid_paths.append({
                            'plugin': plugin['name'],
                            'type': key,
                            'path': path
                        })
    
    print(f"总路径数: {total_paths}")
    print(f"有效路径: {valid_paths}")
    print(f"无效路径: {len(invalid_paths)}")
    print(f"有效率: {valid_paths/total_paths*100:.1f}%")
    
    if invalid_paths:
        print("\n无效路径列表:")
        for item in invalid_paths[:10]:  # 只显示前10个
            print(f"  - {item['plugin']}/{item['type']}: {item['path']}")
        if len(invalid_paths) > 10:
            print(f"  ... 还有 {len(invalid_paths)-10} 个无效路径")
    
    return total_paths, valid_paths, invalid_paths

if __name__ == '__main__':
    verify_marketplace_paths()
