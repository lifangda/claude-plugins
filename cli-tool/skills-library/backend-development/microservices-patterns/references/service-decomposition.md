# Service Decomposition

Strategies for breaking down monoliths into microservices.

## By Business Capability

Organize services around business functions where each service owns its domain.

```python
# E-commerce example

class OrderService:
    """Handles order lifecycle."""

    async def create_order(self, order_data: dict) -> Order:
        order = Order.create(order_data)
        await self.event_bus.publish(OrderCreatedEvent(order))
        return order

class PaymentService:
    """Handles payment processing."""

    async def process_payment(self, payment_request: PaymentRequest):
        result = await self.payment_gateway.charge(
            amount=payment_request.amount,
            customer=payment_request.customer_id
        )
        if result.success:
            await self.event_bus.publish(PaymentCompletedEvent(result))
        return result

class InventoryService:
    """Handles inventory management."""

    async def reserve_items(self, order_id: str, items: List[OrderItem]):
        for item in items:
            available = await self.inventory_repo.get_available(item.product_id)
            if available < item.quantity:
                return ReservationResult(success=False)

        reservation = await self.create_reservation(order_id, items)
        await self.event_bus.publish(InventoryReservedEvent(reservation))
        return ReservationResult(success=True)
```

## Strangler Fig Pattern

Gradually extract functionality from monolith.

```python
class RouterProxy:
    """Route requests to monolith or microservice."""

    async def route_order_request(self, request):
        if self.is_migrated(request.path):
            return await self.microservice_client.handle(request)
        else:
            return await self.monolith_client.handle(request)
```
