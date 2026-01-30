# Array.sort() - Custom Sorting

## Concept

`sort()` sorts array elements **in place** and returns the sorted array. By default, it converts elements to strings and sorts lexicographically.

```javascript
// Default sort (lexicographic)
[10, 2, 1].sort();  // [1, 10, 2] - "10" < "2" as strings!

// Numeric sort (ascending)
[10, 2, 1].sort((a, b) => a - b);  // [1, 2, 10]

// Numeric sort (descending)
[10, 2, 1].sort((a, b) => b - a);  // [10, 2, 1]
```

## The Compare Function

```javascript
array.sort((a, b) => {
  // Return negative: a comes before b
  // Return positive: b comes before a
  // Return 0: order unchanged
});
```

## Java vs JavaScript

```java
// Java - often uses Comparator
list.sort(Comparator.comparingInt(User::getAge));
```

```javascript
// JavaScript
users.sort((a, b) => a.age - b.age);
```

## ⚠️ Critical Gotcha: sort() Mutates!

```javascript
const original = [3, 1, 2];
const sorted = original.sort((a, b) => a - b);

console.log(original);  // [1, 2, 3] - MUTATED!
console.log(sorted);    // [1, 2, 3]
console.log(original === sorted);  // true - same array!

// To avoid mutation:
const sorted = [...original].sort((a, b) => a - b);
// or
const sorted = original.slice().sort((a, b) => a - b);
// or (ES2023)
const sorted = original.toSorted((a, b) => a - b);
```

## Common Gotchas

### 1. Default Sort is String-Based
```javascript
[10, 2, 1, 21].sort();  
// [1, 10, 2, 21] - Wrong for numbers!

// Always provide compare function for numbers
[10, 2, 1, 21].sort((a, b) => a - b);  
// [1, 2, 10, 21]
```

### 2. Sort Stability (ES2019+)
```javascript
// Modern JS guarantees stable sort
// Equal elements maintain their relative order
const items = [
  { name: 'A', score: 1 },
  { name: 'B', score: 1 },
];
items.sort((a, b) => a.score - b.score);
// A still comes before B
```

### 3. Sorting Strings with localeCompare
```javascript
const names = ['Éclair', 'Apple', 'éclair'];

// Wrong - case and accent issues
names.sort();  // ['Apple', 'Éclair', 'éclair']

// Right - locale-aware
names.sort((a, b) => a.localeCompare(b));
```

### 4. Sorting by Multiple Criteria
```javascript
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

// Sort by age, then by name
users.sort((a, b) => {
  if (a.age !== b.age) return a.age - b.age;
  return a.name.localeCompare(b.name);
});
```

## Real-World Use Cases

1. **Sort by date**
   ```javascript
   events.sort((a, b) => new Date(a.date) - new Date(b.date));
   ```

2. **Sort by multiple fields**
   ```javascript
   products.sort((a, b) => {
     if (a.category !== b.category) {
       return a.category.localeCompare(b.category);
     }
     return a.price - b.price;
   });
   ```

3. **Custom order**
   ```javascript
   const priority = { high: 0, medium: 1, low: 2 };
   tasks.sort((a, b) => priority[a.level] - priority[b.level]);
   ```

4. **Shuffle array**
   ```javascript
   arr.sort(() => Math.random() - 0.5);  // Not truly random!
   // For real shuffle, use Fisher-Yates
   ```

## MDN Documentation

- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Array.prototype.toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata sort
```
