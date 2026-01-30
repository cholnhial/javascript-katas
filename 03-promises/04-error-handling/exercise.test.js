const {
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
} = require('./exercise');

describe('Promise Error Handling Exercises', () => {

  describe('safeFetch', () => {
    test('returns result on success', async () => {
      const result = await safeFetch(() => Promise.resolve('data'), 'default');
      expect(result).toBe('data');
    });

    test('returns default on error', async () => {
      const result = await safeFetch(() => Promise.reject(new Error('fail')), 'default');
      expect(result).toBe('default');
    });
  });

  describe('wrapError', () => {
    test('adds context to error message', async () => {
      await expect(
        wrapError(
          () => Promise.reject(new Error('network error')),
          'fetching user'
        )
      ).rejects.toThrow('fetching user: network error');
    });

    test('passes through on success', async () => {
      const result = await wrapError(() => Promise.resolve('data'), 'context');
      expect(result).toBe('data');
    });
  });

  describe('withCleanup', () => {
    test('runs cleanup on success', async () => {
      let cleaned = false;
      const result = await withCleanup(
        () => Promise.resolve('done'),
        () => { cleaned = true; }
      );
      expect(result).toBe('done');
      expect(cleaned).toBe(true);
    });

    test('runs cleanup on error', async () => {
      let cleaned = false;
      await expect(
        withCleanup(
          () => Promise.reject(new Error('fail')),
          () => { cleaned = true; }
        )
      ).rejects.toThrow('fail');
      expect(cleaned).toBe(true);
    });
  });

  describe('catchType', () => {
    class NetworkError extends Error {}
    class ValidationError extends Error {}

    test('catches specific error type', async () => {
      const result = await catchType(
        () => { throw new NetworkError('offline'); },
        NetworkError,
        () => 'handled'
      );
      expect(result).toBe('handled');
    });

    test('rethrows non-matching errors', async () => {
      await expect(
        catchType(
          () => { throw new ValidationError('invalid'); },
          NetworkError,
          () => 'handled'
        )
      ).rejects.toThrow('invalid');
    });

    test('passes handler the error', async () => {
      const result = await catchType(
        () => { throw new NetworkError('offline'); },
        NetworkError,
        (e) => `caught: ${e.message}`
      );
      expect(result).toBe('caught: offline');
    });
  });

  describe('validateResult', () => {
    test('returns result if valid', async () => {
      const result = await validateResult(
        () => Promise.resolve(10),
        n => n > 0,
        'Must be positive'
      );
      expect(result).toBe(10);
    });

    test('throws if invalid', async () => {
      await expect(
        validateResult(
          () => Promise.resolve(-1),
          n => n >= 0,
          'Must be non-negative'
        )
      ).rejects.toThrow('Must be non-negative');
    });
  });

  describe('collectErrors', () => {
    test('collects results and errors', async () => {
      const { results, errors } = await collectErrors([
        () => Promise.resolve(1),
        () => Promise.reject(new Error('fail')),
        () => Promise.resolve(3)
      ]);

      expect(results[0]).toBe(1);
      expect(results[1]).toBeUndefined();
      expect(results[2]).toBe(3);
      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe('fail');
    });

    test('handles all successes', async () => {
      const { results, errors } = await collectErrors([
        () => Promise.resolve(1),
        () => Promise.resolve(2)
      ]);

      expect(results).toEqual([1, 2]);
      expect(errors).toHaveLength(0);
    });

    test('handles all failures', async () => {
      const { results, errors } = await collectErrors([
        () => Promise.reject(new Error('a')),
        () => Promise.reject(new Error('b'))
      ]);

      expect(results).toEqual([undefined, undefined]);
      expect(errors).toHaveLength(2);
    });
  });

  describe('circuitBreaker', () => {
    test('allows calls below threshold', async () => {
      let calls = 0;
      const fn = async () => { calls++; throw new Error('fail'); };
      const breaker = circuitBreaker(fn, 3);

      await expect(breaker()).rejects.toThrow('fail');
      await expect(breaker()).rejects.toThrow('fail');
      expect(calls).toBe(2);
    });

    test('opens circuit after threshold', async () => {
      let calls = 0;
      const fn = async () => { calls++; throw new Error('fail'); };
      const breaker = circuitBreaker(fn, 2);

      await expect(breaker()).rejects.toThrow('fail');
      await expect(breaker()).rejects.toThrow('fail');
      await expect(breaker()).rejects.toThrow(/circuit|open/i);

      expect(calls).toBe(2); // Third call didn't invoke fn
    });

    test('resets on success', async () => {
      let calls = 0;
      let shouldFail = true;
      const fn = async () => {
        calls++;
        if (shouldFail) throw new Error('fail');
        return 'success';
      };
      const breaker = circuitBreaker(fn, 3);

      await expect(breaker()).rejects.toThrow('fail');
      shouldFail = false;
      const result = await breaker();
      expect(result).toBe('success');

      // After success, should be able to fail again without circuit opening
      shouldFail = true;
      await expect(breaker()).rejects.toThrow('fail');
      expect(calls).toBe(3);
    });
  });

  describe('fallbackChain', () => {
    test('returns first success', async () => {
      const result = await fallbackChain([
        () => Promise.reject('fail1'),
        () => Promise.resolve('success'),
        () => Promise.resolve('never reached')
      ]);
      expect(result).toBe('success');
    });

    test('tries until success', async () => {
      let attempts = 0;
      const result = await fallbackChain([
        () => { attempts++; return Promise.reject('a'); },
        () => { attempts++; return Promise.reject('b'); },
        () => { attempts++; return Promise.resolve('c'); }
      ]);
      expect(result).toBe('c');
      expect(attempts).toBe(3);
    });

    test('throws if all fail', async () => {
      await expect(
        fallbackChain([
          () => Promise.reject(new Error('a')),
          () => Promise.reject(new Error('b'))
        ])
      ).rejects.toThrow();
    });
  });

  describe('transformError', () => {
    class ApiError extends Error {}
    class DbError extends Error {}

    test('transforms matching error', async () => {
      await expect(
        transformError(
          () => { throw new ApiError('404'); },
          new Map([[ApiError, e => new Error(`API: ${e.message}`)]])
        )
      ).rejects.toThrow('API: 404');
    });

    test('leaves non-matching errors unchanged', async () => {
      await expect(
        transformError(
          () => { throw new DbError('connection'); },
          new Map([[ApiError, e => new Error(`API: ${e.message}`)]])
        )
      ).rejects.toThrow('connection');
    });

    test('passes through success', async () => {
      const result = await transformError(
        () => Promise.resolve('data'),
        new Map()
      );
      expect(result).toBe('data');
    });
  });

  describe('using', () => {
    test('acquires, uses, and releases', async () => {
      const log = [];
      const result = await using(
        async () => { log.push('acquire'); return { id: 1 }; },
        async (r) => { log.push('use'); return r.id * 2; },
        async () => { log.push('release'); }
      );

      expect(result).toBe(2);
      expect(log).toEqual(['acquire', 'use', 'release']);
    });

    test('releases on error in use', async () => {
      let released = false;
      await expect(
        using(
          async () => ({ id: 1 }),
          async () => { throw new Error('use failed'); },
          async () => { released = true; }
        )
      ).rejects.toThrow('use failed');
      expect(released).toBe(true);
    });

    test('passes resource to release', async () => {
      let releasedResource;
      await using(
        async () => ({ id: 42 }),
        async (r) => r.id,
        async (r) => { releasedResource = r; }
      );
      expect(releasedResource).toEqual({ id: 42 });
    });
  });

});
