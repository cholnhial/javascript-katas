/**
 * Array Search Methods Exercises
 * find, findIndex, includes, some, every
 */

/**
 * Find the first even number
 * @param {number[]} numbers 
 * @returns {number|undefined}
 * 
 * Example: [1, 3, 4, 6] => 4
 */
function findFirstEven(numbers) {
  // Your code here
}

/**
 * Find user by id
 * @param {Object[]} users - Array of {id, name} objects
 * @param {number} id 
 * @returns {Object|undefined}
 * 
 * Example: [{id: 1, name: 'A'}], 1 => {id: 1, name: 'A'}
 */
function findUserById(users, id) {
  // Your code here
}

/**
 * Find index of first negative number
 * @param {number[]} numbers 
 * @returns {number} -1 if not found
 * 
 * Example: [1, 2, -3, 4] => 2
 */
function findNegativeIndex(numbers) {
  // Your code here
}

/**
 * Check if array contains a value
 * @param {any[]} array 
 * @param {any} value 
 * @returns {boolean}
 * 
 * Example: [1, 2, 3], 2 => true
 */
function contains(array, value) {
  // Your code here
}

/**
 * Check if any number is greater than threshold
 * @param {number[]} numbers 
 * @param {number} threshold 
 * @returns {boolean}
 * 
 * Example: [1, 2, 3], 2 => true (3 > 2)
 */
function hasGreaterThan(numbers, threshold) {
  // Your code here
}

/**
 * Check if all numbers are positive
 * @param {number[]} numbers 
 * @returns {boolean}
 * 
 * Example: [1, 2, 3] => true, [1, -2, 3] => false
 */
function allPositive(numbers) {
  // Your code here
}

/**
 * Check if array has any duplicates
 * @param {any[]} array 
 * @returns {boolean}
 * 
 * Example: [1, 2, 3, 2] => true, [1, 2, 3] => false
 */
function hasDuplicates(array) {
  // Your code here
}

/**
 * Check if user has any of the required roles
 * @param {string[]} userRoles 
 * @param {string[]} requiredRoles 
 * @returns {boolean}
 * 
 * Example: ['user', 'admin'], ['admin', 'super'] => true
 */
function hasAnyRole(userRoles, requiredRoles) {
  // Your code here
}

/**
 * Check if all items are in stock (quantity > 0)
 * @param {Object[]} items - Array of {name, quantity}
 * @returns {boolean}
 * 
 * Example: [{name: 'a', quantity: 5}] => true
 */
function allInStock(items) {
  // Your code here
}

/**
 * Find the first object where nested property matches
 * @param {Object[]} objects 
 * @param {string} path - Dot notation path
 * @param {any} value 
 * @returns {Object|undefined}
 * 
 * Example: [{a: {b: 1}}, {a: {b: 2}}], 'a.b', 2 => {a: {b: 2}}
 */
function findByNestedProperty(objects, path, value) {
  // Your code here
}

module.exports = {
  findFirstEven,
  findUserById,
  findNegativeIndex,
  contains,
  hasGreaterThan,
  allPositive,
  hasDuplicates,
  hasAnyRole,
  allInStock,
  findByNestedProperty
};
