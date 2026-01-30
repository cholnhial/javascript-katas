# Currying

## Concept

**Currying** is transforming a function that takes multiple arguments into a sequence of functions, each taking a single argument.

```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3);  // 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
curriedAdd(1)(2)(3);  // 6

// Arrow function shorthand
const curriedAdd = a => b => c => a + b + c;
```

## Why Curry?

1. **Partial application** - Create specialized functions
2. **Function composition** - Build pipelines
3. **Reusability** - Configure once, use many times

```javascript
const multiply = a => b => a * b;

// Create specialized functions
const double = multiply(2);
const triple = multiply(3);

double(5);  // 10
triple(5);  // 15

// Use in map
[1, 2, 3].map(double);  // [2, 4, 6]
```

## Java vs JavaScript

```java
// Java - verbose, uses interfaces
Function<Integer, Function<Integer, Integer>> curriedAdd = 
    a -> b -> a + b;
curriedAdd.apply(5).apply(3);  // 8
```

```javascript
// JavaScript - clean
const curriedAdd = a => b => a + b;
curriedAdd(5)(3);  // 8
```

## Manual vs Auto-Currying

```javascript
// Manual currying
const add = a => b => c => a + b + c;

// Auto-curry function (flexible)
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

const add = curry((a, b, c) => a + b + c);
add(1, 2, 3);   // 6 - all at once
add(1)(2)(3);   // 6 - one at a time
add(1, 2)(3);   // 6 - mixed
add(1)(2, 3);   // 6 - mixed
```

## Common Gotchas

### 1. Argument Order Matters
```javascript
// Order arguments for maximum reusability
// Put the "configuration" first, "data" last

// BAD - data first
const filterArray = array => predicate => array.filter(predicate);
// Can't easily reuse the predicate

// GOOD - config first, data last
const filter = predicate => array => array.filter(predicate);
const getEvens = filter(n => n % 2 === 0);
getEvens([1, 2, 3, 4]);  // [2, 4]
```

### 2. Function.length
```javascript
// curry relies on fn.length (number of params)
const fn1 = (a, b, c) => a + b + c;
fn1.length;  // 3

// Rest params break this
const fn2 = (...args) => args.reduce((a, b) => a + b, 0);
fn2.length;  // 0 - can't auto-curry!

// Default params too
const fn3 = (a, b = 0) => a + b;
fn3.length;  // 1 - only counts required params
```

### 3. this Context
```javascript
// Be careful with methods
const obj = {
  multiplier: 2,
  multiply: function(a) {
    return function(b) {
      return this.multiplier * a * b;  // 'this' is undefined!
    };
  }
};

// Solution: arrow function or bind
const obj = {
  multiplier: 2,
  multiply(a) {
    return (b) => this.multiplier * a * b;  // Arrow captures 'this'
  }
};
```

## Real-World Use Cases

1. **Event handlers**
   ```javascript
   const handleClick = buttonId => event => {
     console.log(`Button ${buttonId} clicked`, event);
   };
   button1.onclick = handleClick('submit');
   ```

2. **API requests**
   ```javascript
   const fetchFrom = baseUrl => endpoint => 
     fetch(`${baseUrl}${endpoint}`).then(r => r.json());
   
   const api = fetchFrom('https://api.example.com');
   api('/users');
   api('/posts');
   ```

3. **Logging with context**
   ```javascript
   const log = level => module => message => 
     console.log(`[${level}] ${module}: ${message}`);
   
   const errorLog = log('ERROR');
   const authError = errorLog('Auth');
   authError('Invalid token');  // [ERROR] Auth: Invalid token
   ```

## MDN Documentation

- [Currying](https://en.wikipedia.org/wiki/Currying) (Wikipedia - no MDN page)
- [Function.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata currying
```
