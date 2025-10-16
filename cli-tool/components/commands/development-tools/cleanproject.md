# Clean Project

I'll help clean up development artifacts while preserving your working code.

## Strategic Thinking Process

<think>
Before cleaning, I need to carefully consider:

1. **Artifact Identification**
   - What patterns indicate temporary/debug files?
   - Which files might look temporary but are actually important?
   - Are there project-specific conventions for temp files?
   - What about generated files that should be kept?

2. **Safety Analysis**
   - Which deletions are definitely safe?
   - Which require more careful inspection?
   - Are there active processes using these files?
   - Could removing these break the development environment?

3. **Common Pitfalls**
   - .env files might look like artifacts but contain config
   - .cache directories might be needed for performance
   - Some .tmp files might be active session data
   - Debug logs might contain important error information

4. **Cleanup Strategy**
   - Start with obvious artifacts (*.log, *.tmp, *~)
   - Check file age - older files are usually safer to remove
   - Verify with git status what's tracked vs untracked
   - Group similar files for batch decision making
</think>

Based on this analysis, I'll create a git checkpoint for safety:
```bash
git add -A
git commit -m "Pre-cleanup checkpoint" || echo "No changes to commit"
```

**Important**: I will NEVER:
- Add "Co-authored-by" or any Claude signatures
- Include "Generated with Claude Code" or similar messages
- Modify git config or user credentials
- Add any AI/assistant attribution to the commit
- Use emojis in commits, PRs, or git-related content

I'll identify cleanup targets using native tools:
- **Glob tool** to find temporary and debug files
- **Grep tool** to detect debug statements in code
- **Read tool** to verify file contents before removal

Critical directories are automatically protected:
- .claude directory (commands and configurations)
- .git directory (version control)
- node_modules, vendor (dependency directories)
- Essential configuration files

When I find multiple items to clean, I'll create a todo list to process them systematically.

I'll show you what will be removed and why before taking action:
- Debug/log files and temporary artifacts
- Failed implementation attempts
- Development-only files
- Debug statements in code

After cleanup, I'll verify project integrity and report what was cleaned.

If any issues occur, I can restore from the git checkpoint created at the start.

This keeps only clean, working code while maintaining complete safety.