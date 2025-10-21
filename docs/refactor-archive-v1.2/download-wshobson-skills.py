#!/usr/bin/env python3
"""
从wshobson/agents下载官方Skills到skills-library

此脚本会:
1. 递归下载完整的skill目录(保持结构)
2. 包含SKILL.md + scripts/ + references/ + assets/
3. 按分类组织到对应目录
"""

import os
import sys
import urllib.request
import json
import time

# wshobson/agents GitHub仓库
GITHUB_API_BASE = "https://api.github.com/repos/wshobson/agents"
GITHUB_RAW_BASE = "https://raw.githubusercontent.com/wshobson/agents/main"

# Skills分类映射
SKILL_CATEGORIES = {
    "backend-development": ["api-design-principles", "architecture-patterns", "microservices-patterns", "mcp-builder"],
    "blockchain-web3": ["defi-protocol-templates", "nft-standards", "solidity-security", "web3-testing"],
    "cicd-automation": ["deployment-pipeline-design", "github-actions-templates", "gitlab-ci-patterns", "secrets-management"],
    "cloud-infrastructure": ["cost-optimization", "hybrid-cloud-networking", "multi-cloud-architecture", "terraform-module-library"],
    "framework-migration": ["angular-migration", "database-migration", "dependency-upgrade", "react-modernization"],
    "javascript-typescript": ["javascript-testing-patterns", "modern-javascript-patterns", "nodejs-backend-patterns", "typescript-advanced-types"],
    "kubernetes-operations": ["gitops-workflow", "helm-chart-scaffolding", "k8s-manifest-generator", "k8s-security-policies"],
    "llm-application-dev": ["langchain-architecture", "llm-evaluation", "prompt-engineering-patterns", "rag-implementation"],
    "payment-processing": ["billing-automation", "paypal-integration", "pci-compliance", "stripe-integration"],
    "python-development": ["async-python-patterns", "python-packaging", "python-testing-patterns", "uv-package-manager"],
}

def download_file(url, dest_path):
    """下载文件"""
    try:
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        urllib.request.urlretrieve(url, dest_path)
        return True
    except Exception as e:
        print(f"  ❌ 下载失败: {e}")
        return False

def get_directory_contents(path):
    """获取GitHub目录内容"""
    url = f"{GITHUB_API_BASE}/contents/.skills/{path}"
    try:
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'Mozilla/5.0')
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        print(f"  ⚠️  无法获取目录 {path}: {e}")
        return []

def download_skill_recursive(category, skill_name, source_path=""):
    """递归下载skill目录"""
    print(f"\n📥 下载 {category}/{skill_name}...")

    # 获取源目录内容
    github_path = f"{skill_name}/{source_path}".rstrip("/")
    contents = get_directory_contents(github_path)

    if not contents:
        print(f"  ⚠️  跳过(目录为空或不存在)")
        return 0

    files_downloaded = 0

    for item in contents:
        item_name = item['name']
        item_type = item['type']
        download_url = item.get('download_url')

        # 计算本地路径
        local_subpath = f"{source_path}/{item_name}".lstrip("/")
        local_path = f"cli-tool/skills-library/{category}/{skill_name}/{local_subpath}"

        if item_type == 'file':
            # 下载文件
            if download_url:
                print(f"  ⬇️  {local_subpath}")
                if download_file(download_url, local_path):
                    files_downloaded += 1
                    time.sleep(0.1)  # 避免API限流
        elif item_type == 'dir':
            # 递归下载子目录
            sub_files = download_skill_recursive(category, skill_name, local_subpath)
            files_downloaded += sub_files

    return files_downloaded

def main():
    """主函数"""
    print("🚀 开始下载wshobson Skills...")
    print(f"📊 共 {len(SKILL_CATEGORIES)} 个分类")

    total_skills = sum(len(skills) for skills in SKILL_CATEGORIES.values())
    print(f"📦 共 {total_skills} 个Skills")
    print()

    total_files = 0
    successful_skills = 0
    failed_skills = []

    for category, skills in SKILL_CATEGORIES.items():
        print(f"\n📂 分类: {category} ({len(skills)} 个skills)")
        print("=" * 60)

        for skill_name in skills:
            try:
                files = download_skill_recursive(category, skill_name)
                if files > 0:
                    total_files += files
                    successful_skills += 1
                    print(f"  ✅ 完成: {files} 个文件")
                else:
                    failed_skills.append(f"{category}/{skill_name}")
                    print(f"  ⚠️  无文件")
            except Exception as e:
                failed_skills.append(f"{category}/{skill_name}")
                print(f"  ❌ 错误: {e}")

            time.sleep(0.2)  # 避免API限流

    # 显示总结
    print("\n" + "=" * 60)
    print("✅ 下载完成!")
    print(f"📊 统计:")
    print(f"   - 成功下载: {successful_skills}/{total_skills} 个skills")
    print(f"   - 总文件数: {total_files}")

    if failed_skills:
        print(f"\n⚠️  失败的skills ({len(failed_skills)}):")
        for skill in failed_skills:
            print(f"   - {skill}")

    print(f"\n💾 Skills保存位置: cli-tool/skills-library/")

if __name__ == '__main__':
    main()
