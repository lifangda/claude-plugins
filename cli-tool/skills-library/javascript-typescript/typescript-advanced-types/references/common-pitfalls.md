# Common Pitfalls

Common mistakes when working with TypeScript's advanced type system and how to avoid them.

## 1. Over-using `any`

**Problem**: Defeats the purpose of TypeScript.

```typescript
// ❌ Bad: any disables type checking
function processData(data: any) {
  return data.toUpperCase();  // No error if data is not a string
}

// ✅ Good: use unknown and type guards
function processData(data: unknown) {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  throw new Error("Expected string");
}
```

## 2. Ignoring Strict Null Checks

**Problem**: Can lead to runtime errors.

```typescript
// ❌ Bad: assumes value is not null
function getLength(str: string | null) {
  return str.length;  // Error with strictNullChecks
}

// ✅ Good: handle null case
function getLength(str: string | null) {
  return str?.length ?? 0;
}

// ✅ Alternative: type guard
function getLength(str: string | null) {
  if (str === null) {
    return 0;
  }
  return str.length;
}
```

## 3. Too Complex Types

**Problem**: Can slow down compilation.

```typescript
// ❌ Bad: deeply nested conditional types
type VeryComplex<T> = T extends A
  ? T extends B
    ? T extends C
      ? T extends D
        ? T extends E
          ? F
          : G
        : H
      : I
    : J
  : K;

// ✅ Good: break into smaller helper types
type IsA<T> = T extends A ? true : false;
type IsB<T> = T extends B ? true : false;
type ProcessType<T> = IsA<T> extends true
  ? IsB<T> extends true
    ? F
    : G
  : H;
```

## 4. Not Using Discriminated Unions

**Problem**: Misses type narrowing opportunities.

```typescript
// ❌ Bad: no discriminant property
type Result = {
  data?: User;
  error?: Error;
};

function handleResult(result: Result) {
  if (result.data) {
    // result.error might still exist
  }
}

// ✅ Good: discriminated union
type Result =
  | { status: "success"; data: User }
  | { status: "error"; error: Error };

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data);  // Type: User
    // result.error not accessible
  }
}
```

## 5. Forgetting readonly Modifiers

**Problem**: Allows unintended mutations.

```typescript
// ❌ Bad: mutable array can be modified
interface Config {
  values: string[];
}

function getConfig(): Config {
  return { values: ["a", "b", "c"] };
}

const config = getConfig();
config.values.push("d");  // Modifies internal state

// ✅ Good: readonly array
interface Config {
  readonly values: readonly string[];
}

function getConfig(): Config {
  return { values: ["a", "b", "c"] };
}

const config = getConfig();
// config.values.push("d");  // Error
```

## 6. Circular Type References

**Problem**: Can cause compiler errors.

```typescript
// ❌ Bad: circular reference
type A = {
  b: B;
};

type B = {
  a: A;
};

// ✅ Good: use interface or optional properties
interface A {
  b?: B;
}

interface B {
  a?: A;
}

// ✅ Alternative: break the cycle
type A = {
  b: B;
};

type B = {
  aId: string;  // Reference by ID instead
};
```

## 7. Not Handling Edge Cases

**Problem**: Empty arrays or null values cause issues.

```typescript
// ❌ Bad: assumes array is not empty
function getFirst<T>(arr: T[]): T {
  return arr[0];  // Might be undefined
}

// ✅ Good: handle empty array
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// ✅ Alternative: throw error
function getFirst<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }
  return arr[0];
}
```

## 8. Incorrect Type Assertions

**Problem**: Bypasses type safety.

```typescript
// ❌ Bad: unsafe assertion
const value = getData() as User;
// No guarantee value is actually a User

// ✅ Good: type guard
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

## 9. Overusing Utility Types

**Problem**: Makes code harder to read.

```typescript
// ❌ Bad: nested utility types
type Complex = Partial<Required<Readonly<Pick<User, "id" | "name">>>>;

// ✅ Good: create named intermediate types
type UserIdName = Pick<User, "id" | "name">;
type ReadonlyUserIdName = Readonly<UserIdName>;
type PartialReadonlyUserIdName = Partial<ReadonlyUserIdName>;

// ✅ Better: use descriptive type alias
type UserIdentity = {
  readonly id?: number;
  readonly name?: string;
};
```

## 10. Missing Generic Constraints

**Problem**: Generic types too permissive.

```typescript
// ❌ Bad: no constraint on T
function getProperty<T>(obj: T, key: string) {
  return obj[key];  // Error: key might not exist
}

// ✅ Good: constrain key to keyof T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];  // Type-safe
}

const user = { id: 1, name: "John" };
const name = getProperty(user, "name");  // Type: string
// const invalid = getProperty(user, "invalid");  // Error
```

## 11. Not Using Type Inference

**Problem**: Redundant type annotations.

```typescript
// ❌ Bad: redundant type annotation
const users: User[] = getUsers();

// ✅ Good: let TypeScript infer
const users = getUsers();  // Type: User[]

// ❌ Bad: explicit generic type
const result = identity<string>("hello");

// ✅ Good: let TypeScript infer
const result = identity("hello");  // Type: string
```

## 12. Mixing Interfaces and Types Incorrectly

**Problem**: Using the wrong construct for the job.

```typescript
// ❌ Bad: interface for union type
interface Status {
  value: "pending" | "success" | "error";
}

// ✅ Good: type for union
type Status = "pending" | "success" | "error";

// ❌ Bad: type for extendable object shape
type User = {
  id: number;
  name: string;
};

type Admin = User & {
  role: string;
};

// ✅ Good: interface for object shapes
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  role: string;
}
```

## Performance Pitfalls

### Avoid Deeply Nested Conditional Types

```typescript
// ❌ Slow: deep nesting
type Deep<T> = T extends A
  ? T extends B
    ? T extends C
      ? D
      : E
    : F
  : G;

// ✅ Fast: flatten with helper types
type IsABC<T> = T extends A & B & C ? true : false;
type Deep<T> = IsABC<T> extends true ? D : G;
```

### Limit Recursion Depth

```typescript
// ❌ Can cause compiler errors
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>  // Unlimited recursion
    : T[P];
};

// ✅ Limit recursion depth
type DeepPartial<T, Depth extends number = 5> = Depth extends 0
  ? T
  : {
      [P in keyof T]?: T[P] extends object
        ? DeepPartial<T[P], [-1, 0, 1, 2, 3, 4][Depth]>
        : T[P];
    };
```
