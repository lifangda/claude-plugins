---
name: uv-package-manager
description: Master the uv package manager for fast Python dependency management, virtual environments, and modern Python project workflows. Use when setting up Python projects, managing dependencies, or optimizing Python development workflows with uv.
---

# UV Package Manager

Comprehensive guide to using uv, an extremely fast Python package installer and resolver written in Rust (10-100x faster than pip).

## When to Use This Skill

- Setting up new Python projects quickly
- Managing Python dependencies faster than pip
- Creating and managing virtual environments
- Installing Python interpreters
- Resolving dependency conflicts efficiently
- Migrating from pip/pip-tools/poetry
- Speeding up CI/CD pipelines
- Working with lockfiles for reproducible builds

## Core Concepts

### What is uv?
- **Ultra-fast**: 10-100x faster than pip
- **Written in Rust**: Leverages Rust's performance
- **Drop-in pip replacement**: Compatible with pip workflows
- **All-in-one tool**: Package manager + venv manager + Python installer

### Key Features
- Blazing fast installation speeds
- Disk space efficient with global cache
- Compatible with pip, pip-tools, poetry
- Cross-platform support (Linux, macOS, Windows)
- Built-in virtual environment support

## Installation

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Using pip
pip install uv

# Verify
uv --version
```

## Quick Start

```bash
# Create new project
uv init my-project
cd my-project

# Install dependencies
uv add requests pandas

# Install dev dependencies
uv add --dev pytest black ruff

# Run application
uv run python app.py
```

**See detailed guide**: [Getting Started](references/getting-started.md)

## Virtual Environments

```bash
# Create virtual environment
uv venv

# Create with specific Python version
uv venv --python 3.12

# Run without activation
uv run python script.py
uv run pytest
```

**See detailed patterns**: [Virtual Environments](references/virtual-environments.md)

## Package Management

```bash
# Add packages
uv add requests "django>=4.0,<5.0"

# Add dev dependencies
uv add --dev pytest pytest-cov

# Remove packages
uv remove requests

# Upgrade packages
uv add --upgrade requests
```

**See detailed patterns**: [Package Management](references/package-management.md)

## Python Version Management

```bash
# Install Python versions
uv python install 3.12

# Pin Python version for project
uv python pin 3.12

# List installed versions
uv python list
```

**See detailed patterns**: [Python Management](references/python-management.md)

## Lockfile Workflows

```bash
# Create lockfile (uv.lock)
uv lock

# Install from lockfile (exact versions)
uv sync --frozen

# Update lockfile
uv lock --upgrade

# Export to requirements.txt
uv export --format requirements-txt > requirements.txt
```

**See detailed patterns**: [Lockfiles](references/lockfiles.md)

## CI/CD Integration

```yaml
# .github/workflows/test.yml
steps:
  - uses: actions/checkout@v4

  - name: Install uv
    uses: astral-sh/setup-uv@v2
    with:
      enable-cache: true

  - name: Set up Python
    run: uv python install 3.12

  - name: Install dependencies
    run: uv sync --frozen

  - name: Run tests
    run: uv run pytest
```

**See detailed patterns**: [CI/CD Integration](references/ci-cd.md)

## Docker Integration

```dockerfile
FROM python:3.12-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app

# Copy and install dependencies
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

COPY . .

CMD ["uv", "run", "python", "app.py"]
```

**See detailed patterns**: [Docker Integration](references/docker.md)

## Performance Optimization

```bash
# Use frozen installs in CI
uv sync --frozen

# Offline mode (cache only)
uv sync --offline

# Clear cache
uv cache clean

# Global cache automatically shared across projects
```

**See detailed patterns**: [Performance](references/performance.md)

## Comparison with Other Tools

| Tool | Install Time | Features |
|------|--------------|----------|
| pip | ~30s | Package installer |
| poetry | ~20s | Package + dependency manager |
| uv | ~2s | Package + venv + Python installer |

**vs pip**: 10-100x faster, better resolver
**vs poetry**: 6-7x faster, less opinionated
**vs pip-tools**: 7-8x faster, simpler UX

## Common Workflows

### Starting a New Project
```bash
uv init my-project
cd my-project
uv python pin 3.12
uv add fastapi uvicorn
uv add --dev pytest black ruff
uv run pytest
```

### Maintaining Existing Project
```bash
git clone repo
cd repo
uv sync
uv run python app.py
uv add new-package
git add pyproject.toml uv.lock
```

**See detailed workflows**: [Common Workflows](references/workflows.md)

## Migration Guide

### From pip
```bash
# Before: pip install -r requirements.txt
# After:
uv venv
uv pip install -r requirements.txt
# Or better:
uv add -r requirements.txt
```

### From poetry
```bash
# Before: poetry install
# After: uv sync
# Keep existing pyproject.toml
```

**See detailed guide**: [Migration](references/migration.md)

## Essential Commands

```bash
# Project management
uv init [PATH]            # Initialize project
uv add PACKAGE            # Add dependency
uv remove PACKAGE         # Remove dependency
uv sync                   # Install dependencies
uv lock                   # Create/update lockfile

# Virtual environments
uv venv [PATH]            # Create venv
uv run COMMAND            # Run in venv

# Python management
uv python install VERSION # Install Python
uv python pin VERSION     # Pin Python version

# Package installation
uv pip install PACKAGE    # Install package
uv pip freeze             # List installed
```

## Best Practices

1. **Use uv for all new projects** - Start with `uv init`
2. **Commit lockfiles** - Ensure reproducible builds
3. **Pin Python versions** - Use .python-version
4. **Use uv run** - Avoid manual venv activation
5. **Use --frozen in CI** - Exact reproduction
6. **Keep uv updated** - Fast-moving project
7. **Export for compatibility** - Generate requirements.txt when needed

## Resources

- **Official docs**: https://docs.astral.sh/uv/
- **GitHub**: https://github.com/astral-sh/uv
- **Migration guides**: https://docs.astral.sh/uv/guides/
