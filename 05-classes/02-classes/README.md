# ES6 Classes - Modern OOP Syntax

## Concept

ES6 classes are **syntactic sugar** over JavaScript's prototype-based inheritance. They provide a cleaner syntax but work the same way under the hood.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const alice = new Person('Alice');
alice.greet();  // "Hello, I'm Alice"
```

## Java vs JavaScript

```java
// Java
public class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String greet() {
        return "Hello, I'm " + name;
    }
}
```

```javascript
// JavaScript - almost identical syntax!
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}
```

## Class Features

### Constructor
```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}
```

### Methods
```javascript
class Rectangle {
  area() {
    return this.width * this.height;
  }
}
```

### Getters and Setters
```javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  get diameter() {
    return this._radius * 2;
  }

  set diameter(d) {
    this._radius = d / 2;
  }
}

const c = new Circle(5);
c.diameter;     // 10
c.diameter = 20;
c.radius;       // 10
```

### Static Methods
```javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}

MathUtils.add(1, 2);  // 3 (called on class, not instance)
```

### Private Fields (ES2022)
```javascript
class Counter {
  #count = 0;  // Private field

  increment() {
    this.#count++;
  }

  get value() {
    return this.#count;
  }
}

const c = new Counter();
c.#count;  // SyntaxError: Private field
c.value;   // 0
```

## Common Gotchas

### 1. Classes Are Not Hoisted Like Functions
```javascript
// WRONG - ReferenceError
const p = new Person();
class Person {}

// RIGHT
class Person {}
const p = new Person();
```

### 2. Methods Are Not Bound
```javascript
class Button {
  constructor(label) { this.label = label; }
  click() { console.log(this.label); }
}

const btn = new Button('Submit');
const handler = btn.click;
handler();  // undefined (this is lost!)

// Solution 1: bind in constructor
constructor(label) {
  this.label = label;
  this.click = this.click.bind(this);
}

// Solution 2: arrow function property
click = () => { console.log(this.label); }
```

### 3. No Multiple Inheritance
```javascript
// WRONG - JavaScript doesn't support this
class Child extends Parent1, Parent2 {}

// Use mixins instead
const mixin = Base => class extends Base {
  mixedMethod() { /* ... */ }
};

class MyClass extends mixin(Parent) {}
```

### 4. typeof class is 'function'
```javascript
class Person {}
typeof Person;  // 'function' (classes are constructor functions)
```

## Class Expressions

```javascript
// Named
const Person = class PersonClass {
  constructor(name) { this.name = name; }
};

// Anonymous
const Person = class {
  constructor(name) { this.name = name; }
};
```

## Real-World Use Cases

1. **Model Classes**
   ```javascript
   class User {
     constructor(data) {
       this.id = data.id;
       this.name = data.name;
     }

     get displayName() {
       return `@${this.name}`;
     }
   }
   ```

2. **React Components**
   ```javascript
   class MyComponent extends React.Component {
     state = { count: 0 };
     render() { return <div>{this.state.count}</div>; }
   }
   ```

3. **Custom Errors**
   ```javascript
   class ValidationError extends Error {
     constructor(field, message) {
       super(message);
       this.field = field;
       this.name = 'ValidationError';
     }
   }
   ```

4. **Singleton Pattern**
   ```javascript
   class Database {
     static #instance;
     static getInstance() {
       if (!this.#instance) {
         this.#instance = new Database();
       }
       return this.#instance;
     }
   }
   ```

## MDN Documentation

- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)
- [static](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)
- [Private properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties)

## Exercise

Open `exercise.js` and implement the classes. Run tests with:
```bash
npm run test:kata classes
```
