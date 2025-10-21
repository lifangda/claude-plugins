# Unit Testing

Basic unit testing patterns with pytest for testing functions and classes.

## Testing Pure Functions

```python
# utils/calculator.py
def add(a: float, b: float) -> float:
    return a + b

def subtract(a: float, b: float) -> float:
    return a - b

def multiply(a: float, b: float) -> float:
    return a * b

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("Division by zero")
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Arguments must be numbers")
    return a / b

# test_calculator.py
import pytest

def test_addition():
    """Test addition with various inputs."""
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0
    assert add(2.5, 1.5) == 4.0

def test_subtraction():
    """Test subtraction."""
    assert subtract(5, 3) == 2
    assert subtract(0, 5) == -5
    assert subtract(-2, -3) == 1

def test_multiplication():
    """Test multiplication."""
    assert multiply(3, 4) == 12
    assert multiply(0, 5) == 0
    assert multiply(-2, 3) == -6

def test_division():
    """Test division."""
    assert divide(6, 3) == 2
    assert divide(5, 2) == 2.5
    assert divide(-6, 2) == -3
```

## Testing Classes

```python
# test_calculator_class.py
import pytest

class Calculator:
    """Simple calculator for testing."""

    def __init__(self):
        self.memory = 0

    def add(self, a: float, b: float) -> float:
        return a + b

    def subtract(self, a: float, b: float) -> float:
        return a - b

    def multiply(self, a: float, b: float) -> float:
        return a * b

    def divide(self, a: float, b: float) -> float:
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

    def store(self, value: float):
        """Store value in memory."""
        self.memory = value

    def recall(self) -> float:
        """Recall value from memory."""
        return self.memory

class TestCalculator:
    """Test suite for Calculator class."""

    def test_addition(self):
        """Test addition."""
        calc = Calculator()
        assert calc.add(2, 3) == 5
        assert calc.add(-1, 1) == 0

    def test_subtraction(self):
        """Test subtraction."""
        calc = Calculator()
        assert calc.subtract(5, 3) == 2
        assert calc.subtract(0, 5) == -5

    def test_multiplication(self):
        """Test multiplication."""
        calc = Calculator()
        assert calc.multiply(3, 4) == 12
        assert calc.multiply(0, 5) == 0

    def test_division(self):
        """Test division."""
        calc = Calculator()
        assert calc.divide(6, 3) == 2
        assert calc.divide(5, 2) == 2.5

    def test_division_by_zero(self):
        """Test division by zero raises error."""
        calc = Calculator()
        with pytest.raises(ValueError, match="Cannot divide by zero"):
            calc.divide(5, 0)

    def test_memory_operations(self):
        """Test memory store and recall."""
        calc = Calculator()
        calc.store(42)
        assert calc.recall() == 42

        calc.store(100)
        assert calc.recall() == 100
```

## Testing Exceptions

```python
# test_exceptions.py
import pytest

def validate_age(age: int):
    """Validate age is within valid range."""
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age must be realistic")
    return True

def test_valid_age():
    """Test valid age."""
    assert validate_age(25) is True
    assert validate_age(0) is True
    assert validate_age(150) is True

def test_type_error():
    """Test type error is raised."""
    with pytest.raises(TypeError, match="must be an integer"):
        validate_age("25")

def test_negative_age():
    """Test negative age raises error."""
    with pytest.raises(ValueError, match="cannot be negative"):
        validate_age(-1)

def test_unrealistic_age():
    """Test unrealistic age raises error."""
    with pytest.raises(ValueError, match="must be realistic"):
        validate_age(200)

def test_exception_info():
    """Test accessing exception info."""
    with pytest.raises(ValueError) as exc_info:
        validate_age(-5)

    assert "negative" in str(exc_info.value)
    assert exc_info.type == ValueError
```

## Testing with Setup and Teardown

```python
# test_resource_management.py
import pytest

class Resource:
    """Resource that needs setup/teardown."""

    def __init__(self, name: str):
        self.name = name
        self.opened = False

    def open(self):
        """Open resource."""
        self.opened = True

    def close(self):
        """Close resource."""
        self.opened = False

    def read(self) -> str:
        """Read from resource."""
        if not self.opened:
            raise RuntimeError("Resource not opened")
        return f"Data from {self.name}"

class TestResource:
    """Test resource management."""

    def setup_method(self):
        """Setup before each test."""
        self.resource = Resource("test.txt")
        self.resource.open()

    def teardown_method(self):
        """Teardown after each test."""
        if self.resource.opened:
            self.resource.close()

    def test_read_data(self):
        """Test reading from resource."""
        data = self.resource.read()
        assert "Data from test.txt" in data

    def test_resource_is_opened(self):
        """Test resource is opened in setup."""
        assert self.resource.opened is True

    def test_read_requires_open(self):
        """Test reading requires open resource."""
        self.resource.close()
        with pytest.raises(RuntimeError, match="not opened"):
            self.resource.read()
```

## Test Assertions

```python
# test_assertions.py
import pytest

def test_equality():
    """Test equality assertions."""
    assert 2 + 2 == 4
    assert "hello" == "hello"
    assert [1, 2, 3] == [1, 2, 3]

def test_inequality():
    """Test inequality assertions."""
    assert 2 + 2 != 5
    assert "hello" != "world"

def test_comparison():
    """Test comparison assertions."""
    assert 5 > 3
    assert 2 < 4
    assert 5 >= 5
    assert 3 <= 3

def test_identity():
    """Test identity assertions."""
    x = None
    assert x is None
    assert x is not False

def test_membership():
    """Test membership assertions."""
    assert "a" in "abc"
    assert 2 in [1, 2, 3]
    assert "x" not in "abc"

def test_type_checks():
    """Test type assertions."""
    assert isinstance(42, int)
    assert isinstance("hello", str)
    assert isinstance([1, 2], list)

def test_approximate_equality():
    """Test approximate float equality."""
    assert 0.1 + 0.2 == pytest.approx(0.3)
    assert 10.0001 == pytest.approx(10, abs=0.01)
```
