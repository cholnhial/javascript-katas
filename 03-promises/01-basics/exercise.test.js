const {
  delayedResolve,
  delayedReject,
  doubleAndAddTen,
  promisify,
  sequence,
  retry,
  waitFor,
  createDeferred
} = require('./exercise');

describe('Promise Basics Exercises', () => {

  describe('delayedResolve', () => {
    test('resolves with value after delay', async () => {
      const start = Date.now();
      const result = await delayedResolve('hello', 50);
      const elapsed = Date.now() - start;

      expect(result).toBe('hello');
      expect(elapsed).toBeGreaterThanOrEqual(45);
    });

    test('works with different values', async () => {
      expect(await delayedResolve(42, 10)).toBe(42);
      expect(await delayedResolve({ a: 1 }, 10)).toEqual({ a: 1 });
    });
  });

  describe('delayedReject', () => {
    test('rejects with error after delay', async () => {
      const error = new Error('test error');
      const start = Date.now();

      await expect(delayedReject(error, 50)).rejects.toThrow('test error');

      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(45);
    });
  });

  describe('doubleAndAddTen', () => {
    test('doubles then adds ten', async () => {
      expect(await doubleAndAddTen(5)).toBe(20);
      expect(await doubleAndAddTen(0)).toBe(10);
      expect(await doubleAndAddTen(-5)).toBe(0);
    });

    test('returns a promise', () => {
      const result = doubleAndAddTen(5);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('promisify', () => {
    test('converts callback to promise - success', async () => {
      const callbackFn = (value, cb) => cb(null, value * 2);
      const promiseFn = promisify(callbackFn);

      expect(await promiseFn(5)).toBe(10);
    });

    test('converts callback to promise - error', async () => {
      const callbackFn = (value, cb) => cb(new Error('failed'));
      const promiseFn = promisify(callbackFn);

      await expect(promiseFn(5)).rejects.toThrow('failed');
    });

    test('works with multiple values', async () => {
      const readFile = (path, cb) => cb(null, `contents of ${path}`);
      const readFilePromise = promisify(readFile);

      expect(await readFilePromise('test.txt')).toBe('contents of test.txt');
    });
  });

  describe('sequence', () => {
    test('executes promises in order', async () => {
      const order = [];
      const results = await sequence([
        () => { order.push(1); return Promise.resolve('a'); },
        () => { order.push(2); return Promise.resolve('b'); },
        () => { order.push(3); return Promise.resolve('c'); }
      ]);

      expect(results).toEqual(['a', 'b', 'c']);
      expect(order).toEqual([1, 2, 3]);
    });

    test('waits for each promise', async () => {
      const start = Date.now();
      await sequence([
        () => new Promise(r => setTimeout(() => r(1), 30)),
        () => new Promise(r => setTimeout(() => r(2), 30)),
        () => new Promise(r => setTimeout(() => r(3), 30))
      ]);
      const elapsed = Date.now() - start;

      // Should take at least 90ms (sequential), not ~30ms (parallel)
      expect(elapsed).toBeGreaterThanOrEqual(85);
    });

    test('handles empty array', async () => {
      const results = await sequence([]);
      expect(results).toEqual([]);
    });
  });

  describe('retry', () => {
    test('returns on first success', async () => {
      let attempts = 0;
      const result = await retry(() => {
        attempts++;
        return Promise.resolve('success');
      }, 3);

      expect(result).toBe('success');
      expect(attempts).toBe(1);
    });

    test('retries on failure', async () => {
      let attempts = 0;
      const result = await retry(() => {
        attempts++;
        if (attempts < 3) return Promise.reject(new Error('fail'));
        return Promise.resolve('success');
      }, 5);

      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });

    test('throws after max retries', async () => {
      let attempts = 0;
      await expect(
        retry(() => {
          attempts++;
          return Promise.reject(new Error('always fails'));
        }, 3)
      ).rejects.toThrow('always fails');

      expect(attempts).toBe(3);
    });
  });

  describe('waitFor', () => {
    test('resolves when predicate becomes true', async () => {
      let ready = false;
      setTimeout(() => ready = true, 50);

      const start = Date.now();
      await waitFor(() => ready, 10, 1000);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(45);
      expect(elapsed).toBeLessThan(200);
    });

    test('resolves immediately if predicate already true', async () => {
      const start = Date.now();
      await waitFor(() => true, 10, 1000);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(50);
    });

    test('rejects on timeout', async () => {
      await expect(
        waitFor(() => false, 10, 50)
      ).rejects.toThrow();
    });
  });

  describe('createDeferred', () => {
    test('can resolve externally', async () => {
      const { promise, resolve } = createDeferred();
      setTimeout(() => resolve('done'), 10);

      const result = await promise;
      expect(result).toBe('done');
    });

    test('can reject externally', async () => {
      const { promise, reject } = createDeferred();
      setTimeout(() => reject(new Error('failed')), 10);

      await expect(promise).rejects.toThrow('failed');
    });

    test('returns proper structure', () => {
      const deferred = createDeferred();

      expect(deferred.promise).toBeInstanceOf(Promise);
      expect(typeof deferred.resolve).toBe('function');
      expect(typeof deferred.reject).toBe('function');
    });
  });

});
