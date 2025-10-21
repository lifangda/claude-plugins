# Docker
```dockerfile
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
RUN uv sync --frozen --no-dev
CMD ["uv", "run", "python", "app.py"]
```
