# Saga Pattern

Manage distributed transactions with compensating actions.

```python
class OrderFulfillmentSaga:
    """Orchestrated saga for order fulfillment."""

    def __init__(self):
        self.steps = [
            SagaStep("create_order", self.create_order, self.cancel_order),
            SagaStep("reserve_inventory", self.reserve_inventory, self.release_inventory),
            SagaStep("process_payment", self.process_payment, self.refund_payment),
            SagaStep("confirm_order", self.confirm_order, self.cancel_confirmation)
        ]

    async def execute(self, order_data: dict) -> SagaResult:
        completed_steps = []
        context = {"order_data": order_data}

        try:
            for step in self.steps:
                result = await step.action(context)
                if not result.success:
                    await self.compensate(completed_steps, context)
                    return SagaResult(status=SagaStatus.FAILED)

                completed_steps.append(step)
                context.update(result.data)

            return SagaResult(status=SagaStatus.COMPLETED)

        except Exception:
            await self.compensate(completed_steps, context)
            return SagaResult(status=SagaStatus.FAILED)

    async def compensate(self, completed_steps, context):
        """Execute compensating actions in reverse order."""
        for step in reversed(completed_steps):
            await step.compensation(context)
```
