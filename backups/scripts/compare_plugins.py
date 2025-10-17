#!/usr/bin/env python3
"""
比对ccplugins市场和现有插件,找出新插件
"""

# ccplugins市场的所有插件
ccplugins_list = [
    # Official Claude Code Plugins
    "agent-sdk-dev", "pr-review-toolkit", "commit-commands", "feature-dev", "security-guidance",

    # Workflow Orchestration
    "angelos-symbo", "ceo-quality-controller-agent", "claude-desktop-extension", "lyra",
    "model-context-protocol-mcp-expert", "problem-solver-specialist", "studio-coach", "ultrathink",

    # Automation DevOps
    "deployment-engineer", "devops-automator", "infrastructure-maintainer",
    "monitoring-observability-specialist", "n8n-workflow-builder",

    # Business Sales
    "b2b-project-shipper", "customer-success-manager", "enterprise-onboarding-specialist",
    "finance-tracker", "pricing-packaging-specialist", "product-sales-specialist",
    "support-responder", "technical-sales-engineer",

    # Code Quality Testing
    "api-tester", "bug-detective", "code-review", "code-review-assistant", "code-reviewer",
    "database-performance-optimizer", "debug-session", "debugger", "double-check", "optimize",
    "performance-benchmarker", "refractor", "test-file", "test-results-analyzer",
    "test-writer-fixer", "unit-test-generator",

    # Data Analytics
    "analytics-reporter", "data-scientist", "experiment-tracker", "feedback-synthesizer", "trend-researcher",

    # Design UX
    "brand-guardian", "joker", "mobile-ux-optimizer", "onomastophes", "ui-designer",
    "ux-researcher", "visual-storyteller", "whimsy-injector",

    # Development Engineering
    "ai-engineer", "api-integration-specialist", "backend-architect", "code-architect",
    "desktop-app-dev", "enterprise-integrator-architect", "flutter-mobile-app-dev",
    "frontend-developer", "mobile-app-builder", "project-curator", "python-expert",
    "rapid-prototyper", "react-native-dev", "vision-specialist", "web-dev",

    # Documentation
    "analyze-codebase", "changelog-generator", "codebase-documenter", "context7-docs-fetcher",
    "documentation-generator", "generate-api-docs", "openapi-expert", "update-claudemd",

    # Git Workflow
    "analyze-issue", "bug-fix", "commit", "create-pr", "create-pull-request", "create-worktrees",
    "fix-github-issue", "fix-issue", "fix-pr", "github-issue-fix", "husky", "pr-issue-resolve",
    "pr-review", "update-branch-name",

    # Marketing Growth
    "app-store-optimizer", "content-creator", "growth-hacker", "instagram-curator",
    "reddit-community-builder", "tiktok-strategist", "twitter-engager",

    # Project & Product Management
    "discuss", "explore", "plan", "planning-prd-agent", "prd-specialist", "project-shipper",
    "sprint-prioritizer", "studio-producer", "tool-evaluator", "workflow-optimizer",

    # Security, Compliance, & Legal
    "ai-ethics-governance-specialist", "audit", "compliance-automation-specialist",
    "data-privacy-engineer", "enterprise-security-reviewer", "legal-advisor", "legal-compliance-checker"
]

import os
import glob

# 获取现有的所有agents和commands文件名(不含扩展名)
existing_agents = set()
existing_commands = set()

# 扫描agents
for filepath in glob.glob("cli-tool/components/agents/**/*.md", recursive=True):
    filename = os.path.basename(filepath).replace(".md", "")
    existing_agents.add(filename)

# 扫描commands
for filepath in glob.glob("cli-tool/components/commands/**/*.md", recursive=True):
    filename = os.path.basename(filepath).replace(".md", "")
    existing_commands.add(filename)

# 扫描official
for filepath in glob.glob("cli-tool/components/official/**/*.md", recursive=True):
    filename = os.path.basename(filepath).replace(".md", "")
    if "agent" in filepath:
        existing_agents.add(filename)
    elif "command" in filepath:
        existing_commands.add(filename)

# 合并所有现有组件
existing_all = existing_agents | existing_commands

# 找出新插件
new_plugins = []
for plugin in ccplugins_list:
    if plugin not in existing_all:
        new_plugins.append(plugin)

print(f"ccplugins市场总插件数: {len(ccplugins_list)}")
print(f"现有agents数: {len(existing_agents)}")
print(f"现有commands数: {len(existing_commands)}")
print(f"现有总组件数: {len(existing_all)}")
print(f"\n发现新插件数: {len(new_plugins)}")
print(f"\n新插件列表 ({len(new_plugins)}个):")
for i, plugin in enumerate(new_plugins, 1):
    print(f"{i}. {plugin}")
