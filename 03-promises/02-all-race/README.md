# Promise Combinators - all, race, allSettled, any

## Concept

Promise combinators help manage multiple promises concurrently. Each has different behavior for handling success and failure.

```javascript
const promises = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
];

// Wait for ALL to complete
const results = await Promise.all(promises);
```

## The Four Combinators

| Method | Resolves When | Rejects When |
|--------|---------------|--------------|
| `Promise.all` | All fulfill | Any rejects |
| `Promise.race` | First settles | First settles (if rejection) |
| `Promise.allSettled` | All settle | Never |
| `Promise.any` | First fulfills | All reject |

## Promise.all()

Waits for all promises to fulfill. Rejects immediately if any promise rejects.

```javascript
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
// Both requests run in parallel, results in order
```

## Promise.race()

Returns the first promise to settle (fulfill OR reject).

```javascript
// Timeout pattern
const fetchWithTimeout = (url, ms) => Promise.race([
  fetch(url),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  )
]);
```

## Promise.allSettled()

Waits for all promises to settle, never rejects. Returns array of result objects.

```javascript
const results = await Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success')
]);
// [
//   { status: 'fulfilled', value: 'success' },
//   { status: 'rejected', reason: 'error' },
//   { status: 'fulfilled', value: 'another success' }
// ]
```

## Promise.any()

Returns first fulfilled promise. Only rejects if ALL promises reject.

```javascript
// Try multiple sources, use first that works
const data = await Promise.any([
  fetch('https://primary.api/data'),
  fetch('https://backup1.api/data'),
  fetch('https://backup2.api/data')
]);
```

## Java vs JavaScript

```java
// Java - CompletableFuture
CompletableFuture.allOf(future1, future2, future3).join();
CompletableFuture.anyOf(future1, future2, future3).join();
```

```javascript
// JavaScript
await Promise.all([promise1, promise2, promise3]);
await Promise.any([promise1, promise2, promise3]);
```

## Common Gotchas

### 1. Promise.all Fails Fast
```javascript
// If ANY promise rejects, you lose ALL results
await Promise.all([
  Promise.resolve(1),
  Promise.reject('error'),  // This causes total failure
  Promise.resolve(3)
]);
// Throws 'error', you don't get 1 or 3

// Use allSettled if you need partial results
```

### 2. Promise.race Doesn't Cancel Others
```javascript
const result = await Promise.race([fastPromise, slowPromise]);
// slowPromise keeps running! It's just ignored.
```

### 3. Empty Array Behavior
```javascript
await Promise.all([]);      // Resolves with []
await Promise.race([]);     // Never settles! (pending forever)
await Promise.allSettled([]);  // Resolves with []
await Promise.any([]);      // Rejects with AggregateError
```

### 4. Order is Preserved in Promise.all
```javascript
const results = await Promise.all([
  slowFetch(),   // Takes 1000ms
  fastFetch()    // Takes 100ms
]);
// results[0] is from slowFetch (preserves order, not completion time)
```

## Real-World Use Cases

1. **Parallel API Calls**
   ```javascript
   const [user, posts, followers] = await Promise.all([
     fetchUser(id),
     fetchPosts(id),
     fetchFollowers(id)
   ]);
   ```

2. **Timeout Wrapper**
   ```javascript
   const withTimeout = (promise, ms) => Promise.race([
     promise,
     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
   ]);
   ```

3. **Graceful Degradation**
   ```javascript
   const results = await Promise.allSettled(urls.map(fetch));
   const successful = results
     .filter(r => r.status === 'fulfilled')
     .map(r => r.value);
   ```

4. **Fastest Mirror**
   ```javascript
   const data = await Promise.any(mirrors.map(url => fetch(url)));
   ```

## MDN Documentation

- [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [Promise.any()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata all-race
```
