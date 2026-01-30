/**
 * Promise Basics Exercises
 *
 * Promises represent eventual completion (or failure) of async operations.
 * Coming from Java: think CompletableFuture, but more ergonomic.
 */

/**
 * Create a promise that resolves with the given value after delay ms
 * @param {any} value - Value to resolve with
 * @param {number} delay - Delay in milliseconds
 * @returns {Promise}
 *
 * Example:
 * await delayedResolve('hello', 100); // 'hello' after 100ms
 */
function delayedResolve(value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  })
}

/**
 * Create a promise that rejects with the given error after delay ms
 * @param {Error} error - Error to reject with
 * @param {number} delay - Delay in milliseconds
 * @returns {Promise}
 *
 * Example:
 * await delayedReject(new Error('fail'), 100); // throws after 100ms
 */
function delayedReject(error, delay) {
  return new Promise((_,reject) => {
    setTimeout(() => reject(error), delay)
  })
}

/**
 * Chain promises: double a number, then add 10
 * @param {number} num
 * @returns {Promise<number>}
 *
 * Example:
 * await doubleAndAddTen(5); // 20 (5*2 + 10)
 */
function doubleAndAddTen(num) {
  // Use Promise.resolve and .then to chain
  // Your code here
  return Promise.resolve(num * 2).then(n => n+10);
}

/**
 * Convert callback-style function to promise
 * @param {Function} callbackFn - Function that takes (value, callback)
 *                                callback is (error, result) style
 * @returns {Function} Function that takes value and returns Promise
 *
 * Example:
 * const readFile = (path, cb) => cb(null, 'file contents');
 * const readFilePromise = promisify(readFile);
 * await readFilePromise('test.txt'); // 'file contents'
 */
function promisify(callbackFn) {
  return new Promise(resolve => {
    resolve(callbackFn());
  });
}

/**
 * Execute promises in sequence, collecting results
 * Unlike Promise.all, this runs one at a time
 * @param {Function[]} promiseFns - Array of functions that return promises
 * @returns {Promise<any[]>} Results in order
 *
 * Example:
 * await sequence([
 *   () => Promise.resolve(1),
 *   () => Promise.resolve(2),
 *   () => Promise.resolve(3)
 * ]); // [1, 2, 3]
 */
function sequence(promiseFns) {
  // Your code here
}

/**
 * Retry a promise-returning function up to n times
 * @param {Function} fn - Function that returns a promise
 * @param {number} retries - Number of retries
 * @returns {Promise}
 *
 * Example:
 * let attempts = 0;
 * await retry(() => {
 *   attempts++;
 *   if (attempts < 3) throw new Error('fail');
 *   return 'success';
 * }, 5); // 'success' after 3 attempts
 */
function retry(fn, retries) {
  // Your code here
}

/**
 * Create a promise that resolves when predicate returns true
 * Poll every interval ms until predicate is true or timeout
 * @param {Function} predicate - Function that returns boolean
 * @param {number} interval - Polling interval in ms
 * @param {number} timeout - Maximum wait time in ms
 * @returns {Promise<void>} Resolves when predicate true, rejects on timeout
 *
 * Example:
 * let ready = false;
 * setTimeout(() => ready = true, 500);
 * await waitFor(() => ready, 100, 1000); // resolves after ~500ms
 */
function waitFor(predicate, interval, timeout) {
  // Your code here
}

/**
 * Create a deferred promise (expose resolve/reject externally)
 * @returns {{ promise: Promise, resolve: Function, reject: Function }}
 *
 * Example:
 * const { promise, resolve, reject } = createDeferred();
 * setTimeout(() => resolve('done'), 100);
 * await promise; // 'done'
 */
function createDeferred() {
  // Your code here
}

module.exports = {
  delayedResolve,
  delayedReject,
  doubleAndAddTen,
  promisify,
  sequence,
  retry,
  waitFor,
  createDeferred
};
