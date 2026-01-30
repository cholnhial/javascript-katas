const {
  memoize,
  memoizeMultiArg,
  memoizeWithLimit,
  memoizeWithExpiry,
  memoizeWithKeyFn,
  memoizeRecursive,
  memoizeWithClear,
  memoizeAsync
} = require('./exercise');

describe('Memoization Exercises', () => {

  describe('memoize', () => {
    test('caches results for same argument', () => {
      let calls = 0;
      const fn = memoize(x => { calls++; return x * 2; });

      expect(fn(5)).toBe(10);
      expect(fn(5)).toBe(10);
      expect(fn(5)).toBe(10);
      expect(calls).toBe(1);
    });

    test('computes for different arguments', () => {
      let calls = 0;
      const fn = memoize(x => { calls++; return x * 2; });

      fn(1);
      fn(2);
      fn(3);
      expect(calls).toBe(3);
    });

    test('caches multiple different values', () => {
      let calls = 0;
      const fn = memoize(x => { calls++; return x * 2; });

      expect(fn(1)).toBe(2);
      expect(fn(2)).toBe(4);
      expect(fn(1)).toBe(2);
      expect(fn(2)).toBe(4);
      expect(calls).toBe(2);
    });

    test('handles falsy return values', () => {
      let calls = 0;
      const fn = memoize(x => { calls++; return x === 0 ? 0 : null; });

      expect(fn(0)).toBe(0);
      expect(fn(0)).toBe(0);
      expect(fn(1)).toBe(null);
      expect(fn(1)).toBe(null);
      expect(calls).toBe(2);
    });
  });

  describe('memoizeMultiArg', () => {
    test('caches based on multiple arguments', () => {
      let calls = 0;
      const add = memoizeMultiArg((a, b) => { calls++; return a + b; });

      expect(add(1, 2)).toBe(3);
      expect(add(1, 2)).toBe(3);
      expect(calls).toBe(1);
    });

    test('different argument order creates different cache entry', () => {
      let calls = 0;
      const add = memoizeMultiArg((a, b) => { calls++; return a + b; });

      add(1, 2);
      add(2, 1);
      expect(calls).toBe(2);
    });

    test('works with object arguments', () => {
      let calls = 0;
      const fn = memoizeMultiArg((obj) => { calls++; return obj.x + obj.y; });

      expect(fn({ x: 1, y: 2 })).toBe(3);
      expect(fn({ x: 1, y: 2 })).toBe(3);
      expect(calls).toBe(1);
    });
  });

  describe('memoizeWithLimit', () => {
    test('caches up to limit', () => {
      let calls = 0;
      const fn = memoizeWithLimit(x => { calls++; return x * 2; }, 2);

      fn(1);
      fn(2);
      fn(1);
      fn(2);
      expect(calls).toBe(2);
    });

    test('evicts oldest entry when limit exceeded', () => {
      let calls = 0;
      const fn = memoizeWithLimit(x => { calls++; return x * 2; }, 2);

      fn(1); // cache: [1]
      fn(2); // cache: [1, 2]
      fn(3); // cache: [2, 3] - evicted 1

      expect(calls).toBe(3);

      fn(1); // recompute - not in cache
      expect(calls).toBe(4);

      fn(3); // still cached
      expect(calls).toBe(4);
    });
  });

  describe('memoizeWithExpiry', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('caches within TTL', () => {
      let calls = 0;
      const fn = memoizeWithExpiry(x => { calls++; return x * 2; }, 1000);

      fn(5);
      jest.advanceTimersByTime(500);
      fn(5);

      expect(calls).toBe(1);
    });

    test('recomputes after TTL expires', () => {
      let calls = 0;
      const fn = memoizeWithExpiry(x => { calls++; return x * 2; }, 1000);

      fn(5);
      jest.advanceTimersByTime(1001);
      fn(5);

      expect(calls).toBe(2);
    });

    test('each entry has its own expiry', () => {
      let calls = 0;
      const fn = memoizeWithExpiry(x => { calls++; return x * 2; }, 1000);

      fn(1);
      jest.advanceTimersByTime(500);
      fn(2);
      jest.advanceTimersByTime(600); // 1 expired, 2 still valid

      fn(1); // recompute
      fn(2); // cached

      expect(calls).toBe(3);
    });
  });

  describe('memoizeWithKeyFn', () => {
    test('uses custom key function', () => {
      let calls = 0;
      const fn = memoizeWithKeyFn(
        (user) => { calls++; return user.name.toUpperCase(); },
        (user) => user.id
      );

      expect(fn({ id: 1, name: 'john' })).toBe('JOHN');
      expect(fn({ id: 1, name: 'johnny' })).toBe('JOHN'); // cached by id
      expect(calls).toBe(1);
    });

    test('different keys compute separately', () => {
      let calls = 0;
      const fn = memoizeWithKeyFn(
        (obj) => { calls++; return obj.value * 2; },
        (obj) => obj.key
      );

      fn({ key: 'a', value: 1 });
      fn({ key: 'b', value: 2 });
      fn({ key: 'a', value: 3 });

      expect(calls).toBe(2);
    });
  });

  describe('memoizeRecursive', () => {
    test('memoizes recursive fibonacci', () => {
      let calls = 0;
      const fib = memoizeRecursive((self, n) => {
        calls++;
        if (n <= 1) return n;
        return self(n - 1) + self(n - 2);
      });

      expect(fib(10)).toBe(55);
      const callsForFirst = calls;

      // Calling again should use cache
      expect(fib(10)).toBe(55);
      expect(calls).toBe(callsForFirst);
    });

    test('recursive calls use cache', () => {
      let calls = 0;
      const fib = memoizeRecursive((self, n) => {
        calls++;
        if (n <= 1) return n;
        return self(n - 1) + self(n - 2);
      });

      fib(10);
      const callsFor10 = calls;

      // fib(11) should only need 1 new call since fib(10) and fib(9) are cached
      fib(11);
      expect(calls).toBe(callsFor10 + 1);
    });

    test('handles large values efficiently', () => {
      const fib = memoizeRecursive((self, n) => {
        if (n <= 1) return n;
        return self(n - 1) + self(n - 2);
      });

      // This would be impossibly slow without memoization
      expect(fib(50)).toBe(12586269025);
    });
  });

  describe('memoizeWithClear', () => {
    test('caches normally', () => {
      let calls = 0;
      const fn = memoizeWithClear(x => { calls++; return x * 2; });

      fn(5);
      fn(5);
      expect(calls).toBe(1);
    });

    test('clear resets cache', () => {
      let calls = 0;
      const fn = memoizeWithClear(x => { calls++; return x * 2; });

      fn(5);
      fn.clear();
      fn(5);

      expect(calls).toBe(2);
    });

    test('clear removes all cached values', () => {
      let calls = 0;
      const fn = memoizeWithClear(x => { calls++; return x * 2; });

      fn(1);
      fn(2);
      fn(3);
      expect(calls).toBe(3);

      fn.clear();

      fn(1);
      fn(2);
      fn(3);
      expect(calls).toBe(6);
    });
  });

  describe('memoizeAsync', () => {
    test('caches async results', async () => {
      let calls = 0;
      const fn = memoizeAsync(async (x) => {
        calls++;
        return x * 2;
      });

      expect(await fn(5)).toBe(10);
      expect(await fn(5)).toBe(10);
      expect(calls).toBe(1);
    });

    test('handles different arguments', async () => {
      let calls = 0;
      const fn = memoizeAsync(async (x) => {
        calls++;
        return x * 2;
      });

      await fn(1);
      await fn(2);
      await fn(1);

      expect(calls).toBe(2);
    });

    test('caches resolved value not promise', async () => {
      let calls = 0;
      const fn = memoizeAsync(async (x) => {
        calls++;
        return { value: x };
      });

      const result1 = await fn(5);
      const result2 = await fn(5);

      expect(result1).toEqual({ value: 5 });
      expect(result2).toEqual({ value: 5 });
      expect(result1).toBe(result2); // Same cached object
      expect(calls).toBe(1);
    });
  });

});
