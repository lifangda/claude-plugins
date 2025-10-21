# Database Patterns

Database integration patterns for PostgreSQL and MongoDB with Node.js.

## PostgreSQL with Connection Pool

Production-ready PostgreSQL setup:

```typescript
// config/database.ts
import { Pool, PoolConfig } from 'pg';

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(poolConfig);

// Test connection
pool.on('connect', () => {
  console.log('Database connected');
});

pool.on('error', (err) => {
  console.error('Unexpected database error', err);
  process.exit(-1);
});

// Graceful shutdown
export const closeDatabase = async () => {
  await pool.end();
  console.log('Database connection closed');
};
```

## MongoDB with Mongoose

Mongoose setup with connection handling:

```typescript
// config/mongoose.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

export { connectDB };

// Model example
import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });

export const User = model<IUser>('User', userSchema);
```

## Transaction Pattern

PostgreSQL transactions for data consistency:

```typescript
// services/order.service.ts
import { Pool } from 'pg';

export class OrderService {
  constructor(private db: Pool) {}

  async createOrder(userId: string, items: any[]) {
    const client = await this.db.connect();

    try {
      await client.query('BEGIN');

      // Create order
      const orderResult = await client.query(
        'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id',
        [userId, calculateTotal(items)]
      );
      const orderId = orderResult.rows[0].id;

      // Create order items
      for (const item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [orderId, item.productId, item.quantity, item.price]
        );

        // Update inventory
        await client.query(
          'UPDATE products SET stock = stock - $1 WHERE id = $2',
          [item.quantity, item.productId]
        );
      }

      await client.query('COMMIT');
      return orderId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
```

## Query Builder Pattern

Type-safe query builder for complex queries:

```typescript
// repositories/query-builder.ts
export class QueryBuilder {
  private selectFields: string[] = ['*'];
  private whereConditions: string[] = [];
  private params: any[] = [];
  private orderByFields: string[] = [];
  private limitValue?: number;
  private offsetValue?: number;

  select(...fields: string[]): this {
    this.selectFields = fields;
    return this;
  }

  where(condition: string, ...params: any[]): this {
    this.whereConditions.push(condition);
    this.params.push(...params);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderByFields.push(`${field} ${direction}`);
    return this;
  }

  limit(value: number): this {
    this.limitValue = value;
    return this;
  }

  offset(value: number): this {
    this.offsetValue = value;
    return this;
  }

  build(table: string): { query: string; params: any[] } {
    let query = `SELECT ${this.selectFields.join(', ')} FROM ${table}`;

    if (this.whereConditions.length > 0) {
      const whereClause = this.whereConditions
        .map((_, idx) => `$${idx + 1}`)
        .join(' AND ');
      query += ` WHERE ${whereClause}`;
    }

    if (this.orderByFields.length > 0) {
      query += ` ORDER BY ${this.orderByFields.join(', ')}`;
    }

    if (this.limitValue) {
      query += ` LIMIT ${this.limitValue}`;
    }

    if (this.offsetValue) {
      query += ` OFFSET ${this.offsetValue}`;
    }

    return { query, params: this.params };
  }
}

// Usage
const { query, params } = new QueryBuilder()
  .select('id', 'name', 'email')
  .where('status = ?', 'active')
  .where('created_at > ?', new Date('2024-01-01'))
  .orderBy('created_at', 'DESC')
  .limit(10)
  .build('users');
```

## Pagination Helper

Reusable pagination utility:

```typescript
// utils/pagination.ts
export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export async function paginate<T>(
  query: string,
  params: any[],
  options: PaginationOptions,
  db: Pool
): Promise<PaginatedResult<T>> {
  const { page, limit } = options;
  const offset = (page - 1) * limit;

  // Get total count
  const countQuery = `SELECT COUNT(*) FROM (${query}) AS count_query`;
  const { rows: countRows } = await db.query(countQuery, params);
  const total = parseInt(countRows[0].count);

  // Get paginated data
  const paginatedQuery = `${query} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  const { rows } = await db.query(paginatedQuery, [...params, limit, offset]);

  return {
    data: rows,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
}
```

## Database Migrations

Simple migration system:

```typescript
// migrations/001_create_users_table.ts
export async function up(db: Pool) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE INDEX idx_users_email ON users(email)
  `);
}

export async function down(db: Pool) {
  await db.query('DROP TABLE IF EXISTS users CASCADE');
}
```

## Soft Delete Pattern

Implement soft deletes:

```typescript
// repositories/base.repository.ts
export class BaseRepository<T> {
  constructor(protected db: Pool, protected tableName: string) {}

  async softDelete(id: string): Promise<void> {
    await this.db.query(
      `UPDATE ${this.tableName} SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [id]
    );
  }

  async restore(id: string): Promise<void> {
    await this.db.query(
      `UPDATE ${this.tableName} SET deleted_at = NULL WHERE id = $1`,
      [id]
    );
  }

  async findActive(conditions?: any): Promise<T[]> {
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE deleted_at IS NULL
    `;
    const { rows } = await this.db.query(query);
    return rows;
  }
}
```
