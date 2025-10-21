# Authentication & Authorization

JWT-based authentication with access and refresh tokens.

## JWT Authentication Service

Complete authentication implementation:

```typescript
// services/auth.service.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { UnauthorizedError } from '../utils/errors';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = this.generateToken({
      userId: user.id,
      email: user.email
    });

    const refreshToken = this.generateRefreshToken({
      userId: user.id
    });

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as { userId: string };

      const user = await this.userRepository.findById(payload.userId);

      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      const token = this.generateToken({
        userId: user.id,
        email: user.email
      });

      return { token };
    } catch (error) {
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  private generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '15m'
    });
  }

  private generateRefreshToken(payload: any): string {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '7d'
    });
  }
}
```

## Password Hashing

Secure password handling:

```typescript
// utils/password.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function validatePasswordStrength(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}
```

## Authentication Controller

Login and token refresh endpoints:

```typescript
// controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);

      // Set refresh token as HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.json({
        token: result.token,
        user: result.user
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new UnauthorizedError('No refresh token provided');
      }

      const result = await this.authService.refreshToken(refreshToken);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  }
}
```

## Role-Based Access Control (RBAC)

Implement role-based permissions:

```typescript
// types/auth.types.ts
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
}

// config/permissions.ts
export const rolePermissions: Record<Role, Permission[]> = {
  [Role.USER]: [
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' },
  ],
  [Role.MODERATOR]: [
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' },
    { resource: 'posts', action: 'delete' },
  ],
  [Role.ADMIN]: [
    { resource: '*', action: 'create' },
    { resource: '*', action: 'read' },
    { resource: '*', action: 'update' },
    { resource: '*', action: 'delete' },
  ],
};

// middleware/permission.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/errors';
import { rolePermissions } from '../config/permissions';

export const requirePermission = (resource: string, action: Permission['action']) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      throw new ForbiddenError('No role assigned');
    }

    const permissions = rolePermissions[userRole];
    const hasPermission = permissions.some(
      p => (p.resource === resource || p.resource === '*') && p.action === action
    );

    if (!hasPermission) {
      throw new ForbiddenError('Insufficient permissions');
    }

    next();
  };
};
```

## Token Blacklist

Implement token revocation:

```typescript
// services/token-blacklist.service.ts
import Redis from 'ioredis';

export class TokenBlacklistService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379')
    });
  }

  async blacklistToken(token: string, expiresIn: number): Promise<void> {
    await this.redis.setex(`blacklist:${token}`, expiresIn, '1');
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const result = await this.redis.get(`blacklist:${token}`);
    return result === '1';
  }
}

// Updated auth middleware
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    // Check if token is blacklisted
    const blacklistService = new TokenBlacklistService();
    if (await blacklistService.isBlacklisted(token)) {
      throw new UnauthorizedError('Token has been revoked');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    req.user = payload;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};
```

## OAuth2 Integration

Google OAuth2 authentication:

```typescript
// services/oauth.service.ts
import { OAuth2Client } from 'google-auth-library';

export class OAuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  async verifyGoogleToken(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token payload');
    }

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      googleId: payload.sub
    };
  }

  async loginWithGoogle(token: string) {
    const googleUser = await this.verifyGoogleToken(token);

    // Find or create user
    let user = await this.userRepository.findByEmail(googleUser.email!);

    if (!user) {
      user = await this.userRepository.create({
        email: googleUser.email!,
        name: googleUser.name!,
        googleId: googleUser.googleId
      });
    }

    // Generate JWT tokens
    const accessToken = this.generateToken({ userId: user.id });
    const refreshToken = this.generateRefreshToken({ userId: user.id });

    return { accessToken, refreshToken, user };
  }
}
```

## Two-Factor Authentication (2FA)

TOTP-based 2FA implementation:

```typescript
// services/twofa.service.ts
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export class TwoFactorService {
  generateSecret(email: string) {
    const secret = speakeasy.generateSecret({
      name: `MyApp (${email})`
    });

    return {
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url
    };
  }

  async generateQRCode(otpauthUrl: string): Promise<string> {
    return QRCode.toDataURL(otpauthUrl);
  }

  verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2 // Allow 2 time steps in either direction
    });
  }
}
```
