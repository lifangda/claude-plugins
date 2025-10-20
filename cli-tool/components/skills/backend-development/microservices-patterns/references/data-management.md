# Data Management

Database per service and data consistency patterns.

## Database Per Service

Each service owns its data with no shared databases.

```python
# Order Service has its own database
class OrderRepository:
    def __init__(self, db_connection):
        self.db = db_connection  # order_db

    async def save(self, order):
        await self.db.execute("INSERT INTO orders ...")

# Payment Service has separate database
class PaymentRepository:
    def __init__(self, db_connection):
        self.db = db_connection  # payment_db

    async def save(self, payment):
        await self.db.execute("INSERT INTO payments ...")
```

## Eventual Consistency

Use events to keep data synchronized across services.

```python
# Order Service publishes event
await event_bus.publish(OrderCreatedEvent(order_id=order.id))

# Inventory Service maintains local copy
async def handle_order_created(event):
    # Update local read model
    await order_view_repo.create({
        "order_id": event.order_id,
        "status": "pending"
    })
```
