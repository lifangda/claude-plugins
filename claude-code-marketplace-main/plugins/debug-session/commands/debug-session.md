---
allowed-tools: Bash(ps:*), Bash(netstat:*), Bash(top:*)
description: Start a comprehensive debugging session
---

## System Context

- Running processes: !`ps aux | grep -E "(node|python|java)" | head -10`
- Port usage: !`netstat -tlnp | head -10`
- System resources: !`top -b -n1 | head -20`

## Your task

I'm experiencing an issue: $ARGUMENTS

Help me debug this systematically:

1. **Analyze the problem**: Break down the issue
2. **Check logs**: Suggest relevant log files to examine
3. **System state**: Analyze current system state
4. **Reproduction steps**: Help create minimal reproduction
5. **Solution strategy**: Propose debugging approach

Provide step-by-step debugging instructions.