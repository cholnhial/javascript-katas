/**
 * Array.flat() & flatMap() Exercises
 */

/**
 * Flatten array one level deep
 * @param {any[]} array - Possibly nested array
 * @returns {any[]}
 * 
 * Example: [[1, 2], [3, 4]] => [1, 2, 3, 4]
 */
function flattenOneLevel(array) {
  // Your code here
}

/**
 * Flatten array to specified depth
 * @param {any[]} array 
 * @param {number} depth 
 * @returns {any[]}
 * 
 * Example: [1, [2, [3]]], 2 => [1, 2, 3]
 */
function flattenToDepth(array, depth) {
  // Your code here
}

/**
 * Completely flatten any nested array
 * @param {any[]} array 
 * @returns {any[]}
 * 
 * Example: [1, [2, [3, [4]]]] => [1, 2, 3, 4]
 */
function flattenDeep(array) {
  // Your code here
}

/**
 * Split each string by space and flatten results
 * @param {string[]} sentences 
 * @returns {string[]}
 * 
 * Example: ['hello world', 'foo bar'] => ['hello', 'world', 'foo', 'bar']
 */
function splitAndFlatten(sentences) {
  // Your code here
}

/**
 * Extract all tags from posts (each post has tags array)
 * @param {Object[]} posts - Array of {title, tags: string[]}
 * @returns {string[]}
 * 
 * Example: [{tags: ['a', 'b']}, {tags: ['c']}] => ['a', 'b', 'c']
 */
function getAllTags(posts) {
  // Your code here
}

/**
 * Duplicate each element (return each element twice)
 * @param {any[]} array 
 * @returns {any[]}
 * 
 * Example: [1, 2, 3] => [1, 1, 2, 2, 3, 3]
 */
function duplicateElements(array) {
  // Your code here
}

/**
 * Filter and transform in one pass using flatMap
 * Return doubled values only for even numbers
 * @param {number[]} numbers 
 * @returns {number[]}
 * 
 * Example: [1, 2, 3, 4, 5] => [4, 8] (only 2 and 4 are even)
 */
function doubleEvens(numbers) {
  // Your code here
}

/**
 * Generate all pairs from two arrays
 * @param {any[]} arr1 
 * @param {any[]} arr2 
 * @returns {Array[]} Array of [a, b] pairs
 * 
 * Example: [1, 2], ['a', 'b'] => [[1,'a'], [1,'b'], [2,'a'], [2,'b']]
 */
function cartesianProduct(arr1, arr2) {
  // Your code here
}

/**
 * Remove empty arrays and flatten one level
 * @param {any[]} array 
 * @returns {any[]}
 * 
 * Example: [[1, 2], [], [3], [], [4, 5]] => [1, 2, 3, 4, 5]
 */
function compactAndFlatten(array) {
  // Your code here
}

/**
 * Expand ranges: [1, 3] means include 1, 2, 3
 * @param {number[][]} ranges - Array of [start, end] pairs
 * @returns {number[]}
 * 
 * Example: [[1, 3], [7, 9]] => [1, 2, 3, 7, 8, 9]
 */
function expandRanges(ranges) {
  // Your code here
}

module.exports = {
  flattenOneLevel,
  flattenToDepth,
  flattenDeep,
  splitAndFlatten,
  getAllTags,
  duplicateElements,
  doubleEvens,
  cartesianProduct,
  compactAndFlatten,
  expandRanges
};
