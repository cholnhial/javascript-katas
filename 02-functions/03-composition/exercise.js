/**
 * Function Composition Exercises
 */

/**
 * Implement compose - right-to-left function composition
 * @param  {...Function} fns 
 * @returns {Function}
 * 
 * Example:
 * const add1 = x => x + 1;
 * const double = x => x * 2;
 * compose(add1, double)(5); // double(5)=10, add1(10)=11
 */
function compose(...fns) {
  // Your code here
}

/**
 * Implement pipe - left-to-right function composition
 * @param  {...Function} fns 
 * @returns {Function}
 * 
 * Example:
 * const add1 = x => x + 1;
 * const double = x => x * 2;
 * pipe(add1, double)(5); // add1(5)=6, double(6)=12
 */
function pipe(...fns) {
  // Your code here
}

/**
 * Create a slugify function using composition
 * - Convert to lowercase
 * - Trim whitespace
 * - Replace spaces with hyphens
 * - Remove non-alphanumeric (except hyphens)
 * 
 * Example: '  Hello World! ' => 'hello-world'
 */
const slugify = null; // Replace with your composed function

/**
 * Create a function that processes a number:
 * - Add 10
 * - Multiply by 2
 * - Subtract 5
 * Use pipe
 * 
 * Example: 5 => (5+10)*2-5 = 25
 */
const processNumber = null; // Replace with your piped function

/**
 * Create a pipeline that extracts and formats names:
 * - Filter active users
 * - Extract name property
 * - Convert to uppercase
 * 
 * @param {Object[]} users - Array of {name, active} objects
 * @returns {string[]}
 * 
 * Example: [{name: 'alice', active: true}, {name: 'bob', active: false}]
 * => ['ALICE']
 */
function getActiveNames(users) {
  // Your code here - use composition
}

/**
 * Implement composeAsync - compose for async functions
 * @param  {...Function} fns - Async functions
 * @returns {Function} - Returns a promise
 * 
 * Example:
 * const fetchUser = async id => ({ id, name: 'Test' });
 * const getName = async user => user.name;
 * await composeAsync(getName, fetchUser)(1); // 'Test'
 */
function composeAsync(...fns) {
  // Your code here
}

/**
 * Implement pipeAsync - pipe for async functions
 * @param  {...Function} fns - Async functions
 * @returns {Function} - Returns a promise
 * 
 * Example:
 * const addAsync = async x => x + 1;
 * const doubleAsync = async x => x * 2;
 * await pipeAsync(addAsync, doubleAsync)(5); // 12
 */
function pipeAsync(...fns) {
  // Your code here
}

/**
 * Create a tap function for debugging in pipelines
 * Executes side effect but passes through the value unchanged
 * @param {Function} sideEffect
 * @returns {Function}
 * 
 * Example:
 * pipe(
 *   add1,
 *   tap(x => console.log('after add:', x)),
 *   double
 * )(5);
 * // logs: 'after add: 6'
 * // returns: 12
 */
function tap(sideEffect) {
  // Your code here
}

/**
 * Create a conditional composition helper
 * Applies fn only if predicate is true, otherwise passes value through
 * @param {Function} predicate 
 * @param {Function} fn 
 * @returns {Function}
 * 
 * Example:
 * const doubleIfPositive = when(x => x > 0, x => x * 2);
 * doubleIfPositive(5);  // 10
 * doubleIfPositive(-5); // -5 (unchanged)
 */
function when(predicate, fn) {
  // Your code here
}

/**
 * Create a function that applies multiple transforms and collects results
 * @param  {...Function} fns 
 * @returns {Function} Returns array of results
 * 
 * Example:
 * const stats = fork(
 *   arr => Math.min(...arr),
 *   arr => Math.max(...arr),
 *   arr => arr.length
 * );
 * stats([1, 2, 3, 4, 5]); // [1, 5, 5]
 */
function fork(...fns) {
  // Your code here
}

module.exports = {
  compose,
  pipe,
  slugify,
  processNumber,
  getActiveNames,
  composeAsync,
  pipeAsync,
  tap,
  when,
  fork
};
