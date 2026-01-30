/**
 * Event Loop Solutions
 */

function predictOrder1() {
  // Sync: 1, 4
  // Microtasks: 3
  // Macrotasks: 2
  return [1, 4, 3, 2];
}

function predictOrder2() {
  // Sync: 1, 5
  // Microtask queue: [log(2), log(4)]
  // After 2 runs, it queues log(3)
  // Microtask queue: [log(4), log(3)]
  return [1, 5, 2, 4, 3];
}

function predictOrder3() {
  // No sync logs
  // Microtasks run before macrotasks: 2, 4
  // Then macrotasks: 1, 3
  return [2, 4, 1, 3];
}

function runAsMicrotask(callback) {
  queueMicrotask(callback);
  // Or: Promise.resolve().then(callback);
}

function runAsMacrotask(callback) {
  setTimeout(callback, 0);
}

function yieldToEventLoop() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

async function batchProcess(items, process, batchSize) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    batch.forEach(item => process(item));

    if (i + batchSize < items.length) {
      await yieldToEventLoop();
    }
  }
}

function createOrderedQueue() {
  const callbacks = [];
  let flushPromise = null;
  let flushResolve = null;

  flushPromise = new Promise(resolve => {
    flushResolve = resolve;
  });

  queueMicrotask(() => {
    callbacks.forEach(cb => cb());
    flushResolve();
  });

  return {
    add(callback) {
      callbacks.push(callback);
    },
    flush: flushPromise
  };
}

function predictOrder4() {
  // Sync: 3, (foo starts) 1, 4
  // After await (microtask): 2
  return [3, 1, 4, 2];
}

function predictOrder5() {
  // Sync: 6, (foo starts) 1, (bar starts) 4, 7
  // Microtask tick 1: 2, 5
  // Microtask tick 2: 3
  return [6, 1, 4, 7, 2, 5, 3];
}

function microtaskDebounce(fn) {
  let scheduled = false;
  let lastArgs;

  return function(...args) {
    lastArgs = args;
    if (!scheduled) {
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        fn(...lastArgs);
      });
    }
  };
}

function flushMicrotasks() {
  return new Promise(resolve => {
    queueMicrotask(resolve);
  });
}

function explainBlockingLoop() {
  return {
    problem: 'A synchronous while loop blocks the event loop entirely. No other callbacks, I/O operations, timers, or UI updates can run until the loop completes. If the queue keeps growing (e.g., from async operations adding to it), the loop runs forever and the application becomes unresponsive.',
    solution: 'Process items in batches and yield to the event loop between batches using setTimeout or setImmediate. This allows other tasks to run, prevents blocking, and keeps the application responsive. Example: process N items, then use setTimeout(processMore, 0) to continue.'
  };
}

module.exports = {
  predictOrder1,
  predictOrder2,
  predictOrder3,
  runAsMicrotask,
  runAsMacrotask,
  yieldToEventLoop,
  batchProcess,
  createOrderedQueue,
  predictOrder4,
  predictOrder5,
  microtaskDebounce,
  flushMicrotasks,
  explainBlockingLoop
};
