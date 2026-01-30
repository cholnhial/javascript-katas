/**
 * Memoization Solutions
 */

function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

function memoizeMultiArg(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function memoizeWithLimit(fn, maxSize) {
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    cache.set(arg, result);
    return result;
  };
}

function memoizeWithExpiry(fn, ttl) {
  const cache = new Map();
  return (arg) => {
    const cached = cache.get(arg);
    const now = Date.now();

    if (cached && now - cached.timestamp < ttl) {
      return cached.value;
    }

    const result = fn(arg);
    cache.set(arg, { value: result, timestamp: now });
    return result;
  };
}

function memoizeWithKeyFn(fn, keyFn) {
  const cache = new Map();
  return (...args) => {
    const key = keyFn(...args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function memoizeRecursive(fn) {
  const cache = new Map();
  const memoized = (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(memoized, arg);
    cache.set(arg, result);
    return result;
  };
  return memoized;
}

function memoizeWithClear(fn) {
  const cache = new Map();
  const memoized = (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
  memoized.clear = () => cache.clear();
  return memoized;
}

function memoizeAsync(fn) {
  const cache = new Map();
  return async (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = await fn(arg);
    cache.set(arg, result);
    return result;
  };
}

module.exports = {
  memoize,
  memoizeMultiArg,
  memoizeWithLimit,
  memoizeWithExpiry,
  memoizeWithKeyFn,
  memoizeRecursive,
  memoizeWithClear,
  memoizeAsync
};
