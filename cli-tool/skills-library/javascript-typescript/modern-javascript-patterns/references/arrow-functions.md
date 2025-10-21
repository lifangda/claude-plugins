# Arrow Functions & Syntax
Arrow functions, destructuring, template literals.
## Arrow Functions
```javascript
const add = (a, b) => a + b;
const double = x => x * 2;
class Counter { increment = () => { this.count++; }; }
```
## Destructuring
```javascript
const { name, email } = user;
const [first, ...rest] = array;
```
## Template Literals
```javascript
const greeting = `Hello, ${name}!`;
```
