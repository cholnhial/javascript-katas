# Array.map() - Transform Arrays

## Concept

`map()` creates a **new array** by applying a function to every element of the original array. It's the JavaScript equivalent of Java's `stream().map()`.

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
// doubled: [2, 4, 6, 8]
// numbers: [1, 2, 3, 4] (unchanged!)
```

## Java vs JavaScript

```java
// Java
List<Integer> doubled = numbers.stream()
    .map(n -> n * 2)
    .collect(Collectors.toList());
```

```javascript
// JavaScript - much cleaner!
const doubled = numbers.map(n => n * 2);
```

## The Callback Function

`map()` passes **three arguments** to your callback:

```javascript
array.map((element, index, array) => {
  // element: current item
  // index: position (0-based)
  // array: the original array
  return transformedValue;
});
```

## Common Gotchas

### 1. Must Return a Value
```javascript
// WRONG - returns array of undefined
const result = [1, 2, 3].map(n => { n * 2 });  // Missing return!

// RIGHT
const result = [1, 2, 3].map(n => { return n * 2 });
// or with implicit return:
const result = [1, 2, 3].map(n => n * 2);
```

### 2. map() Always Returns Same Length Array
```javascript
[1, 2, 3].map(n => n * 2);  // Always 3 elements
// Use filter() if you need fewer elements
```

### 3. Don't Use map() for Side Effects
```javascript
// WRONG - use forEach() instead
items.map(item => console.log(item));

// RIGHT
items.forEach(item => console.log(item));
```

### 4. Sparse Arrays
```javascript
const sparse = [1, , 3];  // Element at index 1 is empty
sparse.map(n => n * 2);   // [2, empty, 6] - skips empty slots
```

## Real-World Use Cases

1. **Transform API responses**
   ```javascript
   const users = apiResponse.map(user => ({
     id: user.id,
     fullName: `${user.firstName} ${user.lastName}`
   }));
   ```

2. **Extract properties**
   ```javascript
   const names = users.map(user => user.name);
   ```

3. **Convert data formats**
   ```javascript
   const dates = dateStrings.map(str => new Date(str));
   ```

4. **React: Render lists**
   ```javascript
   items.map(item => <ListItem key={item.id} data={item} />)
   ```

## MDN Documentation

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata map
```
