# Documentation Manager

I'll intelligently manage your project documentation by analyzing what actually happened and updating ALL relevant docs accordingly.

**My approach:**
1. **Analyze our entire conversation** - Understand the full scope of changes
2. **Read ALL documentation files** - README, CHANGELOG, docs/*, guides, everything
3. **Identify what changed** - Features, architecture, bugs, performance, security, etc
4. **Update EVERYTHING affected** - Not just one file, but all relevant documentation
5. **Maintain consistency** - Ensure all docs tell the same story

**I won't make assumptions** - I'll look at what ACTUALLY changed and update accordingly.
If you refactored the entire architecture, I'll update architecture docs, README, migration guides, API docs, and anything else affected.

## Mode 1: Documentation Overview (Default)

When you run `/docs` without context, I'll:
- **Glob** all markdown files (README, CHANGELOG, docs/*)
- **Read** each documentation file
- **Analyze** documentation coverage
- **Present** organized summary

Output format:
```
DOCUMENTATION OVERVIEW
├── README.md - [status: current/outdated]
├── CHANGELOG.md - [last updated: date]
├── CONTRIBUTING.md - [completeness: 85%]
├── docs/
│   ├── API.md - [status]
│   └── architecture.md - [status]
└── Total coverage: X%

KEY FINDINGS
- Missing: Setup instructions
- Outdated: API endpoints (3 new ones)
- Incomplete: Testing guide
```

## Mode 2: Smart Update

When you run `/docs update` or after implementations, I'll:

1. **Run `/understand`** to analyze current codebase
2. **Compare** code reality vs documentation
3. **Identify** what needs updating:
   - New features not documented
   - Changed APIs or interfaces
   - Removed features still in docs
   - New configuration options
   - Updated dependencies

4. **Update systematically:**
   - README.md with new features/changes
   - CHANGELOG.md with version entries
   - API docs with new endpoints
   - Configuration docs with new options
   - Migration guides if breaking changes

## Mode 3: Session Documentation

When run after a long coding session, I'll:
- **Analyze conversation history**
- **List all changes made**
- **Group by feature/fix/enhancement**
- **Update appropriate docs**

Updates will follow your project's documentation style and conventions, organizing changes by type (Added, Fixed, Changed, etc.) in the appropriate sections.

## Mode 4: Context-Aware Updates

Based on what happened in session:
- **After new feature**: Update README features, add to CHANGELOG
- **After bug fixes**: Document in CHANGELOG, update troubleshooting
- **After refactoring**: Update architecture docs, migration guide
- **After security fixes**: Update security policy, CHANGELOG
- **After performance improvements**: Update benchmarks, CHANGELOG

## Smart Documentation Rules

1. **Preserve custom content** - Never overwrite manual additions
2. **Match existing style** - Follow current doc formatting
3. **Semantic sections** - Add to correct sections
4. **Version awareness** - Respect semver in CHANGELOG
5. **Link updates** - Fix broken internal links

## Integration with Commands

Works seamlessly with:
- `/understand` - Get current architecture first
- `/contributing` - Update contribution guidelines
- `/test` - Document test coverage changes
- `/scaffold` - Add new component docs
- `/security-scan` - Update security documentation

## Documentation Rules

**ALWAYS:**
- Read existing docs completely before any update
- Find the exact section that needs updating
- Update in-place, never duplicate
- Preserve custom content and formatting
- Only create new docs if absolutely essential (README missing, etc)

**Preserve sections:**
```markdown
<!-- CUSTOM:START -->
User's manual content preserved
<!-- CUSTOM:END -->
```

**Smart CHANGELOG:**
- Groups changes by type
- Suggests version bump (major/minor/patch)
- Links to relevant PRs/issues
- Maintains chronological order

**Important**: I will NEVER:
- Delete existing documentation
- Overwrite custom sections
- Change documentation style drastically
- Add AI attribution markers
- Create unnecessary documentation

After analysis, I'll ask: "How should I proceed?"
- Update all outdated docs
- Focus on specific files
- Create missing documentation
- Generate migration guide
- Skip certain sections

## Additional Scenarios & Integrations

### When to Use /docs

Simply run `/docs` after any significant work:
- After `/understand` - Ensure docs match code reality
- After `/fix-todos` or bug fixes - Update all affected documentation
- After `/scaffold` or new features - Document what was added
- After `/security-scan` or `/review` - Document findings and decisions
- After major refactoring - Update architecture, migration guides, everything

**I'll figure out what needs updating based on what actually happened, not rigid rules.**

### Documentation Types
I can manage:
- **API Documentation** - Endpoints, parameters, responses
- **Database Schema** - Tables, relationships, migrations
- **Configuration** - Environment variables, settings
- **Deployment** - Setup, requirements, procedures
- **Troubleshooting** - Common issues and solutions
- **Performance** - Benchmarks, optimization guides
- **Security** - Policies, best practices, incident response

### Smart Features
- **Version Detection** - Auto-increment version numbers
- **Breaking Change Alert** - Warn when docs need migration guide
- **Cross-Reference** - Update links between docs
- **Example Generation** - Create usage examples from tests
- **Diagram Updates** - Update architecture diagrams (text-based)
- **Dependency Tracking** - Document external service requirements

### Team Collaboration
- **PR Documentation** - Generate docs for pull requests
- **Release Notes** - Create from CHANGELOG for releases
- **Onboarding Docs** - Generate from project analysis
- **Handoff Documentation** - Create when changing teams
- **Knowledge Transfer** - Document before leaving project

### Quality Checks
- **Doc Coverage** - Report undocumented features
- **Freshness Check** - Flag stale documentation
- **Consistency** - Ensure uniform style across docs
- **Completeness** - Verify all sections present
- **Accuracy** - Compare docs vs actual implementation

### Smart Command Combinations

**After analyzing code:**
```bash
/understand && /docs
# Analyzes entire codebase, then updates docs to match reality
```

**After fixing technical debt:**
```bash
/fix-todos && /test && /docs
# Fixes TODOs, verifies everything works, documents changes
```

**After major refactoring:**
```bash
/fix-imports && /format && /docs
# Fixes imports, formats code, updates architecture docs
```

**Before creating PR:**
```bash
/review && /docs
# Reviews code, then ensures docs reflect any issues found
```

**After adding features:**
```bash
/scaffold component && /test && /docs
# Creates component, tests it, documents the new API
```

### Simple Usage

Just run `/docs` and I'll figure out what you need:
- Fresh project? I'll show what docs exist
- Just coded? I'll update the relevant docs
- Long session? I'll document everything
- Just fixed bugs? I'll update CHANGELOG

No need to remember arguments - I understand context!

This keeps your documentation as current as your code while supporting your entire development lifecycle.