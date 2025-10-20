# Utility Types

Built-in TypeScript utility types for common transformations.

## Partial<T>

Make all properties optional.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// Type: { id?: number; name?: string; email?: string; }

function updateUser(id: number, updates: Partial<User>) {
  // Can update any subset of properties
}

updateUser(1, { name: "New Name" });  // OK
updateUser(2, { email: "new@email.com", name: "Name" });  // OK
```

## Required<T>

Make all properties required.

```typescript
interface Config {
  host?: string;
  port?: number;
  timeout?: number;
}

type RequiredConfig = Required<Config>;
// Type: { host: string; port: number; timeout: number; }
```

## Readonly<T>

Make all properties readonly.

```typescript
type ReadonlyUser = Readonly<User>;
// Type: { readonly id: number; readonly name: string; readonly email: string; }

const user: ReadonlyUser = { id: 1, name: "John", email: "john@example.com" };
// user.name = "Jane";  // Error: Cannot assign to 'name' because it is read-only
```

## Pick<T, K>

Select specific properties from a type.

```typescript
type UserNameEmail = Pick<User, "name" | "email">;
// Type: { name: string; email: string; }

type UserIdName = Pick<User, "id" | "name">;
// Type: { id: number; name: string; }
```

## Omit<T, K>

Remove specific properties from a type.

```typescript
type UserWithoutPassword = Omit<User, "password">;
// Removes 'password' field

type UserPublic = Omit<User, "password" | "email">;
// Removes both 'password' and 'email'
```

## Record<K, T>

Create object type with keys K and values T.

```typescript
type PageInfo = Record<"home" | "about" | "contact", { title: string }>;
// Type: {
//   home: { title: string };
//   about: { title: string };
//   contact: { title: string };
// }

type Dictionary = Record<string, string>;
// Type: { [key: string]: string; }

type NumberMap = Record<number, boolean>;
// Type: { [key: number]: boolean; }
```

## Exclude<T, U>

Exclude types from a union.

```typescript
type T1 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type T2 = Exclude<string | number, number>;  // string
type T3 = Exclude<string | number | (() => void), Function>;  // string | number
```

## Extract<T, U>

Extract types from a union.

```typescript
type T1 = Extract<"a" | "b" | "c", "a" | "b">;  // "a" | "b"
type T2 = Extract<string | number, number>;  // number
type T3 = Extract<string | number | (() => void), Function>;  // () => void
```

## NonNullable<T>

Exclude null and undefined from a type.

```typescript
type T1 = NonNullable<string | null | undefined>;  // string
type T2 = NonNullable<number | null>;  // number
type T3 = NonNullable<User | null | undefined>;  // User
```

## ReturnType<T>

Extract return type of a function.

```typescript
function getUser() {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>;
// Type: { id: number; name: string; }

type T1 = ReturnType<() => string>;  // string
type T2 = ReturnType<(x: number) => number>;  // number
```

## Parameters<T>

Extract parameter types of a function.

```typescript
function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// Type: [string, number, string]

type T1 = Parameters<(a: string, b: number) => void>;  // [string, number]
```

## ConstructorParameters<T>

Extract constructor parameter types.

```typescript
class User {
  constructor(public name: string, public age: number) {}
}

type UserConstructorParams = ConstructorParameters<typeof User>;
// Type: [string, number]
```

## InstanceType<T>

Extract instance type of a constructor.

```typescript
type UserInstance = InstanceType<typeof User>;
// Type: User

class Box<T> {
  constructor(public value: T) {}
}

type StringBox = InstanceType<typeof Box<string>>;
// Type: Box<string>
```

## Awaited<T>

Unwrap Promise type.

```typescript
type T1 = Awaited<Promise<string>>;  // string
type T2 = Awaited<Promise<Promise<number>>>;  // number
type T3 = Awaited<boolean | Promise<string>>;  // boolean | string
```
