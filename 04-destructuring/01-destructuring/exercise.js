/**
 * Destructuring Exercises
 *
 * Destructuring allows extracting values from arrays/objects into variables.
 * Coming from Java: no direct equivalent - this is much more concise.
 */

/**
 * Extract first and second elements from array
 * @param {any[]} arr
 * @returns {{ first: any, second: any }}
 */
function getFirstTwo(arr) {
  // Your code here - use array destructuring
}

/**
 * Swap two values using destructuring
 * @param {any} a
 * @param {any} b
 * @returns {[any, any]} [b, a]
 */
function swap(a, b) {
  // Your code here - use destructuring swap
}

/**
 * Extract name and age from person object
 * @param {{ name: string, age: number, city: string }} person
 * @returns {{ name: string, age: number }}
 */
function getNameAndAge(person) {
  // Your code here - use object destructuring
}

/**
 * Extract with renaming - get 'name' as 'fullName'
 * @param {{ name: string }} obj
 * @returns {{ fullName: string }}
 */
function renameProperty(obj) {
  // Your code here - use destructuring with rename (: syntax)
}

/**
 * Extract with default values
 * @param {{ name: string, age?: number }} person
 * @returns {{ name: string, age: number }}
 */
function withDefaults(person) {
  // Your code here - use default value syntax (= syntax)
  // Default age should be 0
}

/**
 * Extract nested object properties
 * @param {{ user: { profile: { name: string, email: string }}}} data
 * @returns {{ name: string, email: string }}
 */
function extractNested(data) {
  // Your code here - use nested destructuring
}

/**
 * Extract array elements with skipping
 * @param {any[]} arr - array with at least 4 elements
 * @returns {{ first: any, third: any }}
 */
function skipElements(arr) {
  // Your code here - skip second element using , ,
}

/**
 * Extract head and tail of array
 * @param {any[]} arr
 * @returns {{ head: any, tail: any[] }}
 */
function headAndTail(arr) {
  // Your code here - use rest pattern for tail
}

/**
 * Extract specific keys, collect rest into 'other'
 * @param {{ id: number, name: string, [key: string]: any }} obj
 * @returns {{ id: number, other: object }}
 */
function extractAndCollectRest(obj) {
  // Your code here - extract id, collect rest into 'other'
}

/**
 * Destructure function parameters
 * Create a function that takes an options object
 * @param {{ host: string, port?: number, secure?: boolean }} options
 * @returns {string} connection string like "https://host:port" or "http://host:port"
 */
function createConnectionString({ host, port = 80, secure = false }) {
  // Your code here - parameters are already destructured
}

/**
 * Mixed array and object destructuring
 * @param {[string, { value: number }]} tuple
 * @returns {{ name: string, value: number }}
 */
function extractFromTuple(tuple) {
  // Your code here - destructure array containing object
}

/**
 * Destructure with computed property names
 * @param {object} obj
 * @param {string} key
 * @returns {any} value at that key
 */
function extractByKey(obj, key) {
  // Your code here - use computed property in destructuring: { [key]: value }
}

module.exports = {
  getFirstTwo,
  swap,
  getNameAndAge,
  renameProperty,
  withDefaults,
  extractNested,
  skipElements,
  headAndTail,
  extractAndCollectRest,
  createConnectionString,
  extractFromTuple,
  extractByKey
};
