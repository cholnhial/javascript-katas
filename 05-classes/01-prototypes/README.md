# Prototypes - JavaScript's Inheritance Model

## Concept

JavaScript uses **prototypal inheritance**, not classical inheritance. Every object has an internal link to another object called its prototype. When accessing a property, JavaScript walks up the **prototype chain** until it finds it or reaches `null`.

```javascript
const animal = { speaks: true };
const dog = Object.create(animal);
dog.barks = true;

dog.barks;   // true (own property)
dog.speaks;  // true (inherited from prototype)
dog.flies;   // undefined (not in chain)
```

## Java vs JavaScript

```java
// Java - classical inheritance
class Animal {
    boolean speaks = true;
}
class Dog extends Animal {
    boolean barks = true;
}
```

```javascript
// JavaScript - prototypal inheritance
const animal = { speaks: true };
const dog = Object.create(animal);
dog.barks = true;

// Or with constructor functions
function Animal() { this.speaks = true; }
function Dog() { this.barks = true; }
Dog.prototype = Object.create(Animal.prototype);
```

## Constructor Functions

Before ES6 classes, this was the standard pattern:

```javascript
function Person(name) {
  this.name = name;  // Own property
}

// Methods on prototype (shared by all instances)
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const alice = new Person('Alice');
alice.greet();  // "Hello, I'm Alice"

// Verify prototype chain
alice.__proto__ === Person.prototype;  // true
Person.prototype.__proto__ === Object.prototype;  // true
```

## The Prototype Chain

```
alice --> Person.prototype --> Object.prototype --> null
  │              │                    │
  └─ name        └─ greet()           └─ toString(), hasOwnProperty(), etc.
```

## Common Gotchas

### 1. Methods on Prototype vs Instance
```javascript
// INEFFICIENT - creates new function for each instance
function Person(name) {
  this.name = name;
  this.greet = function() { return `Hi, ${this.name}`; };
}

// EFFICIENT - one function shared via prototype
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() { return `Hi, ${this.name}`; };
```

### 2. Prototype Property vs [[Prototype]]
```javascript
function Foo() {}

// Foo.prototype - object that becomes prototype of instances
// Foo.__proto__ - Foo's own prototype (Function.prototype)

const foo = new Foo();
foo.__proto__ === Foo.prototype;  // true
Foo.__proto__ === Function.prototype;  // true
```

### 3. Modifying Built-in Prototypes (Don't!)
```javascript
// DANGEROUS - affects ALL arrays
Array.prototype.first = function() { return this[0]; };
[1, 2, 3].first();  // 1

// Can break libraries and future JS features
```

### 4. hasOwnProperty vs in
```javascript
const obj = Object.create({ inherited: true });
obj.own = true;

'own' in obj;       // true
'inherited' in obj; // true
obj.hasOwnProperty('own');       // true
obj.hasOwnProperty('inherited'); // false
```

## Inheritance with Prototypes

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return '...';
};

function Dog(name, breed) {
  Animal.call(this, name);  // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override method
Dog.prototype.speak = function() {
  return 'Woof!';
};

const rex = new Dog('Rex', 'Shepherd');
rex.speak();  // 'Woof!'
rex instanceof Dog;     // true
rex instanceof Animal;  // true
```

## Object.create() vs new

```javascript
// Object.create - direct prototype assignment
const proto = { greet() { return 'Hi'; } };
const obj = Object.create(proto);

// new - calls constructor function
function Greeting() {}
Greeting.prototype.greet = function() { return 'Hi'; };
const obj = new Greeting();
```

## Real-World Use Cases

1. **Shared Methods**
   ```javascript
   function Collection(items) { this.items = items; }
   Collection.prototype.size = function() { return this.items.length; };
   ```

2. **Prototype-based Mixins**
   ```javascript
   const eventMixin = {
     on(event, handler) { /* ... */ },
     emit(event, data) { /* ... */ }
   };
   Object.assign(MyClass.prototype, eventMixin);
   ```

3. **Polyfills**
   ```javascript
   if (!Array.prototype.includes) {
     Array.prototype.includes = function(item) { /* ... */ };
   }
   ```

## MDN Documentation

- [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
- [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata prototypes
```
