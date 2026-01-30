# Generators - Pausable Functions

## Concept

Generators are functions that can be paused and resumed. They use `function*` syntax and the `yield` keyword to produce a sequence of values on demand.

```javascript
function* countTo3() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = countTo3();
gen.next();  // { value: 1, done: false }
gen.next();  // { value: 2, done: false }
gen.next();  // { value: 3, done: false }
gen.next();  // { value: undefined, done: true }
```

## Java vs JavaScript

```java
// Java - Streams (similar concept but different)
Stream.iterate(0, n -> n + 1)
      .limit(10)
      .forEach(System.out::println);
```

```javascript
// JavaScript - Generators
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const n of range(0, 9)) {
  console.log(n);
}
```

## Generator Basics

### Creating Generators
```javascript
// Function declaration
function* myGenerator() {
  yield 1;
}

// Method in object
const obj = {
  *generator() {
    yield 1;
  }
};

// Method in class
class MyClass {
  *generator() {
    yield 1;
  }
}
```

### yield vs return
```javascript
function* example() {
  yield 1;        // Pauses, returns { value: 1, done: false }
  yield 2;        // Pauses, returns { value: 2, done: false }
  return 'end';   // Finishes, returns { value: 'end', done: true }
}

const gen = example();
gen.next();  // { value: 1, done: false }
gen.next();  // { value: 2, done: false }
gen.next();  // { value: 'end', done: true }
gen.next();  // { value: undefined, done: true }

// Note: return value is lost with for...of
[...example()];  // [1, 2] (not 'end')
```

### yield* Delegation
```javascript
function* inner() {
  yield 2;
  yield 3;
}

function* outer() {
  yield 1;
  yield* inner();  // Delegate to another generator
  yield 4;
}

[...outer()];  // [1, 2, 3, 4]
```

## Two-Way Communication

Generators can receive values via `next(value)`:

```javascript
function* conversation() {
  const name = yield 'What is your name?';
  const age = yield `Hello ${name}! How old are you?`;
  return `${name} is ${age} years old`;
}

const gen = conversation();
gen.next();           // { value: 'What is your name?', done: false }
gen.next('Alice');    // { value: 'Hello Alice! How old are you?', done: false }
gen.next(30);         // { value: 'Alice is 30 years old', done: true }
```

## Common Gotchas

### 1. Generators Are Iterators
```javascript
function* gen() { yield 1; yield 2; }

// All of these work:
for (const x of gen()) { }
[...gen()]
Array.from(gen())
```

### 2. Can Only Iterate Once
```javascript
const g = gen();
[...g];  // [1, 2]
[...g];  // [] (exhausted!)

// Create new generator each time
[...gen()];  // [1, 2]
[...gen()];  // [1, 2]
```

### 3. yield* vs yield with Iterables
```javascript
function* example() {
  yield [1, 2];   // Yields the array as single value
  yield* [3, 4]; // Yields each element: 3, then 4
}

[...example()];  // [[1, 2], 3, 4]
```

### 4. Arrow Functions Can't Be Generators
```javascript
// WRONG - SyntaxError
const gen = *() => { yield 1; };

// RIGHT
const gen = function*() { yield 1; };
```

## Infinite Generators

```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Take only what you need
function take(gen, n) {
  const result = [];
  for (const value of gen) {
    if (result.length >= n) break;
    result.push(value);
  }
  return result;
}

take(fibonacci(), 10);  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## Async Generators

```javascript
async function* fetchPages() {
  let page = 1;
  while (true) {
    const response = await fetch(`/api?page=${page}`);
    const data = await response.json();
    if (!data.length) return;
    yield* data;
    page++;
  }
}

// Use with for await...of
for await (const item of fetchPages()) {
  console.log(item);
}
```

## Real-World Use Cases

1. **Lazy Evaluation**
   ```javascript
   function* map(iterable, fn) {
     for (const item of iterable) {
       yield fn(item);
     }
   }
   ```

2. **Unique ID Generator**
   ```javascript
   function* idGenerator(prefix = '') {
     let id = 0;
     while (true) {
       yield `${prefix}${id++}`;
     }
   }
   const nextId = idGenerator('user_');
   ```

3. **State Machines**
   ```javascript
   function* trafficLight() {
     while (true) {
       yield 'green';
       yield 'yellow';
       yield 'red';
     }
   }
   ```

4. **Flatten Nested Structures**
   ```javascript
   function* flatten(arr) {
     for (const item of arr) {
       if (Array.isArray(item)) {
         yield* flatten(item);
       } else {
         yield item;
       }
     }
   }
   ```

## MDN Documentation

- [function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- [yield](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)
- [yield*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*)

## Exercise

Open `exercise.js` and implement the generators. Run tests with:
```bash
npm run test:kata generators
```
