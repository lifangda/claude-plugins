---
name: modern-javascript-patterns
description: Master ES6+ features including async/await, destructuring, spread operators, arrow functions, promises, modules, iterators, generators, and functional programming patterns for writing clean, efficient JavaScript code. Use when refactoring legacy code, implementing modern patterns, or optimizing JavaScript applications.
---

# Modern JavaScript Patterns

Comprehensive guide for mastering modern JavaScript (ES6+) features, functional programming patterns, and best practices for writing clean, maintainable, and performant code.

## When to Use This Skill

- Refactoring legacy JavaScript to modern syntax
- Implementing functional programming patterns
- Optimizing JavaScript performance
- Writing maintainable and readable code
- Working with asynchronous operations
- Building modern web applications
- Migrating from callbacks to Promises/async-await
- Implementing data transformation pipelines

## ES6+ Core Features

### Arrow Functions

```javascript
// Concise syntax
const add = (a, b) => a + b;
const double = x => x * 2;

// Lexical 'this' binding
class Counter {
  constructor() {
    this.count = 0;
  }

  increment = () => {
    this.count++;  // 'this' refers to Counter instance
  };
}
```

**See detailed patterns**: [Arrow Functions & Syntax](references/arrow-functions.md)

### Destructuring

```javascript
// Object destructuring
const { name, email } = user;
const { address: { city } } = user;  // Nested

// Array destructuring
const [first, second, ...rest] = numbers;
[a, b] = [b, a];  // Swap variables

// Function parameters
function greet({ name, age = 18 }) {
  console.log(`Hello ${name}, you are ${age}`);
}
```

**See detailed patterns**: [Destructuring Patterns](references/destructuring.md)

### Spread and Rest Operators

```javascript
// Spread operator
const combined = [...arr1, ...arr2];
const settings = { ...defaults, ...userPrefs };

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
```

**See detailed patterns**: [Spread & Rest](references/spread-rest.md)

## Asynchronous JavaScript

### Promises

```javascript
// Creating promises
const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    // Async operation
    if (success) resolve(data);
    else reject(error);
  });
};

// Promise combinators
Promise.all([p1, p2, p3])      // All must succeed
Promise.allSettled([p1, p2])   // Wait for all
Promise.race([p1, p2])         // First to complete
Promise.any([p1, p2])          // First to succeed
```

**See detailed patterns**: [Promises & Async](references/promises.md)

### Async/Await

```javascript
async function fetchUserData(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchUserPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Parallel execution
const [user1, user2] = await Promise.all([
  fetchUser(1),
  fetchUser(2)
]);
```

**See detailed patterns**: [Async/Await Patterns](references/async-await.md)

## Functional Programming

### Array Methods

```javascript
// Transform, filter, reduce
const names = users.map(u => u.name);
const active = users.filter(u => u.active);
const total = numbers.reduce((sum, n) => sum + n, 0);

// Advanced methods
const user = users.find(u => u.id === 2);
const hasActive = users.some(u => u.active);
const allAdults = users.every(u => u.age >= 18);
```

**See detailed patterns**: [Functional Programming](references/functional-programming.md)

### Higher-Order Functions

```javascript
// Currying
const multiply = a => b => a * b;
const double = multiply(2);

// Composition
const pipe = (...fns) => x =>
  fns.reduce((acc, fn) => fn(acc), x);

const processUser = pipe(
  trimName,
  lowercaseEmail,
  parseAge
);
```

**See detailed patterns**: [Higher-Order Functions](references/higher-order-functions.md)

## Modern Language Features

### Template Literals

```javascript
const greeting = `Hello, ${name}!`;

const html = `
  <div>
    <h1>${title}</h1>
    <p>${content}</p>
  </div>
`;

// Tagged templates
const highlighted = highlight`Name: ${name}, Age: ${age}`;
```

### Optional Chaining & Nullish Coalescing

```javascript
// Optional chaining
const city = user?.address?.city;
const result = obj.method?.();

// Nullish coalescing
const value = input ?? 'default';
const name = user?.name ?? 'Anonymous';
```

**See detailed patterns**: [Modern Operators](references/modern-operators.md)

### Classes and Modules

```javascript
// Modern class syntax
class User {
  #password;  // Private field
  static count = 0;

  constructor(name) {
    this.name = name;
  }

  get displayName() {
    return this.name.toUpperCase();
  }
}

// ES6 Modules
export const PI = 3.14159;
export default function multiply(a, b) {
  return a * b;
}

import multiply, { PI } from './math.js';
```

**See detailed patterns**: [Classes & Modules](references/classes-modules.md)

## Iterators & Generators

```javascript
// Generator function
function* rangeGenerator(from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

// Async generator
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const data = await fetch(`${url}?page=${page}`);
    if (data.length === 0) break;
    yield data;
    page++;
  }
}

for await (const page of fetchPages('/api/users')) {
  console.log(page);
}
```

**See detailed patterns**: [Iterators & Generators](references/iterators-generators.md)

## Performance Optimization

```javascript
// Debounce
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Throttle
function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

**See detailed patterns**: [Performance Optimization](references/performance.md)

## Best Practices

1. **Use const by default**: Only use let when reassignment is needed
2. **Prefer arrow functions**: Especially for callbacks
3. **Use template literals**: Instead of string concatenation
4. **Destructure objects and arrays**: For cleaner code
5. **Use async/await**: Instead of Promise chains
6. **Avoid mutating data**: Use spread operator and array methods
7. **Use optional chaining**: Prevent "Cannot read property of undefined"
8. **Prefer array methods**: Over traditional loops
9. **Write pure functions**: Easier to test and reason about
10. **Use modules**: For better code organization

## Common Pitfalls

1. **this binding confusion**: Use arrow functions or bind()
2. **Async/await without error handling**: Always use try/catch
3. **Mutation of objects**: Use spread operator or Object.assign()
4. **Forgetting await**: Async functions return promises
5. **Not handling promise rejections**: Use catch() or try/catch

## Resources

- **MDN Web Docs**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **JavaScript.info**: https://javascript.info/
- **You Don't Know JS**: https://github.com/getify/You-Dont-Know-JS
- **Eloquent JavaScript**: https://eloquentjavascript.net/
- **ES6 Features**: http://es6-features.org/
