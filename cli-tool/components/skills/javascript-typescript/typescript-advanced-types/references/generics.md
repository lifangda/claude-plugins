# Generics

Create reusable, type-flexible components while maintaining type safety.

## Basic Generic Function

```typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);        // Type: number
const str = identity<string>("hello");    // Type: string
const auto = identity(true);              // Type inferred: boolean
```

## Generic Constraints

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): T {
  console.log(item.length);
  return item;
}

logLength("hello");           // OK: string has length
logLength([1, 2, 3]);         // OK: array has length
logLength({ length: 10 });    // OK: object has length
// logLength(42);             // Error: number has no length
```

## Multiple Type Parameters

```typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge(
  { name: "John" },
  { age: 30 }
);
// Type: { name: string } & { age: number }

// Using keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "John", age: 30 };
const name = getProperty(user, "name");  // Type: string
const age = getProperty(user, "age");    // Type: number
```

## Generic Classes

```typescript
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }

  map<U>(fn: (value: T) => U): Box<U> {
    return new Box(fn(this.value));
  }
}

const numberBox = new Box(42);
const stringBox = numberBox.map(n => n.toString());  // Box<string>
```

## Generic Interfaces

```typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    // Implementation
    return null;
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    return {} as User;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return {} as User;
  }

  async delete(id: string): Promise<void> {}
}
```

## Default Type Parameters

```typescript
class Queue<T = string> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }
}

const stringQueue = new Queue();           // Queue<string> (default)
const numberQueue = new Queue<number>();   // Queue<number>
```

## Generic Constraints with Extends

```typescript
interface Entity {
  id: string;
  createdAt: Date;
}

class EntityService<T extends Entity> {
  async save(entity: T): Promise<T> {
    // Can safely access id and createdAt
    console.log(entity.id, entity.createdAt);
    return entity;
  }
}

interface User extends Entity {
  name: string;
  email: string;
}

const userService = new EntityService<User>();
```
