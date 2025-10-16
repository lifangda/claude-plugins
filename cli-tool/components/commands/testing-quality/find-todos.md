# Find Development Tasks

I'll locate all TODO comments and unfinished work markers in your codebase.

I'll use the Grep tool to efficiently search for task markers with context:
- Pattern: "TODO|FIXME|HACK|XXX|NOTE"
- Case insensitive search across all source files
- Show surrounding lines for better understanding

For each marker found, I'll show:
1. **File location** with line number
2. **The full comment** with context
3. **Surrounding code** to understand what needs to be done
4. **Priority assessment** based on the marker type

When I find multiple items, I'll create a todo list to organize them by priority:
- **Critical** (FIXME, HACK, XXX): Issues that could cause problems
- **Important** (TODO): Features or improvements needed
- **Informational** (NOTE): Context that might need attention

I'll also identify:
- TODOs that reference missing implementations
- Placeholder code that needs replacement
- Incomplete error handling
- Stubbed functions awaiting implementation

After scanning, I'll ask: "Convert these to GitHub issues?"
- Yes: I'll create properly categorized issues
- Todos only: I'll maintain the local todo list
- Summary: I'll provide organized report

**Important**: I will NEVER:
- Add "Created by Claude" or any AI attribution to issues
- Include "Generated with Claude Code" in descriptions
- Modify repository settings or permissions
- Add any AI/assistant signatures or watermarks

This helps track and prioritize unfinished work systematically.