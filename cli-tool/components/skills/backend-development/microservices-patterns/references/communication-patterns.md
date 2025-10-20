# Communication Patterns

Patterns for inter-service communication.

## Synchronous REST

```python
import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

class ServiceClient:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.client = httpx.AsyncClient(timeout=5.0)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10)
    )
    async def get(self, path: str, **kwargs):
        response = await self.client.get(f"{self.base_url}{path}", **kwargs)
        response.raise_for_status()
        return response.json()
```

## Asynchronous Event-Driven

```python
from aiokafka import AIOKafkaProducer, AIOKafkaConsumer

class EventBus:
    async def publish(self, event: DomainEvent):
        await self.producer.send_and_wait(
            event.event_type,
            value=asdict(event)
        )

    async def subscribe(self, topic: str, handler: callable):
        consumer = AIOKafkaConsumer(topic)
        async for message in consumer:
            await handler(message.value)
```
