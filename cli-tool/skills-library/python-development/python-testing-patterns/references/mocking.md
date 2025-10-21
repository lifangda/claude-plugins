# Mocking Strategies

Mocking external dependencies and services using unittest.mock and pytest-mock.

## Basic Mocking with unittest.mock

```python
# test_basic_mocking.py
from unittest.mock import Mock, MagicMock
import pytest

def test_mock_basic():
    """Basic mock usage."""
    mock = Mock()
    mock.method.return_value = 42

    result = mock.method()
    assert result == 42
    mock.method.assert_called_once()

def test_mock_with_spec():
    """Mock with specification."""
    class UserService:
        def get_user(self, user_id):
            pass

    mock_service = Mock(spec=UserService)
    mock_service.get_user.return_value = {"id": 1, "name": "Test"}

    result = mock_service.get_user(1)
    assert result["name"] == "Test"
```

## Mocking HTTP Requests

```python
# test_api_client.py
import pytest
from unittest.mock import Mock, patch
import requests

class APIClient:
    """Simple API client."""

    def __init__(self, base_url: str):
        self.base_url = base_url

    def get_user(self, user_id: int) -> dict:
        """Fetch user from API."""
        response = requests.get(f"{self.base_url}/users/{user_id}")
        response.raise_for_status()
        return response.json()

    def create_user(self, data: dict) -> dict:
        """Create new user."""
        response = requests.post(f"{self.base_url}/users", json=data)
        response.raise_for_status()
        return response.json()

def test_get_user_success():
    """Test successful API call with mock."""
    client = APIClient("https://api.example.com")

    mock_response = Mock()
    mock_response.json.return_value = {"id": 1, "name": "John Doe"}
    mock_response.raise_for_status.return_value = None

    with patch("requests.get", return_value=mock_response) as mock_get:
        user = client.get_user(1)

        assert user["id"] == 1
        assert user["name"] == "John Doe"
        mock_get.assert_called_once_with("https://api.example.com/users/1")

def test_get_user_not_found():
    """Test API call with 404 error."""
    client = APIClient("https://api.example.com")

    mock_response = Mock()
    mock_response.raise_for_status.side_effect = requests.HTTPError("404 Not Found")

    with patch("requests.get", return_value=mock_response):
        with pytest.raises(requests.HTTPError):
            client.get_user(999)

@patch("requests.post")
def test_create_user(mock_post):
    """Test user creation with decorator syntax."""
    client = APIClient("https://api.example.com")

    mock_post.return_value.json.return_value = {"id": 2, "name": "Jane Doe"}
    mock_post.return_value.raise_for_status.return_value = None

    user_data = {"name": "Jane Doe", "email": "jane@example.com"}
    result = client.create_user(user_data)

    assert result["id"] == 2
    mock_post.assert_called_once()
    call_args = mock_post.call_args
    assert call_args.kwargs["json"] == user_data
```

## Mocking Database Operations

```python
# test_database_mocking.py
from unittest.mock import Mock, patch, MagicMock
import pytest

class UserRepository:
    """User repository."""

    def __init__(self, db_connection):
        self.db = db_connection

    def get_user(self, user_id: int):
        """Get user by ID."""
        cursor = self.db.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        return cursor.fetchone()

    def create_user(self, name: str, email: str):
        """Create new user."""
        cursor = self.db.execute(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            (name, email)
        )
        return cursor.lastrowid

def test_get_user():
    """Test getting user with mocked database."""
    mock_db = Mock()
    mock_cursor = Mock()
    mock_cursor.fetchone.return_value = {"id": 1, "name": "John", "email": "john@example.com"}
    mock_db.execute.return_value = mock_cursor

    repo = UserRepository(mock_db)
    user = repo.get_user(1)

    assert user["id"] == 1
    assert user["name"] == "John"
    mock_db.execute.assert_called_once_with("SELECT * FROM users WHERE id = ?", (1,))

def test_create_user():
    """Test creating user with mocked database."""
    mock_db = Mock()
    mock_cursor = Mock()
    mock_cursor.lastrowid = 42
    mock_db.execute.return_value = mock_cursor

    repo = UserRepository(mock_db)
    user_id = repo.create_user("Jane", "jane@example.com")

    assert user_id == 42
    mock_db.execute.assert_called_once_with(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        ("Jane", "jane@example.com")
    )
```

## Mocking Class Methods

```python
# test_class_mocking.py
from unittest.mock import patch, Mock
import pytest

class EmailService:
    """Email service."""

    def send_email(self, to: str, subject: str, body: str) -> bool:
        """Send email."""
        # Actual implementation would send email
        return True

class UserService:
    """User service."""

    def __init__(self, email_service: EmailService):
        self.email_service = email_service

    def register_user(self, email: str, name: str) -> dict:
        """Register user and send welcome email."""
        user = {"email": email, "name": name}

        # Send welcome email
        self.email_service.send_email(
            to=email,
            subject="Welcome!",
            body=f"Hello {name}!"
        )

        return user

def test_register_user():
    """Test user registration with mocked email service."""
    mock_email_service = Mock(spec=EmailService)
    mock_email_service.send_email.return_value = True

    user_service = UserService(mock_email_service)
    user = user_service.register_user("test@example.com", "Test User")

    assert user["email"] == "test@example.com"
    mock_email_service.send_email.assert_called_once_with(
        to="test@example.com",
        subject="Welcome!",
        body="Hello Test User!"
    )

@patch("test_class_mocking.EmailService")
def test_register_user_with_patch(MockEmailService):
    """Test with patched class."""
    mock_instance = MockEmailService.return_value
    mock_instance.send_email.return_value = True

    user_service = UserService(mock_instance)
    user = user_service.register_user("test@example.com", "Test User")

    assert user["email"] == "test@example.com"
    mock_instance.send_email.assert_called_once()
```

## Side Effects and Exceptions

```python
# test_side_effects.py
from unittest.mock import Mock, patch
import pytest

def test_side_effect_sequence():
    """Test mock with sequence of return values."""
    mock = Mock()
    mock.side_effect = [1, 2, 3, StopIteration]

    assert mock() == 1
    assert mock() == 2
    assert mock() == 3

    with pytest.raises(StopIteration):
        mock()

def test_side_effect_function():
    """Test mock with side effect function."""
    def custom_side_effect(x):
        return x * 2

    mock = Mock()
    mock.side_effect = custom_side_effect

    assert mock(5) == 10
    assert mock(10) == 20

def test_side_effect_exception():
    """Test mock raising exception."""
    mock = Mock()
    mock.side_effect = ValueError("Invalid input")

    with pytest.raises(ValueError, match="Invalid input"):
        mock()

@patch("requests.get")
def test_retry_on_failure(mock_get):
    """Test retry logic with side effects."""
    # First two calls fail, third succeeds
    mock_get.side_effect = [
        Exception("Connection error"),
        Exception("Timeout"),
        Mock(json=lambda: {"success": True})
    ]

    # Retry logic
    for _ in range(3):
        try:
            response = requests.get("https://api.example.com")
            data = response.json()
            break
        except Exception:
            continue

    assert data["success"] is True
    assert mock_get.call_count == 3
```

## Assertion Methods

```python
# test_assertions.py
from unittest.mock import Mock
import pytest

def test_mock_assertions():
    """Test various mock assertions."""
    mock = Mock()

    # Call mock
    mock.method(1, 2, key="value")

    # Assert called
    mock.method.assert_called()
    mock.method.assert_called_once()
    mock.method.assert_called_with(1, 2, key="value")
    mock.method.assert_called_once_with(1, 2, key="value")

    # Check call count
    assert mock.method.call_count == 1

def test_mock_not_called():
    """Test asserting mock not called."""
    mock = Mock()

    mock.method.assert_not_called()

def test_any_call():
    """Test assert_any_call."""
    mock = Mock()

    mock.method(1)
    mock.method(2)
    mock.method(3)

    mock.method.assert_any_call(2)
    assert mock.method.call_count == 3

def test_call_args():
    """Test accessing call arguments."""
    mock = Mock()

    mock.method(1, 2, key="value")

    # Access last call arguments
    args, kwargs = mock.method.call_args
    assert args == (1, 2)
    assert kwargs == {"key": "value"}

    # Alternative access
    assert mock.method.call_args.args == (1, 2)
    assert mock.method.call_args.kwargs == {"key": "value"}
```

## Patching Built-ins

```python
# test_builtin_patching.py
from unittest.mock import patch, mock_open
import pytest

def read_file(filepath: str) -> str:
    """Read file contents."""
    with open(filepath, 'r') as f:
        return f.read()

def test_read_file():
    """Test file reading with mock."""
    mock_data = "Hello, World!"

    with patch("builtins.open", mock_open(read_data=mock_data)):
        content = read_file("test.txt")

    assert content == "Hello, World!"

def test_datetime_now():
    """Test mocking datetime."""
    from datetime import datetime

    mock_now = datetime(2024, 1, 1, 12, 0, 0)

    with patch("datetime.datetime") as mock_datetime:
        mock_datetime.now.return_value = mock_now

        result = datetime.now()
        assert result == mock_now
```

## pytest-mock Plugin

```python
# test_pytest_mock.py
import pytest

def test_mocker_fixture(mocker):
    """Test using pytest-mock's mocker fixture."""
    mock = mocker.Mock()
    mock.return_value = 42

    assert mock() == 42
    mock.assert_called_once()

def test_mocker_patch(mocker):
    """Test using mocker.patch."""
    mocker.patch("requests.get", return_value=Mock(
        json=lambda: {"success": True}
    ))

    response = requests.get("https://api.example.com")
    assert response.json()["success"] is True

def test_mocker_spy(mocker):
    """Test using mocker.spy."""
    class Calculator:
        def add(self, a, b):
            return a + b

    calc = Calculator()
    spy = mocker.spy(calc, "add")

    result = calc.add(2, 3)

    assert result == 5
    spy.assert_called_once_with(2, 3)
```
