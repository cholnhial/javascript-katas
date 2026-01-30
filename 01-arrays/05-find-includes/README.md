# Array Search Methods - find, findIndex, includes, some, every

## Concept

JavaScript arrays have several methods for searching:

| Method | Returns | Stops Early | Use Case |
|--------|---------|-------------|----------|
| `find()` | First matching element | Yes | Get the item |
| `findIndex()` | Index of first match | Yes | Get the position |
| `includes()` | Boolean | Yes | Check existence (primitives) |
| `some()` | Boolean | Yes | Check if any match |
| `every()` | Boolean | Yes | Check if all match |

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.find(n => n > 3);       // 4
numbers.findIndex(n => n > 3);  // 3
numbers.includes(3);            // true
numbers.some(n => n > 4);       // true
numbers.every(n => n > 0);      // true
```

## Java vs JavaScript

```java
// Java - find first
Optional<Integer> found = list.stream()
    .filter(n -> n > 3)
    .findFirst();

// Java - any match
boolean hasLarge = list.stream().anyMatch(n -> n > 100);
```

```javascript
// JavaScript
const found = arr.find(n => n > 3);
const hasLarge = arr.some(n => n > 100);
```

## Common Gotchas

### 1. find() Returns undefined, Not null
```javascript
[1, 2, 3].find(n => n > 100);  // undefined (not null!)

// This matters for type checking
const result = arr.find(x => x.id === 5);
if (result !== undefined) { ... }  // Careful with falsy values!
```

### 2. includes() Uses Strict Equality
```javascript
[1, 2, 3].includes('2');     // false (number vs string)
[1, 2, NaN].includes(NaN);   // true! (includes handles NaN)

// For objects, use some()
const users = [{id: 1}, {id: 2}];
users.includes({id: 1});           // false (different object)
users.some(u => u.id === 1);       // true
```

### 3. findIndex() Returns -1, Not undefined
```javascript
[1, 2, 3].findIndex(n => n > 100);  // -1

// Don't confuse with find()
if (arr.findIndex(x => x.id === 5) !== -1) { ... }
```

### 4. some/every Short-Circuit
```javascript
// Stops at first true
[1, 2, 3, 4].some(n => {
  console.log(n);
  return n > 2;
});
// Logs: 1, 2, 3 (stops after finding 3)

// every stops at first false
[1, 2, 3, 4].every(n => {
  console.log(n);
  return n < 3;
});
// Logs: 1, 2, 3 (stops when 3 fails)
```

### 5. Empty Array Behavior
```javascript
[].some(x => true);   // false (no elements match)
[].every(x => false); // true! (vacuous truth)
```

## Real-World Use Cases

1. **Find user by ID**
   ```javascript
   const user = users.find(u => u.id === targetId);
   ```

2. **Check permissions**
   ```javascript
   const canAccess = user.roles.some(role => 
     allowedRoles.includes(role)
   );
   ```

3. **Validate form fields**
   ```javascript
   const allValid = fields.every(field => field.isValid);
   ```

4. **Check for duplicates**
   ```javascript
   const hasDuplicates = arr.some((item, i) => 
     arr.indexOf(item) !== i
   );
   ```

## MDN Documentation

- [Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- [Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata find
```
