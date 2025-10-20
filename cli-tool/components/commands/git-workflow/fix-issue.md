# Fix GitHub Issue

## Description

Analyze and fix a specific GitHub issue by understanding the problem, implementing a solution, writing tests, and creating a pull request. This command provides a structured approach to issue resolution with comprehensive testing and documentation.

## Usage

```bash
/fix-issue <issue-number>
/fix-issue #123
/fix-issue 456
```

## What This Command Does

1. Fetches issue details from GitHub (title, description, labels, comments)
2. Analyzes the problem and identifies root cause
3. Creates a feature/bugfix branch
4. Implements a solution with appropriate tests
5. Verifies the fix resolves the issue
6. Creates a pull request linked to the issue
7. Updates issue with progress

## Prerequisites

- GitHub CLI (`gh`) must be installed and authenticated
- Valid issue number in the current repository
- Appropriate permissions to create branches and PRs

## Command Flow

### 1. Issue Analysis Phase

```bash
gh issue view <issue-number> --json title,body,labels,comments
```

**Analyze**:
- Issue description and reproduction steps
- Error messages and stack traces
- Expected vs actual behavior
- Related issues or PRs
- User comments and context

### 2. Planning Phase

**Determine**:
- Issue type (bug, feature, enhancement, etc.)
- Scope of changes required
- Affected components/files
- Testing strategy
- Breaking changes (if any)

### 3. Implementation Phase

**Create branch**:
```bash
git checkout -b fix-issue-<number>-<brief-description>
# Example: fix-issue-123-memory-leak
```

**Implement solution**:
- Write failing test first (for bugs)
- Implement minimal fix
- Ensure all tests pass
- Add documentation if needed

### 4. Verification Phase

**Validate fix**:
- Run full test suite
- Manual testing if applicable
- Check for regressions
- Verify issue is resolved
- Performance impact assessment

### 5. PR Creation Phase

```bash
gh pr create --title "Fix: <issue title>" \
             --body "Fixes #<issue-number>\n\n<description>" \
             --assignee @me
```

## Best Practices

### Issue Analysis
- Read all comments to understand context
- Check for duplicate or related issues
- Verify the issue is reproducible
- Ask clarifying questions if needed

### Solution Design
- Keep the fix minimal and focused
- Avoid scope creep
- Consider edge cases
- Think about backwards compatibility

### Testing
- Write tests before fixing (TDD)
- Cover the reported issue specifically
- Add regression tests
- Test edge cases

### Documentation
- Update relevant documentation
- Add code comments for complex logic
- Update CHANGELOG if applicable
- Document breaking changes

### Commit Messages
```
fix: resolve memory leak in event handlers

- Remove event listeners on component unmount
- Add cleanup in useEffect hooks
- Add tests for memory leak scenario

Fixes #123
```

## Examples

### Example 1: Bug Fix

```
Issue #123: "Memory leak when rapidly switching pages"

Analysis:
- Event listeners not cleaned up
- Subscriptions persist after unmount
- Memory grows 10MB per page switch

Solution:
1. Add cleanup functions to useEffect hooks
2. Implement proper listener removal
3. Add memory leak detection test

Result:
- Memory usage stable
- Tests pass
- Issue resolved
```

### Example 2: Feature Request

```
Issue #456: "Add dark mode support"

Analysis:
- Need theme toggle
- Persist user preference
- Update all components

Solution:
1. Create theme context
2. Add toggle component
3. Update color palette
4. Add localStorage persistence
5. Test theme switching

Result:
- Dark mode implemented
- Preference saved
- All components themed
```

### Example 3: Performance Issue

```
Issue #789: "Dashboard loads slowly with large datasets"

Analysis:
- No pagination
- Loading all data at once
- Inefficient rendering

Solution:
1. Implement virtual scrolling
2. Add pagination
3. Optimize queries
4. Add loading states

Result:
- 10x faster load time
- Smooth scrolling
- Better UX
```

## Error Handling

### Issue Not Found
```
Error: Issue #123 not found
Suggestion: Verify the issue number and repository
```

### Issue Already Closed
```
Warning: Issue #123 is already closed
Proceed anyway? (y/n)
```

### Issue In Progress
```
Warning: Issue #123 is already assigned to another developer
Proceed anyway? (y/n)
```

### Cannot Reproduce
```
Cannot reproduce the issue as described.
Actions:
1. Add comment requesting more information
2. Label as "needs-reproduction"
3. Wait for reporter response
```

## Issue Types and Strategies

### Bugs
- Reproduce the issue first
- Write failing test
- Fix with minimal changes
- Verify fix resolves issue

### Features
- Understand requirements
- Design API/interface
- Implement incrementally
- Add comprehensive tests

### Enhancements
- Understand current behavior
- Design improvement
- Ensure backwards compatibility
- Update documentation

### Performance
- Profile and measure first
- Identify bottleneck
- Optimize targeted area
- Verify improvement

## Related Commands

- `/repro-issue` - Create failing test for an issue
- `/fix-pr` - Address PR review comments
- `/fix-flakey-test` - Fix intermittent test failures
- `/tdd` - Test-driven development workflow

## PR Template Integration

The command will use your repository's PR template and include:

```markdown
## Description
Fixes #{issue-number}: {issue-title}

## Changes
- {list of changes}

## Testing
- {testing performed}

## Screenshots (if applicable)
{screenshots}

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Changelog updated
```

## Tips

1. **Start Small**: Fix the issue with minimal changes first
2. **Test First**: Write the test before the fix (TDD)
3. **Ask Questions**: If unclear, ask in the issue comments
4. **Stay Focused**: Don't fix unrelated issues in the same PR
5. **Document**: Update docs if behavior changes
6. **Communicate**: Keep issue updated with progress
7. **Review**: Self-review before requesting review

## Notes

- The command creates a new branch for each issue
- Commits follow conventional commit format
- Pre-commit hooks run for all commits
- The PR is automatically linked to the issue
- Issue is updated with PR link
- Labels are preserved from issue to PR
