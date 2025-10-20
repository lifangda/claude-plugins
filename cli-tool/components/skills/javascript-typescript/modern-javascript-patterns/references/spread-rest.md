# Spread & Rest
Spread and rest operators.
## Spread
```javascript
const combined = [...arr1, ...arr2];
const settings = { ...defaults, ...userPrefs };
Math.max(...numbers);
```
## Rest
```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
const { id, ...rest } = user;
```
