const {
  promiseAll,
  promiseRace,
  promiseAllSettled,
  promiseAny,
  fetchAll,
  withTimeout,
  pooled,
  firstN
} = require('./exercise');

describe('Promise.all/race Exercises', () => {

  describe('promiseAll', () => {
    test('resolves with all values', async () => {
      const result = await promiseAll([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
      ]);
      expect(result).toEqual([1, 2, 3]);
    });

    test('maintains order', async () => {
      const result = await promiseAll([
        new Promise(r => setTimeout(() => r('slow'), 50)),
        Promise.resolve('fast'),
        new Promise(r => setTimeout(() => r('medium'), 20))
      ]);
      expect(result).toEqual(['slow', 'fast', 'medium']);
    });

    test('rejects if any promise rejects', async () => {
      await expect(promiseAll([
        Promise.resolve(1),
        Promise.reject(new Error('failed')),
        Promise.resolve(3)
      ])).rejects.toThrow('failed');
    });

    test('handles empty array', async () => {
      const result = await promiseAll([]);
      expect(result).toEqual([]);
    });
  });

  describe('promiseRace', () => {
    test('resolves with fastest', async () => {
      const result = await promiseRace([
        new Promise(r => setTimeout(() => r('slow'), 100)),
        new Promise(r => setTimeout(() => r('fast'), 10))
      ]);
      expect(result).toBe('fast');
    });

    test('rejects if fastest rejects', async () => {
      await expect(promiseRace([
        new Promise(r => setTimeout(() => r('slow'), 100)),
        new Promise((_, rej) => setTimeout(() => rej(new Error('fast fail')), 10))
      ])).rejects.toThrow('fast fail');
    });
  });

  describe('promiseAllSettled', () => {
    test('returns status for all promises', async () => {
      const result = await promiseAllSettled([
        Promise.resolve(1),
        Promise.reject('error'),
        Promise.resolve(3)
      ]);

      expect(result).toEqual([
        { status: 'fulfilled', value: 1 },
        { status: 'rejected', reason: 'error' },
        { status: 'fulfilled', value: 3 }
      ]);
    });

    test('never rejects', async () => {
      const result = await promiseAllSettled([
        Promise.reject('error1'),
        Promise.reject('error2')
      ]);

      expect(result).toEqual([
        { status: 'rejected', reason: 'error1' },
        { status: 'rejected', reason: 'error2' }
      ]);
    });

    test('handles empty array', async () => {
      const result = await promiseAllSettled([]);
      expect(result).toEqual([]);
    });
  });

  describe('promiseAny', () => {
    test('resolves with first fulfilled', async () => {
      const result = await promiseAny([
        new Promise((_, rej) => setTimeout(() => rej('fail'), 10)),
        new Promise(r => setTimeout(() => r('success'), 50)),
        Promise.reject('immediate fail')
      ]);
      expect(result).toBe('success');
    });

    test('resolves with fastest success', async () => {
      const result = await promiseAny([
        new Promise(r => setTimeout(() => r('slow'), 100)),
        new Promise(r => setTimeout(() => r('fast'), 10))
      ]);
      expect(result).toBe('fast');
    });

    test('rejects with AggregateError if all reject', async () => {
      await expect(promiseAny([
        Promise.reject('error1'),
        Promise.reject('error2')
      ])).rejects.toBeInstanceOf(AggregateError);
    });
  });

  describe('fetchAll', () => {
    test('fetches all URLs', async () => {
      const fetchFn = url => Promise.resolve(`data:${url}`);
      const result = await fetchAll(['a', 'b', 'c'], fetchFn);

      expect(result).toEqual({
        'a': 'data:a',
        'b': 'data:b',
        'c': 'data:c'
      });
    });

    test('handles errors gracefully', async () => {
      const fetchFn = url => {
        if (url === 'b') return Promise.reject(new Error('failed'));
        return Promise.resolve(`data:${url}`);
      };
      const result = await fetchAll(['a', 'b', 'c'], fetchFn);

      expect(result['a']).toBe('data:a');
      expect(result['b']).toContain('failed');
      expect(result['c']).toBe('data:c');
    });
  });

  describe('withTimeout', () => {
    test('resolves if promise is fast enough', async () => {
      const result = await withTimeout(
        new Promise(r => setTimeout(() => r('done'), 10)),
        100
      );
      expect(result).toBe('done');
    });

    test('rejects on timeout', async () => {
      await expect(withTimeout(
        new Promise(r => setTimeout(() => r('done'), 100)),
        10
      )).rejects.toThrow('Timeout');
    });

    test('propagates promise rejection', async () => {
      await expect(withTimeout(
        Promise.reject(new Error('failed')),
        100
      )).rejects.toThrow('failed');
    });
  });

  describe('pooled', () => {
    test('respects concurrency limit', async () => {
      let concurrent = 0;
      let maxConcurrent = 0;

      const tasks = Array(5).fill(null).map((_, i) => () => {
        concurrent++;
        maxConcurrent = Math.max(maxConcurrent, concurrent);
        return new Promise(r => setTimeout(() => {
          concurrent--;
          r(i);
        }, 20));
      });

      await pooled(tasks, 2);
      expect(maxConcurrent).toBe(2);
    });

    test('returns results in order', async () => {
      const tasks = [
        () => new Promise(r => setTimeout(() => r('a'), 30)),
        () => new Promise(r => setTimeout(() => r('b'), 10)),
        () => new Promise(r => setTimeout(() => r('c'), 20))
      ];

      const result = await pooled(tasks, 2);
      expect(result).toEqual(['a', 'b', 'c']);
    });

    test('handles empty array', async () => {
      const result = await pooled([], 2);
      expect(result).toEqual([]);
    });
  });

  describe('firstN', () => {
    test('returns first N resolved values', async () => {
      const result = await firstN([
        new Promise(r => setTimeout(() => r('slow'), 100)),
        new Promise(r => setTimeout(() => r('fast'), 10)),
        new Promise(r => setTimeout(() => r('medium'), 50))
      ], 2);

      expect(result).toHaveLength(2);
      expect(result).toContain('fast');
      expect(result).toContain('medium');
      expect(result).not.toContain('slow');
    });

    test('ignores rejections while collecting', async () => {
      const result = await firstN([
        Promise.reject('fail'),
        new Promise(r => setTimeout(() => r('a'), 20)),
        new Promise(r => setTimeout(() => r('b'), 10))
      ], 2);

      expect(result).toEqual(['b', 'a']);
    });
  });

});
