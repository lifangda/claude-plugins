# Common Pitfalls

Mistakes to avoid when building microservices.

## 1. Distributed Monolith

**Problem**: Tightly coupled services that must deploy together.

**Solution**: Use events, async communication, and independent deployments.

## 2. Chatty Services

**Problem**: Too many inter-service calls causing latency.

**Solution**: Aggregate data, use caching, implement CQRS.

## 3. Shared Databases

**Problem**: Services coupled through database schema.

**Solution**: Database per service, event-driven data sync.

## 4. No Circuit Breakers

**Problem**: Cascade failures when services go down.

**Solution**: Implement circuit breakers and timeouts.

## 5. Synchronous Everything

**Problem**: Tight coupling, poor resilience.

**Solution**: Use async events for non-critical operations.

## 6. Premature Microservices

**Problem**: Starting with microservices before understanding domain.

**Solution**: Start with monolith, extract services when needed.

## 7. Ignoring Network Failures

**Problem**: Assuming reliable network.

**Solution**: Implement retries, timeouts, circuit breakers.

## 8. No Compensation Logic

**Problem**: Can't undo failed distributed transactions.

**Solution**: Implement saga pattern with compensating actions.
