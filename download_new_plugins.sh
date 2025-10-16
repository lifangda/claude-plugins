#!/bin/bash
# 下载ccplugins市场的新插件

BASE_URL="https://raw.githubusercontent.com/ccplugins/awesome-claude-code-plugins/main/plugins"

# 创建临时下载目录
mkdir -p /tmp/new-plugins

echo "开始下载12个新插件..."

# 官方插件 (4个)
plugins=(
  "agent-sdk-dev"
  "pr-review-toolkit"
  "commit-commands"
  "security-guidance"
  "monitoring-observability-specialist"
  "api-tester"
  "code-review-assistant"
  "database-performance-optimizer"
  "ui-designer"
  "github-issue-fix"
  "compliance-automation-specialist"
  "data-privacy-engineer"
)

for plugin in "${plugins[@]}"; do
  echo "下载 $plugin ..."
  mkdir -p "/tmp/new-plugins/$plugin"

  # 尝试下载各种可能的文件
  curl -s -o "/tmp/new-plugins/$plugin/marketplace.json" "$BASE_URL/$plugin/marketplace.json" 2>/dev/null
  curl -s -o "/tmp/new-plugins/$plugin/agent.md" "$BASE_URL/$plugin/agent.md" 2>/dev/null
  curl -s -o "/tmp/new-plugins/$plugin/command.md" "$BASE_URL/$plugin/command.md" 2>/dev/null
  curl -s -o "/tmp/new-plugins/$plugin/hook.json" "$BASE_URL/$plugin/hook.json" 2>/dev/null
  curl -s -o "/tmp/new-plugins/$plugin/README.md" "$BASE_URL/$plugin/README.md" 2>/dev/null
done

echo "下载完成!"
echo "文件保存在: /tmp/new-plugins/"
