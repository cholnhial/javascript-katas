/**
 * Closures Solutions
 */

function createCounter(start = 0) {
  let count = start;
  return () => ++count;
}

function createAccumulator(initial = 0) {
  let total = initial;
  return (value) => {
    total += value;
    return total;
  };
}

function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

function createHistory() {
  const history = [];
  return {
    add: (value) => history.push(value),
    getHistory: () => [...history]
  };
}

function createPrivateCounter(initial = 0) {
  let count = initial;
  return {
    increment: () => { count++; },
    decrement: () => { count--; },
    getValue: () => count
  };
}

function rateLimit(fn, limit) {
  let remaining = limit;
  return (...args) => {
    if (remaining > 0) {
      remaining--;
      return fn(...args);
    }
    return undefined;
  };
}

function trackCalls(fn) {
  const wrapped = (...args) => {
    wrapped.count++;
    return fn(...args);
  };
  wrapped.count = 0;
  return wrapped;
}

function createSequence(values) {
  let index = 0;
  return () => values[index++];
}

function createToggle(a, b) {
  let useFirst = true;
  return () => {
    const result = useFirst ? a : b;
    useFirst = !useFirst;
    return result;
  };
}

function cacheLastResult(fn) {
  let lastArg;
  let lastResult;
  let hasCached = false;
  
  return (arg) => {
    if (hasCached && arg === lastArg) {
      return lastResult;
    }
    lastArg = arg;
    lastResult = fn(arg);
    hasCached = true;
    return lastResult;
  };
}

module.exports = {
  createCounter,
  createAccumulator,
  once,
  createHistory,
  createPrivateCounter,
  rateLimit,
  trackCalls,
  createSequence,
  createToggle,
  cacheLastResult
};
