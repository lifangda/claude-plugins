---
name: javascript-testing-patterns
description: Implement comprehensive testing strategies using Jest, Vitest, and Testing Library for unit tests, integration tests, and end-to-end testing with mocking, fixtures, and test-driven development. Use when writing JavaScript/TypeScript tests, setting up test infrastructure, or implementing TDD/BDD workflows.
---

# JavaScript Testing Patterns

Comprehensive guide for implementing robust testing strategies in JavaScript/TypeScript applications using modern testing frameworks and best practices.

## When to Use This Skill

- Setting up test infrastructure for new projects
- Writing unit tests for functions and classes
- Creating integration tests for APIs and services
- Implementing end-to-end tests for user flows
- Mocking external dependencies and APIs
- Testing React, Vue, or other frontend components
- Implementing test-driven development (TDD)
- Setting up continuous testing in CI/CD pipelines

## Testing Frameworks Overview

### Jest - Full-Featured Testing Framework

**Setup:**
```typescript
// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.interface.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
};

export default config;
```

### Vitest - Fast, Vite-Native Testing

**Setup:**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/*.d.ts', '**/*.config.ts', '**/dist/**'],
    },
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

## Quick Start Examples

### Testing Pure Functions

```typescript
// utils/calculator.test.ts
import { describe, it, expect } from 'vitest';
import { add, divide } from './calculator';

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });
  });
});
```

### Testing Classes

```typescript
// services/user.service.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it('should create a new user', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com' };
    const created = service.create(user);

    expect(created).toEqual(user);
    expect(service.findById('1')).toEqual(user);
  });

  it('should throw error if user already exists', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com' };
    service.create(user);

    expect(() => service.create(user)).toThrow('User already exists');
  });
});
```

### Testing Async Functions

```typescript
// services/api.service.test.ts
import { describe, it, expect, vi } from 'vitest';
import { ApiService } from './api.service';

global.fetch = vi.fn();

describe('ApiService', () => {
  it('should fetch user successfully', async () => {
    const mockUser = { id: '1', name: 'John' };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await service.fetchUser('1');

    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
  });

  it('should throw error if user not found', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
    });

    await expect(service.fetchUser('999')).rejects.toThrow('User not found');
  });
});
```

## Testing Pattern Categories

### 1. Unit Testing
Detailed patterns for testing individual functions, classes, and modules in isolation.

**See**: [Unit Testing Patterns](references/unit-testing.md)

### 2. Mocking Strategies
Comprehensive guide to mocking modules, dependencies, and external services.

**See**: [Mocking Patterns](references/mocking.md)

### 3. Integration Testing
Patterns for testing API endpoints, database operations, and service interactions.

**See**: [Integration Testing](references/integration-testing.md)

### 4. Frontend Testing
React, Vue, and other frontend component testing with Testing Library.

**See**: [Frontend Testing](references/frontend-testing.md)

### 5. Test Utilities
Fixtures, factories, snapshot testing, and coverage reporting.

**See**: [Test Utilities](references/test-utilities.md)

## Best Practices

1. **Follow AAA Pattern**: Arrange, Act, Assert
2. **One assertion per test**: Or logically related assertions
3. **Descriptive test names**: Should describe what is being tested
4. **Use beforeEach/afterEach**: For setup and teardown
5. **Mock external dependencies**: Keep tests isolated
6. **Test edge cases**: Not just happy paths
7. **Avoid implementation details**: Test behavior, not implementation
8. **Use test factories**: For consistent test data
9. **Keep tests fast**: Mock slow operations
10. **Write tests first (TDD)**: When possible
11. **Maintain test coverage**: Aim for 80%+ coverage
12. **Use TypeScript**: For type-safe tests

## Common Test Organization

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user successfully', () => {});
    it('should throw error if email exists', () => {});
    it('should hash password', () => {});
  });

  describe('updateUser', () => {
    it('should update user', () => {});
    it('should throw error if not found', () => {});
  });
});
```

## Coverage Reports

```typescript
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
```

## Resources

- **Jest Documentation**: https://jestjs.io/
- **Vitest Documentation**: https://vitest.dev/
- **Testing Library**: https://testing-library.com/
- **Kent C. Dodds Testing Blog**: https://kentcdodds.com/blog/
