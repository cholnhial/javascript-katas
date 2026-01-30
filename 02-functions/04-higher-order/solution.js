/**
 * Higher-Order Functions Solutions
 */

function negate(predicate) {
  return (...args) => !predicate(...args);
}

function times(n, fn) {
  for (let i = 0; i < n; i++) {
    fn(i);
  }
}

function withLogging(fn, logger = console.log) {
  return (...args) => {
    logger('Arguments:', args);
    const result = fn(...args);
    logger('Result:', result);
    return result;
  };
}

function retry(fn, maxRetries) {
  return async (...args) => {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn(...args);
      } catch (e) {
        lastError = e;
      }
    }
    throw lastError;
  };
}

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn(...args);
    }
  };
}

function after(n, fn) {
  let count = 0;
  return (...args) => {
    count++;
    if (count >= n) {
      return fn(...args);
    }
  };
}

function before(n, fn) {
  let count = 0;
  let lastResult;
  return (...args) => {
    if (count < n) {
      count++;
      lastResult = fn(...args);
    }
    return lastResult;
  };
}

function withDefault(fn, defaultValue) {
  return (...args) => {
    try {
      const result = fn(...args);
      return Number.isNaN(result) ? defaultValue : result;
    } catch (e) {
      return defaultValue;
    }
  };
}

function mapArgs(fn, transformer) {
  return (...args) => fn(...args.map(transformer));
}

module.exports = {
  negate,
  times,
  withLogging,
  retry,
  debounce,
  throttle,
  after,
  before,
  withDefault,
  mapArgs
};
