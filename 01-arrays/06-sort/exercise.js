/**
 * Array.sort() Exercises
 * 
 * Important: Return NEW sorted arrays, don't mutate input!
 */

/**
 * Sort numbers in ascending order
 * @param {number[]} numbers 
 * @returns {number[]}
 * 
 * Example: [3, 1, 4, 1, 5] => [1, 1, 3, 4, 5]
 */
function sortAscending(numbers) {
  // Your code here
}

/**
 * Sort numbers in descending order
 * @param {number[]} numbers 
 * @returns {number[]}
 * 
 * Example: [3, 1, 4, 1, 5] => [5, 4, 3, 1, 1]
 */
function sortDescending(numbers) {
  // Your code here
}

/**
 * Sort strings alphabetically (case-insensitive)
 * @param {string[]} strings 
 * @returns {string[]}
 * 
 * Example: ['Banana', 'apple', 'Cherry'] => ['apple', 'Banana', 'Cherry']
 */
function sortAlphabetically(strings) {
  // Your code here
}

/**
 * Sort objects by a numeric property
 * @param {Object[]} objects 
 * @param {string} property 
 * @returns {Object[]}
 * 
 * Example: [{age: 30}, {age: 20}], 'age' => [{age: 20}, {age: 30}]
 */
function sortByProperty(objects, property) {
  // Your code here
}

/**
 * Sort objects by string property (alphabetically)
 * @param {Object[]} objects 
 * @param {string} property 
 * @returns {Object[]}
 * 
 * Example: [{name: 'Bob'}, {name: 'Alice'}], 'name' => [{name: 'Alice'}, {name: 'Bob'}]
 */
function sortByStringProperty(objects, property) {
  // Your code here
}

/**
 * Sort by multiple criteria (primary: category, secondary: price)
 * @param {Object[]} products - Array of {category, price}
 * @returns {Object[]}
 * 
 * Example: [{category: 'B', price: 10}, {category: 'A', price: 20}]
 * => [{category: 'A', price: 20}, {category: 'B', price: 10}]
 */
function sortByCategoryThenPrice(products) {
  // Your code here
}

/**
 * Sort dates in chronological order
 * @param {string[]} dateStrings - ISO date strings
 * @returns {string[]}
 * 
 * Example: ['2023-03-15', '2023-01-01', '2023-02-20']
 * => ['2023-01-01', '2023-02-20', '2023-03-15']
 */
function sortDates(dateStrings) {
  // Your code here
}

/**
 * Sort by custom priority order
 * @param {Object[]} tasks - Array of {name, priority}
 * @param {string[]} priorityOrder - e.g., ['high', 'medium', 'low']
 * @returns {Object[]}
 * 
 * Example: 
 * [{name: 'A', priority: 'low'}, {name: 'B', priority: 'high'}], ['high', 'medium', 'low']
 * => [{name: 'B', priority: 'high'}, {name: 'A', priority: 'low'}]
 */
function sortByCustomPriority(tasks, priorityOrder) {
  // Your code here
}

/**
 * Sort strings by length, then alphabetically
 * @param {string[]} strings 
 * @returns {string[]}
 * 
 * Example: ['bb', 'aaa', 'a', 'cc'] => ['a', 'bb', 'cc', 'aaa']
 */
function sortByLengthThenAlpha(strings) {
  // Your code here
}

/**
 * Sort with nulls/undefined at the end
 * @param {(number|null|undefined)[]} values 
 * @returns {(number|null|undefined)[]}
 * 
 * Example: [3, null, 1, undefined, 2] => [1, 2, 3, null, undefined]
 */
function sortWithNullsLast(values) {
  // Your code here
}

module.exports = {
  sortAscending,
  sortDescending,
  sortAlphabetically,
  sortByProperty,
  sortByStringProperty,
  sortByCategoryThenPrice,
  sortDates,
  sortByCustomPriority,
  sortByLengthThenAlpha,
  sortWithNullsLast
};
