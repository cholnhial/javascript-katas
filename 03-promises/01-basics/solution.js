/**
 * Promise Basics Solutions
 */

function delayedResolve(value, delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), delay);
  });
}

function delayedReject(error, delay) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(error), delay);
  });
}

function doubleAndAddTen(num) {
  return Promise.resolve(num)
    .then(n => n * 2)
    .then(n => n + 10);
}

function promisify(callbackFn) {
  return (value) => {
    return new Promise((resolve, reject) => {
      callbackFn(value, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

function sequence(promiseFns) {
  return promiseFns.reduce(
    (acc, fn) => acc.then(results => fn().then(result => [...results, result])),
    Promise.resolve([])
  );
}

function retry(fn, retries) {
  return fn().catch(error => {
    if (retries <= 1) {
      throw error;
    }
    return retry(fn, retries - 1);
  });
}

function waitFor(predicate, interval, timeout) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      if (predicate()) {
        resolve();
      } else if (Date.now() - startTime >= timeout) {
        reject(new Error('Timeout'));
      } else {
        setTimeout(check, interval);
      }
    };

    check();
  });
}

function createDeferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

module.exports = {
  delayedResolve,
  delayedReject,
  doubleAndAddTen,
  promisify,
  sequence,
  retry,
  waitFor,
  createDeferred
};
