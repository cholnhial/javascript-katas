const {
  createCounter,
  createAccumulator,
  once,
  createHistory,
  createPrivateCounter,
  rateLimit,
  trackCalls,
  createSequence,
  createToggle,
  cacheLastResult
} = require('./exercise');

describe('Closures Exercises', () => {
  
  describe('createCounter', () => {
    test('increments from default start', () => {
      const counter = createCounter();
      expect(counter()).toBe(1);
      expect(counter()).toBe(2);
      expect(counter()).toBe(3);
    });

    test('increments from custom start', () => {
      const counter = createCounter(10);
      expect(counter()).toBe(11);
      expect(counter()).toBe(12);
    });

    test('independent counters', () => {
      const a = createCounter();
      const b = createCounter(100);
      expect(a()).toBe(1);
      expect(b()).toBe(101);
      expect(a()).toBe(2);
      expect(b()).toBe(102);
    });
  });

  describe('createAccumulator', () => {
    test('accumulates values', () => {
      const acc = createAccumulator(10);
      expect(acc(5)).toBe(15);
      expect(acc(3)).toBe(18);
      expect(acc(-8)).toBe(10);
    });

    test('default initial value', () => {
      const acc = createAccumulator();
      expect(acc(5)).toBe(5);
    });
  });

  describe('once', () => {
    test('only executes once', () => {
      let calls = 0;
      const onceFn = once(() => { calls++; return 'result'; });
      
      expect(onceFn()).toBe('result');
      expect(onceFn()).toBe('result');
      expect(onceFn()).toBe('result');
      expect(calls).toBe(1);
    });

    test('passes arguments correctly', () => {
      const onceAdd = once((a, b) => a + b);
      expect(onceAdd(2, 3)).toBe(5);
      expect(onceAdd(10, 20)).toBe(5); // Returns cached result
    });
  });

  describe('createHistory', () => {
    test('tracks history', () => {
      const tracker = createHistory();
      tracker.add('a');
      tracker.add('b');
      tracker.add('c');
      expect(tracker.getHistory()).toEqual(['a', 'b', 'c']);
    });

    test('starts empty', () => {
      const tracker = createHistory();
      expect(tracker.getHistory()).toEqual([]);
    });

    test('independent trackers', () => {
      const t1 = createHistory();
      const t2 = createHistory();
      t1.add(1);
      t2.add(2);
      expect(t1.getHistory()).toEqual([1]);
      expect(t2.getHistory()).toEqual([2]);
    });
  });

  describe('createPrivateCounter', () => {
    test('increment and getValue work', () => {
      const counter = createPrivateCounter(10);
      counter.increment();
      counter.increment();
      expect(counter.getValue()).toBe(12);
    });

    test('decrement works', () => {
      const counter = createPrivateCounter(10);
      counter.decrement();
      expect(counter.getValue()).toBe(9);
    });

    test('default initial value', () => {
      const counter = createPrivateCounter();
      expect(counter.getValue()).toBe(0);
    });
  });

  describe('rateLimit', () => {
    test('allows calls within limit', () => {
      const limited = rateLimit(x => x * 2, 3);
      expect(limited(5)).toBe(10);
      expect(limited(10)).toBe(20);
      expect(limited(15)).toBe(30);
    });

    test('returns undefined after limit', () => {
      const limited = rateLimit(x => x * 2, 2);
      limited(1);
      limited(2);
      expect(limited(3)).toBeUndefined();
      expect(limited(4)).toBeUndefined();
    });
  });

  describe('trackCalls', () => {
    test('tracks call count', () => {
      const tracked = trackCalls(x => x * 2);
      tracked(5);
      tracked(10);
      tracked(15);
      expect(tracked.count).toBe(3);
    });

    test('still returns correct values', () => {
      const tracked = trackCalls(x => x + 1);
      expect(tracked(5)).toBe(6);
      expect(tracked(10)).toBe(11);
    });

    test('starts at zero', () => {
      const tracked = trackCalls(x => x);
      expect(tracked.count).toBe(0);
    });
  });

  describe('createSequence', () => {
    test('returns values in sequence', () => {
      const next = createSequence([1, 2, 3]);
      expect(next()).toBe(1);
      expect(next()).toBe(2);
      expect(next()).toBe(3);
    });

    test('returns undefined when exhausted', () => {
      const next = createSequence(['a']);
      expect(next()).toBe('a');
      expect(next()).toBeUndefined();
      expect(next()).toBeUndefined();
    });

    test('handles empty array', () => {
      const next = createSequence([]);
      expect(next()).toBeUndefined();
    });
  });

  describe('createToggle', () => {
    test('toggles between values', () => {
      const toggle = createToggle('on', 'off');
      expect(toggle()).toBe('on');
      expect(toggle()).toBe('off');
      expect(toggle()).toBe('on');
      expect(toggle()).toBe('off');
    });

    test('works with any types', () => {
      const toggle = createToggle(true, false);
      expect(toggle()).toBe(true);
      expect(toggle()).toBe(false);
    });
  });

  describe('cacheLastResult', () => {
    test('caches result for same argument', () => {
      let calls = 0;
      const cached = cacheLastResult(x => { calls++; return x * 2; });
      
      expect(cached(5)).toBe(10);
      expect(calls).toBe(1);
      
      expect(cached(5)).toBe(10);
      expect(calls).toBe(1); // Still 1, cached
    });

    test('recomputes for different argument', () => {
      let calls = 0;
      const cached = cacheLastResult(x => { calls++; return x * 2; });
      
      cached(5);
      expect(calls).toBe(1);
      
      cached(10);
      expect(calls).toBe(2);
    });

    test('only caches last result', () => {
      let calls = 0;
      const cached = cacheLastResult(x => { calls++; return x; });
      
      cached(1);
      cached(2);
      cached(1);  // Has to recompute, only last (2) was cached
      expect(calls).toBe(3);
    });
  });

});
