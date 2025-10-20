# Template Literal Types

Create string-based types with pattern matching and transformation.

## Basic Template Literal

```typescript
type EventName = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventName>}`;
// Type: "onClick" | "onFocus" | "onBlur"

type HTTPMethod = "get" | "post" | "put" | "delete";
type HTTPFunction = `${HTTPMethod}Request`;
// Type: "getRequest" | "postRequest" | "putRequest" | "deleteRequest"
```

## String Manipulation

```typescript
type UppercaseGreeting = Uppercase<"hello">;  // "HELLO"
type LowercaseGreeting = Lowercase<"HELLO">;  // "hello"
type CapitalizedName = Capitalize<"john">;    // "John"
type UncapitalizedName = Uncapitalize<"John">; // "john"

// Combining transformations
type MakeHandler<T extends string> = `on${Capitalize<T>}`;
type ClickHandler = MakeHandler<"click">;  // "onClick"
```

## Path Building

```typescript
type Path<T> = T extends object
  ? { [K in keyof T]: K extends string
      ? `${K}` | `${K}.${Path<T[K]>}`
      : never
    }[keyof T]
  : never;

interface Config {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
  };
}

type ConfigPath = Path<Config>;
// Type: "server" | "database" | "server.host" | "server.port" | "database.url"
```

## Route Parameters

```typescript
type ExtractParam<Path extends string> =
  Path extends `:${infer Param}/${infer Rest}`
    ? Param | ExtractParam<`/${Rest}`>
    : Path extends `:${infer Param}`
      ? Param
      : Path extends `${infer _Prefix}:${infer Rest}`
        ? ExtractParam<`:${Rest}`>
        : never;

type Route1 = ExtractParam<"/users/:id">;           // "id"
type Route2 = ExtractParam<"/users/:userId/posts/:postId">;  // "userId" | "postId"
```

## CSS Properties

```typescript
type CSSProperty = "color" | "background" | "fontSize" | "margin";
type CSSValue = string | number;
type CSSProperties = {
  [K in CSSProperty as `--${K}`]?: CSSValue;
};

const styles: CSSProperties = {
  "--color": "red",
  "--fontSize": 16,
  "--margin": "10px"
};
```

## String Validation

```typescript
type Email = `${string}@${string}.${string}`;

const validEmail: Email = "user@example.com";  // OK
// const invalidEmail: Email = "notanemail";   // Error

type UUID = `${string}-${string}-${string}-${string}-${string}`;
const uuid: UUID = "123e4567-e89b-12d3-a456-426614174000";  // OK
```

## API Endpoint Types

```typescript
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = "/users" | "/posts" | "/comments";
type APIRoute = `${HTTPMethod} ${Endpoint}`;

type Route = APIRoute;
// Type: "GET /users" | "GET /posts" | "GET /comments" |
//       "POST /users" | "POST /posts" | "POST /comments" | ...
```

## Type-Safe Query Builder

```typescript
type SQLOperation = "SELECT" | "INSERT" | "UPDATE" | "DELETE";
type TableName = "users" | "posts" | "comments";
type SQLQuery = `${SQLOperation} * FROM ${TableName}`;

const query: SQLQuery = "SELECT * FROM users";  // OK
// const invalid: SQLQuery = "DROP TABLE users"; // Error
```
