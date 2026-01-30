const {
  getPostCount,
  getUserData,
  getCompanyAddress,
  processAll,
  processSequential,
  asyncFilter,
  asyncReduce,
  sleep,
  retryWithBackoff,
  withAsyncTimeout
} = require('./exercise');

describe('Async/Await Exercises', () => {

  describe('getPostCount', () => {
    test('fetches user then posts count', async () => {
      const fetchUser = jest.fn().mockResolvedValue({ id: 1, name: 'John' });
      const fetchPosts = jest.fn().mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]);

      const count = await getPostCount(fetchUser, fetchPosts, 1);

      expect(count).toBe(3);
      expect(fetchUser).toHaveBeenCalledWith(1);
      expect(fetchPosts).toHaveBeenCalledWith(1);
    });
  });

  describe('getUserData', () => {
    test('fetches profile and settings in parallel', async () => {
      const order = [];
      const fetchProfile = jest.fn().mockImplementation(async () => {
        order.push('profile-start');
        await new Promise(r => setTimeout(r, 20));
        order.push('profile-end');
        return { name: 'John' };
      });
      const fetchSettings = jest.fn().mockImplementation(async () => {
        order.push('settings-start');
        await new Promise(r => setTimeout(r, 10));
        order.push('settings-end');
        return { theme: 'dark' };
      });

      const result = await getUserData(fetchProfile, fetchSettings, 1);

      expect(result).toEqual({
        profile: { name: 'John' },
        settings: { theme: 'dark' }
      });
      // Both should start before either ends (parallel)
      expect(order.indexOf('settings-start')).toBeLessThan(order.indexOf('profile-end'));
    });
  });

  describe('getCompanyAddress', () => {
    test('chains sequential fetches', async () => {
      const fetchUser = jest.fn().mockResolvedValue({ companyId: 100 });
      const fetchCompany = jest.fn().mockResolvedValue({ addressId: 200 });
      const fetchAddress = jest.fn().mockResolvedValue({ city: 'NYC' });

      const address = await getCompanyAddress(fetchUser, fetchCompany, fetchAddress, 1);

      expect(address).toEqual({ city: 'NYC' });
      expect(fetchUser).toHaveBeenCalledWith(1);
      expect(fetchCompany).toHaveBeenCalledWith(100);
      expect(fetchAddress).toHaveBeenCalledWith(200);
    });
  });

  describe('processAll', () => {
    test('processes all items in parallel', async () => {
      const processItem = jest.fn().mockImplementation(async x => x * 2);

      const results = await processAll([1, 2, 3], processItem);

      expect(results).toEqual([2, 4, 6]);
    });

    test('runs in parallel', async () => {
      let concurrent = 0;
      let maxConcurrent = 0;

      const processItem = async (x) => {
        concurrent++;
        maxConcurrent = Math.max(maxConcurrent, concurrent);
        await new Promise(r => setTimeout(r, 20));
        concurrent--;
        return x;
      };

      await processAll([1, 2, 3, 4], processItem);
      expect(maxConcurrent).toBe(4);
    });
  });

  describe('processSequential', () => {
    test('processes items in order', async () => {
      const order = [];
      const processItem = async (x) => {
        order.push(`start-${x}`);
        await new Promise(r => setTimeout(r, 10));
        order.push(`end-${x}`);
        return x * 2;
      };

      const results = await processSequential([1, 2, 3], processItem);

      expect(results).toEqual([2, 4, 6]);
      expect(order).toEqual([
        'start-1', 'end-1',
        'start-2', 'end-2',
        'start-3', 'end-3'
      ]);
    });
  });

  describe('asyncFilter', () => {
    test('filters with async predicate', async () => {
      const isEven = async n => n % 2 === 0;

      const result = await asyncFilter([1, 2, 3, 4, 5], isEven);

      expect(result).toEqual([2, 4]);
    });

    test('preserves order', async () => {
      const predicate = async n => {
        await new Promise(r => setTimeout(r, Math.random() * 20));
        return n > 2;
      };

      const result = await asyncFilter([1, 2, 3, 4, 5], predicate);
      expect(result).toEqual([3, 4, 5]);
    });
  });

  describe('asyncReduce', () => {
    test('reduces with async reducer', async () => {
      const sum = async (acc, n) => acc + n;

      const result = await asyncReduce([1, 2, 3, 4], sum, 0);

      expect(result).toBe(10);
    });

    test('processes sequentially', async () => {
      const order = [];
      const reducer = async (acc, n) => {
        order.push(n);
        await new Promise(r => setTimeout(r, 10));
        return acc + n;
      };

      await asyncReduce([1, 2, 3], reducer, 0);
      expect(order).toEqual([1, 2, 3]);
    });
  });

  describe('sleep', () => {
    test('delays for specified time', async () => {
      const start = Date.now();
      await sleep(50);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(45);
    });

    test('returns promise', () => {
      const result = sleep(10);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('retryWithBackoff', () => {
    test('returns on success', async () => {
      const fn = jest.fn().mockResolvedValue('success');

      const result = await retryWithBackoff(fn, 3, 10);

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('retries with increasing delays', async () => {
      let attempts = 0;
      const timestamps = [];

      const fn = async () => {
        timestamps.push(Date.now());
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };

      const result = await retryWithBackoff(fn, 5, 20);

      expect(result).toBe('success');
      expect(attempts).toBe(3);

      // Check delays increased (approximately)
      const delay1 = timestamps[1] - timestamps[0];
      const delay2 = timestamps[2] - timestamps[1];
      expect(delay2).toBeGreaterThan(delay1);
    });

    test('throws after max retries', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('always fails'));

      await expect(retryWithBackoff(fn, 3, 10)).rejects.toThrow('always fails');
      expect(fn).toHaveBeenCalledTimes(3);
    });
  });

  describe('withAsyncTimeout', () => {
    test('returns result if fast enough', async () => {
      const fn = async () => {
        await new Promise(r => setTimeout(r, 10));
        return 'done';
      };

      const result = await withAsyncTimeout(fn, 100);
      expect(result).toBe('done');
    });

    test('throws on timeout', async () => {
      const fn = async () => {
        await new Promise(r => setTimeout(r, 100));
        return 'done';
      };

      await expect(withAsyncTimeout(fn, 20)).rejects.toThrow('Timeout');
    });
  });

});
