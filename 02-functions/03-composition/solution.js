/**
 * Function Composition Solutions
 */

function compose(...fns) {
  return (x) => fns.reduceRight((v, fn) => fn(v), x);
}

function pipe(...fns) {
  return (x) => fns.reduce((v, fn) => fn(v), x);
}

const slugify = pipe(
  str => str.toLowerCase(),
  str => str.trim(),
  str => str.replace(/\s+/g, '-'),
  str => str.replace(/[^a-z0-9-]/g, '')
);

const processNumber = pipe(
  x => x + 10,
  x => x * 2,
  x => x - 5
);

function getActiveNames(users) {
  return pipe(
    users => users.filter(u => u.active),
    users => users.map(u => u.name),
    names => names.map(n => n.toUpperCase())
  )(users);
}

function composeAsync(...fns) {
  return async (x) => {
    let result = x;
    for (const fn of fns.reverse()) {
      result = await fn(result);
    }
    return result;
  };
}

function pipeAsync(...fns) {
  return async (x) => {
    let result = x;
    for (const fn of fns) {
      result = await fn(result);
    }
    return result;
  };
}

function tap(sideEffect) {
  return (x) => {
    sideEffect(x);
    return x;
  };
}

function when(predicate, fn) {
  return (x) => predicate(x) ? fn(x) : x;
}

function fork(...fns) {
  return (x) => fns.map(fn => fn(x));
}

module.exports = {
  compose,
  pipe,
  slugify,
  processNumber,
  getActiveNames,
  composeAsync,
  pipeAsync,
  tap,
  when,
  fork
};
