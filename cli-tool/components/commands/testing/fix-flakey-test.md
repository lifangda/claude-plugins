# Fix Flaky Test

## Description

Diagnose and fix intermittent test failures (flaky tests) by identifying the root cause of non-deterministic behavior and implementing a robust solution. Flaky tests can erode confidence in your test suite and waste developer time.

## Usage

```bash
/fix-flakey-test <test-name>
/fix-flakey-test "should handle concurrent requests"
/fix-flakey-test src/auth.test.js
```

## What This Command Does

1. Identifies the flaky test by name or file path
2. Analyzes test code and recent failures
3. Runs the test multiple times to observe failure patterns
4. Diagnoses the root cause of flakiness
5. Implements appropriate fixes
6. Verifies test stability with multiple runs
7. Documents the fix and prevention strategies

## Prerequisites

- Test framework installed and configured
- Access to test execution logs
- Understanding of the test's purpose

## Common Causes of Flaky Tests

### 1. Race Conditions
- Async operations without proper waits
- Event timing issues
- Concurrent resource access

### 2. Timing Issues
- Fixed timeouts (setTimeout)
- Insufficient wait times
- Animation/transition timing

### 3. Shared State
- Tests not properly isolated
- Leftover state from previous tests
- Shared global variables

### 4. External Dependencies
- Network requests
- File system operations
- Database state

### 5. Random Data
- Non-deterministic test data
- Random number generation
- Date/time dependencies

### 6. Test Order Dependencies
- Tests rely on execution order
- Setup/teardown issues
- Interdependent test cases

## Diagnostic Process

### Step 1: Reproduce the Flakiness

```bash
# Run test multiple times
for i in {1..50}; do
  npm test -- <test-name>
done
```

**Analyze**:
- Failure rate (e.g., 5 failures in 50 runs = 10% flaky)
- Failure patterns
- Error messages
- Stack traces

### Step 2: Review Test Code

**Check for**:
- Missing `await` keywords
- Fixed timeouts
- Shared state
- External dependencies
- Race conditions

### Step 3: Analyze Logs

**Look for**:
- Timing variations
- Resource conflicts
- State pollution
- Async operations

### Step 4: Identify Root Cause

Use the diagnostic checklist below.

## Diagnostic Checklist

### Async/Await Issues
```javascript
// ❌ Missing await
it('should fetch user', () => {
  const user = fetchUser(); // Returns promise
  expect(user.name).toBe('John'); // FLAKY!
});

// ✅ Properly awaited
it('should fetch user', async () => {
  const user = await fetchUser();
  expect(user.name).toBe('John');
});
```

### Fixed Timeouts
```javascript
// ❌ Fixed timeout
it('should load data', async () => {
  fetchData();
  await new Promise(r => setTimeout(r, 1000)); // FLAKY!
  expect(data).toBeDefined();
});

// ✅ Wait for condition
it('should load data', async () => {
  fetchData();
  await waitFor(() => expect(data).toBeDefined(), {
    timeout: 5000
  });
});
```

### Shared State
```javascript
// ❌ Shared state
let cache = {};
it('test 1', () => {
  cache.user = 'Alice'; // Pollutes state
  expect(cache.user).toBe('Alice');
});
it('test 2', () => {
  expect(cache.user).toBeUndefined(); // FLAKY!
});

// ✅ Isolated state
it('test 1', () => {
  const cache = {};
  cache.user = 'Alice';
  expect(cache.user).toBe('Alice');
});
it('test 2', () => {
  const cache = {};
  expect(cache.user).toBeUndefined();
});
```

### External Dependencies
```javascript
// ❌ Real API call
it('should fetch users', async () => {
  const users = await api.getUsers(); // FLAKY!
  expect(users.length).toBeGreaterThan(0);
});

// ✅ Mocked
it('should fetch users', async () => {
  api.getUsers.mockResolvedValue([{ id: 1 }]);
  const users = await api.getUsers();
  expect(users.length).toBe(1);
});
```

### Date/Time Dependencies
```javascript
// ❌ Real date
it('should show correct date', () => {
  const component = render(<DateDisplay />);
  expect(component.text()).toBe('2024-01-15'); // FLAKY!
});

// ✅ Mocked date
it('should show correct date', () => {
  jest.useFakeTimers().setSystemTime(new Date('2024-01-15'));
  const component = render(<DateDisplay />);
  expect(component.text()).toBe('2024-01-15');
  jest.useRealTimers();
});
```

### Race Conditions
```javascript
// ❌ Race condition
it('should handle concurrent updates', () => {
  updateCounter();
  updateCounter();
  expect(counter).toBe(2); // FLAKY!
});

// ✅ Synchronized
it('should handle concurrent updates', async () => {
  await Promise.all([
    updateCounter(),
    updateCounter()
  ]);
  expect(counter).toBe(2);
});
```

## Fix Strategies by Category

### Strategy 1: Proper Async/Await

**Problem**: Missing await keywords
**Fix**: Add await to all async operations

```javascript
// Before
it('test', () => {
  const result = asyncFunction();
  expect(result).toBe(expected);
});

// After
it('test', async () => {
  const result = await asyncFunction();
  expect(result).toBe(expected);
});
```

### Strategy 2: Conditional Waits

**Problem**: Fixed timeouts
**Fix**: Wait for specific conditions

```javascript
// Before
await new Promise(r => setTimeout(r, 1000));

// After (Jest)
await waitFor(() => {
  expect(element).toBeInTheDocument();
});

// After (Cypress)
cy.get('[data-testid="item"]').should('exist');

// After (Playwright)
await page.waitForSelector('[data-testid="item"]');
```

### Strategy 3: Test Isolation

**Problem**: Shared state between tests
**Fix**: Reset state in beforeEach/afterEach

```javascript
describe('User tests', () => {
  let testUser;

  beforeEach(() => {
    testUser = createFreshUser(); // New state each test
  });

  afterEach(() => {
    testUser = null; // Cleanup
  });

  it('test 1', () => {
    // Uses fresh testUser
  });

  it('test 2', () => {
    // Uses fresh testUser
  });
});
```

### Strategy 4: Mock External Dependencies

**Problem**: Network/file system flakiness
**Fix**: Mock all external dependencies

```javascript
// Before
it('fetches data', async () => {
  const data = await fetch('/api/data');
  expect(data).toBeDefined();
});

// After
it('fetches data', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ id: 1, name: 'Test' })
  });
  const data = await fetch('/api/data');
  expect(data).toBeDefined();
});
```

### Strategy 5: Deterministic Test Data

**Problem**: Random/time-based data
**Fix**: Use fixed test data and mocked time

```javascript
// Before
it('generates random id', () => {
  const id = Math.random(); // FLAKY!
  expect(id).toBeGreaterThan(0);
});

// After
it('generates random id', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.5);
  const id = Math.random();
  expect(id).toBe(0.5);
});
```

### Strategy 6: Remove Test Dependencies

**Problem**: Tests depend on execution order
**Fix**: Make each test independent

```javascript
// Before (tests must run in order)
it('creates user', () => {
  user = createUser();
});
it('updates user', () => {
  updateUser(user); // Depends on previous test!
});

// After (independent tests)
it('creates user', () => {
  const user = createUser();
  expect(user).toBeDefined();
});
it('updates user', () => {
  const user = createUser(); // Own setup
  updateUser(user);
  expect(user.updated).toBe(true);
});
```

## Verification Process

### Step 1: Run Test Repeatedly

```bash
# Run 100 times to verify stability
for i in {1..100}; do
  npm test -- <test-name> || echo "Failed on run $i"
done
```

### Step 2: Run with Different Conditions

```bash
# Different CPU loads
npm test -- <test-name> &
npm test -- <test-name> &
npm test -- <test-name> &
wait

# Different random seeds
for seed in {1..10}; do
  RANDOM_SEED=$seed npm test -- <test-name>
done
```

### Step 3: Monitor for Regressions

```bash
# Add to CI pipeline
npm test -- --runInBand <test-name> # Serial execution
npm test -- --maxWorkers=1 <test-name> # Single worker
```

## Examples

### Example 1: Async/Await Fix

```javascript
// Before: Flaky test
it('should load user profile', () => {
  loadProfile('user-123');
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  // Fails randomly when loadProfile takes >0ms
});

// After: Fixed
it('should load user profile', async () => {
  loadProfile('user-123');
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  // Always waits for profile to load
});
```

### Example 2: State Isolation Fix

```javascript
// Before: Flaky due to shared state
const testCache = {};

it('test A', () => {
  testCache.value = 'A';
  expect(testCache.value).toBe('A');
});

it('test B', () => {
  expect(Object.keys(testCache).length).toBe(0);
  // Fails if test A runs first
});

// After: Fixed with beforeEach
describe('Cache tests', () => {
  let testCache;

  beforeEach(() => {
    testCache = {}; // Fresh cache each test
  });

  it('test A', () => {
    testCache.value = 'A';
    expect(testCache.value).toBe('A');
  });

  it('test B', () => {
    expect(Object.keys(testCache).length).toBe(0);
    // Always passes
  });
});
```

### Example 3: Race Condition Fix

```javascript
// Before: Flaky race condition
it('should handle rapid clicks', () => {
  const button = screen.getByRole('button');
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  expect(clickCount).toBe(3);
  // Sometimes clickCount is 1 or 2
});

// After: Fixed with proper async handling
it('should handle rapid clicks', async () => {
  const button = screen.getByRole('button');

  await userEvent.click(button);
  await userEvent.click(button);
  await userEvent.click(button);

  expect(clickCount).toBe(3);
  // Always correct count
});
```

## Prevention Strategies

### Code Review Checklist
- [ ] All async operations use await
- [ ] No fixed timeouts (use waitFor/waitForElement)
- [ ] No shared state between tests
- [ ] External dependencies mocked
- [ ] Test data is deterministic
- [ ] Tests are independent of order
- [ ] Proper setup/teardown

### CI/CD Integration
```yaml
# .github/workflows/test.yml
- name: Run flaky test detection
  run: |
    npm test -- --detectOpenHandles
    npm test -- --runInBand
```

### Linting Rules
```javascript
// .eslintrc.js
rules: {
  'jest/no-disabled-tests': 'error',
  'jest/no-focused-tests': 'error',
  'jest/no-identical-title': 'error',
  'testing-library/await-async-query': 'error',
  'testing-library/await-async-utils': 'error'
}
```

## Related Commands

- `/repro-issue` - Create test for bug reproduction
- `/fix-issue` - Fix GitHub issues with tests
- `/tdd` - Test-driven development workflow
- `/generate-tests` - Generate test cases

## Tips

1. **Run Multiple Times**: A test needs to pass 100 times to be considered stable
2. **Check CI Logs**: Review CI failures for patterns
3. **Isolate Tests**: Each test should be completely independent
4. **Mock Everything**: Mock time, random, network, file system
5. **Use waitFor**: Never use fixed timeouts
6. **Reset State**: Always cleanup in afterEach
7. **Document Fixes**: Explain why the test was flaky

## Common Tools

### Jest
```javascript
jest.useFakeTimers()
jest.spyOn(global, 'fetch')
waitFor(() => expect(...).toBe(...))
```

### Cypress
```javascript
cy.intercept('/api/*', fixture)
cy.wait('@apiCall')
cy.clock()
```

### Playwright
```javascript
await page.waitForSelector(...)
await page.route('**/api/**', route => ...)
page.clock.install()
```

## Notes

- Flaky tests are worse than no tests (false confidence)
- Fix flaky tests immediately, don't skip them
- Track flaky test rate as a team metric
- Consider quarantine for persistently flaky tests
- Document known timing issues in comments
- Use test retries as last resort, not first choice
