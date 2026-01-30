# The 'this' Keyword - Context Matters

## Concept

In JavaScript, `this` is determined by **how a function is called**, not where it's defined. This is fundamentally different from Java where `this` always refers to the current instance.

```javascript
const obj = {
  name: 'Alice',
  greet() {
    return `Hi, I'm ${this.name}`;
  }
};

obj.greet();           // "Hi, I'm Alice" (this = obj)

const greet = obj.greet;
greet();               // "Hi, I'm undefined" (this = undefined/global)
```

## Java vs JavaScript

```java
// Java - 'this' always refers to the instance
class Person {
    String name;
    public String greet() {
        return "Hi, I'm " + this.name;  // Always works
    }
}
```

```javascript
// JavaScript - 'this' depends on call site
class Person {
  constructor(name) { this.name = name; }
  greet() { return `Hi, I'm ${this.name}`; }
}

const p = new Person('Alice');
const fn = p.greet;
fn();  // 'this' is lost!
```

## The Five Rules of 'this'

### 1. Method Call (Implicit Binding)
```javascript
obj.method();  // this = obj
```

### 2. Plain Function Call
```javascript
fn();  // this = undefined (strict mode) or global object
```

### 3. Constructor Call
```javascript
new Fn();  // this = new empty object
```

### 4. Explicit Binding
```javascript
fn.call(obj);   // this = obj
fn.apply(obj);  // this = obj
fn.bind(obj);   // returns new fn with this = obj
```

### 5. Arrow Functions (Lexical Binding)
```javascript
const arrow = () => this;  // this = enclosing scope's this
```

## Common Gotchas

### 1. Losing 'this' in Callbacks
```javascript
// BROKEN
class Counter {
  count = 0;
  increment() { this.count++; }
}
const c = new Counter();
setTimeout(c.increment, 100);  // this.count is undefined!

// FIX 1: Arrow function wrapper
setTimeout(() => c.increment(), 100);

// FIX 2: Bind in constructor
constructor() { this.increment = this.increment.bind(this); }

// FIX 3: Arrow function property
increment = () => { this.count++; }
```

### 2. Nested Functions
```javascript
const obj = {
  name: 'outer',
  method() {
    function inner() {
      return this.name;  // 'this' is NOT obj!
    }
    return inner();
  }
};
obj.method();  // undefined

// FIX: Arrow function
method() {
  const inner = () => this.name;  // Arrow captures outer 'this'
  return inner();
}
```

### 3. Event Handlers
```javascript
class Button {
  constructor() {
    this.clicked = false;
  }
  handleClick() {
    this.clicked = true;  // 'this' might be the DOM element!
  }
}

// DOM: btn.addEventListener('click', button.handleClick)
// 'this' will be the DOM element, not the Button instance

// FIX
btn.addEventListener('click', () => button.handleClick());
// or
btn.addEventListener('click', button.handleClick.bind(button));
```

### 4. 'this' in Arrow vs Regular Methods
```javascript
const obj = {
  name: 'test',

  regular() {
    return this.name;  // Works! this = obj
  },

  arrow: () => {
    return this.name;  // BROKEN! this = outer scope (not obj)
  }
};
```

## Preserving 'this'

### Arrow Functions
```javascript
class Timer {
  seconds = 0;
  start() {
    setInterval(() => {
      this.seconds++;  // Arrow preserves 'this'
    }, 1000);
  }
}
```

### Bind in Constructor
```javascript
class Button {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() { /* ... */ }
}
```

### Closure
```javascript
class Component {
  render() {
    const self = this;  // Old pattern, avoid if possible
    return function() {
      return self.data;
    };
  }
}
```

## Real-World Use Cases

1. **React Class Components**
   ```javascript
   class MyComponent extends React.Component {
     handleClick = () => {
       this.setState({ clicked: true });
     }
   }
   ```

2. **Method Chaining**
   ```javascript
   class Builder {
     setValue(v) { this.value = v; return this; }
     build() { return this.value; }
   }
   new Builder().setValue(1).build();
   ```

3. **Callbacks in Classes**
   ```javascript
   class DataLoader {
     constructor() {
       this.load = this.load.bind(this);
     }
     load() { return fetch(this.url); }
   }
   ```

## MDN Documentation

- [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata this-keyword
```
