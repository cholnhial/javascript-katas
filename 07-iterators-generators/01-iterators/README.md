# Iterators - Custom Iteration Protocol

## Concept

An iterator is an object with a `next()` method that returns `{ value, done }`. The **iterable protocol** lets you define how objects are iterated with `for...of` loops by implementing `[Symbol.iterator]`.

```javascript
// Simple iterator
const iterator = {
  values: [1, 2, 3],
  index: 0,
  next() {
    if (this.index < this.values.length) {
      return { value: this.values[this.index++], done: false };
    }
    return { value: undefined, done: true };
  }
};

iterator.next();  // { value: 1, done: false }
iterator.next();  // { value: 2, done: false }
iterator.next();  // { value: 3, done: false }
iterator.next();  // { value: undefined, done: true }
```

## Java vs JavaScript

```java
// Java - Iterator interface
Iterator<String> iter = list.iterator();
while (iter.hasNext()) {
    String item = iter.next();
}

// Enhanced for loop
for (String item : list) { }
```

```javascript
// JavaScript - Iterator protocol
const iter = list[Symbol.iterator]();
let result = iter.next();
while (!result.done) {
  const item = result.value;
  result = iter.next();
}

// for...of loop
for (const item of list) { }
```

## Making Objects Iterable

Implement `[Symbol.iterator]` to make any object work with `for...of`:

```javascript
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
}

for (const n of new Range(1, 5)) {
  console.log(n);  // 1, 2, 3, 4, 5
}

[...new Range(1, 3)];  // [1, 2, 3]
```

## Built-in Iterables

These are iterable by default:
- Arrays
- Strings
- Maps
- Sets
- arguments object
- NodeList (DOM)
- TypedArrays

```javascript
for (const char of 'hello') { }
for (const [key, val] of map) { }
for (const item of set) { }
```

## Iterator Protocol Details

```javascript
// Iterator object must have next()
// next() returns { value: any, done: boolean }
// When done: true, value is usually undefined

const iterator = {
  next() {
    return {
      value: 'something',  // Current value
      done: false          // false = more values, true = finished
    };
  }
};
```

## Common Gotchas

### 1. Iterators Are Stateful
```javascript
const arr = [1, 2, 3];
const iter = arr[Symbol.iterator]();

iter.next();  // { value: 1, done: false }
iter.next();  // { value: 2, done: false }

// Can't restart! Need new iterator
const iter2 = arr[Symbol.iterator]();
```

### 2. for...of vs for...in
```javascript
const arr = ['a', 'b', 'c'];
arr.extra = 'oops';

for (const item of arr) { }  // 'a', 'b', 'c' (values)
for (const key in arr) { }   // '0', '1', '2', 'extra' (keys)
```

### 3. Objects Are Not Iterable
```javascript
const obj = { a: 1, b: 2 };

for (const x of obj) { }  // TypeError!

// Use Object.keys/values/entries
for (const key of Object.keys(obj)) { }
for (const [k, v] of Object.entries(obj)) { }
```

### 4. Spread Only Works on Iterables
```javascript
[...iterable];    // Works
[...object];      // TypeError (unless object is iterable)
{ ...object };    // Works (different spread - object spread)
```

## Lazy Iteration

Iterators enable lazy evaluation - values computed only when needed:

```javascript
function* infiniteNumbers() {
  let n = 0;
  while (true) yield n++;
}

// Only takes what's needed
const iter = infiniteNumbers();
iter.next().value;  // 0
iter.next().value;  // 1
// Doesn't compute all infinity numbers!
```

## Real-World Use Cases

1. **Custom Data Structures**
   ```javascript
   class LinkedList {
     [Symbol.iterator]() {
       let node = this.head;
       return {
         next() {
           if (node) {
             const value = node.value;
             node = node.next;
             return { value, done: false };
           }
           return { done: true };
         }
       };
     }
   }
   ```

2. **Pagination**
   ```javascript
   const paginator = {
     async *[Symbol.asyncIterator]() {
       let page = 1;
       while (true) {
         const data = await fetchPage(page++);
         if (!data.length) break;
         yield* data;
       }
     }
   };
   ```

3. **Lazy Map/Filter**
   ```javascript
   function* map(iterable, fn) {
     for (const item of iterable) {
       yield fn(item);
     }
   }
   ```

## MDN Documentation

- [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)
- [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata iterators
```
