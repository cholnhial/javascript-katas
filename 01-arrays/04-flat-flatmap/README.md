# Array.flat() & flatMap() - Flatten Nested Arrays

## Concept

`flat()` creates a new array with nested arrays "flattened" to a specified depth. `flatMap()` combines `map()` and `flat(1)` in one step.

```javascript
// flat()
const nested = [1, [2, 3], [4, [5, 6]]];
nested.flat();     // [1, 2, 3, 4, [5, 6]] - depth 1
nested.flat(2);    // [1, 2, 3, 4, 5, 6] - depth 2
nested.flat(Infinity); // Flattens all levels

// flatMap()
const sentences = ['hello world', 'foo bar'];
sentences.flatMap(s => s.split(' '));
// ['hello', 'world', 'foo', 'bar']
```

## Java vs JavaScript

```java
// Java - flatMap is common with streams
List<String> words = sentences.stream()
    .flatMap(s -> Arrays.stream(s.split(" ")))
    .collect(Collectors.toList());
```

```javascript
// JavaScript
const words = sentences.flatMap(s => s.split(' '));
```

## flat() Depth Parameter

```javascript
const deep = [1, [2, [3, [4]]]];

deep.flat(0);      // [1, [2, [3, [4]]]] - no change
deep.flat(1);      // [1, 2, [3, [4]]] - default
deep.flat(2);      // [1, 2, 3, [4]]
deep.flat(Infinity); // [1, 2, 3, 4]
```

## flatMap() = map() + flat(1)

```javascript
// These are equivalent:
arr.flatMap(fn);
arr.map(fn).flat(1);

// But flatMap is more efficient (single pass)
```

## Common Gotchas

### 1. flatMap() Only Flattens One Level
```javascript
// This won't deeply flatten
[[1], [[2]]].flatMap(x => x);  // [1, [2]] - inner [2] is not flattened
```

### 2. flat() Removes Empty Slots
```javascript
const sparse = [1, , 3, , 5];
sparse.flat();  // [1, 3, 5] - holes removed!
```

### 3. flatMap Expects Array Return
```javascript
// Works - returns array per element
[1, 2].flatMap(n => [n, n * 2]);  // [1, 2, 2, 4]

// Also works - non-array wrapped automatically
[1, 2].flatMap(n => n * 2);  // [2, 4]
```

## Real-World Use Cases

1. **Parse and split data**
   ```javascript
   const tags = posts.flatMap(post => post.tags);
   ```

2. **Conditional expansion**
   ```javascript
   // Include or exclude items
   const items = data.flatMap(item => 
     item.active ? [item] : []
   );
   ```

3. **One-to-many transformations**
   ```javascript
   // Generate permutations
   const pairs = [1, 2, 3].flatMap(a => 
     [1, 2, 3].map(b => [a, b])
   );
   ```

4. **Merge nested responses**
   ```javascript
   const allComments = posts.flatMap(post => post.comments);
   ```

5. **Filter and transform in one pass**
   ```javascript
   const validEmails = users.flatMap(user => 
     user.email.includes('@') ? [user.email.toLowerCase()] : []
   );
   ```

## MDN Documentation

- [Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [Array.prototype.flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata flat
```
