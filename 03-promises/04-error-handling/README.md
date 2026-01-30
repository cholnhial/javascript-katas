# Promise Error Handling - Catching and Managing Failures

## Concept

Proper error handling in async code is crucial. JavaScript provides multiple patterns for catching, transforming, and recovering from errors in Promise chains.

```javascript
// try/catch with async/await
async function fetchData() {
  try {
    const response = await fetch('/api');
    return await response.json();
  } catch (error) {
    console.error('Failed:', error);
    return defaultValue;
  }
}
```

## Error Propagation

Errors propagate through Promise chains until caught:

```javascript
fetch('/api')
  .then(response => response.json())
  .then(data => processData(data))
  .then(result => saveResult(result))
  .catch(error => {
    // Catches errors from ANY step above
    console.error('Something failed:', error);
  });
```

## Java vs JavaScript

```java
// Java
try {
    User user = fetchUser();
    List<Post> posts = fetchPosts(user);
} catch (NetworkException e) {
    handleNetworkError(e);
} catch (ParseException e) {
    handleParseError(e);
} finally {
    cleanup();
}
```

```javascript
// JavaScript
try {
  const user = await fetchUser();
  const posts = await fetchPosts(user);
} catch (error) {
  if (error instanceof NetworkError) {
    handleNetworkError(error);
  } else if (error instanceof ParseError) {
    handleParseError(error);
  }
} finally {
  cleanup();
}
```

## Error Handling Patterns

### 1. Catch and Recover
```javascript
const data = await fetchData().catch(error => {
  console.warn('Using default due to:', error);
  return defaultData;
});
```

### 2. Catch and Rethrow with Context
```javascript
async function getUser(id) {
  try {
    return await fetchUser(id);
  } catch (error) {
    throw new Error(`Failed to fetch user ${id}: ${error.message}`);
  }
}
```

### 3. Finally for Cleanup
```javascript
async function withLoading() {
  setLoading(true);
  try {
    return await fetchData();
  } finally {
    setLoading(false);  // Always runs
  }
}
```

## Common Gotchas

### 1. Unhandled Promise Rejections
```javascript
// DANGEROUS - silent failure
fetchData();  // No .catch()!

// SAFE
fetchData().catch(handleError);

// Listen globally (last resort)
process.on('unhandledRejection', (error) => {
  console.error('Unhandled:', error);
});
```

### 2. Catching Too Broadly
```javascript
// WRONG - catches everything, including bugs
try {
  const data = await fetchData();
  prcessData(data);  // Typo! Should be processData
} catch (e) {
  console.log('Fetch failed');  // Hides the real bug
}

// BETTER - be specific
try {
  const data = await fetchData();
} catch (e) {
  if (e instanceof FetchError) {
    console.log('Fetch failed');
  } else {
    throw e;  // Re-throw unexpected errors
  }
}
processData(data);  // Bugs here will throw properly
```

### 3. Swallowing Errors
```javascript
// WRONG - error disappears
promise.catch(error => {});

// BETTER - at least log it
promise.catch(error => {
  console.error('Error occurred:', error);
});
```

### 4. Return in Catch
```javascript
// What gets returned?
async function example() {
  try {
    throw new Error('Oops');
    return 'success';
  } catch {
    return 'failed';  // This is what's returned
  }
}
// Returns 'failed', not 'success'
```

## Error Types

```javascript
// Creating custom errors
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

// Using custom errors
async function fetchData() {
  const response = await fetch('/api');
  if (!response.ok) {
    throw new NetworkError('Request failed', response.status);
  }
  return response.json();
}

// Handling by type
try {
  await fetchData();
} catch (error) {
  if (error instanceof NetworkError && error.statusCode === 404) {
    return null;  // Not found is OK
  }
  throw error;  // Re-throw others
}
```

## Real-World Use Cases

1. **Graceful Degradation**
   ```javascript
   async function loadConfig() {
     try {
       return await fetchRemoteConfig();
     } catch {
       return localDefaultConfig;
     }
   }
   ```

2. **Retry with Exponential Backoff**
   ```javascript
   async function fetchWithRetry(url, retries = 3) {
     for (let i = 0; i < retries; i++) {
       try {
         return await fetch(url);
       } catch (e) {
         if (i === retries - 1) throw e;
         await sleep(Math.pow(2, i) * 1000);
       }
     }
   }
   ```

3. **Circuit Breaker**
   ```javascript
   let failures = 0;
   async function resilientFetch(url) {
     if (failures > 5) throw new Error('Circuit open');
     try {
       const result = await fetch(url);
       failures = 0;
       return result;
     } catch (e) {
       failures++;
       throw e;
     }
   }
   ```

## MDN Documentation

- [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
- [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata error-handling
```
