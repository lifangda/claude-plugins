# Reproduce Issue in Test

## Description

Create a failing test that reproduces a specific GitHub issue or bug report. This command helps ensure issues are properly understood and verified before attempting to fix them, following the Test-Driven Development (TDD) principle.

## Usage

```bash
/repro-issue <issue-number>
/repro-issue #123
/repro-issue 456
```

## What This Command Does

1. Fetches issue details from GitHub
2. Analyzes the bug report and reproduction steps
3. Identifies the appropriate test file/suite
4. Creates a failing test that demonstrates the bug
5. Verifies the test fails for the right reason
6. Documents the expected vs actual behavior
7. Commits the test (without fixing the bug)

## Prerequisites

- GitHub CLI (`gh`) must be installed and authenticated
- Valid issue number in the current repository
- Understanding of the project's testing framework

## Command Flow

### 1. Issue Analysis Phase

```bash
gh issue view <issue-number> --json title,body,labels
```

**Extract**:
- Bug description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Error messages

### 2. Test Design Phase

**Determine**:
- Which component/module is affected
- Appropriate test file location
- Test type (unit/integration/e2e)
- Minimal reproduction scenario
- Test framework specifics

### 3. Test Implementation Phase

**Create test**:
```javascript
describe('Issue #123: Memory leak in event handlers', () => {
  it('should clean up event listeners on unmount', () => {
    // Setup: Create component with event listeners
    const component = mount(<MyComponent />);
    const initialListeners = getEventListenerCount();

    // Exercise: Mount and unmount multiple times
    for (let i = 0; i < 10; i++) {
      component.unmount();
      component = mount(<MyComponent />);
    }

    // Verify: Listener count should not grow
    const finalListeners = getEventListenerCount();
    expect(finalListeners).toBe(initialListeners);
    // This will FAIL, demonstrating the bug
  });
});
```

### 4. Verification Phase

**Run test and verify**:
- Test fails (as expected)
- Failure message is clear
- Test isolates the specific issue
- No side effects on other tests

### 5. Documentation Phase

**Add context**:
- Link to GitHub issue in test description
- Document expected behavior
- Note any workarounds tried
- Add labels/tags for filtering

## Best Practices

### Test Design

1. **Keep it minimal**: Only test what's necessary to reproduce the bug
2. **Make it deterministic**: Test should fail consistently
3. **Clear naming**: Test name should describe the issue
4. **Good assertions**: Assert the expected behavior clearly

### Test Structure

Use the AAA pattern (Arrange-Act-Assert):

```javascript
it('should handle null input without crashing (#123)', () => {
  // Arrange: Set up test data
  const input = null;

  // Act: Execute the code that has the bug
  const result = processData(input);

  // Assert: Verify expected behavior
  expect(result).toBeDefined();
  expect(() => processData(input)).not.toThrow();
});
```

### Documentation

```javascript
/**
 * Issue #123: Application crashes when processing null input
 *
 * Steps to reproduce:
 * 1. Call processData with null
 * 2. Application throws TypeError
 *
 * Expected: Should return default value or handle gracefully
 * Actual: Throws uncaught exception
 *
 * @see https://github.com/org/repo/issues/123
 */
describe('Issue #123', () => {
  // tests here
});
```

## Examples

### Example 1: API Bug

```javascript
describe('Issue #234: API returns 500 for valid input', () => {
  it('should return 200 for valid user data', async () => {
    // Arrange
    const validUser = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };

    // Act
    const response = await api.createUser(validUser);

    // Assert
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    // Currently fails with 500 error
  });
});
```

### Example 2: UI Bug

```javascript
describe('Issue #345: Button remains disabled after form validation', () => {
  it('should enable submit button when all fields are valid', () => {
    // Arrange
    render(<SignupForm />);

    // Act
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'valid@email.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'ValidPass123!' }
    });

    // Assert
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
    // Currently fails - button stays disabled
  });
});
```

### Example 3: Data Processing Bug

```javascript
describe('Issue #456: Date parser fails for ISO 8601 format', () => {
  it('should correctly parse ISO 8601 dates', () => {
    // Arrange
    const isoDate = '2024-01-15T10:30:00Z';

    // Act
    const parsed = parseDate(isoDate);

    // Assert
    expect(parsed.getFullYear()).toBe(2024);
    expect(parsed.getMonth()).toBe(0); // January
    expect(parsed.getDate()).toBe(15);
    // Currently fails - returns NaN
  });
});
```

### Example 4: Performance Bug

```javascript
describe('Issue #567: Dashboard takes >5s to load with 1000 items', () => {
  it('should render dashboard in under 1 second', async () => {
    // Arrange
    const items = generateMockItems(1000);

    // Act
    const startTime = performance.now();
    render(<Dashboard items={items} />);
    await waitFor(() => screen.getByTestId('dashboard-loaded'));
    const endTime = performance.now();

    // Assert
    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(1000); // Should load in <1s
    // Currently fails - takes ~5 seconds
  });
});
```

## Test Types by Issue Category

### Bugs
- Write test that reproduces the exact scenario
- Test should fail demonstrating the bug
- Focus on the specific failure case

### Edge Cases
- Test boundary conditions
- Test unexpected input
- Test error scenarios

### Regressions
- Test the previously working scenario
- Verify it fails in current state
- Will pass after fix

### Performance Issues
- Benchmark current performance
- Set expected performance threshold
- Test should fail showing poor performance

## Error Handling

### Cannot Reproduce
```
Warning: Unable to reproduce issue #123

Actions:
1. Add comment to issue requesting clarification
2. Request more detailed steps
3. Ask for environment details
4. Mark test as .skip() with note
```

### Ambiguous Issue
```
Warning: Issue description is unclear

Actions:
1. Ask questions in issue comments
2. Request minimal reproduction
3. Document assumptions in test
```

### Test Passes Unexpectedly
```
Warning: Test passes but issue is open

Possible reasons:
1. Issue already fixed but not closed
2. Missing reproduction step
3. Environment-specific issue

Actions:
1. Verify with issue reporter
2. Check for recent fixes
3. Test in different environments
```

## Commit Message Format

```
test: add failing test for issue #123

Reproduces memory leak in event handlers when rapidly
switching pages. Test demonstrates that event listeners
are not properly cleaned up on component unmount.

Issue: #123
Status: Failing (expected)
```

## Integration with Fix Workflow

1. **Repro Phase** (this command):
   - Create failing test
   - Commit test only
   - Verify it fails

2. **Fix Phase** (`/fix-issue`):
   - Implement minimal fix
   - Run tests (should pass now)
   - Commit fix

3. **Refactor Phase**:
   - Improve code quality
   - Add additional tests
   - Commit improvements

## Related Commands

- `/fix-issue` - Fix the issue after reproducing
- `/fix-flakey-test` - Fix intermittent test failures
- `/tdd` - Full TDD workflow
- `/generate-tests` - Generate test cases

## Tips

1. **Start Simple**: Begin with the most minimal test case
2. **One Thing**: Test one specific behavior per test
3. **Clear Failure**: Ensure failure message is informative
4. **No Mock Excess**: Only mock what's necessary
5. **Document Why**: Explain expected vs actual behavior
6. **Commit First**: Commit failing test before fixing
7. **Verify Failure**: Ensure test fails for right reason

## Test Framework Examples

### Jest
```javascript
describe('Issue #123', () => {
  it('should handle edge case', () => {
    expect(fn(edgeCase)).toBe(expected);
  });
});
```

### Pytest
```python
def test_issue_123_edge_case():
    """Issue #123: Function fails on edge case"""
    result = fn(edge_case)
    assert result == expected
```

### RSpec
```ruby
describe 'Issue #123' do
  it 'should handle edge case' do
    expect(fn(edge_case)).to eq(expected)
  end
end
```

### Go
```go
func TestIssue123_EdgeCase(t *testing.T) {
    result := fn(edgeCase)
    if result != expected {
        t.Errorf("Expected %v, got %v", expected, result)
    }
}
```

## Notes

- The test should remain in the codebase as a regression test
- Commit the test separately from the fix for clear history
- Test name should reference the issue number
- Add skip/ignore if issue cannot be reproduced
- Update issue with test commit link
- This follows TDD Red-Green-Refactor cycle (Red phase)
