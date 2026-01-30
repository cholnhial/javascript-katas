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
  return numbers.map(n => n * 2);
}

/**
 * Extract the 'name' property from each object
 * @param {Object[]} objects - Array of objects with 'name' property
 * @returns {string[]}
 * 
 * Example: [{name: 'Alice'}, {name: 'Bob'}] => ['Alice', 'Bob']
 */
function extractNames(objects) {
  return objects.map(o => o.name);
}

/**
 * Convert each string to uppercase
 * @param {string[]} strings 
 * @returns {string[]}
 * 
 * Example: ['hello', 'world'] => ['HELLO', 'WORLD']
 */
function toUpperCase(strings) {
  return strings.map(s => s.toUpperCase());
}

/**
 * Add the index to each element
 * @param {number[]} numbers 
 * @returns {number[]}
 * 
 * Example: [10, 20, 30] => [10, 21, 32] (10+0, 20+1, 30+2)
 */
function addIndex(numbers) {
  return numbers.map((n, index) => n+index);
}

/**
 * Convert array of objects to array of formatted strings
 * @param {Object[]} people - Array of {firstName, lastName} objects
 * @returns {string[]}
 * 
 * Example: [{firstName: 'John', lastName: 'Doe'}] => ['John Doe']
 */
function formatNames(people) {
  return people.map(p => `${p.firstName} ${p.lastName}`);
}

/**
 * Square each number, but return null for negative numbers
 * @param {number[]} numbers 
 * @returns {(number|null)[]}
 * 
 * Example: [2, -3, 4] => [4, null, 16]
 */
function squarePositive(numbers) {
  return numbers.map(n => n < 0 ? null : n*n);
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
  return celsius.map(c => ((c*(9/5))+32));
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
  return keys.map((k, i) => ({key: k, value: values[i]}))
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
