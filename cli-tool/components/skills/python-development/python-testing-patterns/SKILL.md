---
name: python-testing-patterns
description: Implement comprehensive testing strategies with pytest, fixtures, mocking, and test-driven development. Use when writing Python tests, setting up test suites, or implementing testing best practices.
---

# Python Testing Patterns

Comprehensive guide to implementing robust testing strategies in Python using pytest, fixtures, mocking, parameterization, and test-driven development practices.

## When to Use This Skill

- Writing unit tests for Python code
- Setting up test suites and test infrastructure
- Implementing test-driven development (TDD)
- Creating integration tests for APIs and services
- Mocking external dependencies and services
- Testing async code and concurrent operations
- Setting up continuous testing in CI/CD
- Implementing property-based testing
- Testing database operations
- Debugging failing tests

## Core Concepts

### 1. Test Types
- **Unit Tests**: Test individual functions/classes in isolation
- **Integration Tests**: Test interaction between components
- **Functional Tests**: Test complete features end-to-end
- **Performance Tests**: Measure speed and resource usage

### 2. Test Structure (AAA Pattern)
- **Arrange**: Set up test data and preconditions
- **Act**: Execute the code under test
- **Assert**: Verify the results

### 3. Test Coverage
- Measure what code is exercised by tests
- Identify untested code paths
- Aim for meaningful coverage, not just high percentages

### 4. Test Isolation
- Tests should be independent
- No shared state between tests
- Each test should clean up after itself

## Quick Start

```python
# test_example.py
def add(a, b):
    return a + b

def test_add():
    """Basic test example."""
    result = add(2, 3)
    assert result == 5

def test_add_negative():
    """Test with negative numbers."""
    assert add(-1, 1) == 0

# Run with: pytest test_example.py
```

## Fundamental Testing Patterns

### Basic pytest Tests

```python
import pytest

class Calculator:
    """Simple calculator for testing."""

    def add(self, a: float, b: float) -> float:
        return a + b

    def divide(self, a: float, b: float) -> float:
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

def test_addition():
    """Test addition."""
    calc = Calculator()
    assert calc.add(2, 3) == 5
    assert calc.add(-1, 1) == 0

def test_division_by_zero():
    """Test division by zero raises error."""
    calc = Calculator()
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        calc.divide(5, 0)
```

**See detailed patterns**: [Unit Testing](references/unit-testing.md)

### Fixtures for Setup and Teardown

```python
@pytest.fixture
def db():
    """Fixture that provides connected database."""
    database = Database("sqlite:///:memory:")
    database.connect()
    yield database
    database.disconnect()

def test_database_query(db):
    """Test database query with fixture."""
    results = db.query("SELECT * FROM users")
    assert len(results) > 0
```

**See detailed patterns**: [Fixtures & Configuration](references/fixtures.md)

### Parameterized Tests

```python
@pytest.mark.parametrize("email,expected", [
    ("user@example.com", True),
    ("invalid.email", False),
    ("", False),
])
def test_email_validation(email, expected):
    """Test email validation with various inputs."""
    assert is_valid_email(email) == expected
```

**See detailed patterns**: [Parameterization](references/parameterization.md)

## Advanced Testing Patterns

### Mocking Dependencies

```python
from unittest.mock import Mock, patch

@patch("requests.get")
def test_api_call(mock_get):
    """Test API call with mocked response."""
    mock_get.return_value.json.return_value = {"id": 1, "name": "Test"}

    result = fetch_user(1)
    assert result["name"] == "Test"
```

**See detailed patterns**: [Mocking Strategies](references/mocking.md)

### Testing Async Code

```python
@pytest.mark.asyncio
async def test_fetch_data():
    """Test async function."""
    result = await fetch_data("https://api.example.com")
    assert result["url"] == "https://api.example.com"
```

**See detailed patterns**: [Async Testing](references/async-testing.md)

### Property-Based Testing

```python
from hypothesis import given, strategies as st

@given(st.text())
def test_reverse_twice_is_original(s):
    """Property: reversing twice returns original."""
    assert reverse_string(reverse_string(s)) == s
```

**See detailed patterns**: [Property-Based Testing](references/property-based.md)

## Testing Best Practices

### Test Organization

```
tests/
  __init__.py
  conftest.py           # Shared fixtures
  test_unit/            # Unit tests
    test_models.py
    test_utils.py
  test_integration/     # Integration tests
    test_api.py
    test_database.py
  test_e2e/            # End-to-end tests
    test_workflows.py
```

### Test Naming Convention

```python
# Good test names
def test_user_creation_with_valid_data():
    """Clear name describes what is being tested."""
    pass

def test_login_fails_with_invalid_password():
    """Name describes expected behavior."""
    pass

# Bad test names
def test_1():  # Not descriptive
    pass

def test_user():  # Too vague
    pass
```

### Test Markers

```python
@pytest.mark.slow
def test_slow_operation():
    """Mark slow tests."""
    pass

@pytest.mark.integration
def test_database_integration():
    """Mark integration tests."""
    pass

@pytest.mark.skip(reason="Feature not implemented yet")
def test_future_feature():
    """Skip tests temporarily."""
    pass

# Run with:
# pytest -m slow          # Run only slow tests
# pytest -m "not slow"    # Skip slow tests
```

**See detailed practices**: [Best Practices](references/best-practices.md)

## Coverage Reporting

```bash
# Install coverage
pip install pytest-cov

# Run tests with coverage
pytest --cov=myapp tests/

# Generate HTML report
pytest --cov=myapp --cov-report=html tests/

# Fail if coverage below threshold
pytest --cov=myapp --cov-fail-under=80 tests/
```

## Testing Database Code

```python
@pytest.fixture(scope="function")
def db_session():
    """Create in-memory database for testing."""
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()

    yield session

    session.close()

def test_create_user(db_session):
    """Test creating a user."""
    user = User(name="Test User", email="test@example.com")
    db_session.add(user)
    db_session.commit()

    assert user.id is not None
```

**See detailed patterns**: [Database Testing](references/database-testing.md)

## CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        python-version: ["3.9", "3.10", "3.11", "3.12"]

    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}

      - name: Run tests
        run: pytest --cov=myapp --cov-report=xml
```

**See detailed configuration**: [CI/CD Setup](references/ci-cd.md)

## Configuration Files

```ini
# pytest.ini
[pytest]
testpaths = tests
addopts =
    -v
    --strict-markers
    --cov=myapp
    --cov-report=term-missing
markers =
    slow: marks tests as slow
    integration: marks integration tests
    unit: marks unit tests
```

## Resources

- **pytest documentation**: https://docs.pytest.org/
- **unittest.mock**: https://docs.python.org/3/library/unittest.mock.html
- **hypothesis**: Property-based testing
- **pytest-asyncio**: Testing async code
- **pytest-cov**: Coverage reporting

## Best Practices Summary

1. **Write tests first** (TDD) or alongside code
2. **One assertion per test** when possible
3. **Use descriptive test names** that explain behavior
4. **Keep tests independent** and isolated
5. **Use fixtures** for setup and teardown
6. **Mock external dependencies** appropriately
7. **Parametrize tests** to reduce duplication
8. **Test edge cases** and error conditions
9. **Measure coverage** but focus on quality
10. **Run tests in CI/CD** on every commit
