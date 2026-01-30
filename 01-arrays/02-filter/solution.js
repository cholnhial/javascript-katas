/**
 * Array.filter() Solutions
 */

function filterEvens(numbers) {
  return numbers.filter(n => n % 2 === 0);
}

function filterLongerThan(strings, n) {
  return strings.filter(str => str.length > n);
}

function removeFalsy(array) {
  return array.filter(Boolean);
}

function filterByProperty(objects, property, value) {
  return objects.filter(obj => obj[property] === value);
}

function unique(array) {
  return array.filter((item, index, self) => self.indexOf(item) === index);
  // Alternative: return [...new Set(array)];
}

function filterInRange(numbers, min, max) {
  return numbers.filter(n => n >= min && n <= max);
}

function filterByWhitelist(array, whitelist) {
  return array.filter(item => whitelist.includes(item));
}

function filterByNestedProperty(objects, path, value) {
  const keys = path.split('.');
  return objects.filter(obj => {
    let current = obj;
    for (const key of keys) {
      if (current === undefined || current === null) return false;
      current = current[key];
    }
    return current === value;
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
