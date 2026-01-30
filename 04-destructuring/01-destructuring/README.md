# Destructuring - Extract Values Elegantly

## Concept

Destructuring allows you to unpack values from arrays or properties from objects into distinct variables. It makes code more concise and readable.

```javascript
// Array destructuring
const [first, second] = [1, 2, 3];
// first = 1, second = 2

// Object destructuring
const { name, age } = { name: 'Alice', age: 30, city: 'NYC' };
// name = 'Alice', age = 30
```

## Java vs JavaScript

```java
// Java - no destructuring (until records with pattern matching)
String[] parts = "hello,world".split(",");
String first = parts[0];
String second = parts[1];

Map<String, Object> user = getUser();
String name = (String) user.get("name");
int age = (int) user.get("age");
```

```javascript
// JavaScript - clean destructuring
const [first, second] = "hello,world".split(",");

const { name, age } = getUser();
```

## Array Destructuring

```javascript
const numbers = [1, 2, 3, 4, 5];

// Basic
const [a, b] = numbers;  // a=1, b=2

// Skip elements
const [first, , third] = numbers;  // first=1, third=3

// Rest pattern
const [head, ...tail] = numbers;  // head=1, tail=[2,3,4,5]

// Default values
const [x, y, z = 0] = [1, 2];  // x=1, y=2, z=0

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];  // a=2, b=1
```

## Object Destructuring

```javascript
const user = { name: 'Alice', age: 30, email: 'alice@test.com' };

// Basic
const { name, age } = user;

// Rename variables
const { name: userName, age: userAge } = user;

// Default values
const { name, role = 'user' } = user;  // role='user'

// Rename with default
const { name: n, role: r = 'user' } = user;

// Nested destructuring
const data = { user: { profile: { name: 'Alice' } } };
const { user: { profile: { name } } } = data;  // name='Alice'

// Rest pattern
const { name, ...rest } = user;  // rest = { age: 30, email: '...' }
```

## Common Gotchas

### 1. Destructuring null/undefined Throws
```javascript
// WRONG - throws TypeError
const { name } = null;
const [first] = undefined;

// SAFE - use default
const { name } = data || {};
const [first] = arr ?? [];
```

### 2. Renaming vs Default Value Syntax
```javascript
// Renaming (colon)
const { name: userName } = user;

// Default value (equals)
const { name = 'Anonymous' } = user;

// Both together
const { name: userName = 'Anonymous' } = user;
```

### 3. Existing Variables Need Parentheses
```javascript
let name, age;

// WRONG - syntax error (looks like block)
{ name, age } = user;

// RIGHT - wrap in parentheses
({ name, age } = user);
```

### 4. Computed Property Names
```javascript
const key = 'name';
const { [key]: value } = { name: 'Alice' };  // value = 'Alice'
```

## Function Parameter Destructuring

```javascript
// Object parameters
function greet({ name, greeting = 'Hello' }) {
  return `${greeting}, ${name}!`;
}
greet({ name: 'Alice' });  // "Hello, Alice!"

// Array parameters
function sum([a, b, c = 0]) {
  return a + b + c;
}
sum([1, 2]);  // 3
```

## Real-World Use Cases

1. **Import Named Exports**
   ```javascript
   import { useState, useEffect } from 'react';
   ```

2. **Function Return Values**
   ```javascript
   const [state, setState] = useState(0);
   const { data, error, loading } = useQuery(QUERY);
   ```

3. **API Response Handling**
   ```javascript
   const { users, pagination: { page, total } } = await fetchUsers();
   ```

4. **Swapping Variables**
   ```javascript
   [a, b] = [b, a];
   ```

5. **Function Options**
   ```javascript
   function createServer({ port = 3000, host = 'localhost' } = {}) {
     // ...
   }
   ```

## MDN Documentation

- [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata destructuring
```
