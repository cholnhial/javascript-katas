/**
 * Promise.all/race Solutions
 */

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
}

function promiseAllSettled(promises) {
  return Promise.all(
    promises.map(promise =>
      Promise.resolve(promise)
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    )
  );
}

function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let rejectedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch(error => {
          errors[index] = error;
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, 'All promises rejected'));
          }
        });
    });
  });
}

function fetchAll(urls, fetchFn) {
  return Promise.all(
    urls.map(url =>
      fetchFn(url)
        .then(data => ({ url, data, success: true }))
        .catch(error => ({ url, data: error.message, success: false }))
    )
  ).then(results => {
    const output = {};
    results.forEach(({ url, data }) => {
      output[url] = data;
    });
    return output;
  });
}

function withTimeout(promise, ms) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms);
  });
  return Promise.race([promise, timeoutPromise]);
}

function pooled(tasks, limit) {
  return new Promise((resolve) => {
    if (tasks.length === 0) {
      resolve([]);
      return;
    }

    const results = [];
    let nextIndex = 0;
    let completedCount = 0;

    function runNext() {
      if (nextIndex >= tasks.length) return;

      const index = nextIndex++;
      const task = tasks[index];

      task().then(result => {
        results[index] = result;
        completedCount++;

        if (completedCount === tasks.length) {
          resolve(results);
        } else {
          runNext();
        }
      });
    }

    // Start initial batch
    const initialBatch = Math.min(limit, tasks.length);
    for (let i = 0; i < initialBatch; i++) {
      runNext();
    }
  });
}

function firstN(promises, count) {
  return new Promise((resolve) => {
    const results = [];

    promises.forEach(promise => {
      Promise.resolve(promise)
        .then(value => {
          if (results.length < count) {
            results.push(value);
            if (results.length === count) {
              resolve(results);
            }
          }
        })
        .catch(() => {}); // Ignore rejections
    });
  });
}

module.exports = {
  promiseAll,
  promiseRace,
  promiseAllSettled,
  promiseAny,
  fetchAll,
  withTimeout,
  pooled,
  firstN
};
