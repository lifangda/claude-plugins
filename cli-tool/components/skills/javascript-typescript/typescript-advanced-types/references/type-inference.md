# Type Inference

Master TypeScript's type inference for more flexible and reusable code.

## 1. Infer Keyword

Extract types from other types using `infer`.

```typescript
// Extract array element type
type ElementType<T> = T extends (infer U)[] ? U : never;

type NumArray = number[];
type Num = ElementType<NumArray>;  // number

type StrArray = string[];
type Str = ElementType<StrArray>;  // string
```

### Extract Promise Type

```typescript
type PromiseType<T> = T extends Promise<infer U> ? U : never;

type AsyncNum = PromiseType<Promise<number>>;  // number
type AsyncUser = PromiseType<Promise<User>>;   // User
```

### Extract Function Parameters

```typescript
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function foo(a: string, b: number) {}
type FooParams = Parameters<typeof foo>;  // [string, number]

function bar(x: boolean, y: string, z: number) {}
type BarParams = Parameters<typeof bar>;  // [boolean, string, number]
```

### Extract Function Return Type

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>;
// Type: { id: number; name: string; }
```

## 2. Type Guards

Functions that narrow types at runtime.

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());  // Type: string
  }
}
```

### Array Type Guard

```typescript
function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

const data: unknown = ["a", "b", "c"];

if (isArrayOf(data, isString)) {
  data.forEach(s => s.toUpperCase());  // Type: string[]
}
```

### Object Type Guard

```typescript
interface User {
  id: number;
  name: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof (value as any).id === "number" &&
    typeof (value as any).name === "string"
  );
}

function processUser(data: unknown) {
  if (isUser(data)) {
    console.log(data.id, data.name);  // Type: User
  }
}
```

### Generic Type Guard

```typescript
function hasProperty<T extends string>(
  obj: unknown,
  prop: T
): obj is Record<T, unknown> {
  return typeof obj === "object" && obj !== null && prop in obj;
}

const data: unknown = { name: "John", age: 30 };

if (hasProperty(data, "name")) {
  console.log(data.name);  // Type: unknown
}
```

## 3. Assertion Functions

Functions that assert types and throw on failure.

```typescript
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string");
  }
}

function processValue(value: unknown) {
  assertIsString(value);
  // value is now typed as string
  console.log(value.toUpperCase());
}
```

### Assert Non-Null

```typescript
function assertNonNull<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error("Value is null or undefined");
  }
}

function processUser(user: User | null) {
  assertNonNull(user);
  // user is now typed as User (non-null)
  console.log(user.name);
}
```

### Assert Object Shape

```typescript
interface User {
  id: number;
  name: string;
}

function assertIsUser(value: unknown): asserts value is User {
  if (
    typeof value !== "object" ||
    value === null ||
    !("id" in value) ||
    !("name" in value) ||
    typeof (value as any).id !== "number" ||
    typeof (value as any).name !== "string"
  ) {
    throw new Error("Not a User object");
  }
}

function processData(data: unknown) {
  assertIsUser(data);
  // data is now typed as User
  console.log(data.id, data.name);
}
```

## 4. Const Assertions

Preserve literal types with `as const`.

```typescript
const config = {
  host: "localhost",
  port: 3000
} as const;

// Type: { readonly host: "localhost"; readonly port: 3000 }
// Not: { host: string; port: number }
```

### Tuple with Const Assertion

```typescript
const tuple = [1, "hello", true] as const;
// Type: readonly [1, "hello", true]
// Not: (string | number | boolean)[]
```

### Object Keys as Literal Types

```typescript
const COLORS = {
  RED: "#ff0000",
  GREEN: "#00ff00",
  BLUE: "#0000ff"
} as const;

type Color = typeof COLORS[keyof typeof COLORS];
// Type: "#ff0000" | "#00ff00" | "#0000ff"
```

## 5. typeof and keyof

Extract types from values and keys.

```typescript
const user = {
  id: 1,
  name: "John",
  age: 30
};

type User = typeof user;
// Type: { id: number; name: string; age: number }

type UserKeys = keyof User;
// Type: "id" | "name" | "age"
```

### Function Type Extraction

```typescript
function createUser(name: string, age: number) {
  return { name, age, id: Math.random() };
}

type CreateUserFunction = typeof createUser;
// Type: (name: string, age: number) => { name: string; age: number; id: number }

type CreateUserReturn = ReturnType<typeof createUser>;
// Type: { name: string; age: number; id: number }
```

## 6. Indexed Access Types

Access property types using bracket notation.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserId = User["id"];      // number
type UserName = User["name"];  // string

type UserFields = User[keyof User];
// Type: number | string (union of all property types)
```

### Nested Property Access

```typescript
interface Config {
  server: {
    host: string;
    port: number;
  };
}

type ServerConfig = Config["server"];
// Type: { host: string; port: number }

type Host = Config["server"]["host"];
// Type: string
```
