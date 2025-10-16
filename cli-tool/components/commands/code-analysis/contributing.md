# Complete Contribution Strategy - Context Aware

I'll analyze everything needed for your successful contribution based on your current context and work.

## Strategic Thinking Process

<think>
For a successful contribution, I need to analyze:

1. **Current Work Context**
   - What has been done in this session?
   - Are we mid-implementation or post-completion?
   - What type of changes were made (feature, fix, refactor)?
   - Is the work ready for contribution?

2. **Project Type & Standards**
   - Is this open source, company, or personal project?
   - What are the contribution guidelines?
   - Are there specific workflows to follow?
   - What quality gates exist (tests, lint, reviews)?

3. **Contribution Strategy**
   - Should this be one PR or multiple?
   - Which issues does this work address?
   - What documentation needs updating?
   - Who should review this?

4. **Pre-flight Checklist**
   - Do all tests pass?
   - Is the code properly formatted?
   - Are there any lint warnings?
   - Is documentation updated?
   - Are commits well-organized?
</think>

Based on this framework, I'll begin by detecting your context:

**Context Detection First:**
Let me understand what situation you're in:

1. **Active Session Context** (you've been implementing):
   - Read CLAUDE.md for session goals and work done
   - Analyze ALL files modified during session
   - Check if tests were run and passed
   - Review commits made during session
   - Understand the complete scope of changes

2. **Post-Implementation Context** (feature complete):
   - Detect completed features/fixes
   - Check test coverage for new code
   - Verify documentation was updated
   - Analyze code quality and standards

3. **Mid-Development Context** (work in progress):
   - Identify what's done vs. TODO
   - Check partial implementations
   - Assess readiness for contribution

4. **Cold Start Context** (no recent work):
   - Analyze existing uncommitted changes
   - Review branch differences from main
   - Understand project state

**Smart Context Analysis:**
Based on what I find, I'll adapt my approach:
- **Session work**: Package all session changes properly
- **Multiple features**: Suggest splitting into PRs
- **Bug fixes**: Fast-track simple contributions
- **Major changes**: Full contribution workflow

**Phase 0: MANDATORY Pre-Flight Checks**
BEFORE anything else, I MUST verify:
- **Build passes**: Run project's build command
- **Tests pass**: All tests must be green
- **Lint passes**: No linting errors
- **Type check passes**: If TypeScript/Flow/etc
- **Format check**: Code properly formatted

If ANY check fails → STOP and fix first!

**Phase 1: Deep Context Analysis**
I'll understand EVERYTHING about your situation:

**A. Session Context** (if you've been working):
- Read CLAUDE.md for complete session history
- Analyze ALL files changed during session
- Check test results from `/test` runs
- Review any `/review` or `/security-scan` results
- Understand features implemented

**B. Cold Start Context** (running standalone):
- Run `/understand` to map entire codebase
- Analyze all local commits vs remote
- Detect uncommitted changes
- Compare fork with upstream (if applicable)
- Identify what makes your version unique

**C. Implementation Context**:
- Multiple features completed → Smart PR splitting
- Bug fixes done → Link to issue tracker
- Tests added → Update coverage reports
- Docs updated → Ensure consistency

**Phase 2: Project Type Detection**
I'll identify what kind of project this is:
- **Open Source**: Full CONTRIBUTING.md compliance needed
- **Company/Team**: Internal standards and workflows
- **Personal**: Your own conventions
- **Fork**: Upstream project requirements
- **Client Work**: Specific deliverables

**Phase 3: Repository Standards Analysis**
Based on project type, I'll examine:
- **Read** CONTRIBUTING.md, README.md, CHANGELOG.md, LICENSE files
- **Analyze** .github workflows, issue templates, PR templates
- **Check** code patterns, naming conventions, architectural decisions
- **Review** commit history for maintainer preferences and patterns
- **Detect** specific requirements (DCO, CLA, tests, docs)

**Phase 4: Smart Comparison**
I'll compare your work against requirements:
- **Feature Completeness**: All acceptance criteria met?
- **Test Coverage**: New code properly tested?
- **Documentation**: Features documented?
- **Code Standards**: Follows project style?
- **Breaking Changes**: Handled properly?

**Phase 5: Context-Aware Action Plan**
Based on your specific situation:

**If you just finished a session:**
- Package all session work into coherent PR(s)
- Generate comprehensive test report
- Create session-based PR description
- Link to issues mentioned in session

**If you have multiple features:**
- Suggest logical PR splits
- Order PRs by dependencies
- Create issue tracking for each

**If contributing to open source:**
- Full CONTRIBUTING.md compliance check
- DCO/CLA signature verification
- Community guidelines adherence
- Issue linkage and proper labels

**Phase 6: Intelligent Remote Repository Scanning**
I'll do a DEEP scan of the remote repository to maximize PR acceptance:

**Automatic Issue Discovery & Linking:**
When you've made changes, I'll search for:
- **Bug Reports**: "error", "bug", "broken" + your fixed files
- **Feature Requests**: "feature", "enhancement" + your implementations
- **Improvements**: "performance", "refactor" + your optimizations
- **Documentation**: "docs", "readme" + your doc updates

**Smart Matching Algorithm:**
For each change you made, I'll:
1. Extract keywords from your code changes
2. Search remote issues for matches
3. Analyze issue descriptions and comments
4. Find the BEST matches to link

**Proactive Issue Creation:**
If NO matching issues exist, I'll:
1. Detect what type of change (bug fix, feature, etc.)
2. Use project's issue templates
3. Create issues in project's style (NO EMOJIS):
   - Bug: Steps to reproduce, expected vs actual
   - Feature: User story, benefits, implementation  
   - Enhancement: Current vs improved behavior
   - Professional tone: Direct, factual, concise
4. Follow project's labeling conventions

**Git Workflow Detection:**
I'll analyze the project's workflow:
- **Git Flow**: feature/*, hotfix/*, release/*
- **GitHub Flow**: feature branches → main
- **GitLab Flow**: environment branches
- **Custom**: Detect from existing PRs

**Smart PR Strategy:**
Based on what I find:
- **Issues exist**: Link with "Fixes #X", "Closes #Y"
- **No issues**: Create them first, then link
- **Multiple issues**: One PR per issue or grouped logically
- **Discussion threads**: Reference with "See #Z"

**PR/Issue Style:**
- **Concise titles**: "Fix auth validation bug" not "Fixed the authentication validation bug that was causing issues"
- **Bullet points**: Use lists, not paragraphs
- **No emojis**: Professional tone only
- **Direct language**: "This PR fixes X" not "I hope this PR might help with X"
- **Match project tone**: Analyze existing PRs for style

**Phase 7: Smart Decision Tree**
When I find multiple items, I'll create a todo list with prioritized actions:
- **Critical items** that could block PR acceptance
- **Recommended improvements** for better approval chances
- **Optional enhancements** based on project patterns

I'll provide specific guidance:
- Exact files to update and how
- Required documentation changes
- Testing strategies that fit the project
- PR description template following project standards

**Context-Based Options**: "How should we proceed?"

**For session work:**
- "Package session work into PR" - I'll create PR from all session changes
- "Create issues for TODOs" - Track remaining work
- "Split into multiple PRs" - If you did multiple features

**For open source contributions:**
- "Full compliance check & PR" - Complete CONTRIBUTING workflow
- "Create tracking issues first" - For complex features
- "Quick fix PR" - For simple bug fixes

**For team/company projects:**
- "Follow internal process" - Your team's specific workflow
- "Create feature branch PR" - Standard git flow
- "Deploy to staging first" - If required

**Smart PR Creation:**
Based on context, I'll:
- Use session summary for PR description
- Include test results automatically
- Link to related issues/discussions
- Follow project's PR template exactly
- Add appropriate labels and reviewers

**Automated Workflow Options:**

**Option 1: "Full Auto-Deploy with Issue Management"**:
```bash
# I'll automatically:
1. RUN ALL CHECKS FIRST:
   - Build must pass
   - All tests must pass
   - Lint must pass
   - Type check must pass
2. Only if ALL pass, then:
3. Scan remote for ALL related issues
4. Create missing issues for your changes
5. Update CHANGELOG.md 
6. Create proper branch (feature/fix/etc)
7. Push changes
8. Create PR with:
   - Links to all related issues
   - "Fixes #123" for bugs
   - "Implements #456" for features
   - Perfect description following template
9. Add labels and request reviewers
```

**Option 2: "Prepare Everything"** (review before push):
```bash
# I'll prepare but let you review:
1. Stage all changes properly
2. Generate PR description
3. Create issue links
4. Show you everything before push
```

**Option 3: "Just Analyze"** (see what needs doing):
```bash
# I'll analyze and report:
1. What's ready vs. what's missing
2. Compliance gaps
3. Suggested improvements
4. Issue opportunities
```

**Fork-Specific Intelligence:**
- Compare with upstream changes
- Suggest rebasing if needed
- Identify conflicts early
- Format for upstream acceptance

**Intelligent Session Analysis Example:**
If you've been working and made changes:
```
You: /contributing

Me: Analyzing your session...
- Found: You fixed auth bug in UserService.js
- Found: You added rate limiting feature
- Found: You improved performance in API

Scanning remote repository...
- Issue #45: "Auth fails randomly" → Your fix addresses this!
- Issue #67: "Need rate limiting" → You implemented this!
- No issue for performance improvement → I'll create one

Options:
1. Create issue for performance + 3 PRs (one per issue)
2. Create issue + 1 PR fixing all three
3. Just prepare everything for review
```

**Post-Implementation Auto-Actions:**
- Scan remote for linkable issues
- Create missing issues automatically
- Run `/format` on all changed files
- Run `/test` to ensure everything passes
- Run `/docs` to update documentation
- Create PR with maximum context

**Important**: I will NEVER:
- Add "Created by Claude" or any AI attribution to issues/PRs
- Include "Generated with Claude Code" in descriptions
- Modify repository settings or permissions
- Add any AI/assistant signatures or watermarks
- Use emojis in PRs, issues, or commit messages
- Be unnecessarily verbose in descriptions
- Add flowery language or excessive explanations
- **PUSH TO GITHUB WITHOUT PASSING TESTS**
- **CREATE PR IF BUILD IS BROKEN**
- **SUBMIT CODE WITH LINT ERRORS**

**Professional Standards:**
- **Be concise**: Get to the point quickly
- **Be objective**: Facts over feelings
- **Follow project style**: Match existing PR/issue tone
- **No emojis**: Keep it professional
- **Clear and direct**: What changed and why
- **Practical focus**: Implementation details that matter

This ensures maximum probability of PR acceptance by following all project standards and community expectations while avoiding duplicate work.