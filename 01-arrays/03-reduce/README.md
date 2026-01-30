# Array.reduce() - Accumulate Values

## Concept

`reduce()` is the most powerful array method. It "reduces" an array to a single value by applying a function to each element and accumulating the result.

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
// sum: 10
```

## The Anatomy of reduce()

```javascript
array.reduce((accumulator, currentValue, index, array) => {
  // accumulator: the running total / accumulated value
  // currentValue: current element being processed
  // index: current index
  // array: the original array
  return newAccumulatorValue;
}, initialValue);
```

## Java vs JavaScript

```java
// Java
int sum = numbers.stream()
    .reduce(0, (acc, n) -> acc + n);
```

```javascript
// JavaScript
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

## Common Gotchas

### 1. Always Provide Initial Value
```javascript
// DANGEROUS - no initial value
[].reduce((acc, n) => acc + n);  // TypeError!

// SAFE - with initial value
[].reduce((acc, n) => acc + n, 0);  // 0
```

### 2. Don't Mutate the Accumulator
```javascript
// WRONG - mutating accumulator
const grouped = items.reduce((acc, item) => {
  acc[item.category] = acc[item.category] || [];
  acc[item.category].push(item);  // Mutation!
  return acc;
}, {});

// BETTER - return new object
const grouped = items.reduce((acc, item) => ({
  ...acc,
  [item.category]: [...(acc[item.category] || []), item]
}), {});
```

### 3. Remember to Return!
```javascript
// WRONG - forgot return
numbers.reduce((acc, n) => { acc + n }, 0);  // undefined

// RIGHT
numbers.reduce((acc, n) => { return acc + n }, 0);
// or implicit return
numbers.reduce((acc, n) => acc + n, 0);
```

## reduce() Can Do Everything

`map`, `filter`, and `flatMap` can all be implemented with `reduce`:

```javascript
// map via reduce
const doubled = [1, 2, 3].reduce((acc, n) => [...acc, n * 2], []);

// filter via reduce
const evens = [1, 2, 3, 4].reduce((acc, n) => 
  n % 2 === 0 ? [...acc, n] : acc, []);

// flatMap via reduce
const flat = [[1, 2], [3, 4]].reduce((acc, arr) => [...acc, ...arr], []);
```

## Real-World Use Cases

1. **Sum/Average calculations**
   ```javascript
   const total = orders.reduce((sum, order) => sum + order.amount, 0);
   ```

2. **Group by property**
   ```javascript
   const byCategory = products.reduce((acc, product) => {
     const cat = product.category;
     return { ...acc, [cat]: [...(acc[cat] || []), product] };
   }, {});
   ```

3. **Count occurrences**
   ```javascript
   const counts = words.reduce((acc, word) => ({
     ...acc,
     [word]: (acc[word] || 0) + 1
   }), {});
   ```

4. **Build objects from arrays**
   ```javascript
   const lookup = users.reduce((acc, user) => ({
     ...acc,
     [user.id]: user
   }), {});
   ```

5. **Pipeline / compose functions**
   ```javascript
   const pipeline = [fn1, fn2, fn3].reduce((v, fn) => fn(v), initialValue);
   ```

## MDN Documentation

- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata reduce
```
