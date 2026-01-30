/**
 * Promise Error Handling Solutions
 */

async function safeFetch(fetchFn, defaultValue) {
  try {
    return await fetchFn();
  } catch {
    return defaultValue;
  }
}

async function wrapError(fn, context) {
  try {
    return await fn();
  } catch (error) {
    throw new Error(`${context}: ${error.message}`);
  }
}

async function withCleanup(fn, cleanup) {
  try {
    return await fn();
  } finally {
    cleanup();
  }
}

async function catchType(fn, errorClass, handler) {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof errorClass) {
      return handler(error);
    }
    throw error;
  }
}

async function validateResult(fn, validator, errorMessage) {
  const result = await fn();
  if (!validator(result)) {
    throw new Error(errorMessage);
  }
  return result;
}

async function collectErrors(operations) {
  const results = [];
  const errors = [];

  await Promise.all(
    operations.map(async (op, index) => {
      try {
        results[index] = await op();
      } catch (error) {
        results[index] = undefined;
        errors.push(error);
      }
    })
  );

  return { results, errors };
}

function circuitBreaker(fn, threshold) {
  let failures = 0;
  let circuitOpen = false;

  return async function () {
    if (circuitOpen) {
      throw new Error('Circuit is open');
    }

    try {
      const result = await fn();
      failures = 0; // Reset on success
      return result;
    } catch (error) {
      failures++;
      if (failures >= threshold) {
        circuitOpen = true;
      }
      throw error;
    }
  };
}

async function fallbackChain(fns) {
  let lastError;
  for (const fn of fns) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function transformError(fn, transformers) {
  try {
    return await fn();
  } catch (error) {
    for (const [ErrorClass, transformer] of transformers) {
      if (error instanceof ErrorClass) {
        throw transformer(error);
      }
    }
    throw error;
  }
}

async function using(acquire, use, release) {
  const resource = await acquire();
  try {
    return await use(resource);
  } finally {
    await release(resource);
  }
}

module.exports = {
  safeFetch,
  wrapError,
  withCleanup,
  catchType,
  validateResult,
  collectErrors,
  circuitBreaker,
  fallbackChain,
  transformError,
  using
};
