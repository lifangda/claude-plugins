# Start Coding Session

I'll begin a documented coding session using Claude Code CLI's memory system.

I'll integrate with the native memory system by updating CLAUDE.md:
- Session timestamp and context
- Current git state and branch
- Session goals and objectives
- Progress tracking throughout our work

Let me check for existing memory files and update them appropriately:
- Project memory (./CLAUDE.md) for team-shared context
- User memory (~/.claude/CLAUDE.md) for personal session tracking

Please tell me:
1. What are we working on today?
2. What specific goals do you want to accomplish?
3. Any context I should know about?

I'll add this session context to your memory system using the `/memory` command functionality, ensuring our progress is tracked and can be resumed later. This integrates seamlessly with Claude Code CLI's native memory management rather than creating a separate system.

**Important**: I will NEVER:
- Add "Co-authored-by" or any Claude signatures
- Include "Generated with Claude Code" or similar messages
- Modify git config or user credentials
- Add any AI/assistant attribution to the commit

The session context will be preserved in the appropriate CLAUDE.md file for future reference and continuation.