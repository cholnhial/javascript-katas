# Spread & Rest Operators - The Three Dots

## Concept

The `...` operator has two uses:
- **Spread**: Expands an array/object into individual elements
- **Rest**: Collects remaining elements into an array/object

```javascript
// Spread - expand
const arr = [1, 2, 3];
console.log(...arr);  // 1 2 3 (individual values)

// Rest - collect
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);  // 10
```

## Java vs JavaScript

```java
// Java - varargs (rest-like)
public int sum(int... numbers) {
    return Arrays.stream(numbers).sum();
}

// No direct spread equivalent - must use loops or streams
List<Integer> combined = new ArrayList<>(list1);
combined.addAll(list2);
```

```javascript
// JavaScript - spread for combining
const combined = [...list1, ...list2];

// Rest for variadic functions
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
```

## Spread with Arrays

```javascript
// Clone array (shallow)
const original = [1, 2, 3];
const copy = [...original];

// Merge arrays
const merged = [...arr1, ...arr2, ...arr3];

// Add elements
const withFirst = [0, ...arr];
const withLast = [...arr, 4];

// Convert iterable to array
const chars = [...'hello'];  // ['h', 'e', 'l', 'l', 'o']
const unique = [...new Set([1, 2, 2, 3])];  // [1, 2, 3]
```

## Spread with Objects

```javascript
// Clone object (shallow)
const copy = { ...original };

// Merge objects (later properties win)
const merged = { ...defaults, ...userOptions };

// Add/override properties
const updated = { ...user, age: 31 };

// Remove property (with destructuring)
const { password, ...safeUser } = user;
```

## Rest in Function Parameters

```javascript
// Collect all arguments
function log(...args) {
  console.log(args);  // args is a real array
}

// Collect remaining arguments
function greet(greeting, ...names) {
  return names.map(name => `${greeting}, ${name}!`);
}
greet('Hello', 'Alice', 'Bob');  // ['Hello, Alice!', 'Hello, Bob!']
```

## Rest in Destructuring

```javascript
// Array rest
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// rest = [3, 4, 5]

// Object rest
const { id, ...data } = { id: 1, name: 'Alice', age: 30 };
// data = { name: 'Alice', age: 30 }
```

## Common Gotchas

### 1. Shallow Copy Only
```javascript
const original = { a: { b: 1 } };
const copy = { ...original };
copy.a.b = 2;
original.a.b;  // 2 - nested object was NOT copied!

// Deep copy (simple objects)
const deepCopy = JSON.parse(JSON.stringify(original));
// Or use structuredClone() in modern environments
```

### 2. Object Spread Order Matters
```javascript
const defaults = { a: 1, b: 2 };
const custom = { b: 3 };

{ ...defaults, ...custom };  // { a: 1, b: 3 }
{ ...custom, ...defaults };  // { a: 1, b: 2 }  ← defaults wins!
```

### 3. Rest Must Be Last
```javascript
// WRONG - SyntaxError
const [...first, last] = [1, 2, 3];
const { ...rest, id } = obj;

// RIGHT
const [first, ...rest] = [1, 2, 3];
const { id, ...rest } = obj;
```

### 4. Spread Doesn't Work with null/undefined
```javascript
// Arrays are fine
[...null];  // TypeError!

// Objects handle it
{ ...null };      // {} (no error)
{ ...undefined }; // {} (no error)
```

### 5. Spreading Non-Iterables
```javascript
[...123];     // TypeError: 123 is not iterable
[...{}];      // TypeError: {} is not iterable
{ ...[] };    // {} (empty object)
{ ...[1,2] }; // { '0': 1, '1': 2 }
```

## Real-World Use Cases

1. **Immutable Updates (React)**
   ```javascript
   const newState = { ...state, loading: false };
   const newItems = [...items, newItem];
   ```

2. **Function Composition**
   ```javascript
   const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
   ```

3. **Max/Min of Array**
   ```javascript
   Math.max(...numbers);
   Math.min(...numbers);
   ```

4. **Merge Config Objects**
   ```javascript
   const config = {
     ...defaultConfig,
     ...envConfig,
     ...userConfig
   };
   ```

5. **Clone and Modify**
   ```javascript
   const updatedUser = {
     ...user,
     lastLogin: new Date(),
     visits: user.visits + 1
   };
   ```

## MDN Documentation

- [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata spread-rest
```
