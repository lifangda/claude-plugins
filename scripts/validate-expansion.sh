#!/usr/bin/env bash
set -euo pipefail

root_dir=$(cd "$(dirname "$0")/.." && pwd)
cd "$root_dir"

echo "[Summary]"
plugins_total=$(find . -type f -path "*/.claude-plugin/plugin.json" | wc -l | tr -d ' ')
skills_total=$(find . -type f -name "SKILL.md" | wc -l | tr -d ' ')
echo "plugins_total=$plugins_total"
echo "skills_total=$skills_total"

echo
echo "[Distribution]"
echo "plugins by top-level dir:"
find . -type f -path "*/.claude-plugin/plugin.json" | sed 's#^\./##' | awk -F/ '{print $1}' | sort | uniq -c | awk '{printf "%5s  %s\n", $1, $2}'
echo "skills by top-level dir:"
find . -type f -name "SKILL.md" | sed 's#^\./##' | awk -F/ '{print $1}' | sort | uniq -c | awk '{printf "%5s  %s\n", $1, $2}'

echo
echo "[Duplicates Check]"
# plugins duplicate by plugin folder name
plugins_names=$(find . -type f -path "*/.claude-plugin/plugin.json" | sed 's#^\./##' | awk -F/ '{print $(NF-2)}' | sort)
dupe_plugins=$(printf "%s\n" "$plugins_names" | uniq -d || true)
if [ -n "$dupe_plugins" ]; then
  echo "Duplicate plugin names detected:"; printf "%s\n" "$dupe_plugins"
else
  echo "No duplicate plugin names"
fi

# skills duplicate by skill folder name (parent dir of SKILL.md)
skills_names=$(find . -type f -name "SKILL.md" | sed 's#^\./##' | awk -F/ '{print $(NF-1)}' | sort)
dupe_skills=$(printf "%s\n" "$skills_names" | uniq -d || true)
if [ -n "$dupe_skills" ]; then
  echo "Duplicate skill names detected:"; printf "%s\n" "$dupe_skills"
else
  echo "No duplicate skill names"
fi

echo
echo "[Confusion Check]"
# SKILL.md under plugins directories
confused_skills_in_plugins=$(rg -uu -n -l -g "**/SKILL.md" --no-messages "^" | grep -E "/plugins/" || true)
if [ -n "$confused_skills_in_plugins" ]; then
  echo "SKILL.md found under plugin directories:"; printf "%s\n" "$confused_skills_in_plugins"
else
  echo "No SKILL.md inside plugin directories"
fi

# plugin.json under skills directories
confused_plugins_in_skills=$(find cli-tool/skills-library temp_integration/v1.4_skills -type f -name "plugin.json" 2>/dev/null || true)
if [ -n "$confused_plugins_in_skills" ]; then
  echo "plugin.json found under skills directories:"; printf "%s\n" "$confused_plugins_in_skills"
else
  echo "No plugin.json inside skills directories"
fi

echo
echo "[Next]"
echo "- Add new Skills only under cli-tool/skills-library/**"
echo "- Add new Plugins under their own folder with .claude-plugin/plugin.json"
echo "- Re-run this script after each batch expansion"

