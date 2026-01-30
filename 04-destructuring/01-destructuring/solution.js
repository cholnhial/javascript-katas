/**
 * Destructuring Solutions
 */

function getFirstTwo(arr) {
  const [first, second] = arr;
  return { first, second };
}

function swap(a, b) {
  [a, b] = [b, a];
  return [a, b];
}

function getNameAndAge(person) {
  const { name, age } = person;
  return { name, age };
}

function renameProperty(obj) {
  const { name: fullName } = obj;
  return { fullName };
}

function withDefaults(person) {
  const { name, age = 0 } = person;
  return { name, age };
}

function extractNested(data) {
  const { user: { profile: { name, email } } } = data;
  return { name, email };
}

function skipElements(arr) {
  const [first, , third] = arr;
  return { first, third };
}

function headAndTail(arr) {
  const [head, ...tail] = arr;
  return { head, tail };
}

function extractAndCollectRest(obj) {
  const { id, ...other } = obj;
  return { id, other };
}

function createConnectionString({ host, port = 80, secure = false }) {
  const protocol = secure ? 'https' : 'http';
  return `${protocol}://${host}:${port}`;
}

function extractFromTuple(tuple) {
  const [name, { value }] = tuple;
  return { name, value };
}

function extractByKey(obj, key) {
  const { [key]: value } = obj;
  return value;
}

module.exports = {
  getFirstTwo,
  swap,
  getNameAndAge,
  renameProperty,
  withDefaults,
  extractNested,
  skipElements,
  headAndTail,
  extractAndCollectRest,
  createConnectionString,
  extractFromTuple,
  extractByKey
};
