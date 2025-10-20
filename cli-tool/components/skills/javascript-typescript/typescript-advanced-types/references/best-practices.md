# Best Practices

Guidelines for writing effective TypeScript code with advanced types.

## 1. Use `unknown` over `any`

Enforce type checking instead of bypassing it.

```typescript
// ❌ Bad: any disables type checking
function processValue(value: any) {
  return value.toUpperCase();  // No error if value is not a string
}

// ✅ Good: unknown requires type checking
function processValue(value: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase();  // Safe
  }
  throw new Error("Value must be a string");
}
```

## 2. Prefer `interface` for Object Shapes

Better error messages and extendability.

```typescript
// ✅ Good: interface for object shapes
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  role: string;
}

// ⚠️ Use type for unions, intersections, and complex types
type StringOrNumber = string | number;
type Point = { x: number } & { y: number };
```

## 3. Use `type` for Unions and Complex Types

More flexible for advanced type operations.

```typescript
// ✅ Good: type for unions
type Status = "pending" | "success" | "error";

// ✅ Good: type for mapped types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// ✅ Good: type for conditional types
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

## 4. Leverage Type Inference

Let TypeScript infer when possible.

```typescript
// ❌ Bad: unnecessary type annotations
const name: string = "John";
const age: number = 30;

// ✅ Good: let TypeScript infer
const name = "John";    // Type: string
const age = 30;         // Type: number

// ✅ Good: explicit types for function returns (clarity)
function getUser(): User {
  return { id: 1, name: "John" };
}
```

## 5. Create Helper Types

Build reusable type utilities.

```typescript
// ✅ Good: reusable helper types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type AsyncResult<T> = Promise<T | Error>;

// Usage
const userId: Nullable<number> = null;
const userName: Optional<string> = undefined;
```

## 6. Use Const Assertions

Preserve literal types.

```typescript
// ❌ Bad: loses literal types
const colors = ["red", "green", "blue"];
// Type: string[]

// ✅ Good: preserves literal types
const colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]

type Color = typeof colors[number];
// Type: "red" | "green" | "blue"
```

## 7. Avoid Type Assertions

Use type guards instead.

```typescript
// ❌ Bad: type assertion bypasses safety
const value = getData() as User;

// ✅ Good: type guard ensures safety
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

const value = getData();
if (isUser(value)) {
  console.log(value.name);  // Safe
}
```

## 8. Document Complex Types

Add JSDoc comments.

```typescript
/**
 * Extract the return type of a promise
 * @template T - The promise type to extract from
 * @example
 * type User = Awaited<Promise<{ id: number; name: string }>>
 * // Type: { id: number; name: string }
 */
type Awaited<T> = T extends Promise<infer U> ? U : T;
```

## 9. Use Strict Mode

Enable all strict compiler options.

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

## 10. Test Your Types

Verify type behavior with type tests.

```typescript
// Type assertion tests
type AssertEqual<T, U> =
  [T] extends [U]
    ? [U] extends [T]
      ? true
      : false
    : false;

// Test cases
type Test1 = AssertEqual<string, string>;        // true
type Test2 = AssertEqual<string, number>;        // false
type Test3 = AssertEqual<string | number, string>; // false

// Expect error helper
type ExpectError<T extends never> = T;

// Example usage
type ShouldError = ExpectError<AssertEqual<string, number>>;
// Error: Type 'false' does not satisfy the constraint 'never'
```

## Additional Best Practices

### Use Discriminated Unions for State

```typescript
type AsyncState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function handleState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case "loading":
      // state.data not accessible (compile error)
      break;
    case "success":
      console.log(state.data);  // Type: T
      break;
    case "error":
      console.log(state.error);  // Type: Error
      break;
  }
}
```

### Prefer Composition over Inheritance

```typescript
// ✅ Good: composition with intersection types
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Identified {
  id: string;
}

type User = Identified & Timestamped & {
  name: string;
  email: string;
};
```

### Use readonly for Immutability

```typescript
// ✅ Good: readonly arrays and properties
interface User {
  readonly id: number;
  readonly name: string;
  readonly tags: readonly string[];
}

const user: User = {
  id: 1,
  name: "John",
  tags: ["admin", "user"]
};

// user.id = 2;  // Error
// user.tags.push("new");  // Error
```
