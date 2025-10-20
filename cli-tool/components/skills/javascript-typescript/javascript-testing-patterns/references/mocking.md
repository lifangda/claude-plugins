# Mocking Patterns

Comprehensive guide to mocking modules, dependencies, and external services in JavaScript/TypeScript tests.

## Pattern 1: Mocking Modules

```typescript
// services/email.service.ts
import nodemailer from 'nodemailer';

export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendEmail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  }
}

// services/email.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmailService } from './email.service';

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: '123' }),
    })),
  },
}));

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    service = new EmailService();
  });

  it('should send email successfully', async () => {
    await service.sendEmail(
      'test@example.com',
      'Test Subject',
      '<p>Test Body</p>'
    );

    expect(service['transporter'].sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'test@example.com',
        subject: 'Test Subject',
      })
    );
  });
});
```

## Pattern 2: Dependency Injection for Testing

```typescript
// services/user.service.ts
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
}

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(userData: CreateUserDTO): Promise<User> {
    // Business logic here
    const user = { id: generateId(), ...userData };
    return this.userRepository.create(user);
  }
}

// services/user.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService, IUserRepository } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockRepository: IUserRepository;

  beforeEach(() => {
    mockRepository = {
      findById: vi.fn(),
      create: vi.fn(),
    };
    service = new UserService(mockRepository);
  });

  describe('getUser', () => {
    it('should return user if found', async () => {
      const mockUser = { id: '1', name: 'John', email: 'john@example.com' };
      vi.mocked(mockRepository.findById).mockResolvedValue(mockUser);

      const user = await service.getUser('1');

      expect(user).toEqual(mockUser);
      expect(mockRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw error if user not found', async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null);

      await expect(service.getUser('999')).rejects.toThrow('User not found');
    });
  });

  describe('createUser', () => {
    it('should create user successfully', async () => {
      const userData = { name: 'John', email: 'john@example.com' };
      const createdUser = { id: '1', ...userData };

      vi.mocked(mockRepository.create).mockResolvedValue(createdUser);

      const user = await service.createUser(userData);

      expect(user).toEqual(createdUser);
      expect(mockRepository.create).toHaveBeenCalled();
    });
  });
});
```

## Pattern 3: Spying on Functions

```typescript
// utils/logger.ts
export const logger = {
  info: (message: string) => console.log(`INFO: ${message}`),
  error: (message: string) => console.error(`ERROR: ${message}`),
};

// services/order.service.ts
import { logger } from '../utils/logger';

export class OrderService {
  async processOrder(orderId: string): Promise<void> {
    logger.info(`Processing order ${orderId}`);
    // Process order logic
    logger.info(`Order ${orderId} processed successfully`);
  }
}

// services/order.service.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OrderService } from './order.service';
import { logger } from '../utils/logger';

describe('OrderService', () => {
  let service: OrderService;
  let loggerSpy: any;

  beforeEach(() => {
    service = new OrderService();
    loggerSpy = vi.spyOn(logger, 'info');
  });

  afterEach(() => {
    loggerSpy.mockRestore();
  });

  it('should log order processing', async () => {
    await service.processOrder('123');

    expect(loggerSpy).toHaveBeenCalledWith('Processing order 123');
    expect(loggerSpy).toHaveBeenCalledWith('Order 123 processed successfully');
    expect(loggerSpy).toHaveBeenCalledTimes(2);
  });
});
```

## Mocking Global Objects

```typescript
// Mock fetch globally
global.fetch = vi.fn();

describe('API Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    const result = await fetchData();
    expect(result).toEqual({ data: 'test' });
  });
});
```

## Mocking Environment Variables

```typescript
describe('Config Tests', () => {
  beforeEach(() => {
    process.env.API_KEY = 'test-key';
    process.env.API_URL = 'https://test.api.com';
  });

  afterEach(() => {
    delete process.env.API_KEY;
    delete process.env.API_URL;
  });

  it('should use environment variables', () => {
    const config = loadConfig();
    expect(config.apiKey).toBe('test-key');
    expect(config.apiUrl).toBe('https://test.api.com');
  });
});
```

## Partial Mocking

```typescript
import * as utils from './utils';

describe('Partial Mocking', () => {
  it('should mock only specific functions', () => {
    vi.spyOn(utils, 'functionA').mockReturnValue('mocked A');
    // functionB remains unmocked

    expect(utils.functionA()).toBe('mocked A');
    expect(utils.functionB()).toBe('real B');
  });
});
```
