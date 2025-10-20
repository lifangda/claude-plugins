# Mapped Types

Transform existing types by iterating over their properties.

## Basic Mapped Type

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;
// Type: { readonly id: number; readonly name: string; }
```

## Optional Properties

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type PartialUser = Partial<User>;
// Type: { id?: number; name?: string; }

type Required<T> = {
  [P in keyof T]-?: T[P];  // -? removes optional
};

type RequiredUser = Required<PartialUser>;
// Type: { id: number; name: string; }
```

## Key Remapping

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// Type: { getName: () => string; getAge: () => number; }

// Setters
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void
};

type PersonSetters = Setters<Person>;
// Type: { setName: (value: string) => void; setAge: (value: number) => void; }
```

## Filtering Properties

```typescript
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
};

interface Mixed {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

type OnlyNumbers = PickByType<Mixed, number>;
// Type: { id: number; age: number; }

type OnlyStrings = PickByType<Mixed, string>;
// Type: { name: string; }
```

## Removing Properties

```typescript
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
};

type WithoutNumbers = OmitByType<Mixed, number>;
// Type: { name: string; active: boolean; }
```

## Mutable Types

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];  // -readonly removes readonly
};

interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
}

type MutableUser = Mutable<ReadonlyUser>;
// Type: { id: number; name: string; }
```

## Nullable Types

```typescript
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;
// Type: { id: number | null; name: string | null; }
```

## Advanced Key Remapping

```typescript
// Remove 'Id' suffix
type RemoveIdSuffix<T> = {
  [K in keyof T as K extends `${infer P}Id` ? P : K]: T[K]
};

interface DBUser {
  userId: number;
  accountId: string;
  name: string;
}

type CleanUser = RemoveIdSuffix<DBUser>;
// Type: { user: number; account: string; name: string; }
```

## Proxy Type

```typescript
type Proxify<T> = {
  [P in keyof T]: {
    get(): T[P];
    set(value: T[P]): void;
  }
};

type ProxifiedUser = Proxify<User>;
// Type: {
//   id: { get(): number; set(value: number): void; };
//   name: { get(): string; set(value: string): void; };
// }
```
