# Higher-Order Functions

## Concept

A **higher-order function** is a function that:
1. Takes a function as an argument, OR
2. Returns a function

You've already used them! `map`, `filter`, `reduce` are all higher-order functions.

```javascript
// Takes function as argument
[1, 2, 3].map(x => x * 2);

// Returns a function
function multiplier(factor) {
  return x => x * factor;
}
const double = multiplier(2);
double(5);  // 10
```

## Java vs JavaScript

```java
// Java - verbose with interfaces
List<Integer> doubled = numbers.stream()
    .map(n -> n * 2)  // Function<Integer, Integer>
    .collect(Collectors.toList());
```

```javascript
// JavaScript - functions are first-class
const doubled = numbers.map(n => n * 2);
```

## Common Patterns

### 1. Function Wrappers

```javascript
// Add logging to any function
function withLogging(fn) {
  return (...args) => {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn(...args);
    console.log(`Result:`, result);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3);
// Logs: Calling add with [2, 3]
// Logs: Result: 5
// Returns: 5
```

### 2. Function Factories

```javascript
// Create specialized functions
function createValidator(schema) {
  return (data) => {
    // Validate data against schema
    return Object.entries(schema).every(([key, validator]) => 
      validator(data[key])
    );
  };
}

const validateUser = createValidator({
  name: val => typeof val === 'string',
  age: val => typeof val === 'number' && val > 0
});

validateUser({ name: 'Alice', age: 30 });  // true
```

### 3. Decorators

```javascript
// Add behavior without modifying original
function throttle(fn, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn(...args);
    }
  };
}

const throttledScroll = throttle(handleScroll, 100);
```

## Common Gotchas

### 1. Preserving this Context
```javascript
// WRONG
function withLogging(fn) {
  return function(...args) {
    console.log('Called');
    return fn(...args);  // 'this' is lost!
  };
}

// RIGHT
function withLogging(fn) {
  return function(...args) {
    console.log('Called');
    return fn.apply(this, args);  // Preserves 'this'
  };
}
```

### 2. Preserving Function Properties
```javascript
function myFn() { ... }
myFn.description = 'Does something';

const wrapped = wrapper(myFn);
wrapped.description;  // undefined! Properties lost

// Solution: Copy properties
function wrapper(fn) {
  const wrapped = (...args) => fn(...args);
  Object.assign(wrapped, fn);
  return wrapped;
}
```

### 3. Debugging Stack Traces
```javascript
// Anonymous wrappers make debugging harder
const wrapped = fn => (...args) => fn(...args);

// Better: Use named functions
const wrapped = fn => function wrappedFn(...args) { return fn(...args); };
```

## Real-World Use Cases

1. **Debounce for search input**
   ```javascript
   const debouncedSearch = debounce(searchAPI, 300);
   input.addEventListener('input', debouncedSearch);
   ```

2. **Retry logic**
   ```javascript
   const resilientFetch = retry(fetch, 3);
   await resilientFetch('/api/data');
   ```

3. **Caching**
   ```javascript
   const cachedFetch = cache(fetch, { ttl: 60000 });
   ```

4. **Permission checks**
   ```javascript
   const adminOnly = requireRole('admin');
   const deleteUser = adminOnly(deleteUserFn);
   ```

## MDN Documentation

- [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [First-class Function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata higher-order
```
