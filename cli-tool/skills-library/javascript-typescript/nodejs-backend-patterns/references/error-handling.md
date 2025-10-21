# Error Handling

Comprehensive error handling with custom error classes and global error handler.

## Custom Error Classes

Type-safe error hierarchy extending base Error:

```typescript
// utils/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public errors?: any[]) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}
```

## Global Error Handler

Centralized error handling middleware:

```typescript
// middleware/error-handler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { logger } from './logger.middleware';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(err instanceof ValidationError && { errors: err.errors })
    });
  }

  // Log unexpected errors
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(500).json({
    status: 'error',
    message
  });
};

// Async error wrapper
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

## Usage in Controllers

```typescript
// controllers/user.controller.ts
import { asyncHandler } from '../middleware/error-handler';
import { NotFoundError } from '../utils/errors';

export class UserController {
  // Using asyncHandler wrapper
  getUser = asyncHandler(async (req, res) => {
    const user = await this.userService.getUserById(req.params.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json(user);
  });

  // Using try-catch
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
```

## Error Response Format

Standardized error responses:

```typescript
// Validation error response
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" },
    { "field": "password", "message": "Password must be at least 8 characters" }
  ]
}

// Not found error response
{
  "status": "error",
  "message": "User not found"
}

// Unauthorized error response
{
  "status": "error",
  "message": "Invalid token"
}
```

## Unhandled Rejection Handler

Handle uncaught promises and exceptions:

```typescript
// server.ts
process.on('unhandledRejection', (reason: Error) => {
  console.error('Unhandled Rejection:', reason);
  // Graceful shutdown
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  // Graceful shutdown
  server.close(() => {
    process.exit(1);
  });
});
```

## Database Error Handling

Handle database-specific errors:

```typescript
// utils/db-error-handler.ts
import { DatabaseError } from 'pg';
import { ConflictError, NotFoundError } from './errors';

export function handleDatabaseError(error: any): never {
  if (error instanceof DatabaseError) {
    // Unique constraint violation
    if (error.code === '23505') {
      throw new ConflictError('Resource already exists');
    }

    // Foreign key violation
    if (error.code === '23503') {
      throw new NotFoundError('Related resource not found');
    }

    // Not null violation
    if (error.code === '23502') {
      throw new ValidationError('Required field is missing');
    }
  }

  throw error;
}

// Usage in repository
async create(data: CreateUserDTO) {
  try {
    const result = await this.db.query('INSERT INTO users ...', [data]);
    return result.rows[0];
  } catch (error) {
    handleDatabaseError(error);
  }
}
```

## 404 Handler

Catch-all route for undefined endpoints:

```typescript
// app.ts
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.url} not found`
  });
});
```

## Error Logging

Enhanced error logging with context:

```typescript
// utils/error-logger.ts
import { logger } from '../middleware/logger.middleware';

export function logError(error: Error, context?: Record<string, any>) {
  logger.error({
    name: error.name,
    message: error.message,
    stack: error.stack,
    ...context
  });

  // Send to error tracking service in production
  if (process.env.NODE_ENV === 'production') {
    // Sentry, Bugsnag, etc.
  }
}
```
