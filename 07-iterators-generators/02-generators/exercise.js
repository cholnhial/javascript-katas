/**
 * Generators Exercises
 *
 * Generators are functions that can be paused and resumed.
 * Use function* and yield to create them.
 * Coming from Java: similar to Streams, but with pause/resume capability.
 */

/**
 * Create a simple generator that yields 1, 2, 3
 */
function* oneTwoThree() {
  // Your code here - yield each number
}

/**
 * Create a range generator
 * @param {number} start
 * @param {number} end
 */
function* range(start, end) {
  // Your code here
}

/**
 * Create an infinite counter generator
 * @param {number} start - starting value (default 0)
 */
function* counter(start = 0) {
  // Your code here - yields start, start+1, start+2, ... forever
}

/**
 * Create a fibonacci generator
 */
function* fibonacci() {
  // Your code here - yields 0, 1, 1, 2, 3, 5, 8, ...
}

/**
 * Create a generator that yields values from an array, then repeats
 * @param {any[]} items
 */
function* cycle(items) {
  // Your code here - cycles through items forever
}

/**
 * Create a generator that takes n values from another generator
 * @param {Generator} gen
 * @param {number} n
 */
function* take(gen, n) {
  // Your code here
}

/**
 * Create a generator that maps values from another generator
 * @param {Generator} gen
 * @param {Function} fn
 */
function* map(gen, fn) {
  // Your code here
}

/**
 * Create a generator that filters values from another generator
 * @param {Generator} gen
 * @param {Function} predicate
 */
function* filter(gen, predicate) {
  // Your code here
}

/**
 * Create a generator that yields unique values only
 * @param {Generator} gen
 */
function* unique(gen) {
  // Your code here
}

/**
 * Create a generator that flattens nested arrays one level
 * @param {any[][]} arrays
 */
function* flatten(arrays) {
  // Your code here
}

/**
 * Create a generator that uses yield* to delegate
 * Should yield all values from each iterable in sequence
 * @param  {...Iterable} iterables
 */
function* concat(...iterables) {
  // Your code here - use yield*
}

/**
 * Create a generator that can receive values via next(value)
 * Returns accumulated values
 */
function* accumulator() {
  // Your code here
  // First next() starts it
  // Each subsequent next(value) adds value to total and yields total
  // Example:
  // const acc = accumulator();
  // acc.next();      // starts
  // acc.next(5);     // { value: 5, done: false }
  // acc.next(3);     // { value: 8, done: false }
}

/**
 * Create an async generator that yields values with delays
 * @param {any[]} items
 * @param {number} delay
 */
async function* delayedItems(items, delay) {
  // Your code here - yield each item after delay ms
}

/**
 * Create a generator-based state machine
 * States: 'idle' -> 'running' -> 'paused' -> 'running' -> 'stopped'
 * Returns generator that yields current state
 * Accepts commands: 'start', 'pause', 'resume', 'stop'
 */
function* stateMachine() {
  // Your code here
  // yield current state
  // receive command via next(command)
  // transition based on command
}

/**
 * Create a paginated data generator
 * @param {Function} fetchPage - async (pageNum) => { data: any[], hasMore: boolean }
 */
async function* paginate(fetchPage) {
  // Your code here
  // Yields all items from all pages
  // Fetches next page when current is exhausted
}

module.exports = {
  oneTwoThree,
  range,
  counter,
  fibonacci,
  cycle,
  take,
  map,
  filter,
  unique,
  flatten,
  concat,
  accumulator,
  delayedItems,
  stateMachine,
  paginate
};
