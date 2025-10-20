# Fix PR Comments

## Description

Automatically fetch and address all unresolved comments from the current branch's pull request. This command streamlines the PR review process by identifying feedback that needs attention and helping you systematically address each comment.

## Usage

```bash
/fix-pr
```

## What This Command Does

1. Identifies the current branch's associated pull request
2. Fetches all unresolved/outstanding review comments
3. Analyzes each comment to understand the requested changes
4. Implements fixes for each comment systematically
5. Creates appropriate commits for the changes
6. Updates the PR with the fixes

## Prerequisites

- GitHub CLI (`gh`) must be installed and authenticated
- You must be on a branch with an associated pull request
- The PR must have unresolved review comments

## Best Practices

### Addressing Comments
- Read all comments first to understand the full scope
- Group related comments together when fixing
- Test each fix before committing
- Reference the specific comment in your commit message

### Communication
- Reply to comments after fixing to notify reviewers
- If you disagree with a comment, start a discussion
- Mark comments as resolved only after fixes are pushed
- Request re-review after addressing all comments

### Commit Strategy
- Create separate commits for logically distinct fixes
- Use descriptive commit messages that reference the review feedback
- Keep commits focused on addressing review comments
- Example: "fix: address review comment - improve error handling"

## Command Flow

1. **Identify PR**:
   ```bash
   gh pr view --json number,headRefName,reviewDecision
   ```

2. **Fetch Comments**:
   ```bash
   gh pr view --json reviewComments
   ```

3. **Analyze Each Comment**:
   - Location (file, line number)
   - Feedback content
   - Priority/severity
   - Related comments

4. **Implement Fixes**:
   - Address each comment systematically
   - Test the changes
   - Commit with appropriate message

5. **Update PR**:
   - Push changes
   - Reply to comments
   - Request re-review if needed

## Examples

### Example 1: Addressing Multiple Comments

```
Comments found:
1. src/auth.js:45 - "Should use async/await instead of promises"
2. src/auth.js:67 - "Missing error handling for network failures"
3. tests/auth.test.js:23 - "Add test case for timeout scenario"

Implementing fixes:
✓ Refactored auth.js to use async/await
✓ Added comprehensive error handling
✓ Added timeout test case

Commits created:
- refactor: convert promise chains to async/await
- fix: add error handling for network failures
- test: add timeout scenario coverage
```

### Example 2: Complex Refactoring

```
Comment: "This function is too complex, consider breaking it down"

Analysis:
- Function has 150 lines
- Multiple responsibilities
- Hard to test

Fix strategy:
1. Extract helper functions
2. Separate concerns
3. Add unit tests for each helper
4. Update integration tests

Result: 1 large function → 5 focused functions with individual tests
```

## Error Handling

### No PR Found
If the current branch doesn't have an associated PR:
```
Error: No pull request found for branch 'feature-branch'
Suggestion: Create a PR first with: gh pr create
```

### No Unresolved Comments
If all comments are already resolved:
```
✓ All review comments have been addressed!
No action needed.
```

### Permission Issues
If you don't have write access:
```
Error: Insufficient permissions to update this PR
Suggestion: Contact the repository maintainer
```

## Related Commands

- `/repro-issue` - Reproduce an issue in a failing test
- `/fix-issue` - Fix a specific GitHub issue
- `/fix-flakey-test` - Address flaky test failures

## Tips

1. **Review All Comments First**: Don't fix in isolation, understand the full context
2. **Ask Questions**: If a comment is unclear, ask for clarification before fixing
3. **Test Thoroughly**: Ensure your fixes don't break existing functionality
4. **Document Changes**: Update documentation if the fixes change behavior
5. **Communicate**: Keep reviewers informed of your progress

## Notes

- This command respects your project's git workflow (branch protection, required reviews, etc.)
- Pre-commit hooks will run for each commit created
- The command will stop if tests fail after implementing a fix
- You can run `/fix-pr` multiple times as new comments are added
