# Conditional Types

Create types that depend on conditions, enabling sophisticated type logic.

## Basic Conditional Type

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;    // true
type B = IsString<number>;    // false
```

## Extracting Return Types

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>;
// Type: { id: number; name: string; }

async function fetchData() {
  return { data: [1, 2, 3] };
}

type FetchResult = ReturnType<typeof fetchData>;
// Type: Promise<{ data: number[]; }>
```

## Distributive Conditional Types

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// Type: string[] | number[]  (distributed over union)

// Non-distributive version
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type Combined = ToArrayNonDist<string | number>;
// Type: (string | number)[]  (not distributed)
```

## Nested Conditional Types

```typescript
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

type T1 = TypeName<string>;     // "string"
type T2 = TypeName<() => void>; // "function"
type T3 = TypeName<{ a: 1 }>;   // "object"
```

## Extracting Function Parameters

```typescript
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// Type: [string, number, string]

// Using Parameters
function logParams(...args: CreateUserParams) {
  console.log(args);
}
```

## Extracting Promise Type

```typescript
type Awaited<T> = T extends Promise<infer U> ? U : T;

type AsyncString = Awaited<Promise<string>>;  // string
type SyncString = Awaited<string>;            // string

// Recursive version for nested Promises
type DeepAwaited<T> = T extends Promise<infer U>
  ? DeepAwaited<U>
  : T;

type Nested = DeepAwaited<Promise<Promise<Promise<number>>>>;  // number
```

## Filtering Union Types

```typescript
type Exclude<T, U> = T extends U ? never : T;

type T1 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type T2 = Exclude<string | number, number>;  // string

type Extract<T, U> = T extends U ? T : never;

type T3 = Extract<"a" | "b" | "c", "a" | "b">;  // "a" | "b"
type T4 = Extract<string | number, number>;     // number
```

## NonNullable

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type T1 = NonNullable<string | null | undefined>;  // string
type T2 = NonNullable<number | null>;              // number
```

## Flattening Array Types

```typescript
type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>;    // string
type Num = Flatten<number>;      // number

// Deep flatten
type DeepFlatten<T> = T extends Array<infer U>
  ? DeepFlatten<U>
  : T;

type Deep = DeepFlatten<string[][][]>;  // string
```
