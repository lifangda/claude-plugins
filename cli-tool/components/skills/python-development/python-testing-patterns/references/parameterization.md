# Parameterization

Parameterized tests to reduce code duplication and test multiple scenarios.

## Basic Parameterization

```python
# test_validation.py
import pytest

def is_valid_email(email: str) -> bool:
    """Check if email is valid."""
    if not email:
        return False
    return "@" in email and "." in email.split("@")[1]

@pytest.mark.parametrize("email,expected", [
    ("user@example.com", True),
    ("test.user@domain.co.uk", True),
    ("invalid.email", False),
    ("@example.com", False),
    ("user@domain", False),
    ("", False),
    ("user@", False),
    ("@domain.com", False),
])
def test_email_validation(email, expected):
    """Test email validation with various inputs."""
    assert is_valid_email(email) == expected
```

## Multiple Parameters

```python
# test_calculator_params.py
import pytest

def add(a: float, b: float) -> float:
    return a + b

@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 5),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300),
    (-5, -5, -10),
    (2.5, 1.5, 4.0),
    (-2.5, 2.5, 0.0),
])
def test_addition_parameterized(a, b, expected):
    """Test addition with multiple parameter sets."""
    assert add(a, b) == expected

def multiply(a: float, b: float) -> float:
    return a * b

@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 6),
    (0, 5, 0),
    (5, 0, 0),
    (-2, 3, -6),
    (-2, -3, 6),
    (2.5, 2, 5.0),
])
def test_multiplication_parameterized(a, b, expected):
    """Test multiplication with multiple parameter sets."""
    assert multiply(a, b) == expected
```

## Custom Test IDs

```python
# test_with_ids.py
import pytest

@pytest.mark.parametrize("value,expected", [
    pytest.param(1, True, id="positive"),
    pytest.param(0, False, id="zero"),
    pytest.param(-1, False, id="negative"),
])
def test_is_positive(value, expected):
    """Test with custom test IDs."""
    assert (value > 0) == expected

@pytest.mark.parametrize("input,expected", [
    pytest.param("hello", "HELLO", id="lowercase"),
    pytest.param("WORLD", "WORLD", id="uppercase"),
    pytest.param("MiXeD", "MIXED", id="mixed_case"),
    pytest.param("", "", id="empty_string"),
])
def test_uppercase(input, expected):
    """Test string uppercase with custom IDs."""
    assert input.upper() == expected
```

## Nested Parameterization

```python
# test_nested_params.py
import pytest

@pytest.mark.parametrize("operation", ["add", "subtract"])
@pytest.mark.parametrize("a,b", [(2, 3), (5, 1), (0, 0)])
def test_calculator_operations(operation, a, b):
    """Test with nested parameterization."""
    if operation == "add":
        result = a + b
        assert result == a + b
    elif operation == "subtract":
        result = a - b
        assert result == a - b
```

## Parameterizing Fixtures

```python
# conftest.py
import pytest

@pytest.fixture(params=["sqlite", "postgresql", "mysql"])
def db_backend(request):
    """Parametrized fixture for different database backends."""
    return request.param

@pytest.fixture(params=[1, 10, 100, 1000])
def batch_size(request):
    """Parametrized fixture for batch sizes."""
    return request.param

# test_with_param_fixtures.py
def test_database_backend(db_backend):
    """Test runs once for each database backend."""
    print(f"Testing with {db_backend}")
    assert db_backend in ["sqlite", "postgresql", "mysql"]

def test_batch_processing(batch_size):
    """Test runs once for each batch size."""
    items = list(range(batch_size))
    assert len(items) == batch_size
    print(f"Processed {batch_size} items")
```

## Conditional Parameterization

```python
# test_conditional_params.py
import pytest
import sys

@pytest.mark.parametrize("value,expected", [
    (1, 2),
    (2, 4),
    pytest.param(3, 6, marks=pytest.mark.skip(reason="Skipping 3")),
    (4, 8),
])
def test_double(value, expected):
    """Test with conditional skip."""
    assert value * 2 == expected

@pytest.mark.parametrize("value,expected", [
    (1, 2),
    pytest.param(
        2, 4,
        marks=pytest.mark.skipif(
            sys.version_info < (3, 9),
            reason="Requires Python 3.9+"
        )
    ),
    (3, 6),
])
def test_with_skipif(value, expected):
    """Test with conditional skip based on condition."""
    assert value * 2 == expected
```

## Parameterizing from External Data

```python
# test_from_file.py
import pytest
import json
from pathlib import Path

def load_test_cases():
    """Load test cases from JSON file."""
    # In real scenario, load from file
    # data = json.loads(Path("test_cases.json").read_text())
    return [
        {"input": "hello", "expected": 5},
        {"input": "world", "expected": 5},
        {"input": "", "expected": 0},
    ]

@pytest.mark.parametrize("case", load_test_cases())
def test_string_length(case):
    """Test with data loaded from external source."""
    assert len(case["input"]) == case["expected"]

# Using indirect parameterization
def generate_user(user_data):
    """Generate user object from data."""
    return {
        "id": user_data.get("id", 1),
        "name": user_data.get("name", "Test User"),
        "active": user_data.get("active", True)
    }

@pytest.fixture
def user(request):
    """Fixture that processes indirect parameters."""
    return generate_user(request.param)

@pytest.mark.parametrize("user", [
    {"id": 1, "name": "John"},
    {"id": 2, "name": "Jane", "active": False},
], indirect=True)
def test_user_creation(user):
    """Test user creation with indirect parameterization."""
    assert "id" in user
    assert "name" in user
    assert isinstance(user["active"], bool)
```

## Complex Parameterization

```python
# test_complex_params.py
import pytest

class APIClient:
    """Simple API client for testing."""

    def __init__(self, base_url: str, timeout: int = 30):
        self.base_url = base_url
        self.timeout = timeout

    def request(self, method: str, endpoint: str):
        """Make request."""
        return f"{method} {self.base_url}{endpoint}"

@pytest.mark.parametrize("method,endpoint,expected", [
    ("GET", "/users", "GET https://api.example.com/users"),
    ("POST", "/users", "POST https://api.example.com/users"),
    ("PUT", "/users/1", "PUT https://api.example.com/users/1"),
    ("DELETE", "/users/1", "DELETE https://api.example.com/users/1"),
])
def test_api_requests(method, endpoint, expected):
    """Test API requests with different methods and endpoints."""
    client = APIClient("https://api.example.com")
    result = client.request(method, endpoint)
    assert result == expected

# Parameterizing with dictionaries
@pytest.mark.parametrize("config", [
    {"host": "localhost", "port": 5432, "db": "test1"},
    {"host": "db.example.com", "port": 3306, "db": "test2"},
    {"host": "127.0.0.1", "port": 27017, "db": "test3"},
])
def test_database_config(config):
    """Test with different database configurations."""
    assert "host" in config
    assert "port" in config
    assert "db" in config
    assert isinstance(config["port"], int)
```

## Marking Parameterized Tests

```python
# test_marked_params.py
import pytest

@pytest.mark.parametrize("value,expected", [
    (1, 2),
    (2, 4),
    pytest.param(100, 200, marks=pytest.mark.slow),
    pytest.param(1000, 2000, marks=[pytest.mark.slow, pytest.mark.integration]),
])
def test_with_marks(value, expected):
    """Parameterized tests with custom marks."""
    assert value * 2 == expected

# Run with:
# pytest -m "not slow"  # Skip slow tests
# pytest -m slow        # Run only slow tests
```

## Parameterization Best Practices

```python
# test_best_practices.py
import pytest

# Good: Clear parameter names
@pytest.mark.parametrize("username,email,is_valid", [
    ("john_doe", "john@example.com", True),
    ("", "invalid@example.com", False),
    ("jane", "not_an_email", False),
])
def test_user_validation(username, email, is_valid):
    """Test with descriptive parameter names."""
    has_username = len(username) > 0
    has_valid_email = "@" in email
    assert (has_username and has_valid_email) == is_valid

# Good: Using test IDs for complex inputs
@pytest.mark.parametrize("data,expected", [
    pytest.param(
        {"users": [1, 2, 3], "active": True},
        3,
        id="multiple_active_users"
    ),
    pytest.param(
        {"users": [], "active": True},
        0,
        id="no_users"
    ),
    pytest.param(
        {"users": [1, 2], "active": False},
        0,
        id="inactive_users"
    ),
])
def test_active_users_count(data, expected):
    """Test with complex data and clear IDs."""
    count = len(data["users"]) if data["active"] else 0
    assert count == expected
```
