# CI/CD Integration
```yaml
steps:
  - uses: astral-sh/setup-uv@v2
  - run: uv sync --frozen
  - run: uv run pytest
```
