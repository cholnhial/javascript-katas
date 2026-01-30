# bind, call, apply - Explicit 'this' Binding

## Concept

These methods let you explicitly set what `this` refers to when calling a function:

- **call(thisArg, arg1, arg2, ...)** - Invokes function with given `this` and arguments
- **apply(thisArg, [args])** - Same as call, but arguments as array
- **bind(thisArg, arg1, ...)** - Returns new function with bound `this`

```javascript
function greet(greeting) {
  return `${greeting}, ${this.name}!`;
}

const user = { name: 'Alice' };

greet.call(user, 'Hello');     // "Hello, Alice!"
greet.apply(user, ['Hello']);  // "Hello, Alice!"

const boundGreet = greet.bind(user);
boundGreet('Hello');           // "Hello, Alice!"
```

## Java vs JavaScript

```java
// Java - no equivalent (this is always the instance)
// Method references are similar but different:
Consumer<String> c = user::greet;
```

```javascript
// JavaScript - explicit binding
const boundFn = fn.bind(obj);
const result = fn.call(obj, arg);
```

## call vs apply vs bind

| Method | Invokes immediately? | Arguments |
|--------|---------------------|-----------|
| `call` | Yes | Individual: `fn.call(obj, a, b, c)` |
| `apply` | Yes | Array: `fn.apply(obj, [a, b, c])` |
| `bind` | No (returns function) | Individual: `fn.bind(obj, a, b)` |

## Practical Uses

### call - Borrow Methods
```javascript
// Use Array methods on array-like objects
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.slice.call(arrayLike);  // ['a', 'b']
Array.prototype.join.call(arrayLike, '-');  // 'a-b'

// Convert arguments to array
function example() {
  const args = Array.prototype.slice.call(arguments);
}
```

### apply - Spread Array Arguments
```javascript
// Before spread operator existed:
Math.max.apply(null, [1, 5, 3]);  // 5

// Now prefer spread:
Math.max(...[1, 5, 3]);  // 5

// Still useful for dynamic arguments
function invokeWith(fn, args) {
  return fn.apply(null, args);
}
```

### bind - Create Bound Functions
```javascript
// Event handlers
class Button {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() { console.log(this); }
}

// Partial application
function multiply(a, b) { return a * b; }
const double = multiply.bind(null, 2);
double(5);  // 10
```

## Common Gotchas

### 1. bind Returns a New Function
```javascript
const obj = { name: 'test' };
function getName() { return this.name; }

// WRONG - bind doesn't modify original
getName.bind(obj);
getName();  // Still undefined!

// RIGHT
const boundGetName = getName.bind(obj);
boundGetName();  // "test"
```

### 2. bind Only Works Once
```javascript
const fn = function() { return this.x; };
const bound1 = fn.bind({ x: 1 });
const bound2 = bound1.bind({ x: 2 });  // Second bind is ignored!

bound2();  // 1 (not 2!)
```

### 3. call/apply with null
```javascript
// In non-strict mode, null/undefined becomes global object
fn.call(null);  // this = window/global

// In strict mode, null stays null
'use strict';
fn.call(null);  // this = null
```

### 4. Arrow Functions Ignore bind/call/apply
```javascript
const arrow = () => this;
const obj = { x: 1 };

arrow.call(obj);   // Still outer 'this', not obj
arrow.bind(obj)(); // Still outer 'this', not obj
```

## Implementing Your Own

```javascript
// Simple bind implementation
Function.prototype.myBind = function(context, ...boundArgs) {
  const fn = this;
  return function(...args) {
    return fn.apply(context, [...boundArgs, ...args]);
  };
};

// Simple call implementation
Function.prototype.myCall = function(context, ...args) {
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};
```

## Real-World Use Cases

1. **Method Borrowing**
   ```javascript
   const hasOwn = Object.prototype.hasOwnProperty;
   hasOwn.call(obj, 'property');
   ```

2. **Constructor Chaining**
   ```javascript
   function Child(name, age) {
     Parent.call(this, name);
     this.age = age;
   }
   ```

3. **Partial Application**
   ```javascript
   const log = console.log.bind(console, '[DEBUG]');
   log('message');  // "[DEBUG] message"
   ```

4. **Throttle/Debounce**
   ```javascript
   function throttle(fn, delay) {
     let last = 0;
     return function(...args) {
       const now = Date.now();
       if (now - last >= delay) {
         last = now;
         return fn.apply(this, args);  // Preserve this
       }
     };
   }
   ```

## MDN Documentation

- [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata bind-call-apply
```
