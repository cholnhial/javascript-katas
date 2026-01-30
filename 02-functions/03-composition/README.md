# Function Composition

## Concept

**Function composition** combines simple functions to build more complex ones. The output of one function becomes the input of the next.

```javascript
// Manual composition
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

// Compose right-to-left: square, then double, then addOne
const composed = x => addOne(double(square(x)));
composed(3);  // square(3)=9, double(9)=18, addOne(18)=19

// compose() helper
const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);
const composed = compose(addOne, double, square);
composed(3);  // 19
```

## compose vs pipe

```javascript
// compose: right-to-left (mathematical notation)
const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);

// pipe: left-to-right (natural reading order)
const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x);

const add1 = x => x + 1;
const double = x => x * 2;

compose(double, add1)(5);  // add1(5)=6, double(6)=12
pipe(add1, double)(5);     // add1(5)=6, double(6)=12 (same, different order)
```

## Java vs JavaScript

```java
// Java - using Function.compose / andThen
Function<Integer, Integer> addOne = x -> x + 1;
Function<Integer, Integer> double_ = x -> x * 2;

// andThen is like pipe (left-to-right)
addOne.andThen(double_).apply(5);  // 12

// compose is right-to-left
double_.compose(addOne).apply(5);  // 12
```

```javascript
// JavaScript
const addOne = x => x + 1;
const double = x => x * 2;

pipe(addOne, double)(5);     // 12
compose(double, addOne)(5);  // 12
```

## Point-Free Style

Composition enables "point-free" style - defining functions without mentioning arguments:

```javascript
// With explicit argument
const getActiveUserNames = users => 
  users
    .filter(u => u.active)
    .map(u => u.name);

// Point-free with composition
const filter = pred => arr => arr.filter(pred);
const map = fn => arr => arr.map(fn);
const prop = key => obj => obj[key];

const getActiveUserNames = pipe(
  filter(prop('active')),
  map(prop('name'))
);
```

## Common Gotchas

### 1. Functions Must Be Unary
```javascript
// WRONG - add takes 2 args
const add = (a, b) => a + b;
const double = x => x * 2;
compose(double, add)(2, 3);  // NaN (add only receives 2)

// RIGHT - curry first
const add = a => b => a + b;
compose(double, add(3))(2);  // double(add(3)(2)) = double(5) = 10
```

### 2. Order Confusion
```javascript
// compose: right-to-left (last fn runs first)
compose(f, g, h)(x)  // f(g(h(x)))

// pipe: left-to-right (first fn runs first)  
pipe(f, g, h)(x)     // h(g(f(x)))

// Tip: pipe reads like a recipe, compose reads like math
```

### 3. Error Handling
```javascript
// Errors don't compose well
const safePipe = (...fns) => x => {
  try {
    return fns.reduce((v, fn) => fn(v), x);
  } catch (e) {
    return undefined;  // or handle error
  }
};
```

## Real-World Use Cases

1. **Data transformation pipelines**
   ```javascript
   const processUser = pipe(
     validateUser,
     normalizeEmail,
     hashPassword,
     saveToDatabase
   );
   ```

2. **String processing**
   ```javascript
   const slugify = pipe(
     str => str.toLowerCase(),
     str => str.trim(),
     str => str.replace(/\s+/g, '-'),
     str => str.replace(/[^a-z0-9-]/g, '')
   );
   slugify('Hello World!');  // 'hello-world'
   ```

3. **React/Redux**
   ```javascript
   const enhance = compose(
     withRouter,
     connect(mapState, mapDispatch),
     withStyles(styles)
   );
   export default enhance(MyComponent);
   ```

4. **API response processing**
   ```javascript
   const processResponse = pipe(
     response => response.json(),
     data => data.results,
     results => results.filter(r => r.active),
     results => results.map(r => r.name)
   );
   ```

## MDN Documentation

- No direct MDN page; this is a functional programming concept
- See: [Ramda compose](https://ramdajs.com/docs/#compose)
- See: [Lodash flow](https://lodash.com/docs/#flow)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata composition
```
