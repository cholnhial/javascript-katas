/**
 * Iterators Exercises
 *
 * Iterators provide a standard way to traverse data structures.
 * Implement [Symbol.iterator] to make objects iterable with for...of.
 * Coming from Java: similar to Iterator interface.
 */

/**
 * Create a simple range iterator (not using Symbol.iterator)
 * @param {number} start
 * @param {number} end
 * @returns {{ next: Function }}
 */
function createRangeIterator(start, end) {
  // Return object with next() method
  // next() returns { value, done }
  // Your code here
}

/**
 * Make an object iterable (works with for...of)
 * @param {number} start
 * @param {number} end
 * @returns {Iterable<number>}
 */
function createIterableRange(start, end) {
  // Return object with [Symbol.iterator] method
  // Your code here
}

/**
 * Create a class that is iterable
 * LinkedList: add(value), [Symbol.iterator]
 */
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    // Your code here
  }

  // Make it iterable
  // Your code here
}

/**
 * Create an infinite iterator for fibonacci sequence
 * @returns {{ next: Function }}
 */
function createFibonacciIterator() {
  // Returns iterator that yields: 0, 1, 1, 2, 3, 5, 8, 13, ...
  // Never sets done: true
  // Your code here
}

/**
 * Create an iterator that can be reset
 * @param {any[]} items
 * @returns {{ next: Function, reset: Function }}
 */
function createResettableIterator(items) {
  // Return iterator with reset() method that starts over
  // Your code here
}

/**
 * Create an iterator that combines multiple iterables
 * @param  {...Iterable} iterables
 * @returns {Iterable}
 */
function concat(...iterables) {
  // Return iterable that yields all values from all iterables in order
  // Your code here
}

/**
 * Create a map iterator (like Array.map but lazy)
 * @param {Iterable} iterable
 * @param {Function} fn
 * @returns {Iterable}
 */
function mapIterable(iterable, fn) {
  // Return iterable that yields fn(value) for each value
  // Your code here
}

/**
 * Create a filter iterator (like Array.filter but lazy)
 * @param {Iterable} iterable
 * @param {Function} predicate
 * @returns {Iterable}
 */
function filterIterable(iterable, predicate) {
  // Return iterable that yields only values where predicate is true
  // Your code here
}

/**
 * Create a take iterator (limits number of values)
 * @param {Iterable} iterable
 * @param {number} n
 * @returns {Iterable}
 */
function take(iterable, n) {
  // Return iterable that yields at most n values
  // Your code here
}

/**
 * Create a zip iterator (combines multiple iterables pairwise)
 * @param  {...Iterable} iterables
 * @returns {Iterable}
 */
function zip(...iterables) {
  // Return iterable that yields arrays like [a1, b1], [a2, b2], ...
  // Stops when shortest iterable is exhausted
  // Your code here
}

/**
 * Create an async iterator that yields values with delays
 * @param {any[]} items
 * @param {number} delay
 * @returns {AsyncIterable}
 */
function createAsyncIterable(items, delay) {
  // Return async iterable that yields each item after delay ms
  // Should work with for await...of
  // Your code here
}

module.exports = {
  createRangeIterator,
  createIterableRange,
  LinkedList,
  createFibonacciIterator,
  createResettableIterator,
  concat,
  mapIterable,
  filterIterable,
  take,
  zip,
  createAsyncIterable
};
