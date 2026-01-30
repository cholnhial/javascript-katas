/**
 * Array.reduce() Solutions
 */

function sum(numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

function max(numbers) {
  if (numbers.length === 0) return undefined;
  return numbers.reduce((max, n) => n > max ? n : max, numbers[0]);
}

function countOccurrences(array) {
  return array.reduce((acc, item) => ({
    ...acc,
    [item]: (acc[item] || 0) + 1
  }), {});
}

function groupBy(array, property) {
  return array.reduce((acc, item) => {
    const key = item[property];
    return {
      ...acc,
      [key]: [...(acc[key] || []), item]
    };
  }, {});
}

function flatten(arrays) {
  return arrays.reduce((acc, arr) => [...acc, ...arr], []);
}

function fromPairs(pairs) {
  return pairs.reduce((acc, [key, value]) => ({
    ...acc,
    [key]: value
  }), {});
}

function average(numbers) {
  if (numbers.length === 0) return 0;
  return numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
}

function compose(...fns) {
  return (value) => fns.reduceRight((acc, fn) => fn(acc), value);
}

function partition(array, predicate) {
  return array.reduce(
    ([pass, fail], item) => 
      predicate(item) 
        ? [[...pass, item], fail] 
        : [pass, [...fail, item]],
    [[], []]
  );
}

function keyBy(array, key) {
  return array.reduce((acc, item) => ({
    ...acc,
    [item[key]]: item
  }), {});
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
