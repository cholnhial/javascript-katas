/**
 * Array.filter() Exercises
 * 
 * Implement each function using Array.filter()
 */

/**
 * Return only even numbers
 * @param {number[]} numbers 
 * @returns {number[]}
 * 
 * Example: [1, 2, 3, 4, 5] => [2, 4]
 */
function filterEvens(numbers) {
  return numbers.filter(n => n % 2 === 0);
}

/**
 * Return only strings longer than n characters
 * @param {string[]} strings 
 * @param {number} n 
 * @returns {string[]}
 * 
 * Example: ['a', 'ab', 'abc'], 1 => ['ab', 'abc']
 */
function filterLongerThan(strings, n) {
  return strings.filter(s => s.length > n);
}

/**
 * Remove all falsy values from array
 * @param {any[]} array 
 * @returns {any[]}
 * 
 * Example: [0, 1, false, 2, '', 3, null] => [1, 2, 3]
 */
function removeFalsy(array) {
  return array.filter(i => !!i);
}

/**
 * Return objects where the specified property equals the value
 * @param {Object[]} objects 
 * @param {string} property 
 * @param {any} value 
 * @returns {Object[]}
 * 
 * Example: [{a: 1}, {a: 2}], 'a', 1 => [{a: 1}]
 */
function filterByProperty(objects, property, value) {
  return objects.filter(o => o[property] === value);
}

/**
 * Return only unique values (remove duplicates)
 * @param {any[]} array 
 * @returns {any[]}
 * 
 * Example: [1, 2, 2, 3, 1] => [1, 2, 3]
 */
function unique(array) {
 return array.filter((n, index, self) => self.indexOf(n) === index );
}

/**
 * Return numbers within a range (inclusive)
 * @param {number[]} numbers 
 * @param {number} min 
 * @param {number} max 
 * @returns {number[]}
 * 
 * Example: [1, 5, 10, 15], 5, 12 => [5, 10]
 */
function filterInRange(numbers, min, max) {
  return numbers.filter(n => n >= min && n <= max);
}

/**
 * Filter array to only include elements that exist in the whitelist
 * @param {any[]} array 
 * @param {any[]} whitelist 
 * @returns {any[]}
 * 
 * Example: [1, 2, 3, 4, 5], [2, 4, 6] => [2, 4]
 */
function filterByWhitelist(array, whitelist) {
  return array.filter(i => whitelist.includes(i));
}

/**
 * Return objects where a nested property matches
 * @param {Object[]} objects - Objects with nested structure
 * @param {string} path - Dot-notation path like 'address.city'
 * @param {any} value 
 * @returns {Object[]}
 * 
 * Example: 
 * [{address: {city: 'NYC'}}, {address: {city: 'LA'}}], 'address.city', 'NYC'
 * => [{address: {city: 'NYC'}}]
 */
function filterByNestedProperty(objects, path, value) {
  return objects.filter(o => {
    const pathParts = path.split(".");
    let cursor = o;
    pathParts.forEach(pathPart => {
      if (cursor.hasOwnProperty(pathPart)) {
        cursor = cursor[pathPart];
      }
    })
    return cursor === value;
  });
}

module.exports = {
  filterEvens,
  filterLongerThan,
  removeFalsy,
  filterByProperty,
  unique,
  filterInRange,
  filterByWhitelist,
  filterByNestedProperty
};
