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
  return array.flatMap(a => a);
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
  return array.flat(depth);
}

/**
 * Completely flatten any nested array
 * @param {any[]} array 
 * @returns {any[]}
 * 
 * Example: [1, [2, [3, [4]]]] => [1, 2, 3, 4]
 */
function flattenDeep(array) {
  return array.flat(Infinity);
}

/**
 * Split each string by space and flatten results
 * @param {string[]} sentences 
 * @returns {string[]}
 * 
 * Example: ['hello world', 'foo bar'] => ['hello', 'world', 'foo', 'bar']
 */
function splitAndFlatten(sentences) {
  return sentences.flatMap(s => s.split(" "));
}

/**
 * Extract all tags from posts (each post has tags array)
 * @param {Object[]} posts - Array of {title, tags: string[]}
 * @returns {string[]}
 * 
 * Example: [{tags: ['a', 'b']}, {tags: ['c']}] => ['a', 'b', 'c']
 */
function getAllTags(posts) {
  return posts.flatMap(p => p.tags);
}

/**
 * Duplicate each element (return each element twice)
 * @param {any[]} array 
 * @returns {any[]}
 * 
 * Example: [1, 2, 3] => [1, 1, 2, 2, 3, 3]
 */
function duplicateElements(array) {
  return array.flatMap(n => [n,n]);
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
  return numbers.flatMap(n => n % 2 === 0 ? [n*2] : []);
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
  return arr1.flatMap(p => arr2.flatMap(p2 => [[p, p2]]));
}

/**
 * Remove empty arrays and flatten one level
 * @param {any[]} array 
 * @returns {any[]}
 * 
 * Example: [[1, 2], [], [3], [], [4, 5]] => [1, 2, 3, 4, 5]
 */
function compactAndFlatten(array) {
  return array.flatMap(a => a);
}

/**
 * Expand ranges: [1, 3] means include 1, 2, 3
 * @param {number[][]} ranges - Array of [start, end] pairs
 * @returns {number[]}
 * 
 * Example: [[1, 3], [7, 9]] => [1, 2, 3, 7, 8, 9]
 */
function expandRanges(ranges) {
  return ranges.flatMap(nums => {
      const result = [];
      for (let i = nums[0]; i < nums[nums.length - 1]; i++) {
        result.push(i);
      }
      result.push(nums[nums.length -1]);
      return result;
  })
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
