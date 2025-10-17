#!/usr/bin/env python3
import json

def verify_configurations():
    """验证关键配置文件的一致性"""
    
    # 读取 marketplace.json
    with open('.claude-plugin/marketplace.json', 'r', encoding='utf-8') as f:
        marketplace = json.load(f)
    
    # 读取 package.json
    with open('package.json', 'r', encoding='utf-8') as f:
        package = json.load(f)
    
    print("=== 配置文件验证 ===\n")
    
    # 验证版本号
    print(f"package.json 版本: {package['version']}")
    print(f"marketplace.json 版本: {marketplace['metadata']['version']}")
    
    # 统计插件包数量
    plugin_count = len(marketplace['plugins'])
    print(f"\n插件包数量: {plugin_count}")
    
    # 验证 claude-plugins-complete 包
    complete_plugin = next((p for p in marketplace['plugins'] if p['name'] == 'claude-plugins-complete'), None)
    if complete_plugin:
        print("\n=== claude-plugins-complete 包统计 ===")
        print(f"Agents: {len(complete_plugin.get('agents', []))}")
        print(f"Commands: {len(complete_plugin.get('commands', []))}")
        print(f"Workflows: {len(complete_plugin.get('workflows', []))}")
        print(f"Hooks: {len(complete_plugin.get('hooks', []))}")
        print(f"MCPs: {len(complete_plugin.get('mcps', []))}")
        print(f"Skills: {len(complete_plugin.get('skills', []))}")
        print(f"Sandbox: {len(complete_plugin.get('sandbox', []))}")
        
        total = (len(complete_plugin.get('agents', [])) + 
                len(complete_plugin.get('commands', [])) + 
                len(complete_plugin.get('workflows', [])) + 
                len(complete_plugin.get('hooks', [])) + 
                len(complete_plugin.get('mcps', [])) +
                len(complete_plugin.get('skills', [])) +
                len(complete_plugin.get('sandbox', [])))
        print(f"总组件数: {total}")
    
    # 验证 skills-collection 包
    skills_plugin = next((p for p in marketplace['plugins'] if p['name'] == 'skills-collection'), None)
    if skills_plugin:
        print(f"\n=== skills-collection 包 ===")
        print(f"Skills: {len(skills_plugin.get('skills', []))}")
    
    # 验证 claude-code-official 包
    official_plugin = next((p for p in marketplace['plugins'] if p['name'] == 'claude-code-official'), None)
    if official_plugin:
        print(f"\n=== claude-code-official 包 ===")
        print(f"Agents: {len(official_plugin.get('agents', []))}")
        print(f"Commands: {len(official_plugin.get('commands', []))}")
        print(f"Hooks: {len(official_plugin.get('hooks', []))}")

if __name__ == '__main__':
    verify_configurations()
