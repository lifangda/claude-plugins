# Classes & Modules
Modern class syntax and ES6 modules.
## Classes
```javascript
class User {
  #password;  // Private
  static count = 0;

  constructor(name) { this.name = name; }
  get displayName() { return this.name.toUpperCase(); }
}
```
## Modules
```javascript
export const PI = 3.14;
export default function multiply(a, b) { return a * b; }
import multiply, { PI } from './math.js';
```
