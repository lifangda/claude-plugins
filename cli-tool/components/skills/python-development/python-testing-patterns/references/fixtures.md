# Fixtures & Configuration

Pytest fixtures for test setup, teardown, and dependency injection.

## Basic Fixtures

```python
# conftest.py
import pytest

@pytest.fixture
def sample_data():
    """Provide sample test data."""
    return {"name": "Test User", "email": "test@example.com"}

@pytest.fixture
def sample_list():
    """Provide sample list data."""
    return [1, 2, 3, 4, 5]

# test_basic_fixtures.py
def test_with_sample_data(sample_data):
    """Test using sample data fixture."""
    assert sample_data["name"] == "Test User"
    assert sample_data["email"] == "test@example.com"

def test_with_sample_list(sample_list):
    """Test using sample list fixture."""
    assert len(sample_list) == 5
    assert sum(sample_list) == 15
```

## Fixtures with Setup and Teardown

```python
# test_database_fixtures.py
import pytest
from typing import Generator

class Database:
    """Simple database class."""

    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.connected = False
        self.data = []

    def connect(self):
        """Connect to database."""
        self.connected = True

    def disconnect(self):
        """Disconnect from database."""
        self.connected = False
        self.data.clear()

    def insert(self, item: dict):
        """Insert item into database."""
        if not self.connected:
            raise RuntimeError("Not connected")
        self.data.append(item)

    def query(self) -> list:
        """Query all data."""
        if not self.connected:
            raise RuntimeError("Not connected")
        return self.data

@pytest.fixture
def db() -> Generator[Database, None, None]:
    """Fixture that provides connected database."""
    # Setup
    database = Database("sqlite:///:memory:")
    database.connect()

    # Provide to test
    yield database

    # Teardown
    database.disconnect()

def test_database_insert(db):
    """Test database insert."""
    db.insert({"id": 1, "name": "Test"})
    results = db.query()
    assert len(results) == 1
    assert results[0]["name"] == "Test"

def test_database_multiple_inserts(db):
    """Test multiple inserts."""
    db.insert({"id": 1, "name": "User 1"})
    db.insert({"id": 2, "name": "User 2"})
    results = db.query()
    assert len(results) == 2
```

## Fixture Scopes

```python
# conftest.py
import pytest

@pytest.fixture(scope="function")
def function_fixture():
    """Created for each test function (default)."""
    print("Function setup")
    yield "function data"
    print("Function teardown")

@pytest.fixture(scope="class")
def class_fixture():
    """Created once per test class."""
    print("Class setup")
    yield "class data"
    print("Class teardown")

@pytest.fixture(scope="module")
def module_fixture():
    """Created once per test module."""
    print("Module setup")
    yield "module data"
    print("Module teardown")

@pytest.fixture(scope="session")
def session_fixture():
    """Created once per test session."""
    print("Session setup")
    return {
        "database_url": "postgresql://localhost/test",
        "api_key": "test-key",
        "debug": True
    }

# test_scopes.py
def test_function_scope(function_fixture):
    """Test with function-scoped fixture."""
    assert function_fixture == "function data"

def test_module_scope(module_fixture):
    """Test with module-scoped fixture."""
    assert module_fixture == "module data"

def test_session_scope(session_fixture):
    """Test with session-scoped fixture."""
    assert session_fixture["api_key"] == "test-key"
```

## Fixture Dependencies

```python
# conftest.py
import pytest

@pytest.fixture
def database_config():
    """Provide database configuration."""
    return {
        "host": "localhost",
        "port": 5432,
        "database": "testdb"
    }

@pytest.fixture
def database_connection(database_config):
    """Provide database connection using config."""
    # Fixture depends on database_config
    connection = f"postgresql://{database_config['host']}:{database_config['port']}/{database_config['database']}"
    return connection

@pytest.fixture
def api_client(database_connection):
    """Provide API client that uses database."""
    # Fixture depends on database_connection
    return {
        "db": database_connection,
        "authenticated": True
    }

# test_dependencies.py
def test_database_connection(database_connection):
    """Test database connection fixture."""
    assert "postgresql://localhost:5432/testdb" in database_connection

def test_api_client(api_client):
    """Test API client fixture."""
    assert api_client["authenticated"] is True
    assert "postgresql://" in api_client["db"]
```

## Autouse Fixtures

```python
# conftest.py
import pytest

@pytest.fixture(autouse=True)
def reset_state():
    """Auto-use fixture that runs before each test."""
    # Setup: Clear global state
    print("Resetting state before test")
    yield
    # Teardown: Clean up after test
    print("Cleaning up after test")

@pytest.fixture(autouse=True, scope="session")
def setup_test_environment():
    """Setup test environment once per session."""
    print("Setting up test environment")
    yield
    print("Tearing down test environment")

# test_autouse.py
def test_example_1():
    """First test - autouse fixtures run automatically."""
    assert True

def test_example_2():
    """Second test - autouse fixtures run again."""
    assert True
```

## Parametrized Fixtures

```python
# conftest.py
import pytest

@pytest.fixture(params=["sqlite", "postgresql", "mysql"])
def db_backend(request):
    """Fixture that runs tests with different database backends."""
    return request.param

@pytest.fixture(params=[1, 10, 100])
def batch_size(request):
    """Fixture with different batch sizes."""
    return request.param

# test_parametrized.py
def test_with_different_backends(db_backend):
    """This test runs 3 times with different backends."""
    print(f"Testing with {db_backend}")
    assert db_backend in ["sqlite", "postgresql", "mysql"]

def test_batch_processing(batch_size):
    """This test runs 3 times with different batch sizes."""
    items = list(range(batch_size))
    assert len(items) == batch_size
```

## Fixture Factories

```python
# conftest.py
import pytest

@pytest.fixture
def make_user():
    """Factory fixture that creates users."""
    def _make_user(name: str, email: str, **kwargs):
        return {
            "name": name,
            "email": email,
            **kwargs
        }
    return _make_user

@pytest.fixture
def make_users():
    """Factory fixture for creating multiple users."""
    def _make_users(count: int):
        return [
            {"id": i, "name": f"User {i}"}
            for i in range(1, count + 1)
        ]
    return _make_users

# test_factories.py
def test_create_user(make_user):
    """Test user factory."""
    user = make_user("John Doe", "john@example.com", age=30)
    assert user["name"] == "John Doe"
    assert user["email"] == "john@example.com"
    assert user["age"] == 30

def test_create_multiple_users(make_users):
    """Test creating multiple users."""
    users = make_users(5)
    assert len(users) == 5
    assert users[0]["name"] == "User 1"
    assert users[4]["name"] == "User 5"
```

## Shared Fixtures (conftest.py)

```python
# conftest.py
"""Shared fixtures for all tests."""
import pytest

@pytest.fixture(scope="session")
def app_config():
    """Global application configuration."""
    return {
        "database_url": "postgresql://localhost/test",
        "api_url": "https://api.test.com",
        "debug": True
    }

@pytest.fixture
def sample_user():
    """Provide sample user data."""
    return {
        "id": 1,
        "name": "Test User",
        "email": "test@example.com"
    }

@pytest.fixture
def sample_users():
    """Provide list of sample users."""
    return [
        {"id": 1, "name": "User 1", "email": "user1@example.com"},
        {"id": 2, "name": "User 2", "email": "user2@example.com"},
        {"id": 3, "name": "User 3", "email": "user3@example.com"},
    ]

@pytest.fixture
def mock_api_response():
    """Provide mock API response."""
    return {
        "status": "success",
        "data": {"id": 1, "value": "test"}
    }
```

## Temporary Files and Directories

```python
# test_file_operations.py
import pytest
from pathlib import Path

def save_data(filepath: Path, data: str):
    """Save data to file."""
    filepath.write_text(data)

def load_data(filepath: Path) -> str:
    """Load data from file."""
    return filepath.read_text()

def test_file_operations(tmp_path):
    """Test file operations with temporary directory."""
    # tmp_path is a pathlib.Path object
    test_file = tmp_path / "test_data.txt"

    # Save data
    save_data(test_file, "Hello, World!")

    # Verify file exists
    assert test_file.exists()

    # Load and verify data
    data = load_data(test_file)
    assert data == "Hello, World!"

def test_multiple_files(tmp_path):
    """Test with multiple temporary files."""
    files = {
        "file1.txt": "Content 1",
        "file2.txt": "Content 2",
        "file3.txt": "Content 3"
    }

    for filename, content in files.items():
        filepath = tmp_path / filename
        save_data(filepath, content)

    # Verify all files created
    assert len(list(tmp_path.iterdir())) == 3

def test_nested_directories(tmp_path):
    """Test with nested directory structure."""
    nested_dir = tmp_path / "subdir" / "nested"
    nested_dir.mkdir(parents=True)

    test_file = nested_dir / "data.txt"
    save_data(test_file, "Nested content")

    assert test_file.exists()
    assert load_data(test_file) == "Nested content"
```
