# Caching Patterns

Redis-based caching strategies for Node.js applications.

## Redis Setup

Production-ready Redis connection:

```typescript
// config/redis.ts
import Redis from 'ioredis';

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  reconnectOnError: (err) => {
    const targetError = 'READONLY';
    if (err.message.includes(targetError)) {
      return true;
    }
    return false;
  }
});

redis.on('connect', () => {
  console.log('Redis connected');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export async function closeRedis() {
  await redis.quit();
  console.log('Redis connection closed');
}
```

## Cache Service

Reusable caching service:

```typescript
// utils/cache.ts
import Redis from 'ioredis';

export class CacheService {
  constructor(private redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttl) {
      await this.redis.setex(key, ttl, serialized);
    } else {
      await this.redis.set(key, serialized);
    }
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  async increment(key: string, by: number = 1): Promise<number> {
    return this.redis.incrby(key, by);
  }

  async decrement(key: string, by: number = 1): Promise<number> {
    return this.redis.decrby(key, by);
  }
}
```

## Cache Decorator

Automatic method caching with decorator:

```typescript
// utils/cache-decorator.ts
import { CacheService } from './cache';
import { redis } from '../config/redis';

export function Cacheable(ttl: number = 300) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cache = new CacheService(redis);
      const cacheKey = `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;

      // Try to get from cache
      const cached = await cache.get(cacheKey);
      if (cached) {
        return cached;
      }

      // Execute method and cache result
      const result = await originalMethod.apply(this, args);
      await cache.set(cacheKey, result, ttl);

      return result;
    };

    return descriptor;
  };
}

// Usage
export class UserService {
  @Cacheable(300) // Cache for 5 minutes
  async getUserById(id: string) {
    return await this.userRepository.findById(id);
  }

  @Cacheable(600) // Cache for 10 minutes
  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
```

## Cache Aside Pattern

Manual cache management:

```typescript
// services/product.service.ts
import { CacheService } from '../utils/cache';

export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private cache: CacheService
  ) {}

  async getProductById(id: string) {
    const cacheKey = `product:${id}`;

    // Try cache first
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from database
    const product = await this.productRepository.findById(id);

    if (product) {
      // Store in cache for 1 hour
      await this.cache.set(cacheKey, product, 3600);
    }

    return product;
  }

  async updateProduct(id: string, updates: any) {
    const product = await this.productRepository.update(id, updates);

    // Invalidate cache
    await this.cache.delete(`product:${id}`);
    await this.cache.invalidatePattern('products:list:*');

    return product;
  }
}
```

## Write-Through Cache

Update cache and database together:

```typescript
// services/user.service.ts
export class UserService {
  async updateUser(id: string, updates: UpdateUserDTO) {
    const cacheKey = `user:${id}`;

    // Update database
    const user = await this.userRepository.update(id, updates);

    // Update cache immediately
    if (user) {
      await this.cache.set(cacheKey, user, 3600);
    }

    return user;
  }
}
```

## Cache Invalidation

Strategic cache invalidation:

```typescript
// services/cache-invalidation.service.ts
export class CacheInvalidationService {
  constructor(private cache: CacheService) {}

  // Invalidate single item
  async invalidateUser(userId: string) {
    await this.cache.delete(`user:${userId}`);
  }

  // Invalidate related items
  async invalidateUserRelated(userId: string) {
    await this.cache.invalidatePattern(`user:${userId}:*`);
    await this.cache.invalidatePattern(`posts:user:${userId}:*`);
    await this.cache.invalidatePattern(`comments:user:${userId}:*`);
  }

  // Invalidate collections
  async invalidateUserList() {
    await this.cache.invalidatePattern('users:list:*');
  }

  // Time-based invalidation
  async scheduleInvalidation(key: string, delay: number) {
    setTimeout(async () => {
      await this.cache.delete(key);
    }, delay);
  }
}
```

## Multi-Level Caching

Combine memory and Redis caching:

```typescript
// utils/multi-level-cache.ts
import NodeCache from 'node-cache';
import { CacheService } from './cache';

export class MultiLevelCache {
  private memoryCache: NodeCache;

  constructor(
    private redisCache: CacheService,
    memoryCacheTTL: number = 60
  ) {
    this.memoryCache = new NodeCache({ stdTTL: memoryCacheTTL });
  }

  async get<T>(key: string): Promise<T | null> {
    // L1: Memory cache
    const memCached = this.memoryCache.get<T>(key);
    if (memCached) {
      return memCached;
    }

    // L2: Redis cache
    const redisCached = await this.redisCache.get<T>(key);
    if (redisCached) {
      // Store in memory cache
      this.memoryCache.set(key, redisCached);
      return redisCached;
    }

    return null;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    // Set in both caches
    this.memoryCache.set(key, value, ttl || 60);
    await this.redisCache.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    this.memoryCache.del(key);
    await this.redisCache.delete(key);
  }
}
```

## Cache Warming

Preload frequently accessed data:

```typescript
// services/cache-warming.service.ts
export class CacheWarmingService {
  constructor(
    private cache: CacheService,
    private productRepository: ProductRepository
  ) {}

  async warmProductCache() {
    // Get popular products
    const popularProducts = await this.productRepository.findPopular(100);

    // Cache each product
    for (const product of popularProducts) {
      await this.cache.set(
        `product:${product.id}`,
        product,
        3600 // 1 hour
      );
    }

    console.log(`Warmed cache with ${popularProducts.length} products`);
  }

  async scheduleWarming() {
    // Warm cache every hour
    setInterval(() => {
      this.warmProductCache();
    }, 60 * 60 * 1000);
  }
}
```

## Cache Statistics

Monitor cache performance:

```typescript
// services/cache-stats.service.ts
export class CacheStatsService {
  private hits: number = 0;
  private misses: number = 0;

  recordHit() {
    this.hits++;
  }

  recordMiss() {
    this.misses++;
  }

  getHitRate(): number {
    const total = this.hits + this.misses;
    return total > 0 ? this.hits / total : 0;
  }

  getStats() {
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: this.getHitRate(),
      total: this.hits + this.misses
    };
  }

  reset() {
    this.hits = 0;
    this.misses = 0;
  }
}

// Enhanced cache service with stats
export class CacheServiceWithStats extends CacheService {
  constructor(redis: Redis, private stats: CacheStatsService) {
    super(redis);
  }

  async get<T>(key: string): Promise<T | null> {
    const result = await super.get<T>(key);

    if (result) {
      this.stats.recordHit();
    } else {
      this.stats.recordMiss();
    }

    return result;
  }
}
```

## Distributed Caching

Ensure cache consistency across multiple servers:

```typescript
// services/distributed-cache.service.ts
export class DistributedCacheService {
  constructor(private redis: Redis) {}

  async lock(key: string, ttl: number = 10): Promise<boolean> {
    const lockKey = `lock:${key}`;
    const result = await this.redis.set(lockKey, '1', 'EX', ttl, 'NX');
    return result === 'OK';
  }

  async unlock(key: string): Promise<void> {
    await this.redis.del(`lock:${key}`);
  }

  async withLock<T>(
    key: string,
    fn: () => Promise<T>,
    ttl: number = 10
  ): Promise<T> {
    const locked = await this.lock(key, ttl);

    if (!locked) {
      throw new Error('Could not acquire lock');
    }

    try {
      return await fn();
    } finally {
      await this.unlock(key);
    }
  }
}
```
