/**
 * Array.map() Exercises
 * 
 * Implement each function using Array.map()
 */

/**
 * Double each number in the array
 * @param {number[]} numbers 
 * @returns {number[]}
 * 
 * Example: [1, 2, 3] => [2, 4, 6]
 */
function doubleNumbers(numbers) {
  // Your code here
}

/**
 * Extract the 'name' property from each object
 * @param {Object[]} objects - Array of objects with 'name' property
 * @returns {string[]}
 * 
 * Example: [{name: 'Alice'}, {name: 'Bob'}] => ['Alice', 'Bob']
 */
function extractNames(objects) {
  // Your code here
}

/**
 * Convert each string to uppercase
 * @param {string[]} strings 
 * @returns {string[]}
 * 
 * Example: ['hello', 'world'] => ['HELLO', 'WORLD']
 */
function toUpperCase(strings) {
  // Your code here
}

/**
 * Add the index to each element
 * @param {number[]} numbers 
 * @returns {number[]}
 * 
 * Example: [10, 20, 30] => [10, 21, 32] (10+0, 20+1, 30+2)
 */
function addIndex(numbers) {
  // Your code here
}

/**
 * Convert array of objects to array of formatted strings
 * @param {Object[]} people - Array of {firstName, lastName} objects
 * @returns {string[]}
 * 
 * Example: [{firstName: 'John', lastName: 'Doe'}] => ['John Doe']
 */
function formatNames(people) {
  // Your code here
}

/**
 * Square each number, but return null for negative numbers
 * @param {number[]} numbers 
 * @returns {(number|null)[]}
 * 
 * Example: [2, -3, 4] => [4, null, 16]
 */
function squarePositive(numbers) {
  // Your code here
}

/**
 * Convert temperatures from Celsius to Fahrenheit
 * Formula: F = (C × 9/5) + 32
 * @param {number[]} celsius 
 * @returns {number[]}
 * 
 * Example: [0, 100] => [32, 212]
 */
function celsiusToFahrenheit(celsius) {
  // Your code here
}

/**
 * Create objects from parallel arrays
 * @param {string[]} keys 
 * @param {any[]} values 
 * @returns {Object[]}
 * 
 * Example: ['a', 'b'], [1, 2] => [{key: 'a', value: 1}, {key: 'b', value: 2}]
 */
function zipToObjects(keys, values) {
  // Your code here
}

module.exports = {
  doubleNumbers,
  extractNames,
  toUpperCase,
  addIndex,
  formatNames,
  squarePositive,
  celsiusToFahrenheit,
  zipToObjects
};
