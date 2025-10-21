# Best Practices

Testing best practices and organization strategies.

## Test Organization

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

## Test Naming

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

## Test Markers

```python
import pytest

@pytest.mark.slow
def test_slow_operation():
    """Mark slow tests."""
    import time
    time.sleep(2)

@pytest.mark.integration
def test_database_integration():
    """Mark integration tests."""
    pass

@pytest.mark.skip(reason="Feature not implemented")
def test_future_feature():
    """Skip tests temporarily."""
    pass

# Run with:
# pytest -m slow          # Run only slow tests
# pytest -m "not slow"    # Skip slow tests
```

## Coverage Best Practices

1. Aim for meaningful coverage, not just high percentages
2. Focus on critical paths and edge cases
3. Don't test framework code
4. Test business logic thoroughly
5. Use coverage reports to find gaps
