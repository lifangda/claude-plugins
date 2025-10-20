# Best Practices

Guidelines for successful microservices architecture.

1. **Service Boundaries**: Align with business capabilities, not technical layers
2. **Database Per Service**: Each service owns its data
3. **API Contracts**: Version APIs, maintain backward compatibility
4. **Async When Possible**: Use events over direct calls for loose coupling
5. **Circuit Breakers**: Fail fast, prevent cascade failures
6. **Distributed Tracing**: Use correlation IDs to track requests
7. **Service Registry**: Dynamic service discovery (Consul, Eureka)
8. **Health Checks**: Implement liveness and readiness probes
9. **Idempotency**: Make operations idempotent for retry safety
10. **Monitoring**: Centralized logging and metrics

## Example Health Check

```python
@app.get("/health/liveness")
async def liveness():
    return {"status": "alive"}

@app.get("/health/readiness")
async def readiness():
    # Check dependencies
    db_ok = await check_database()
    cache_ok = await check_redis()

    if db_ok and cache_ok:
        return {"status": "ready"}
    return JSONResponse(
        status_code=503,
        content={"status": "not ready"}
    )
```
