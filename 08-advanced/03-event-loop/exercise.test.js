const {
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
} = require('./exercise');

describe('Event Loop Exercises', () => {

  describe('predictOrder1', () => {
    test('correctly predicts execution order', () => {
      const order = [];

      order.push(1);
      setTimeout(() => order.push(2), 0);
      Promise.resolve().then(() => order.push(3));
      order.push(4);

      return new Promise(resolve => {
        setTimeout(() => {
          expect(predictOrder1()).toEqual(order);
          resolve();
        }, 10);
      });
    });
  });

  describe('predictOrder2', () => {
    test('correctly predicts nested promise order', () => {
      const order = [];

      order.push(1);
      Promise.resolve().then(() => {
        order.push(2);
        Promise.resolve().then(() => order.push(3));
      });
      Promise.resolve().then(() => order.push(4));
      order.push(5);

      return new Promise(resolve => {
        setTimeout(() => {
          expect(predictOrder2()).toEqual(order);
          resolve();
        }, 10);
      });
    });
  });

  describe('predictOrder3', () => {
    test('correctly predicts setTimeout vs Promise order', () => {
      const order = [];

      setTimeout(() => order.push(1), 0);
      Promise.resolve().then(() => order.push(2));
      setTimeout(() => order.push(3), 0);
      Promise.resolve().then(() => order.push(4));

      return new Promise(resolve => {
        setTimeout(() => {
          expect(predictOrder3()).toEqual(order);
          resolve();
        }, 10);
      });
    });
  });

  describe('runAsMicrotask', () => {
    test('runs callback as microtask', async () => {
      const order = [];

      setTimeout(() => order.push('macro'), 0);
      runAsMicrotask(() => order.push('micro'));
      order.push('sync');

      await new Promise(r => setTimeout(r, 10));
      expect(order).toEqual(['sync', 'micro', 'macro']);
    });
  });

  describe('runAsMacrotask', () => {
    test('runs callback as macrotask', async () => {
      const order = [];

      runAsMacrotask(() => order.push('macro'));
      Promise.resolve().then(() => order.push('micro'));
      order.push('sync');

      await new Promise(r => setTimeout(r, 10));
      expect(order).toEqual(['sync', 'micro', 'macro']);
    });
  });

  describe('yieldToEventLoop', () => {
    test('allows other tasks to run', async () => {
      const order = [];

      setTimeout(() => order.push('timeout'), 0);

      order.push('before');
      await yieldToEventLoop();
      order.push('after');

      await new Promise(r => setTimeout(r, 10));
      expect(order).toEqual(['before', 'timeout', 'after']);
    });
  });

  describe('batchProcess', () => {
    test('processes in batches', async () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const processed = [];
      const batchBoundaries = [];

      let lastBatchEnd = 0;

      await batchProcess(items, (item) => {
        processed.push(item);
        if (processed.length % 3 === 0) {
          batchBoundaries.push(processed.length);
        }
      }, 3);

      expect(processed).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test('yields between batches', async () => {
      const items = [1, 2, 3, 4, 5, 6];
      let timeoutRan = false;

      setTimeout(() => { timeoutRan = true; }, 0);

      await batchProcess(items, () => {}, 2);

      expect(timeoutRan).toBe(true);
    });
  });

  describe('createOrderedQueue', () => {
    test('executes callbacks in order', async () => {
      const queue = createOrderedQueue();
      const order = [];

      queue.add(() => order.push(1));
      queue.add(() => order.push(2));
      queue.add(() => order.push(3));

      await queue.flush;
      expect(order).toEqual([1, 2, 3]);
    });

    test('runs after sync code', async () => {
      const queue = createOrderedQueue();
      const order = [];

      queue.add(() => order.push('queued'));
      order.push('sync');

      await queue.flush;
      expect(order).toEqual(['sync', 'queued']);
    });
  });

  describe('predictOrder4', () => {
    test('correctly predicts async/await order', async () => {
      const order = [];

      async function foo() {
        order.push(1);
        await Promise.resolve();
        order.push(2);
      }

      order.push(3);
      foo();
      order.push(4);

      await new Promise(r => setTimeout(r, 10));
      expect(predictOrder4()).toEqual(order);
    });
  });

  describe('predictOrder5', () => {
    test('correctly predicts multiple async function order', async () => {
      const order = [];

      async function foo() {
        order.push(1);
        await Promise.resolve();
        order.push(2);
        await Promise.resolve();
        order.push(3);
      }

      async function bar() {
        order.push(4);
        await Promise.resolve();
        order.push(5);
      }

      order.push(6);
      foo();
      bar();
      order.push(7);

      await new Promise(r => setTimeout(r, 10));
      expect(predictOrder5()).toEqual(order);
    });
  });

  describe('microtaskDebounce', () => {
    test('only calls once per microtask cycle', async () => {
      let callCount = 0;
      let lastArg;

      const debounced = microtaskDebounce((arg) => {
        callCount++;
        lastArg = arg;
      });

      debounced('a');
      debounced('b');
      debounced('c');

      await flushMicrotasks();

      expect(callCount).toBe(1);
      expect(lastArg).toBe('c');
    });
  });

  describe('flushMicrotasks', () => {
    test('flushes pending microtasks', async () => {
      let executed = false;
      queueMicrotask(() => { executed = true; });

      expect(executed).toBe(false);
      await flushMicrotasks();
      expect(executed).toBe(true);
    });
  });

  describe('explainBlockingLoop', () => {
    test('provides valid explanation', () => {
      const explanation = explainBlockingLoop();

      expect(explanation.problem.length).toBeGreaterThan(10);
      expect(explanation.solution.length).toBeGreaterThan(10);
    });
  });

});
