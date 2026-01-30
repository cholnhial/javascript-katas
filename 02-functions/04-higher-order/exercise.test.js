const {
  negate,
  times,
  withLogging,
  retry,
  debounce,
  throttle,
  after,
  before,
  withDefault,
  mapArgs
} = require('./exercise');

describe('Higher-Order Functions Exercises', () => {
  
  describe('negate', () => {
    test('negates predicate result', () => {
      const isEven = n => n % 2 === 0;
      const isOdd = negate(isEven);
      expect(isOdd(3)).toBe(true);
      expect(isOdd(4)).toBe(false);
    });

    test('works with multiple arguments', () => {
      const isGreater = (a, b) => a > b;
      const isNotGreater = negate(isGreater);
      expect(isNotGreater(5, 3)).toBe(false);
      expect(isNotGreater(3, 5)).toBe(true);
    });
  });

  describe('times', () => {
    test('calls function n times', () => {
      const results = [];
      times(3, i => results.push(i));
      expect(results).toEqual([0, 1, 2]);
    });

    test('handles zero', () => {
      let called = false;
      times(0, () => { called = true; });
      expect(called).toBe(false);
    });
  });

  describe('withLogging', () => {
    test('logs arguments and result', () => {
      const logs = [];
      const logger = (...args) => logs.push(args);
      
      const add = (a, b) => a + b;
      const logged = withLogging(add, logger);
      
      const result = logged(2, 3);
      
      expect(result).toBe(5);
      expect(logs.length).toBeGreaterThan(0);
    });

    test('passes through return value', () => {
      const logged = withLogging(x => x * 2, () => {});
      expect(logged(5)).toBe(10);
    });
  });

  describe('retry', () => {
    test('succeeds on first try', async () => {
      let attempts = 0;
      const fn = async () => { attempts++; return 'success'; };
      
      const result = await retry(fn, 3)();
      
      expect(result).toBe('success');
      expect(attempts).toBe(1);
    });

    test('retries on failure', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };
      
      const result = await retry(fn, 3)();
      
      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });

    test('throws after max retries', async () => {
      const fn = async () => { throw new Error('always fails'); };
      
      await expect(retry(fn, 3)()).rejects.toThrow('always fails');
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    test('delays execution', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);
      
      debounced();
      expect(fn).not.toHaveBeenCalled();
      
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('resets delay on subsequent calls', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);
      
      debounced();
      jest.advanceTimersByTime(50);
      debounced();  // Reset timer
      jest.advanceTimersByTime(50);
      expect(fn).not.toHaveBeenCalled();
      
      jest.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('passes latest arguments', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);
      
      debounced('a');
      debounced('b');
      debounced('c');
      
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledWith('c');
    });
  });

  describe('throttle', () => {
    jest.useFakeTimers();

    test('executes first call immediately', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);
      
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('ignores calls within delay', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);
      
      throttled();
      throttled();
      throttled();
      
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('allows call after delay', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);
      
      throttled();
      jest.advanceTimersByTime(100);
      throttled();
      
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('after', () => {
    test('only executes after n calls', () => {
      const fn = jest.fn(() => 'result');
      const afterThree = after(3, fn);
      
      expect(afterThree()).toBeUndefined();
      expect(afterThree()).toBeUndefined();
      expect(afterThree()).toBe('result');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('continues to execute after threshold', () => {
      const fn = jest.fn(() => 'result');
      const afterTwo = after(2, fn);
      
      afterTwo();
      afterTwo();
      afterTwo();
      afterTwo();
      
      expect(fn).toHaveBeenCalledTimes(3);
    });
  });

  describe('before', () => {
    test('only executes first n times', () => {
      const fn = jest.fn(x => x * 2);
      const firstTwo = before(2, fn);
      
      expect(firstTwo(1)).toBe(2);
      expect(firstTwo(2)).toBe(4);
      expect(firstTwo(3)).toBe(4);  // Returns last result
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('returns last result on subsequent calls', () => {
      const fn = jest.fn(x => x);
      const once = before(1, fn);
      
      expect(once('first')).toBe('first');
      expect(once('second')).toBe('first');
      expect(once('third')).toBe('first');
    });
  });

  describe('withDefault', () => {
    test('returns result on success', () => {
      const safeParse = withDefault(JSON.parse, {});
      expect(safeParse('{"a":1}')).toEqual({ a: 1 });
    });

    test('returns default on error', () => {
      const safeParse = withDefault(JSON.parse, { error: true });
      expect(safeParse('invalid json')).toEqual({ error: true });
    });

    test('works with different default types', () => {
      const safeNum = withDefault(parseInt, 0);
      expect(safeNum('not a number')).toBe(0);
    });
  });

  describe('mapArgs', () => {
    test('transforms arguments', () => {
      const add = (a, b) => a + b;
      const addDoubled = mapArgs(add, x => x * 2);
      expect(addDoubled(2, 3)).toBe(10);  // (2*2) + (3*2)
    });

    test('works with strings', () => {
      const concat = (a, b) => a + b;
      const concatUpper = mapArgs(concat, s => s.toUpperCase());
      expect(concatUpper('hello', 'world')).toBe('HELLOWORLD');
    });

    test('handles single argument', () => {
      const double = x => x * 2;
      const quadruple = mapArgs(double, x => x * 2);
      expect(quadruple(5)).toBe(20);  // double(5*2) = double(10) = 20
    });
  });

});
