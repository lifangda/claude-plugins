# TODOs to GitHub Issues

I'll scan your codebase for TODO comments and create professional GitHub issues following your project's standards.

First, let me analyze your complete project context:

**Documentation Analysis:**
- **Read** README.md for project overview and conventions
- **Read** CONTRIBUTING.md for contribution guidelines
- **Read** CODE_OF_CONDUCT.md for community standards
- **Read** .github/ISSUE_TEMPLATE/* for issue formats
- **Read** .github/PULL_REQUEST_TEMPLATE.md for PR standards
- **Read** docs/ folder for technical documentation

**Project Context:**
- Repository type (fork, personal, organization)
- Main language and framework conventions
- Testing requirements and CI/CD setup
- Branch strategy and release process
- Team workflow and communication style

**For Forks - Remote Analysis:**
```bash
# Get upstream repository info
git remote -v | grep upstream
# Fetch latest upstream guidelines
git fetch upstream main:upstream-main 2>/dev/null || true
```

I'll read upstream's CONTRIBUTING.md and issue templates to ensure compatibility.

Then verify GitHub setup:

```bash
# Check if we're in a git repository with GitHub remote
if ! git remote -v | grep -q github.com; then
    echo "Error: No GitHub remote found"
    echo "This command requires a GitHub repository"
    exit 1
fi

# Check for gh CLI
if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) not found"
    echo "Install from: https://cli.github.com"
    exit 1
fi

# Verify authentication
if ! gh auth status &>/dev/null; then
    echo "Error: Not authenticated with GitHub"
    echo "Run: gh auth login"
    exit 1
fi
```

Now I'll scan for TODO patterns and analyze their context:

Using native tools for comprehensive analysis:
- **Grep tool** to find TODO/FIXME/HACK patterns
- **Read tool** to understand code context
- **Glob tool** to check project structure

**MANDATORY Pre-Checks:**
Before creating ANY GitHub issues, I MUST:
1. Run build command - Must pass
2. Run all tests - Must be green
3. Run linter - No errors allowed
4. Verify code compiles without warnings

If ANY check fails → I'll STOP and help fix it first!

I'll intelligently analyze each TODO:
1. Understand the technical context and implementation
2. Determine priority based on impact and location
3. Group related TODOs for better organization
4. Create professional issue titles and descriptions

**For fork repositories:**
- Follow upstream contribution guidelines
- Use their issue templates and conventions
- Reference relevant upstream issues
- Maintain compatibility with main project

**For team/org repositories:**
- Apply company coding standards
- Use established labels and milestones
- Follow team workflow practices
- Link to relevant documentation

**Issue creation strategy:**
- Titles matching project's naming conventions
- Descriptions following discovered templates
- Labels from existing project taxonomy
- Milestone alignment with project roadmap
- Language style matching documentation tone

**Smart Issue Type Detection:**
I'll analyze each TODO to determine the correct issue type:

**Bug Issues** (bug label):
- TODO/FIXME about errors, crashes, incorrect behavior
- Keywords: fix, bug, broken, error, crash, wrong, incorrect
- Will include: steps to reproduce, expected vs actual behavior

**Feature Requests** (enhancement label):
- TODO about new functionality or improvements
- Keywords: add, implement, create, new, feature, support
- Will include: use case, benefits, implementation approach

**Documentation** (documentation label):
- TODO about missing or outdated docs
- Keywords: document, docs, README, explain, describe
- Will include: what needs documenting, why it's important

**Performance** (performance label):
- TODO about optimization, speed, memory
- Keywords: optimize, slow, performance, cache, improve
- Will include: current metrics, expected improvement

**Security** (security label):
- TODO about vulnerabilities, validation, auth
- Keywords: security, validate, sanitize, auth, permission
- Will include: risk level, potential impact

**Technical Debt** (tech-debt label):
- TODO about refactoring, cleanup, architecture
- Keywords: refactor, cleanup, reorganize, technical debt
- Will include: current issues, proposed solution

**Chore/Maintenance** (chore label):
- TODO about updates, dependencies, tooling
- Keywords: update, upgrade, migrate, deprecate
- Will include: what needs updating, timeline

I'll also:
- Group related TODOs into single issues when appropriate
- Set priority based on keywords (CRITICAL, HIGH, TODO, NOTE)
- Link to exact code location
- Use project's existing labels if different

I'll handle rate limits and show you a summary of all created issues.

**Important**: I will NEVER:
- Add "Created by Claude" or any AI attribution to issues
- Include "Generated with Claude Code" in issue descriptions
- Modify repository settings or permissions
- Add any AI/assistant signatures or watermarks
- Use emojis in issues, PRs, or git-related content

This helps convert your development notes into trackable work items.