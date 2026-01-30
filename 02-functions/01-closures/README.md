# Closures

## Concept

A **closure** is a function that remembers the variables from its outer scope even after that scope has finished executing. It's one of JavaScript's most powerful features.

```javascript
function createCounter() {
  let count = 0;  // This variable is "enclosed"
  
  return function() {
    count++;      // Inner function remembers count
    return count;
  };
}

const counter = createCounter();
counter();  // 1
counter();  // 2
counter();  // 3

// count is not accessible directly
// console.log(count); // ReferenceError
```

## Java vs JavaScript

```java
// Java - needs explicit final or effectively final
public Function<Void, Integer> createCounter() {
    final int[] count = {0};  // Must be final/effectively final
    return (v) -> ++count[0];
}
```

```javascript
// JavaScript - closures "just work"
function createCounter() {
  let count = 0;
  return () => ++count;
}
```

## How Closures Work

Every function in JavaScript creates a closure. The function retains a reference to its **lexical environment** (the scope where it was defined).

```javascript
function outer(x) {
  // x is in outer's scope
  
  return function inner(y) {
    // inner "closes over" x
    return x + y;
  };
}

const add5 = outer(5);  // x is now 5
add5(3);  // 8 (5 + 3)
add5(10); // 15 (5 + 10)
```

## Common Gotchas

### 1. Loop Variable Closure (The Classic Bug)
```javascript
// WRONG - all functions share same i
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Logs: 3, 3, 3

// FIX 1: Use let (block scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Logs: 0, 1, 2

// FIX 2: Create new scope with IIFE
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 100);
  })(i);
}
```

### 2. Closures Hold References, Not Values
```javascript
function createFunctions() {
  let obj = { data: 'original' };
  
  return {
    getData: () => obj.data,
    setData: (val) => obj.data = val
  };
}

const { getData, setData } = createFunctions();
console.log(getData());  // 'original'
setData('modified');
console.log(getData());  // 'modified' - same object!
```

### 3. Memory Considerations
```javascript
// Closures can prevent garbage collection
function createLeak() {
  const hugeArray = new Array(1000000).fill('data');
  
  return function() {
    // Even if we never use hugeArray, it's retained
    return 'hello';
  };
}
// Solution: null out references you don't need
```

## Real-World Use Cases

1. **Private state / Data encapsulation**
   ```javascript
   function createWallet(initialBalance) {
     let balance = initialBalance;
     
     return {
       getBalance: () => balance,
       deposit: (amount) => { balance += amount; },
       withdraw: (amount) => {
         if (amount <= balance) balance -= amount;
       }
     };
   }
   ```

2. **Function factories**
   ```javascript
   function createMultiplier(factor) {
     return (number) => number * factor;
   }
   
   const double = createMultiplier(2);
   const triple = createMultiplier(3);
   ```

3. **Event handlers with state**
   ```javascript
   function createClickHandler(buttonId) {
     let clicks = 0;
     return () => {
       clicks++;
       console.log(`Button ${buttonId} clicked ${clicks} times`);
     };
   }
   ```

4. **Module pattern**
   ```javascript
   const Calculator = (function() {
     let memory = 0;
     
     return {
       add: (x) => memory += x,
       subtract: (x) => memory -= x,
       getMemory: () => memory,
       clear: () => memory = 0
     };
   })();
   ```

## MDN Documentation

- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata closures
```
