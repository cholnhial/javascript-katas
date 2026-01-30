/**
 * Currying Solutions
 */

function curriedAdd(a) {
  return (b) => (c) => a + b + c;
}

function curriedMultiply(a) {
  return (b) => (c) => a * b * c;
}

function greet(greeting) {
  return (name) => `${greeting}, ${name}!`;
}

function filter(predicate) {
  return (array) => array.filter(predicate);
}

function map(transform) {
  return (array) => array.map(transform);
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

function prop(key) {
  return (obj) => obj[key];
}

function between(min) {
  return (max) => (value) => value >= min && value <= max;
}

function discount(percentage) {
  return (price) => price * (1 - percentage);
}

function format(template) {
  return (values) => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => values[key] || match);
  };
}

module.exports = {
  curriedAdd,
  curriedMultiply,
  greet,
  filter,
  map,
  curry,
  prop,
  between,
  discount,
  format
};
