# Promise Basics - Async Made Simple

## Concept

A Promise represents a value that may be available now, in the future, or never. It's JavaScript's primary mechanism for handling asynchronous operations.

```javascript
const promise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    resolve('Success!');  // Fulfill the promise
    // or: reject(new Error('Failed!'));  // Reject the promise
  }, 1000);
});

promise
  .then(result => console.log(result))  // 'Success!'
  .catch(error => console.error(error));
```

## Promise States

A Promise is always in one of three states:
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

Once settled (fulfilled or rejected), a promise cannot change state.

## Java vs JavaScript

```java
// Java - CompletableFuture
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return fetchData();
});

future.thenAccept(result -> System.out.println(result))
      .exceptionally(error -> { System.err.println(error); return null; });
```

```javascript
// JavaScript - Promise
const promise = new Promise((resolve, reject) => {
  fetchData().then(resolve).catch(reject);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

## Promise Chaining

`.then()` returns a new Promise, enabling chaining:

```javascript
fetchUser(1)
  .then(user => fetchPosts(user.id))    // Returns promise
  .then(posts => fetchComments(posts[0].id))  // Returns promise
  .then(comments => console.log(comments))
  .catch(error => console.error(error));  // Catches any error in chain
```

## Common Gotchas

### 1. Forgetting to Return in .then()
```javascript
// WRONG - next .then gets undefined
fetchUser(1)
  .then(user => { fetchPosts(user.id); })  // Missing return!
  .then(posts => console.log(posts));  // posts is undefined

// RIGHT
fetchUser(1)
  .then(user => fetchPosts(user.id))  // Implicit return
  .then(posts => console.log(posts));
```

### 2. Creating Unnecessary Promises
```javascript
// WRONG - Promise constructor anti-pattern
const fetchData = () => new Promise((resolve, reject) => {
  fetch('/api').then(resolve).catch(reject);
});

// RIGHT - fetch already returns a Promise
const fetchData = () => fetch('/api');
```

### 3. Unhandled Rejections
```javascript
// DANGEROUS - no error handling
fetchData().then(doSomething);

// SAFE - always handle errors
fetchData()
  .then(doSomething)
  .catch(error => console.error('Error:', error));
```

### 4. .then() with Two Arguments vs .catch()
```javascript
// These are NOT equivalent:
promise.then(onSuccess, onError);  // onError only catches promise rejection
promise.then(onSuccess).catch(onError);  // catches errors in onSuccess too
```

## Creating Promises

```javascript
// Immediately resolved
Promise.resolve('value');

// Immediately rejected
Promise.reject(new Error('reason'));

// From callback-style function
const promisified = (arg) => new Promise((resolve, reject) => {
  callbackFn(arg, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});
```

## Real-World Use Cases

1. **API Calls**
   ```javascript
   fetch('/api/users')
     .then(response => response.json())
     .then(users => displayUsers(users));
   ```

2. **Sequential Operations**
   ```javascript
   login(credentials)
     .then(user => loadPreferences(user))
     .then(prefs => initializeApp(prefs));
   ```

3. **Timeouts/Delays**
   ```javascript
   const delay = (ms) => new Promise(r => setTimeout(r, ms));
   await delay(1000);  // Wait 1 second
   ```

## MDN Documentation

- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata basics
```
