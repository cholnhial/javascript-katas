/**
 * Spread & Rest Solutions
 */

function mergeArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}

function cloneArray(arr) {
  return [...arr];
}

function surroundArray(arr, first, last) {
  return [first, ...arr, last];
}

function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

function updateObject(obj, updates) {
  return { ...obj, ...updates };
}

function removeProperty(obj, key) {
  const { [key]: _, ...rest } = obj;
  return rest;
}

function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

function separateFirst(first, ...rest) {
  return { first, rest };
}

function callWithArray(fn, args) {
  return fn(...args);
}

function deepMerge(target, source) {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (
      targetValue &&
      sourceValue &&
      typeof targetValue === 'object' &&
      typeof sourceValue === 'object' &&
      !Array.isArray(targetValue) &&
      !Array.isArray(sourceValue)
    ) {
      result[key] = deepMerge(targetValue, sourceValue);
    } else {
      result[key] = sourceValue;
    }
  }

  return result;
}

function partial(fn, ...prependedArgs) {
  return (...args) => fn(...prependedArgs, ...args);
}

function flatten(arrays) {
  return [].concat(...arrays);
}

function toArray(arrayLike) {
  return [...arrayLike];
}

function fromEntries(entries) {
  return Object.fromEntries(entries);
}

module.exports = {
  mergeArrays,
  cloneArray,
  surroundArray,
  mergeObjects,
  updateObject,
  removeProperty,
  sum,
  separateFirst,
  callWithArray,
  deepMerge,
  partial,
  flatten,
  toArray,
  fromEntries
};
