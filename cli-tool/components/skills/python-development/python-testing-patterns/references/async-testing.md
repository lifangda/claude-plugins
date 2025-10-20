# Async Testing

Testing asynchronous code with pytest-asyncio.

## Basic Async Tests

```python
# test_async_basic.py
import pytest
import asyncio

async def fetch_data(url: str) -> dict:
    """Fetch data asynchronously."""
    await asyncio.sleep(0.1)  # Simulate async operation
    return {"url": url, "data": "result"}

@pytest.mark.asyncio
async def test_fetch_data():
    """Test async function."""
    result = await fetch_data("https://api.example.com")
    assert result["url"] == "https://api.example.com"
    assert "data" in result

@pytest.mark.asyncio
async def test_multiple_async_calls():
    """Test multiple async calls."""
    result1 = await fetch_data("url1")
    result2 = await fetch_data("url2")

    assert result1["url"] == "url1"
    assert result2["url"] == "url2"
```

## Concurrent Operations

```python
# test_concurrent.py
import pytest
import asyncio

async def process_item(item: int) -> int:
    """Process item asynchronously."""
    await asyncio.sleep(0.1)
    return item * 2

@pytest.mark.asyncio
async def test_concurrent_fetches():
    """Test concurrent async operations."""
    items = [1, 2, 3, 4, 5]
    tasks = [process_item(item) for item in items]
    results = await asyncio.gather(*tasks)

    assert len(results) == 5
    assert results == [2, 4, 6, 8, 10]

@pytest.mark.asyncio
async def test_gather_with_exception():
    """Test gather with exceptions."""
    async def failing_task():
        await asyncio.sleep(0.1)
        raise ValueError("Task failed")

    async def successful_task():
        await asyncio.sleep(0.1)
        return "success"

    # return_exceptions=True prevents gather from failing
    results = await asyncio.gather(
        failing_task(),
        successful_task(),
        return_exceptions=True
    )

    assert isinstance(results[0], ValueError)
    assert results[1] == "success"
```

## Async Fixtures

```python
# conftest.py
import pytest

@pytest.fixture
async def async_client():
    """Async fixture that provides a client."""
    client = {"connected": False}

    # Setup
    await asyncio.sleep(0.01)  # Simulate async setup
    client["connected"] = True

    yield client

    # Teardown
    await asyncio.sleep(0.01)  # Simulate async cleanup
    client["connected"] = False

@pytest.fixture
async def async_database():
    """Async database fixture."""
    db = {"data": []}

    # Connect
    await asyncio.sleep(0.01)
    db["connected"] = True

    yield db

    # Disconnect
    db["data"].clear()
    db["connected"] = False

# test_async_fixtures.py
@pytest.mark.asyncio
async def test_with_async_fixture(async_client):
    """Test using async fixture."""
    assert async_client["connected"] is True

    # Use client
    await asyncio.sleep(0.01)
    assert async_client["connected"] is True

@pytest.mark.asyncio
async def test_async_database(async_database):
    """Test with async database fixture."""
    assert async_database["connected"] is True

    # Add data
    async_database["data"].append({"id": 1})
    assert len(async_database["data"]) == 1
```

## Testing Timeouts

```python
# test_timeouts.py
import pytest
import asyncio

async def slow_operation():
    """Slow async operation."""
    await asyncio.sleep(5)
    return "done"

@pytest.mark.asyncio
async def test_timeout():
    """Test operation timeout."""
    with pytest.raises(asyncio.TimeoutError):
        await asyncio.wait_for(slow_operation(), timeout=1)

@pytest.mark.asyncio
async def test_timeout_with_default():
    """Test timeout with default value."""
    async def fetch_with_timeout(timeout=2):
        try:
            return await asyncio.wait_for(slow_operation(), timeout=timeout)
        except asyncio.TimeoutError:
            return "timeout"

    result = await fetch_with_timeout(timeout=0.5)
    assert result == "timeout"
```

## Testing Async Context Managers

```python
# test_async_context.py
import pytest
import asyncio

class AsyncResource:
    """Async context manager."""

    def __init__(self):
        self.opened = False

    async def __aenter__(self):
        """Enter async context."""
        await asyncio.sleep(0.01)
        self.opened = True
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Exit async context."""
        await asyncio.sleep(0.01)
        self.opened = False

    async def fetch(self):
        """Fetch data."""
        if not self.opened:
            raise RuntimeError("Resource not opened")
        return "data"

@pytest.mark.asyncio
async def test_async_context_manager():
    """Test async context manager."""
    async with AsyncResource() as resource:
        assert resource.opened is True
        data = await resource.fetch()
        assert data == "data"

    # Resource should be closed
    # assert resource.opened is False  # Can't check after context
```

## Testing Async Iterators

```python
# test_async_iterators.py
import pytest
import asyncio

class AsyncRange:
    """Async iterator."""

    def __init__(self, count: int):
        self.count = count
        self.current = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.current >= self.count:
            raise StopAsyncIteration

        await asyncio.sleep(0.01)
        value = self.current
        self.current += 1
        return value

@pytest.mark.asyncio
async def test_async_iterator():
    """Test async iterator."""
    results = []

    async for value in AsyncRange(5):
        results.append(value)

    assert results == [0, 1, 2, 3, 4]

@pytest.mark.asyncio
async def test_async_comprehension():
    """Test async comprehension."""
    results = [value async for value in AsyncRange(3)]
    assert results == [0, 1, 2]
```

## Testing Async Queues

```python
# test_async_queue.py
import pytest
import asyncio

@pytest.mark.asyncio
async def test_async_queue():
    """Test async queue."""
    queue = asyncio.Queue()

    # Producer
    async def producer():
        for i in range(5):
            await queue.put(i)
            await asyncio.sleep(0.01)

    # Consumer
    async def consumer():
        results = []
        for _ in range(5):
            item = await queue.get()
            results.append(item)
        return results

    # Run producer and consumer
    producer_task = asyncio.create_task(producer())
    consumer_task = asyncio.create_task(consumer())

    results = await consumer_task
    await producer_task

    assert results == [0, 1, 2, 3, 4]
```

## Mocking Async Functions

```python
# test_async_mocking.py
import pytest
import asyncio
from unittest.mock import AsyncMock, Mock, patch

class AsyncAPI:
    """Async API client."""

    async def fetch_user(self, user_id: int) -> dict:
        """Fetch user asynchronously."""
        await asyncio.sleep(0.1)
        return {"id": user_id, "name": "User"}

@pytest.mark.asyncio
async def test_async_mock():
    """Test with AsyncMock."""
    mock_api = AsyncMock(spec=AsyncAPI)
    mock_api.fetch_user.return_value = {"id": 1, "name": "Mock User"}

    result = await mock_api.fetch_user(1)

    assert result["name"] == "Mock User"
    mock_api.fetch_user.assert_called_once_with(1)

@pytest.mark.asyncio
@patch("test_async_mocking.AsyncAPI")
async def test_async_patch(MockAPI):
    """Test with patched async method."""
    mock_instance = MockAPI.return_value
    mock_instance.fetch_user = AsyncMock(return_value={"id": 1, "name": "Patched"})

    api = mock_instance
    result = await api.fetch_user(1)

    assert result["name"] == "Patched"
```

## Event Loop Configuration

```python
# conftest.py
import pytest
import asyncio

@pytest.fixture(scope="session")
def event_loop():
    """Create event loop for entire test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

# pytest.ini or pyproject.toml
# [tool.pytest.ini_options]
# asyncio_mode = "auto"  # Automatically detect async tests
```

## Testing Async Exceptions

```python
# test_async_exceptions.py
import pytest
import asyncio

async def failing_async_function():
    """Async function that raises exception."""
    await asyncio.sleep(0.01)
    raise ValueError("Async error")

@pytest.mark.asyncio
async def test_async_exception():
    """Test async exception handling."""
    with pytest.raises(ValueError, match="Async error"):
        await failing_async_function()

@pytest.mark.asyncio
async def test_async_exception_in_gather():
    """Test exception in gather."""
    async def task1():
        await asyncio.sleep(0.01)
        return "success"

    async def task2():
        await asyncio.sleep(0.01)
        raise ValueError("Task 2 failed")

    with pytest.raises(ValueError, match="Task 2 failed"):
        await asyncio.gather(task1(), task2())
```
