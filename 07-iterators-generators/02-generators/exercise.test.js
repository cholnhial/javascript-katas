const {
  oneTwoThree,
  range,
  counter,
  fibonacci,
  cycle,
  take,
  map,
  filter,
  unique,
  flatten,
  concat,
  accumulator,
  delayedItems,
  stateMachine,
  paginate
} = require('./exercise');

describe('Generators Exercises', () => {

  describe('oneTwoThree', () => {
    test('yields 1, 2, 3', () => {
      expect([...oneTwoThree()]).toEqual([1, 2, 3]);
    });
  });

  describe('range', () => {
    test('yields range of numbers', () => {
      expect([...range(1, 5)]).toEqual([1, 2, 3, 4, 5]);
    });

    test('handles single value', () => {
      expect([...range(3, 3)]).toEqual([3]);
    });
  });

  describe('counter', () => {
    test('counts from 0 by default', () => {
      const gen = counter();
      expect(gen.next().value).toBe(0);
      expect(gen.next().value).toBe(1);
      expect(gen.next().value).toBe(2);
    });

    test('counts from custom start', () => {
      const gen = counter(10);
      expect(gen.next().value).toBe(10);
      expect(gen.next().value).toBe(11);
    });
  });

  describe('fibonacci', () => {
    test('yields fibonacci sequence', () => {
      const gen = fibonacci();
      const values = [];
      for (let i = 0; i < 8; i++) {
        values.push(gen.next().value);
      }
      expect(values).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
    });
  });

  describe('cycle', () => {
    test('cycles through items', () => {
      const gen = cycle(['a', 'b', 'c']);
      const values = [];
      for (let i = 0; i < 7; i++) {
        values.push(gen.next().value);
      }
      expect(values).toEqual(['a', 'b', 'c', 'a', 'b', 'c', 'a']);
    });
  });

  describe('take', () => {
    test('takes n values from generator', () => {
      const gen = counter();
      expect([...take(gen, 5)]).toEqual([0, 1, 2, 3, 4]);
    });

    test('handles generator with fewer values', () => {
      const gen = oneTwoThree();
      expect([...take(gen, 10)]).toEqual([1, 2, 3]);
    });
  });

  describe('map', () => {
    test('maps generator values', () => {
      const gen = range(1, 3);
      expect([...map(gen, x => x * 2)]).toEqual([2, 4, 6]);
    });
  });

  describe('filter', () => {
    test('filters generator values', () => {
      const gen = range(1, 10);
      expect([...filter(gen, x => x % 2 === 0)]).toEqual([2, 4, 6, 8, 10]);
    });
  });

  describe('unique', () => {
    test('yields only unique values', () => {
      function* withDupes() {
        yield 1; yield 2; yield 1; yield 3; yield 2; yield 4;
      }
      expect([...unique(withDupes())]).toEqual([1, 2, 3, 4]);
    });
  });

  describe('flatten', () => {
    test('flattens one level', () => {
      expect([...flatten([[1, 2], [3, 4], [5]])]).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('concat', () => {
    test('concatenates iterables', () => {
      expect([...concat([1, 2], [3, 4], [5])]).toEqual([1, 2, 3, 4, 5]);
    });

    test('uses yield* delegation', () => {
      const src = concat.toString();
      expect(src).toContain('yield*');
    });
  });

  describe('accumulator', () => {
    test('accumulates values passed to next', () => {
      const acc = accumulator();
      acc.next(); // start
      expect(acc.next(5).value).toBe(5);
      expect(acc.next(3).value).toBe(8);
      expect(acc.next(2).value).toBe(10);
    });
  });

  describe('delayedItems', () => {
    test('yields items with delay', async () => {
      const gen = delayedItems([1, 2, 3], 10);
      const values = [];

      const start = Date.now();
      for await (const v of gen) {
        values.push(v);
      }
      const elapsed = Date.now() - start;

      expect(values).toEqual([1, 2, 3]);
      expect(elapsed).toBeGreaterThanOrEqual(25);
    });
  });

  describe('stateMachine', () => {
    test('transitions through states', () => {
      const sm = stateMachine();

      expect(sm.next().value).toBe('idle');
      expect(sm.next('start').value).toBe('running');
      expect(sm.next('pause').value).toBe('paused');
      expect(sm.next('resume').value).toBe('running');
      expect(sm.next('stop').value).toBe('stopped');
      expect(sm.next().done).toBe(true);
    });

    test('ignores invalid transitions', () => {
      const sm = stateMachine();
      sm.next(); // idle
      expect(sm.next('pause').value).toBe('idle'); // invalid from idle
      expect(sm.next('start').value).toBe('running'); // valid
    });
  });

  describe('paginate', () => {
    test('yields all items from all pages', async () => {
      const pages = [
        { data: [1, 2, 3], hasMore: true },
        { data: [4, 5], hasMore: true },
        { data: [6], hasMore: false }
      ];
      let pageNum = 0;
      const fetchPage = async () => pages[pageNum++];

      const gen = paginate(fetchPage);
      const values = [];
      for await (const v of gen) {
        values.push(v);
      }

      expect(values).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

});
