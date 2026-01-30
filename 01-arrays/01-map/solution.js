/**
 * Array.map() Solutions
 */

function doubleNumbers(numbers) {
  return numbers.map(n => n * 2);
}

function extractNames(objects) {
  return objects.map(obj => obj.name);
}

function toUpperCase(strings) {
  return strings.map(str => str.toUpperCase());
}

function addIndex(numbers) {
  return numbers.map((num, index) => num + index);
}

function formatNames(people) {
  return people.map(person => `${person.firstName} ${person.lastName}`);
}

function squarePositive(numbers) {
  return numbers.map(n => n >= 0 ? n * n : null);
}

function celsiusToFahrenheit(celsius) {
  return celsius.map(c => (c * 9/5) + 32);
}

function zipToObjects(keys, values) {
  return keys.map((key, index) => ({ key, value: values[index] }));
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
