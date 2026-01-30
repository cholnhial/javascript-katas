const {
  createRangeIterator,
  createIterableRange,
  LinkedList,
  createFibonacciIterator,
  createResettableIterator,
  concat,
  mapIterable,
  filterIterable,
  take,
  zip,
  createAsyncIterable
} = require('./exercise');

describe('Iterators Exercises', () => {

  describe('createRangeIterator', () => {
    test('iterates through range', () => {
      const iter = createRangeIterator(1, 3);
      expect(iter.next()).toEqual({ value: 1, done: false });
      expect(iter.next()).toEqual({ value: 2, done: false });
      expect(iter.next()).toEqual({ value: 3, done: false });
      expect(iter.next().done).toBe(true);
    });
  });

  describe('createIterableRange', () => {
    test('works with for...of', () => {
      const values = [];
      for (const n of createIterableRange(1, 4)) {
        values.push(n);
      }
      expect(values).toEqual([1, 2, 3, 4]);
    });

    test('works with spread', () => {
      expect([...createIterableRange(5, 7)]).toEqual([5, 6, 7]);
    });
  });

  describe('LinkedList', () => {
    test('can add items', () => {
      const list = new LinkedList();
      list.add(1);
      list.add(2);
      list.add(3);
      expect([...list]).toEqual([1, 2, 3]);
    });

    test('works with for...of', () => {
      const list = new LinkedList();
      list.add('a');
      list.add('b');

      const values = [];
      for (const v of list) {
        values.push(v);
      }
      expect(values).toEqual(['a', 'b']);
    });
  });

  describe('createFibonacciIterator', () => {
    test('yields fibonacci sequence', () => {
      const fib = createFibonacciIterator();
      expect(fib.next().value).toBe(0);
      expect(fib.next().value).toBe(1);
      expect(fib.next().value).toBe(1);
      expect(fib.next().value).toBe(2);
      expect(fib.next().value).toBe(3);
      expect(fib.next().value).toBe(5);
      expect(fib.next().value).toBe(8);
    });

    test('never completes', () => {
      const fib = createFibonacciIterator();
      for (let i = 0; i < 20; i++) {
        expect(fib.next().done).toBe(false);
      }
    });
  });

  describe('createResettableIterator', () => {
    test('iterates through items', () => {
      const iter = createResettableIterator([1, 2, 3]);
      expect(iter.next().value).toBe(1);
      expect(iter.next().value).toBe(2);
      expect(iter.next().value).toBe(3);
      expect(iter.next().done).toBe(true);
    });

    test('reset starts over', () => {
      const iter = createResettableIterator(['a', 'b']);
      iter.next();
      iter.next();
      iter.reset();
      expect(iter.next().value).toBe('a');
    });
  });

  describe('concat', () => {
    test('concatenates iterables', () => {
      const result = [...concat([1, 2], [3, 4], [5])];
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('works with different iterables', () => {
      const set = new Set([1, 2]);
      const arr = [3, 4];
      expect([...concat(set, arr)]).toEqual([1, 2, 3, 4]);
    });
  });

  describe('mapIterable', () => {
    test('maps values lazily', () => {
      const result = [...mapIterable([1, 2, 3], x => x * 2)];
      expect(result).toEqual([2, 4, 6]);
    });

    test('is lazy (doesnt consume until iterated)', () => {
      let count = 0;
      const mapped = mapIterable([1, 2, 3], x => { count++; return x; });
      expect(count).toBe(0);
      [...mapped];
      expect(count).toBe(3);
    });
  });

  describe('filterIterable', () => {
    test('filters values lazily', () => {
      const result = [...filterIterable([1, 2, 3, 4, 5], x => x % 2 === 0)];
      expect(result).toEqual([2, 4]);
    });
  });

  describe('take', () => {
    test('takes n values', () => {
      const result = [...take([1, 2, 3, 4, 5], 3)];
      expect(result).toEqual([1, 2, 3]);
    });

    test('works with infinite iterators', () => {
      const fib = {
        [Symbol.iterator]: function* () {
          let [a, b] = [0, 1];
          while (true) {
            yield a;
            [a, b] = [b, a + b];
          }
        }
      };
      const result = [...take(fib, 5)];
      expect(result).toEqual([0, 1, 1, 2, 3]);
    });
  });

  describe('zip', () => {
    test('zips iterables together', () => {
      const result = [...zip([1, 2, 3], ['a', 'b', 'c'])];
      expect(result).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
    });

    test('stops at shortest', () => {
      const result = [...zip([1, 2], ['a', 'b', 'c'])];
      expect(result).toEqual([[1, 'a'], [2, 'b']]);
    });

    test('zips three iterables', () => {
      const result = [...zip([1, 2], ['a', 'b'], [true, false])];
      expect(result).toEqual([[1, 'a', true], [2, 'b', false]]);
    });
  });

  describe('createAsyncIterable', () => {
    test('yields values asynchronously', async () => {
      const iter = createAsyncIterable([1, 2, 3], 10);
      const values = [];

      for await (const v of iter) {
        values.push(v);
      }

      expect(values).toEqual([1, 2, 3]);
    });

    test('has delay between values', async () => {
      const start = Date.now();
      const iter = createAsyncIterable([1, 2, 3], 20);

      for await (const v of iter) {
        // consume
      }

      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(50);
    });
  });

});
