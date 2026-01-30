/**
 * Currying Exercises
 */

/**
 * Create a curried add function
 * @returns {Function}
 * 
 * Example:
 * curriedAdd(1)(2)(3); // 6
 */
function curriedAdd(a) {
  // Your code here
}

/**
 * Create a curried multiply function
 * @returns {Function}
 * 
 * Example:
 * curriedMultiply(2)(3)(4); // 24
 */
function curriedMultiply(a) {
  // Your code here
}

/**
 * Create a curried function to greet someone
 * @returns {Function}
 * 
 * Example:
 * greet('Hello')('World'); // 'Hello, World!'
 */
function greet(greeting) {
  // Your code here
}

/**
 * Create a curried filter function
 * Takes predicate first, then array (data-last pattern)
 * @returns {Function}
 * 
 * Example:
 * const getEvens = filter(n => n % 2 === 0);
 * getEvens([1, 2, 3, 4]); // [2, 4]
 */
function filter(predicate) {
  // Your code here
}

/**
 * Create a curried map function
 * Takes transform first, then array
 * @returns {Function}
 * 
 * Example:
 * const double = map(n => n * 2);
 * double([1, 2, 3]); // [2, 4, 6]
 */
function map(transform) {
  // Your code here
}

/**
 * Implement a generic curry function
 * Should work with functions of any arity
 * @param {Function} fn 
 * @returns {Function}
 * 
 * Example:
 * const add = curry((a, b, c) => a + b + c);
 * add(1, 2, 3);   // 6
 * add(1)(2)(3);   // 6
 * add(1, 2)(3);   // 6
 * add(1)(2, 3);   // 6
 */
function curry(fn) {
  // Your code here
}

/**
 * Create a curried prop getter
 * @returns {Function}
 * 
 * Example:
 * const getName = prop('name');
 * getName({ name: 'Alice' }); // 'Alice'
 */
function prop(key) {
  // Your code here
}

/**
 * Create a curried function that checks if a value is in range
 * @returns {Function}
 * 
 * Example:
 * const inRange = between(0)(10);
 * inRange(5);  // true
 * inRange(15); // false
 */
function between(min) {
  // Your code here
}

/**
 * Create a curried function to apply a discount
 * @returns {Function}
 * 
 * Example:
 * const tenPercentOff = discount(0.1);
 * tenPercentOff(100); // 90
 */
function discount(percentage) {
  // Your code here
}

/**
 * Create a curried function for string formatting
 * Takes template, then values object
 * Template uses {{key}} syntax
 * @returns {Function}
 * 
 * Example:
 * const template = format('Hello, {{name}}!');
 * template({ name: 'World' }); // 'Hello, World!'
 */
function format(template) {
  // Your code here
}

module.exports = {
  curriedAdd,
  curriedMultiply,
  greet,
  filter,
  map,
  curry,
  prop,
  between,
  discount,
  format
};
