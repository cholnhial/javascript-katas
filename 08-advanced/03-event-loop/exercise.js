/**
 * Event Loop Exercises
 *
 * Understanding microtasks vs macrotasks is crucial for async JS.
 * - Microtasks: Promise.then, queueMicrotask, MutationObserver
 * - Macrotasks: setTimeout, setInterval, setImmediate, I/O
 * Coming from Java: single-threaded but non-blocking via event loop.
 */

/**
 * Predict the order of console.log outputs
 * Return array of numbers in the order they would be logged
 */
function predictOrder1() {
  // What order will these log?
  // console.log(1);
  // setTimeout(() => console.log(2), 0);
  // Promise.resolve().then(() => console.log(3));
  // console.log(4);

  return []; // Return [1, 4, 3, 2] or whatever the correct order is
}

/**
 * Predict the order with nested promises
 */
function predictOrder2() {
  // What order?
  // console.log(1);
  // Promise.resolve().then(() => {
  //   console.log(2);
  //   Promise.resolve().then(() => console.log(3));
  // });
  // Promise.resolve().then(() => console.log(4));
  // console.log(5);

  return []; // Your prediction
}

/**
 * Predict the order with setTimeout and Promises mixed
 */
function predictOrder3() {
  // What order?
  // setTimeout(() => console.log(1), 0);
  // Promise.resolve().then(() => console.log(2));
  // setTimeout(() => console.log(3), 0);
  // Promise.resolve().then(() => console.log(4));

  return []; // Your prediction
}

/**
 * Create a function that runs a callback as a microtask
 * @param {Function} callback
 */
function runAsMicrotask(callback) {
  // Your code here - schedule callback as microtask
}

/**
 * Create a function that runs a callback as a macrotask
 * @param {Function} callback
 */
function runAsMacrotask(callback) {
  // Your code here - schedule callback as macrotask
}

/**
 * Create a function that yields to the event loop
 * Allows other tasks to run before continuing
 * @returns {Promise<void>}
 */
function yieldToEventLoop() {
  // Your code here - return promise that resolves after yielding
}

/**
 * Create a batch processor that processes items without blocking
 * @param {any[]} items
 * @param {Function} process - (item) => void
 * @param {number} batchSize - items to process per tick
 * @returns {Promise<void>}
 */
async function batchProcess(items, process, batchSize) {
  // Process batchSize items, then yield to event loop
  // Continue until all items processed
  // Your code here
}

/**
 * Create a function that ensures execution order
 * All callbacks should run in the order added, after all sync code
 * @returns {{ add: Function, flush: Promise }}
 */
function createOrderedQueue() {
  // Your code here
  // add(callback) - add callback to queue
  // flush - promise that resolves after all callbacks run (in order)
}

/**
 * Predict order with async/await
 */
function predictOrder4() {
  // async function foo() {
  //   console.log(1);
  //   await Promise.resolve();
  //   console.log(2);
  // }
  //
  // console.log(3);
  // foo();
  // console.log(4);

  return []; // Your prediction
}

/**
 * Predict order with multiple awaits
 */
function predictOrder5() {
  // async function foo() {
  //   console.log(1);
  //   await Promise.resolve();
  //   console.log(2);
  //   await Promise.resolve();
  //   console.log(3);
  // }
  //
  // async function bar() {
  //   console.log(4);
  //   await Promise.resolve();
  //   console.log(5);
  // }
  //
  // console.log(6);
  // foo();
  // bar();
  // console.log(7);

  return []; // Your prediction
}

/**
 * Create a debounced function using microtasks
 * Only executes once per microtask cycle, with last args
 * @param {Function} fn
 * @returns {Function}
 */
function microtaskDebounce(fn) {
  // Your code here
}

/**
 * Create a function that flushes all pending microtasks
 * (Useful for testing)
 * @returns {Promise<void>}
 */
function flushMicrotasks() {
  // Your code here
}

/**
 * Explain why this code might cause issues:
 * while (queue.length) {
 *   processItem(queue.shift());
 * }
 * And provide a fix
 */
function explainBlockingLoop() {
  return {
    problem: '', // Why is this problematic?
    solution: '' // How to fix it?
  };
}

module.exports = {
  predictOrder1,
  predictOrder2,
  predictOrder3,
  runAsMicrotask,
  runAsMacrotask,
  yieldToEventLoop,
  batchProcess,
  createOrderedQueue,
  predictOrder4,
  predictOrder5,
  microtaskDebounce,
  flushMicrotasks,
  explainBlockingLoop
};
