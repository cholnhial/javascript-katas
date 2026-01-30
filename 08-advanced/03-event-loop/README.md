# Event Loop - Understanding Async Execution

## Concept

JavaScript is single-threaded but non-blocking thanks to the **event loop**. Understanding the difference between **microtasks** and **macrotasks** is crucial for predicting async execution order.

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

// Output: 1, 4, 3, 2
// Why? Microtasks (Promise) run before macrotasks (setTimeout)
```

## Java vs JavaScript

```java
// Java - multi-threaded
new Thread(() -> {
    System.out.println("In thread");
}).start();
// Runs in parallel on different thread
```

```javascript
// JavaScript - single-threaded event loop
setTimeout(() => {
    console.log("In callback");
}, 0);
// Runs later on same thread, when call stack is empty
```

## The Event Loop Model

```
┌───────────────────────────┐
│        Call Stack         │ ← Synchronous code executes here
└───────────────────────────┘
            │
            ▼ (when empty)
┌───────────────────────────┐
│      Microtask Queue      │ ← Promises, queueMicrotask
└───────────────────────────┘
            │
            ▼ (when empty)
┌───────────────────────────┐
│      Macrotask Queue      │ ← setTimeout, setInterval, I/O
└───────────────────────────┘
```

## Microtasks vs Macrotasks

| Microtasks | Macrotasks |
|------------|------------|
| `Promise.then/catch/finally` | `setTimeout` |
| `queueMicrotask()` | `setInterval` |
| `MutationObserver` | `setImmediate` (Node) |
| `process.nextTick` (Node) | I/O callbacks |

**Key Rule**: ALL microtasks run before the next macrotask.

## Execution Order Examples

### Example 1: Basic Order
```javascript
console.log('sync 1');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise'));

console.log('sync 2');

// Output: sync 1, sync 2, promise, timeout
```

### Example 2: Nested Promises
```javascript
Promise.resolve().then(() => {
  console.log('1');
  Promise.resolve().then(() => console.log('2'));
});
Promise.resolve().then(() => console.log('3'));

// Output: 1, 3, 2
// Why? First .then runs, queues '2', then '3' runs, then '2'
```

### Example 3: async/await
```javascript
async function foo() {
  console.log('1');
  await Promise.resolve();
  console.log('2');  // This is like .then()
}

console.log('3');
foo();
console.log('4');

// Output: 3, 1, 4, 2
```

## Common Gotchas

### 1. setTimeout(fn, 0) Isn't Immediate
```javascript
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));

// 'promise' logs first! Microtasks beat macrotasks.
```

### 2. Blocking the Event Loop
```javascript
// BAD - blocks everything
while (condition) {
  processItem();  // Sync loop blocks all callbacks!
}

// GOOD - yield to event loop
async function process() {
  for (const item of items) {
    processItem(item);
    if (needsYield) {
      await new Promise(r => setTimeout(r, 0));
    }
  }
}
```

### 3. Microtask Starvation
```javascript
// DANGEROUS - infinite microtask loop
function loop() {
  Promise.resolve().then(loop);
}
loop();
// Macrotasks never run! Browser becomes unresponsive.
```

### 4. Order in Promise.all
```javascript
const p1 = Promise.resolve().then(() => console.log('1'));
const p2 = Promise.resolve().then(() => console.log('2'));
Promise.all([p1, p2]).then(() => console.log('all'));

// Output: 1, 2, all (always this order)
```

## queueMicrotask

Schedule a microtask directly:

```javascript
queueMicrotask(() => {
  console.log('microtask');
});
console.log('sync');

// Output: sync, microtask
```

## Real-World Implications

### 1. DOM Updates
```javascript
element.style.display = 'none';
element.style.display = 'block';
// Browser batches these - no flicker!

// Force reflow if needed:
element.style.display = 'none';
element.offsetHeight;  // Force reflow
element.style.display = 'block';
```

### 2. React setState Batching
```javascript
// React batches these into one render
setCount(1);
setCount(2);
setCount(3);
// Only one re-render!
```

### 3. Debouncing Input
```javascript
let timeout;
input.addEventListener('input', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    search(input.value);
  }, 300);
});
```

## Testing Event Loop Order

```javascript
// Visualize execution order
function logOrder() {
  console.log('1 - sync');

  setTimeout(() => console.log('2 - macrotask'), 0);

  Promise.resolve().then(() => {
    console.log('3 - microtask');
    Promise.resolve().then(() => console.log('4 - nested microtask'));
  });

  queueMicrotask(() => console.log('5 - queueMicrotask'));

  console.log('6 - sync');
}

// Output: 1, 6, 3, 5, 4, 2
```

## MDN Documentation

- [Event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [queueMicrotask](https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask)
- [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata event-loop
```
