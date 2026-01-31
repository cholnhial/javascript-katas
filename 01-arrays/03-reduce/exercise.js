/**
 * Array.reduce() Exercises
 * 
 * Implement each function using Array.reduce()
 */

/**
 * Sum all numbers in an array
 * @param {number[]} numbers 
 * @returns {number}
 * 
 * Example: [1, 2, 3, 4] => 10
 */
function sum(numbers) {
  return numbers.reduce((acc, c) => acc + c, 0);
}

/**
 * Find the maximum value in an array
 * @param {number[]} numbers 
 * @returns {number|undefined} undefined if array is empty
 * 
 * Example: [3, 1, 4, 1, 5] => 5
 */
function max(numbers) {
  return numbers.reduce((acc, c) => c > acc ? c : acc, numbers[0])
}

/**
 * Count occurrences of each element
 * @param {any[]} array 
 * @returns {Object} Object with elements as keys and counts as values
 * 
 * Example: ['a', 'b', 'a'] => {a: 2, b: 1}
 */
function countOccurrences(array) {
  return array.reduce((acc, c) => c in acc ? {...acc, [c]: acc[c] + 1} :  {...acc,[c]: 1}, {})
}

/**
 * Group array of objects by a property
 * @param {Object[]} array 
 * @param {string} property 
 * @returns {Object}
 * 
 * Example: 
 * [{type: 'a', v: 1}, {type: 'b', v: 2}, {type: 'a', v: 3}], 'type'
 * => {a: [{type: 'a', v: 1}, {type: 'a', v: 3}], b: [{type: 'b', v: 2}]}
 */
function groupBy(array, property) {
  return array.reduce((acc, c) => c[property] in acc ? {...acc, [c[property]]: [...acc[c[property]], c]} :  {...acc, [c[property]]: [c]}, {})
}

/**
 * Flatten a nested array one level deep
 * @param {any[][]} arrays 
 * @returns {any[]}
 * 
 * Example: [[1, 2], [3, 4], [5]] => [1, 2, 3, 4, 5]
 */
function flatten(arrays) {
  return arrays.reduce((acc, c) =>  [...acc, ...c], [])
}

/**
 * Create an object from an array of key-value pairs
 * @param {Array[]} pairs - Array of [key, value] pairs
 * @returns {Object}
 * 
 * Example: [['a', 1], ['b', 2]] => {a: 1, b: 2}
 */
function fromPairs(pairs) {
  return pairs.reduce((acc, c) => {
    return {...acc, [c[0]]: c[1]}
  }, {})
}

/**
 * Calculate average of numbers
 * @param {number[]} numbers 
 * @returns {number} 0 if array is empty
 * 
 * Example: [1, 2, 3, 4, 5] => 3
 */
function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  return numbers.reduce((acc, c) => acc = acc + c,0)/numbers.length;
}

/**
 * Compose functions (right to left)
 * @param  {...Function} fns - Functions to compose
 * @returns {Function}
 * 
 * Example: compose(f, g, h)(x) === f(g(h(x)))
 */
function compose(...fns) {
  return  x => fns.reduceRight((acc, fn) => fn(acc), x);
}

/**
 * Partition array into two arrays based on predicate
 * @param {any[]} array 
 * @param {Function} predicate 
 * @returns {[any[], any[]]} [passing, failing]
 * 
 * Example: [1, 2, 3, 4], n => n % 2 === 0 => [[2, 4], [1, 3]]
 */
function partition(array, predicate) {
  return array.reduce((acc, c) => {
    const passing = acc[0];
    const failing = acc[1];
    if (predicate(c)) {
      return [[...passing, c], [...failing]]
    } else {
      return [[...passing], [...failing, c]]
    }
  }, [[],[]])
}

/**
 * Create a lookup object from array
 * @param {Object[]} array - Array of objects
 * @param {string} key - Property to use as key
 * @returns {Object}
 * 
 * Example: [{id: 1, name: 'a'}, {id: 2, name: 'b'}], 'id' 
 * => {1: {id: 1, name: 'a'}, 2: {id: 2, name: 'b'}}
 */
function keyBy(array, key) {
  return array.reduce((acc, c) => ({...acc, [c[key]]: c}), {})
}

module.exports = {
  sum,
  max,
  countOccurrences,
  groupBy,
  flatten,
  fromPairs,
  average,
  compose,
  partition,
  keyBy
};
