# Functional Programming

Functional programming patterns with map, filter, reduce, and composition.

## Array Methods

```javascript
const users = [
  { id: 1, name: 'John', age: 30, active: true },
  { id: 2, name: 'Jane', age: 25, active: false },
  { id: 3, name: 'Bob', age: 35, active: true }
];

// Map - Transform
const names = users.map(u => u.name);

// Filter - Select
const active = users.filter(u => u.active);

// Reduce - Aggregate
const totalAge = users.reduce((sum, u) => sum + u.age, 0);

// Chaining
const result = users
  .filter(u => u.active)
  .map(u => u.name)
  .sort()
  .join(', ');
```

## Pure Functions

```javascript
// Impure (modifies input)
function addItemImpure(cart, item) {
  cart.items.push(item);
  return cart;
}

// Pure (no side effects)
function addItemPure(cart, item) {
  return {
    ...cart,
    items: [...cart.items, item]
  };
}
```

## Composition

```javascript
const pipe = (...fns) => x =>
  fns.reduce((acc, fn) => fn(acc), x);

const addOne = x => x + 1;
const double = x => x * 2;

const transform = pipe(addOne, double);
console.log(transform(3));  // 8
```
