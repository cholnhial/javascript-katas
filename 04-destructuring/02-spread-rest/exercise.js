/**
 * Spread & Rest Operators Exercises
 *
 * ... operator has two uses:
 * - Spread: expand arrays/objects
 * - Rest: collect remaining items
 * Coming from Java: similar to varargs but more powerful
 */

/**
 * Merge two arrays using spread
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @returns {any[]}
 */
function mergeArrays(arr1, arr2) {
  // Your code here - use spread
}

/**
 * Create a copy of an array (shallow clone)
 * @param {any[]} arr
 * @returns {any[]}
 */
function cloneArray(arr) {
  // Your code here - use spread
}

/**
 * Add element to beginning and end of array (without mutating)
 * @param {any[]} arr
 * @param {any} first
 * @param {any} last
 * @returns {any[]}
 */
function surroundArray(arr, first, last) {
  // Your code here - use spread
}

/**
 * Merge two objects using spread (second overwrites first)
 * @param {object} obj1
 * @param {object} obj2
 * @returns {object}
 */
function mergeObjects(obj1, obj2) {
  // Your code here - use spread
}

/**
 * Clone and update specific properties
 * @param {object} obj
 * @param {object} updates
 * @returns {object}
 */
function updateObject(obj, updates) {
  // Your code here - spread original, then updates
}

/**
 * Remove a property from object (without mutating)
 * @param {object} obj
 * @param {string} key
 * @returns {object}
 */
function removeProperty(obj, key) {
  // Your code here - use destructuring with rest
}

/**
 * Function that accepts any number of arguments and returns sum
 * @param  {...number} numbers
 * @returns {number}
 */
function sum(...numbers) {
  // Your code here - numbers is already a rest parameter
}

/**
 * Function that accepts first arg separately, then rest
 * @param {any} first
 * @param  {...any} rest
 * @returns {{ first: any, rest: any[] }}
 */
function separateFirst(first, ...rest) {
  // Your code here
}

/**
 * Call a function with array as arguments
 * @param {Function} fn
 * @param {any[]} args
 * @returns {any}
 */
function callWithArray(fn, args) {
  // Your code here - use spread to call function
}

/**
 * Deep merge objects (nested objects should be merged, not replaced)
 * Only merge plain objects, replace arrays and primitives
 * @param {object} target
 * @param {object} source
 * @returns {object}
 */
function deepMerge(target, source) {
  // Your code here - recursively merge nested objects
}

/**
 * Create a function that prepends fixed arguments
 * @param {Function} fn
 * @param  {...any} prependedArgs
 * @returns {Function}
 */
function partial(fn, ...prependedArgs) {
  // Your code here - return function that calls fn with prepended args + new args
}

/**
 * Flatten one level of nested arrays
 * @param {any[][]} arrays
 * @returns {any[]}
 */
function flatten(arrays) {
  // Your code here - use spread with concat or reduce
}

/**
 * Convert arguments-like object to array
 * @param {object} arrayLike - has length and numeric indices
 * @returns {any[]}
 */
function toArray(arrayLike) {
  // Your code here - use spread
}

/**
 * Create object from entries with spread
 * @param {[string, any][]} entries
 * @returns {object}
 */
function fromEntries(entries) {
  // Your code here - use Object.fromEntries or reduce with spread
}

module.exports = {
  mergeArrays,
  cloneArray,
  surroundArray,
  mergeObjects,
  updateObject,
  removeProperty,
  sum,
  separateFirst,
  callWithArray,
  deepMerge,
  partial,
  flatten,
  toArray,
  fromEntries
};
