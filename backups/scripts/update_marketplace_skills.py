#!/usr/bin/env python3
"""
Update marketplace.json to add Agent Skills support
"""

import json

# 31个成功下载的skills路径
SKILLS = [
    "./skills/backend-development/api-design-principles.md",
    "./skills/backend-development/architecture-patterns.md",
    "./skills/backend-development/microservices-patterns.md",
    "./skills/blockchain-web3/defi-protocol-templates.md",
    "./skills/blockchain-web3/nft-standards.md",
    "./skills/blockchain-web3/solidity-security.md",
    "./skills/blockchain-web3/web3-testing.md",
    "./skills/cicd-automation/deployment-pipeline-design.md",
    "./skills/cicd-automation/github-actions-templates.md",
    "./skills/cicd-automation/gitlab-ci-patterns.md",
    "./skills/cicd-automation/secrets-management.md",
    "./skills/cloud-infrastructure/cost-optimization.md",
    "./skills/cloud-infrastructure/hybrid-cloud-networking.md",
    "./skills/cloud-infrastructure/multi-cloud-architecture.md",
    "./skills/cloud-infrastructure/terraform-module-library.md",
    "./skills/framework-migration/angular-migration.md",
    "./skills/framework-migration/database-migration.md",
    "./skills/framework-migration/dependency-upgrade.md",
    "./skills/framework-migration/react-modernization.md",
    "./skills/javascript-typescript/javascript-testing-patterns.md",
    "./skills/javascript-typescript/modern-javascript-patterns.md",
    "./skills/javascript-typescript/nodejs-backend-patterns.md",
    "./skills/javascript-typescript/typescript-advanced-types.md",
    "./skills/kubernetes-operations/gitops-workflow.md",
    "./skills/kubernetes-operations/helm-chart-scaffolding.md",
    "./skills/kubernetes-operations/k8s-manifest-generator.md",
    "./skills/kubernetes-operations/k8s-security-policies.md",
    "./skills/python-development/async-python-patterns.md",
    "./skills/python-development/python-testing-patterns.md",
    "./skills/python-development/uv-package-manager.md",
    "./skills/payment-processing/stripe-integration.md"
]

def main():
    # 读取marketplace.json
    with open('.claude-plugin/marketplace.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 更新claude-plugins-complete插件包
    for plugin in data['plugins']:
        if plugin['name'] == 'claude-plugins-complete':
            # 添加skills数组
            plugin['skills'] = SKILLS
            # 更新描述
            plugin['description'] = '完整的Claude插件生态系统:280个AI代理、306个开发命令、16个工作流、39个自动化钩子、56个MCP服务器、18个输出样式、31个Agent Skills,一条命令即可安装使用'
            print(f"✅ 已更新 claude-plugins-complete 插件包,添加31个Agent Skills")
            break

    # 更新metadata描述
    data['metadata']['description'] = '完整的Claude插件生态系统:280个专业代理、306个开发命令、16个工作流、39个钩子、56个MCP服务器、18个输出样式、31个Agent Skills，专业化分类，即装即用'
    print(f"✅ 已更新 metadata 描述")

    # 创建skills-collection插件包
    skills_package = {
        "name": "skills-collection",
        "source": "./cli-tool/components",
        "description": "Agent Skills 技能集合 - 31个专业技能包,覆盖16个技术领域",
        "version": "1.1.0",
        "author": {
            "name": "wshobson + Fonda",
            "url": "https://github.com/lifangda"
        },
        "license": "MIT",
        "keywords": [
            "skills",
            "agent-skills",
            "backend",
            "blockchain",
            "kubernetes",
            "cloud",
            "cicd",
            "python",
            "javascript"
        ],
        "strict": False,
        "skills": SKILLS
    }

    # 添加到plugins列表
    data['plugins'].append(skills_package)
    print(f"✅ 已创建 skills-collection 插件包")

    # 写回marketplace.json
    with open('.claude-plugin/marketplace.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\n✅ marketplace.json更新完成!")
    print(f"📊 插件包总数: {len(data['plugins'])}")
    print(f"📊 Agent Skills总数: 31")

if __name__ == '__main__':
    main()
