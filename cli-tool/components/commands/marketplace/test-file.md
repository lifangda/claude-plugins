---
allowed-tools: Bash(find:*), Bash(ls:*)
description: Generate comprehensive tests for a specific file
---

## Your task

Generate comprehensive unit tests for the file: @$ARGUMENTS

Requirements:
- Use the existing testing framework in this project
- Include edge cases and error scenarios
- Follow the project's testing conventions
- Aim for high test coverage
- Include both positive and negative test cases

## Project context

- Existing test files: !`find . -name "*.test.*" -o -name "*.spec.*" | head -10`
- Package.json testing setup: @package.json