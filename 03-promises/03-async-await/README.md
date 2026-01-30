# Async/Await - Modern Async Syntax

## Concept

`async/await` is syntactic sugar over Promises that makes asynchronous code look synchronous. An `async` function always returns a Promise, and `await` pauses execution until a Promise settles.

```javascript
// Promise chain
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts));

// Same thing with async/await
async function loadPosts() {
  const user = await fetchUser(1);
  const posts = await fetchPosts(user.id);
  console.log(posts);
}
```

## How It Works

```javascript
async function example() {
  console.log('1');
  await Promise.resolve();  // Pauses here
  console.log('2');  // Runs after await completes
}

example();
console.log('3');
// Output: 1, 3, 2
```

The code after `await` runs as a microtask, similar to `.then()`.

## Java vs JavaScript

```java
// Java - virtual threads (Project Loom)
var user = fetchUser(1);  // Blocking but lightweight
var posts = fetchPosts(user.id());
System.out.println(posts);
```

```javascript
// JavaScript - async/await
const user = await fetchUser(1);  // Non-blocking
const posts = await fetchPosts(user.id);
console.log(posts);
```

## Sequential vs Parallel

```javascript
// SEQUENTIAL - slow! Each waits for previous
async function sequential() {
  const a = await fetch('/api/a');  // Wait...
  const b = await fetch('/api/b');  // Then wait...
  const c = await fetch('/api/c');  // Then wait...
  return [a, b, c];
}

// PARALLEL - fast! All run concurrently
async function parallel() {
  const [a, b, c] = await Promise.all([
    fetch('/api/a'),
    fetch('/api/b'),
    fetch('/api/c')
  ]);
  return [a, b, c];
}
```

## Common Gotchas

### 1. Forgetting await
```javascript
// WRONG - returns Promise, not value
async function getUser() {
  const response = fetch('/api/user');  // Missing await!
  return response.json();  // Error: response.json is not a function
}

// RIGHT
async function getUser() {
  const response = await fetch('/api/user');
  return response.json();
}
```

### 2. await Only Works in async Functions
```javascript
// WRONG - SyntaxError
function getData() {
  const result = await fetch('/api');  // Error!
}

// RIGHT
async function getData() {
  const result = await fetch('/api');
}

// Or use top-level await (ES modules)
const result = await fetch('/api');
```

### 3. Error Handling
```javascript
// Use try/catch
async function fetchData() {
  try {
    const response = await fetch('/api');
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;  // Re-throw or handle
  }
}
```

### 4. Avoiding Sequential When Parallel Is Better
```javascript
// SLOW - sequential for no reason
const user = await fetchUser();
const posts = await fetchPosts();  // Doesn't depend on user!

// FAST - parallel since they're independent
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
```

### 5. forEach Doesn't Work with await
```javascript
// WRONG - doesn't wait for iterations
items.forEach(async (item) => {
  await processItem(item);
});
console.log('Done');  // Runs before processing completes!

// RIGHT - use for...of for sequential
for (const item of items) {
  await processItem(item);
}

// Or Promise.all for parallel
await Promise.all(items.map(item => processItem(item)));
```

## Async Arrow Functions

```javascript
const fetchData = async () => {
  const response = await fetch('/api');
  return response.json();
};

// In methods
const obj = {
  async getData() {
    return await fetch('/api');
  }
};
```

## Real-World Use Cases

1. **API Calls**
   ```javascript
   async function loadDashboard() {
     const [user, stats, notifications] = await Promise.all([
       fetchUser(),
       fetchStats(),
       fetchNotifications()
     ]);
     return { user, stats, notifications };
   }
   ```

2. **Sequential Operations**
   ```javascript
   async function checkout(cart) {
     const order = await createOrder(cart);
     const payment = await processPayment(order);
     const confirmation = await sendConfirmation(payment);
     return confirmation;
   }
   ```

3. **Retry Logic**
   ```javascript
   async function fetchWithRetry(url, retries = 3) {
     for (let i = 0; i < retries; i++) {
       try {
         return await fetch(url);
       } catch (e) {
         if (i === retries - 1) throw e;
       }
     }
   }
   ```

## MDN Documentation

- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata async-await
```
