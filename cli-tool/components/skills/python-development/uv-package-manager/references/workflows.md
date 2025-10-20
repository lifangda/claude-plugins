# Common Workflows
```bash
# New project
uv init my-project && cd my-project
uv add fastapi uvicorn
uv run python app.py

# Existing project
git clone repo && cd repo
uv sync
uv run python app.py
```
