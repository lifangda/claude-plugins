# Destructuring Patterns
Object and array destructuring.
## Object Destructuring
```javascript
const { name, email } = user;
const { address: { city } } = user;
const { age = 25 } = user;
```
## Array Destructuring
```javascript
const [first, second] = array;
const [head, ...tail] = array;
[a, b] = [b, a];  // Swap
```
