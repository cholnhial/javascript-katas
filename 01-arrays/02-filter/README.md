# Array.filter() - Filter Elements

## Concept

`filter()` creates a **new array** with only the elements that pass a test. The callback must return a truthy/falsy value.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
// evens: [2, 4, 6]
```

## Java vs JavaScript

```java
// Java
List<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
```

```javascript
// JavaScript
const evens = numbers.filter(n => n % 2 === 0);
```

## The Callback Function

```javascript
array.filter((element, index, array) => {
  // Return true to keep the element
  // Return false to discard it
});
```

## Common Gotchas

### 1. Truthy vs Boolean
```javascript
// These both work - filter uses truthiness
[0, 1, 2, '', 'hello'].filter(x => x);          // [1, 2, 'hello']
[0, 1, 2, '', 'hello'].filter(x => x === true); // [] - nothing equals true exactly!
```

### 2. Filtering Falsy Values
```javascript
// Remove all falsy values (0, '', null, undefined, NaN, false)
const cleaned = [0, 1, false, 2, '', 3, null].filter(Boolean);
// cleaned: [1, 2, 3]
```

### 3. filter() Can Return Empty Array
```javascript
[1, 2, 3].filter(n => n > 100);  // [] - no matches
// Unlike find(), which returns undefined
```

### 4. Type Coercion Surprises
```javascript
// Careful with comparisons!
['1', '2', '3'].filter(x => x == 2);  // ['2'] - coercion happens
['1', '2', '3'].filter(x => x === 2); // [] - strict equality
```

## Combining filter() with map()

Common pattern: filter then transform:

```javascript
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
];

// Get names of active users
const activeNames = users
  .filter(user => user.active)
  .map(user => user.name);
// ['Alice', 'Charlie']
```

## Real-World Use Cases

1. **Remove empty/invalid data**
   ```javascript
   const validEmails = emails.filter(email => email.includes('@'));
   ```

2. **Search/filter UI lists**
   ```javascript
   const results = products.filter(p => 
     p.name.toLowerCase().includes(searchTerm.toLowerCase())
   );
   ```

3. **Permissions filtering**
   ```javascript
   const visibleItems = items.filter(item => 
     user.permissions.includes(item.requiredPermission)
   );
   ```

4. **Remove duplicates (with Set combo)**
   ```javascript
   const unique = array.filter((item, index, self) => 
     self.indexOf(item) === index
   );
   ```

## MDN Documentation

- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata filter
```
