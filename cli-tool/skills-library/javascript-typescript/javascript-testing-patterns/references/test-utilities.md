# Test Utilities

Fixtures, factories, snapshot testing, and coverage reporting tools and patterns.

## Test Fixtures and Factories

```typescript
// tests/fixtures/user.fixture.ts
import { faker } from '@faker-js/faker';

export function createUserFixture(overrides?: Partial<User>): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    createdAt: faker.date.past(),
    ...overrides,
  };
}

export function createUsersFixture(count: number): User[] {
  return Array.from({ length: count }, () => createUserFixture());
}

// Usage in tests
import { createUserFixture, createUsersFixture } from '../fixtures/user.fixture';

describe('UserService', () => {
  it('should process user', () => {
    const user = createUserFixture({ name: 'John Doe' });
    // Use user in test
  });

  it('should handle multiple users', () => {
    const users = createUsersFixture(10);
    // Use users in test
  });
});
```

## Snapshot Testing

```typescript
// components/UserCard.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('should match snapshot', () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };

    const { container } = render(<UserCard user={user} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot with loading state', () => {
    const { container } = render(<UserCard loading />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

## Coverage Configuration

### Vitest Coverage

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        '**/*.d.ts',
        '**/*.config.ts',
        '**/dist/**',
        '**/node_modules/**',
        '**/test/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
```

### Jest Coverage

```typescript
// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.type.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
};

export default config;
```

## Coverage Scripts

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:watch": "vitest --watch"
  }
}
```

## Test Builders

```typescript
// tests/builders/user.builder.ts
export class UserBuilder {
  private user: Partial<User> = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };

  withId(id: string): UserBuilder {
    this.user.id = id;
    return this;
  }

  withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  build(): User {
    return this.user as User;
  }
}

// Usage
const user = new UserBuilder()
  .withId('123')
  .withName('Jane Doe')
  .withEmail('jane@example.com')
  .build();
```

## Test Data Generators

```typescript
// tests/generators/data.generator.ts
import { faker } from '@faker-js/faker';

export const generate = {
  user: {
    email: () => faker.internet.email(),
    name: () => faker.person.fullName(),
    password: () => faker.internet.password(),
    phone: () => faker.phone.number(),
  },

  product: {
    name: () => faker.commerce.productName(),
    price: () => faker.number.int({ min: 1, max: 1000 }),
    description: () => faker.commerce.productDescription(),
  },

  order: {
    id: () => faker.string.uuid(),
    status: () => faker.helpers.arrayElement(['pending', 'completed', 'cancelled']),
    total: () => faker.number.float({ min: 10, max: 500, precision: 0.01 }),
  },
};

// Usage
describe('OrderService', () => {
  it('should create order', () => {
    const order = {
      id: generate.order.id(),
      status: generate.order.status(),
      total: generate.order.total(),
    };

    expect(service.create(order)).toBeDefined();
  });
});
```

## Custom Matchers

```typescript
// tests/setup.ts
import { expect } from 'vitest';

// Custom matcher for email validation
expect.extend({
  toBeValidEmail(received: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);

    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid email`
          : `Expected ${received} to be a valid email`,
    };
  },
});

// Usage
describe('Email Validation', () => {
  it('should validate email', () => {
    expect('test@example.com').toBeValidEmail();
    expect('invalid-email').not.toBeValidEmail();
  });
});
```

## Test Helpers

```typescript
// tests/helpers/test.helpers.ts
export async function waitForCondition(
  condition: () => boolean,
  timeout = 5000
): Promise<void> {
  const startTime = Date.now();

  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Condition not met within timeout');
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

export function createMockResponse<T>(data: T, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  } as Response;
}

// Usage
describe('Helper Tests', () => {
  it('should wait for condition', async () => {
    let value = false;
    setTimeout(() => { value = true; }, 1000);

    await waitForCondition(() => value === true);
    expect(value).toBe(true);
  });

  it('should create mock response', async () => {
    const response = createMockResponse({ id: '1', name: 'John' });
    const data = await response.json();

    expect(data).toEqual({ id: '1', name: 'John' });
  });
});
```

## Performance Testing Utilities

```typescript
// tests/utils/performance.utils.ts
export function measurePerformance<T>(
  fn: () => T,
  maxDuration: number
): { result: T; duration: number } {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;

  if (duration > maxDuration) {
    throw new Error(
      `Performance threshold exceeded: ${duration}ms > ${maxDuration}ms`
    );
  }

  return { result, duration };
}

// Usage
describe('Performance Tests', () => {
  it('should complete within time limit', () => {
    const { result, duration } = measurePerformance(
      () => expensiveOperation(),
      1000 // max 1 second
    );

    expect(result).toBeDefined();
    expect(duration).toBeLessThan(1000);
  });
});
```

## Coverage Reports

### Viewing Coverage

```bash
# Generate coverage report
npm run test:coverage

# Open HTML report
open coverage/index.html
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Test Coverage

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm ci
      - run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

### Coverage Badges

```markdown
<!-- README.md -->
[![Coverage Status](https://codecov.io/gh/username/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/username/repo)
```
