---
name: microservices-patterns
description: Design microservices architectures with service boundaries, event-driven communication, and resilience patterns. Use when building distributed systems, decomposing monoliths, or implementing microservices.
---

# Microservices Patterns

Master microservices architecture patterns including service boundaries, inter-service communication, data management, and resilience patterns for building distributed systems.

## When to Use This Skill

- Decomposing monoliths into microservices
- Designing service boundaries and contracts
- Implementing inter-service communication
- Managing distributed data and transactions
- Building resilient distributed systems
- Implementing service discovery and load balancing
- Designing event-driven architectures

## Core Concepts

### 1. Service Decomposition Strategies

**By Business Capability**
- Organize services around business functions
- Each service owns its domain
- Example: OrderService, PaymentService, InventoryService

**By Subdomain (DDD)**
- Core domain, supporting subdomains
- Bounded contexts map to services
- Clear ownership and responsibility

**Strangler Fig Pattern**
- Gradually extract from monolith
- New functionality as microservices
- Proxy routes to old/new systems

**See detailed guide**: [Service Decomposition](references/service-decomposition.md)

### 2. Communication Patterns

**Synchronous (Request/Response)**
- REST APIs
- gRPC
- GraphQL

**Asynchronous (Events/Messages)**
- Event streaming (Kafka)
- Message queues (RabbitMQ, SQS)
- Pub/Sub patterns

**See detailed patterns**: [Communication Patterns](references/communication-patterns.md)

### 3. Data Management

**Database Per Service**
- Each service owns its data
- No shared databases
- Loose coupling

**Saga Pattern**
- Distributed transactions
- Compensating actions
- Eventual consistency

**See detailed patterns**: [Data Management](references/data-management.md)

### 4. Resilience Patterns

**Circuit Breaker**
- Fail fast on repeated errors
- Prevent cascade failures

**Retry with Backoff**
- Transient fault handling
- Exponential backoff

**Bulkhead**
- Isolate resources
- Limit impact of failures

**See detailed implementations**: [Resilience Patterns](references/resilience-patterns.md)

## Quick Start

### Basic Service Structure

```python
from fastapi import FastAPI

app = FastAPI()

class OrderService:
    """Handles order lifecycle."""

    async def create_order(self, order_data: dict) -> Order:
        order = Order.create(order_data)

        # Publish event for other services
        await self.event_bus.publish(
            OrderCreatedEvent(
                order_id=order.id,
                customer_id=order.customer_id,
                items=order.items,
                total=order.total
            )
        )

        return order

@app.post("/orders")
async def create_order(order_data: dict):
    service = OrderService()
    return await service.create_order(order_data)
```

### API Gateway Pattern

```python
class APIGateway:
    """Central entry point for all client requests."""

    async def call_order_service(self, path: str, method: str = "GET", **kwargs):
        response = await self.http_client.request(
            method,
            f"{self.order_service_url}{path}",
            **kwargs
        )
        return response.json()

    async def create_order_aggregate(self, order_id: str) -> dict:
        """Aggregate data from multiple services."""
        order, payment, inventory = await asyncio.gather(
            self.call_order_service(f"/orders/{order_id}"),
            self.call_payment_service(f"/payments/order/{order_id}"),
            self.call_inventory_service(f"/reservations/order/{order_id}"),
            return_exceptions=True
        )

        return {"order": order, "payment": payment, "inventory": inventory}
```

**See detailed patterns**: [API Gateway](references/api-gateway.md)

## Service Decomposition Patterns

Break monoliths into microservices using business capabilities and DDD principles.

**See detailed guide**: [Service Decomposition](references/service-decomposition.md)

## Communication Patterns

### Synchronous Communication

REST APIs with retry logic and timeouts.

```python
from tenacity import retry, stop_after_attempt, wait_exponential

class ServiceClient:
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10)
    )
    async def get(self, path: str, **kwargs):
        response = await self.client.get(f"{self.base_url}{path}", **kwargs)
        response.raise_for_status()
        return response.json()
```

**See detailed patterns**: [Communication Patterns](references/communication-patterns.md)

### Asynchronous Event-Driven

Event bus with Kafka for decoupled communication.

```python
async def publish_event(event: DomainEvent):
    await event_bus.publish(event)

async def subscribe_to_events(topic: str, handler: callable):
    await event_bus.subscribe(topic, handler)
```

**See detailed implementation**: [Event-Driven Architecture](references/event-driven.md)

## Data Management Patterns

### Saga Pattern

Manage distributed transactions with compensating actions.

```python
class OrderFulfillmentSaga:
    """Orchestrated saga for order fulfillment."""

    async def execute(self, order_data: dict) -> SagaResult:
        try:
            for step in self.steps:
                result = await step.action(context)
                if not result.success:
                    await self.compensate(completed_steps, context)
                    return SagaResult(status=SagaStatus.FAILED)

                completed_steps.append(step)

            return SagaResult(status=SagaStatus.COMPLETED)
        except Exception:
            await self.compensate(completed_steps, context)
```

**See detailed implementation**: [Saga Pattern](references/saga-pattern.md)

## Resilience Patterns

### Circuit Breaker

Prevent cascade failures by failing fast.

```python
class CircuitBreaker:
    async def call(self, func: Callable, *args, **kwargs) -> Any:
        if self.state == CircuitState.OPEN:
            raise CircuitBreakerOpenError("Circuit breaker is open")

        try:
            result = await func(*args, **kwargs)
            self._on_success()
            return result
        except Exception:
            self._on_failure()
            raise
```

**See detailed implementations**: [Resilience Patterns](references/resilience-patterns.md)

## Best Practices

1. **Service Boundaries**: Align with business capabilities
2. **Database Per Service**: No shared databases
3. **API Contracts**: Versioned, backward compatible
4. **Async When Possible**: Events over direct calls
5. **Circuit Breakers**: Fail fast on service failures
6. **Distributed Tracing**: Track requests across services
7. **Service Registry**: Dynamic service discovery
8. **Health Checks**: Liveness and readiness probes

**See detailed guide**: [Best Practices](references/best-practices.md)

## Common Pitfalls

- **Distributed Monolith**: Tightly coupled services
- **Chatty Services**: Too many inter-service calls
- **Shared Databases**: Tight coupling through data
- **No Circuit Breakers**: Cascade failures
- **Synchronous Everything**: Tight coupling, poor resilience
- **Premature Microservices**: Starting with microservices
- **Ignoring Network Failures**: Assuming reliable network
- **No Compensation Logic**: Can't undo failed transactions

**See detailed solutions**: [Common Pitfalls](references/common-pitfalls.md)
