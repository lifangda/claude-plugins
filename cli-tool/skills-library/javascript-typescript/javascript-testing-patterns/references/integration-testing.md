# Integration Testing

Patterns for testing API endpoints, database operations, and service interactions.

## Pattern 1: API Integration Tests

```typescript
// tests/integration/user.api.test.ts
import request from 'supertest';
import { app } from '../../src/app';
import { pool } from '../../src/config/database';

describe('User API Integration Tests', () => {
  beforeAll(async () => {
    // Setup test database
    await pool.query('CREATE TABLE IF NOT EXISTS users (...)');
  });

  afterAll(async () => {
    // Cleanup
    await pool.query('DROP TABLE IF EXISTS users');
    await pool.end();
  });

  beforeEach(async () => {
    // Clear data before each test
    await pool.query('TRUNCATE TABLE users CASCADE');
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        name: userData.name,
        email: userData.email,
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 400 if email is invalid', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 409 if email already exists', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      await request(app).post('/api/users').send(userData);

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(409);

      expect(response.body.error).toContain('already exists');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get user by id', async () => {
      const createResponse = await request(app)
        .post('/api/users')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        });

      const userId = createResponse.body.id;

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
      });
    });

    it('should return 404 if user not found', async () => {
      await request(app)
        .get('/api/users/999')
        .expect(404);
    });
  });

  describe('Authentication', () => {
    it('should require authentication for protected routes', async () => {
      await request(app)
        .get('/api/users/me')
        .expect(401);
    });

    it('should allow access with valid token', async () => {
      // Create user and login
      await request(app)
        .post('/api/users')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        });

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123',
        });

      const token = loginResponse.body.token;

      const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.email).toBe('john@example.com');
    });
  });
});
```

## Pattern 2: Database Integration Tests

```typescript
// tests/integration/user.repository.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Pool } from 'pg';
import { UserRepository } from '../../src/repositories/user.repository';

describe('UserRepository Integration Tests', () => {
  let pool: Pool;
  let repository: UserRepository;

  beforeAll(async () => {
    pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: 'test_db',
      user: 'test_user',
      password: 'test_password',
    });

    repository = new UserRepository(pool);

    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });

  afterAll(async () => {
    await pool.query('DROP TABLE IF EXISTS users');
    await pool.end();
  });

  beforeEach(async () => {
    await pool.query('TRUNCATE TABLE users CASCADE');
  });

  it('should create a user', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });

  it('should find user by email', async () => {
    await repository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password',
    });

    const user = await repository.findByEmail('john@example.com');

    expect(user).toBeTruthy();
    expect(user?.name).toBe('John Doe');
  });

  it('should return null if user not found', async () => {
    const user = await repository.findByEmail('nonexistent@example.com');
    expect(user).toBeNull();
  });
});
```

## Test Database Setup

### Using Docker for Test Database

```bash
# docker-compose.test.yml
version: '3.8'
services:
  test-db:
    image: postgres:15
    environment:
      POSTGRES_DB: test_db
      POSTGRES_USER: test_user
      POSTGRES_PASSWORD: test_password
    ports:
      - "5433:5432"
```

### Test Setup Script

```typescript
// tests/setup.ts
import { Pool } from 'pg';

export async function setupTestDatabase() {
  const pool = new Pool({
    host: 'localhost',
    port: 5433,
    database: 'test_db',
    user: 'test_user',
    password: 'test_password',
  });

  // Run migrations
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (...);
    CREATE TABLE IF NOT EXISTS posts (...);
  `);

  return pool;
}

export async function teardownTestDatabase(pool: Pool) {
  await pool.query('DROP SCHEMA public CASCADE');
  await pool.query('CREATE SCHEMA public');
  await pool.end();
}
```

## Testing External Services

```typescript
// tests/integration/payment.service.test.ts
import { describe, it, expect } from 'vitest';
import { PaymentService } from '../../src/services/payment.service';

describe('Payment Service Integration', () => {
  it('should process payment with Stripe', async () => {
    const service = new PaymentService(process.env.STRIPE_TEST_KEY);

    const payment = await service.createPayment({
      amount: 1000,
      currency: 'usd',
      source: 'tok_visa', // Stripe test token
    });

    expect(payment.status).toBe('succeeded');
    expect(payment.amount).toBe(1000);
  });
});
```
