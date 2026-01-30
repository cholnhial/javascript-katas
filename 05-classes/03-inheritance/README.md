# Class Inheritance - extends and super

## Concept

ES6 classes support inheritance via `extends`. Child classes can override parent methods and call parent implementations using `super`.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  speak() {
    return `${this.name} barks`;  // Override
  }
}

const rex = new Dog('Rex', 'Shepherd');
rex.speak();  // "Rex barks"
```

## Java vs JavaScript

```java
// Java
class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public String speak() { return name + " makes a sound"; }
}

class Dog extends Animal {
    private String breed;
    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }
    @Override
    public String speak() { return name + " barks"; }
}
```

```javascript
// JavaScript - very similar!
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() { return `${this.name} barks`; }
}
```

## The super Keyword

### In Constructor
```javascript
class Child extends Parent {
  constructor(arg1, arg2) {
    super(arg1);  // MUST call before using 'this'
    this.prop = arg2;
  }
}
```

### In Methods
```javascript
class Child extends Parent {
  method() {
    const parentResult = super.method();  // Call parent method
    return parentResult + ' extended';
  }
}
```

### In Static Methods
```javascript
class Child extends Parent {
  static create() {
    const base = super.create();  // Call parent static method
    return new Child(base);
  }
}
```

## Common Gotchas

### 1. Must Call super() Before this
```javascript
class Child extends Parent {
  constructor() {
    this.prop = 1;  // ReferenceError!
    super();        // Too late
  }
}

// RIGHT
class Child extends Parent {
  constructor() {
    super();
    this.prop = 1;
  }
}
```

### 2. Default Constructor
```javascript
// If you don't define constructor, this happens automatically:
class Child extends Parent {
  constructor(...args) {
    super(...args);
  }
}
```

### 3. Static Methods Are Inherited
```javascript
class Parent {
  static create() { return new this(); }
}

class Child extends Parent {}

Child.create();  // Works! Returns Child instance
```

### 4. instanceof Checks Prototype Chain
```javascript
class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

const rex = new Dog();
rex instanceof Dog;     // true
rex instanceof Animal;  // true
rex instanceof Cat;     // false
```

### 5. Overriding Getters/Setters
```javascript
class Parent {
  get value() { return this._value; }
}

class Child extends Parent {
  get value() {
    return super.value * 2;  // Can call parent getter
  }
}
```

## Mixins (Multiple Inheritance Pattern)

JavaScript doesn't support multiple inheritance, but mixins work:

```javascript
const TimestampMixin = Base => class extends Base {
  get timestamp() { return Date.now(); }
};

const SerializableMixin = Base => class extends Base {
  toJSON() { return JSON.stringify(this); }
};

class User extends TimestampMixin(SerializableMixin(Base)) {
  constructor(name) {
    super();
    this.name = name;
  }
}
```

## Abstract-like Pattern

```javascript
class AbstractShape {
  constructor() {
    if (new.target === AbstractShape) {
      throw new Error('Cannot instantiate abstract class');
    }
  }

  area() {
    throw new Error('Must implement area()');
  }
}

class Circle extends AbstractShape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
}
```

## Real-World Use Cases

1. **Custom Error Types**
   ```javascript
   class HttpError extends Error {
     constructor(status, message) {
       super(message);
       this.status = status;
       this.name = 'HttpError';
     }
   }

   class NotFoundError extends HttpError {
     constructor(resource) {
       super(404, `${resource} not found`);
     }
   }
   ```

2. **Component Hierarchies**
   ```javascript
   class Component {
     render() { throw new Error('Implement render'); }
   }

   class Button extends Component {
     constructor(label) { super(); this.label = label; }
     render() { return `<button>${this.label}</button>`; }
   }
   ```

3. **Plugin Systems**
   ```javascript
   class BasePlugin {
     install(app) { /* base setup */ }
   }

   class AuthPlugin extends BasePlugin {
     install(app) {
       super.install(app);
       app.use(authMiddleware);
     }
   }
   ```

## MDN Documentation

- [extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
- [super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)

## Exercise

Open `exercise.js` and implement the classes. Run tests with:
```bash
npm run test:kata inheritance
```
