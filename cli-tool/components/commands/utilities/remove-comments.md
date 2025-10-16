# Remove Obvious Comments

I'll clean up redundant comments while preserving valuable documentation.

## Analysis Process

I'll identify files with comments using:
- **Glob** to find source files
- **Read** to examine comment patterns
- **Grep** to locate specific comment types

**Comments I'll Remove:**
- Simply restate what the code does
- Add no value beyond the code itself
- State the obvious (like "constructor" above a constructor)

**Comments I'll Preserve:**
- Explain WHY something is done
- Document complex business logic
- Contain TODOs, FIXMEs, or HACKs
- Warn about non-obvious behavior
- Provide important context

## Review Process

For each file with obvious comments, I'll:
1. Show you the redundant comments I found
2. Explain why they should be removed
3. Show the cleaner version
4. Apply the changes after your confirmation

**Important**: I will NEVER:
- Add "Co-authored-by" or any Claude signatures
- Include "Generated with Claude Code" or similar messages
- Modify git config or user credentials
- Add any AI/assistant attribution to the commit

This creates cleaner, more maintainable code where every comment has real value.