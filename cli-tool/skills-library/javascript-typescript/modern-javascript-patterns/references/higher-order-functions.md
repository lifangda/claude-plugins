# Higher-Order Functions
Currying, partial application, memoization.
## Currying
```javascript
const multiply = a => b => a * b;
const double = multiply(2);
```
## Memoization
```javascript
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```
