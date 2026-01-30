# Memoization - Caching Function Results

## Concept

Memoization is an optimization technique that caches function results based on arguments. If the function is called again with the same arguments, the cached result is returned instead of recomputing.

```javascript
function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

const expensiveFn = memoize((n) => {
  console.log('Computing...');
  return n * 2;
});

expensiveFn(5);  // Logs "Computing...", returns 10
expensiveFn(5);  // Returns 10 (cached, no log!)
```

## Java vs JavaScript

```java
// Java - using a ConcurrentHashMap
public class Memoizer<T, R> {
    private final Map<T, R> cache = new ConcurrentHashMap<>();
    private final Function<T, R> function;

    public R apply(T arg) {
        return cache.computeIfAbsent(arg, function);
    }
}
```

```javascript
// JavaScript - much simpler with closures
const memoize = (fn) => {
  const cache = new Map();
  return (arg) => cache.get(arg) ?? cache.set(arg, fn(arg)).get(arg);
};
```

## When to Use Memoization

1. **Pure functions** - same input always produces same output
2. **Expensive computations** - calculations that take significant time
3. **Frequently called with same arguments** - repeated lookups
4. **Recursive functions** - fibonacci, factorial, etc.

## Common Gotchas

### 1. Only Works for Pure Functions
```javascript
// WRONG - function has side effects
const memoizedRandom = memoize(() => Math.random());
memoizedRandom();  // 0.123
memoizedRandom();  // 0.123 (same! not random anymore)
```

### 2. Object Arguments Need Special Handling
```javascript
// WRONG - objects with same content are different keys
const cache = new Map();
cache.set({ id: 1 }, 'value');
cache.get({ id: 1 });  // undefined! Different object reference

// Solution: use JSON.stringify for object keys
const key = JSON.stringify(args);
```

### 3. Memory Leaks
```javascript
// DANGER - cache grows unbounded
const memoized = memoize(expensiveFn);
// Cache never clears, could run out of memory

// Solution: use LRU cache or WeakMap for object keys
```

### 4. Cache Invalidation
```javascript
// Sometimes you need to clear the cache
const memoizedWithClear = (fn) => {
  const cache = new Map();
  const memoized = (arg) => { /* ... */ };
  memoized.clear = () => cache.clear();
  return memoized;
};
```

## Real-World Use Cases

1. **API Response Caching**
   ```javascript
   const fetchUser = memoize(async (id) => {
     const response = await fetch(`/api/users/${id}`);
     return response.json();
   });
   ```

2. **Expensive Calculations**
   ```javascript
   const fibonacci = memoize((n) => {
     if (n <= 1) return n;
     return fibonacci(n - 1) + fibonacci(n - 2);
   });
   ```

3. **React Component Optimization**
   ```javascript
   const MemoizedComponent = React.memo(Component);
   const memoizedValue = useMemo(() => compute(a, b), [a, b]);
   ```

4. **Selector Functions (Redux)**
   ```javascript
   const selectExpensiveData = memoize((state) =>
     state.items.filter(expensiveFilter).map(expensiveTransform)
   );
   ```

## MDN Documentation

- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata memoization
```
