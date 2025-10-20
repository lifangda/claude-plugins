---
name: typescript-advanced-types
description: Master TypeScript's advanced type system including generics, conditional types, mapped types, template literals, and utility types for building type-safe applications. Use when implementing complex type logic, creating reusable type utilities, or ensuring compile-time type safety in TypeScript projects.
---

# TypeScript Advanced Types

Comprehensive guidance for mastering TypeScript's advanced type system including generics, conditional types, mapped types, template literal types, and utility types for building robust, type-safe applications.

## When to Use This Skill

- Building type-safe libraries or frameworks
- Creating reusable generic components
- Implementing complex type inference logic
- Designing type-safe API clients
- Building form validation systems
- Creating strongly-typed configuration objects
- Implementing type-safe state management
- Migrating JavaScript codebases to TypeScript

## Quick Start

### Basic Generic Function
```typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);     // Type: number
const str = identity("hello");        // Type inferred: string
```

### Generic with Constraints
```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): T {
  console.log(item.length);
  return item;
}
```

### Conditional Type
```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>;
// Type: { id: number; name: string; }
```

### Mapped Type
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

### Template Literal Type
```typescript
type EventName = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventName>}`;
// Type: "onClick" | "onFocus" | "onBlur"
```

## Core Concepts

### 1. Generics

Create reusable, type-flexible components while maintaining type safety.

```typescript
// Multiple type parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// Generic classes
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}
```

**See detailed patterns**: [Generics](references/generics.md)

### 2. Conditional Types

Create types that depend on conditions, enabling sophisticated type logic.

```typescript
type IsString<T> = T extends string ? true : false;

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type Arrays = ToArray<string | number>;  // string[] | number[]
```

**See detailed patterns**: [Conditional Types](references/conditional-types.md)

### 3. Mapped Types

Transform existing types by iterating over their properties.

```typescript
// Key remapping
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

// Filtering properties
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
};
```

**See detailed patterns**: [Mapped Types](references/mapped-types.md)

### 4. Template Literal Types

Create string-based types with pattern matching and transformation.

```typescript
// String manipulation
type UppercaseGreeting = Uppercase<"hello">;  // "HELLO"
type Capitalized = Capitalize<"john">;        // "John"

// Path building
type Path<T> = T extends object
  ? { [K in keyof T]: `${K}` | `${K}.${Path<T[K]>}` }[keyof T]
  : never;
```

**See detailed patterns**: [Template Literal Types](references/template-literals.md)

### 5. Utility Types

Built-in TypeScript utility types for common transformations.

```typescript
// Partial<T> - Make all properties optional
type PartialUser = Partial<User>;

// Pick<T, K> - Select specific properties
type UserName = Pick<User, "name" | "email">;

// Omit<T, K> - Remove specific properties
type UserWithoutPassword = Omit<User, "password">;

// Record<K, T> - Create object type
type PageInfo = Record<"home" | "about", { title: string }>;
```

**See detailed patterns**: [Utility Types](references/utility-types.md)

## Advanced Patterns

TypeScript's type system enables sophisticated patterns for type-safe applications:

- **Type-Safe Event Emitter**: Strong typing for event names and payloads
- **Type-Safe API Client**: Typed HTTP methods, params, and responses
- **Builder Pattern**: Compile-time validation of required fields
- **Deep Readonly/Partial**: Recursive type transformations
- **Form Validation**: Type-safe validation rules
- **Discriminated Unions**: Type-safe state machines

**See detailed implementations**: [Advanced Patterns](references/advanced-patterns.md)

## Type Inference

Master TypeScript's type inference for more flexible and reusable code:

```typescript
// Infer keyword
type ElementType<T> = T extends (infer U)[] ? U : never;

// Type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Assertion functions
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new Error("Not a string");
}
```

**See detailed techniques**: [Type Inference](references/type-inference.md)

## Best Practices

1. **Use `unknown` over `any`**: Enforce type checking
2. **Prefer `interface` for object shapes**: Better error messages
3. **Use `type` for unions and complex types**: More flexible
4. **Leverage type inference**: Let TypeScript infer when possible
5. **Create helper types**: Build reusable type utilities
6. **Use const assertions**: Preserve literal types
7. **Avoid type assertions**: Use type guards instead
8. **Document complex types**: Add JSDoc comments
9. **Use strict mode**: Enable all strict compiler options
10. **Test your types**: Use type tests to verify type behavior

**See complete guide**: [Best Practices](references/best-practices.md)

## Common Pitfalls

- Over-using `any` (defeats type safety)
- Ignoring strict null checks
- Creating overly complex types (slow compilation)
- Not using discriminated unions (misses type narrowing)
- Forgetting readonly modifiers
- Circular type references
- Not handling edge cases (empty arrays, null values)

**See detailed solutions**: [Common Pitfalls](references/common-pitfalls.md)

## Resources

- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **Type Challenges**: https://github.com/type-challenges/type-challenges
- **TypeScript Deep Dive**: https://basarat.gitbook.io/typescript/
- **Effective TypeScript**: Book by Dan Vanderkam
