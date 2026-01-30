const {
  createLoggingProxy,
  createReadOnlyProxy,
  createDefaultProxy,
  createValidatingProxy,
  createChangeTrackingProxy,
  createNegativeIndexProxy,
  createAutoVivificationProxy,
  createPrivateProxy,
  createRevocableProxy,
  createObservableProxy,
  createMemoizingProxy,
  getNestedProperty
} = require('./exercise');

describe('Proxy and Reflect Exercises', () => {

  describe('createLoggingProxy', () => {
    test('logs property access', () => {
      const proxy = createLoggingProxy({ a: 1, b: 2 });
      proxy.a;
      proxy.b;
      proxy.a;

      expect(proxy._log).toEqual([
        { type: 'get', property: 'a' },
        { type: 'get', property: 'b' },
        { type: 'get', property: 'a' }
      ]);
    });
  });

  describe('createReadOnlyProxy', () => {
    test('allows reading', () => {
      const proxy = createReadOnlyProxy({ x: 10 });
      expect(proxy.x).toBe(10);
    });

    test('throws on write', () => {
      const proxy = createReadOnlyProxy({ x: 10 });
      expect(() => { proxy.x = 20; }).toThrow();
    });

    test('throws on delete', () => {
      const proxy = createReadOnlyProxy({ x: 10 });
      expect(() => { delete proxy.x; }).toThrow();
    });
  });

  describe('createDefaultProxy', () => {
    test('returns existing values', () => {
      const proxy = createDefaultProxy({ a: 1 }, 'default');
      expect(proxy.a).toBe(1);
    });

    test('returns default for missing', () => {
      const proxy = createDefaultProxy({ a: 1 }, 'default');
      expect(proxy.missing).toBe('default');
    });
  });

  describe('createValidatingProxy', () => {
    test('allows valid values', () => {
      const proxy = createValidatingProxy({}, {
        age: v => typeof v === 'number' && v >= 0
      });
      proxy.age = 25;
      expect(proxy.age).toBe(25);
    });

    test('throws on invalid values', () => {
      const proxy = createValidatingProxy({}, {
        age: v => typeof v === 'number' && v >= 0
      });
      expect(() => { proxy.age = -5; }).toThrow();
      expect(() => { proxy.age = 'old'; }).toThrow();
    });

    test('allows properties without validators', () => {
      const proxy = createValidatingProxy({}, { age: v => v >= 0 });
      proxy.name = 'Alice';
      expect(proxy.name).toBe('Alice');
    });
  });

  describe('createChangeTrackingProxy', () => {
    test('tracks changes', () => {
      const proxy = createChangeTrackingProxy({ x: 1 });
      proxy.x = 2;
      proxy.x = 3;
      proxy.y = 10;

      expect(proxy._changes).toEqual([
        { property: 'x', oldValue: 1, newValue: 2 },
        { property: 'x', oldValue: 2, newValue: 3 },
        { property: 'y', oldValue: undefined, newValue: 10 }
      ]);
    });
  });

  describe('createNegativeIndexProxy', () => {
    test('positive indices work normally', () => {
      const proxy = createNegativeIndexProxy([1, 2, 3, 4, 5]);
      expect(proxy[0]).toBe(1);
      expect(proxy[2]).toBe(3);
    });

    test('negative indices count from end', () => {
      const proxy = createNegativeIndexProxy([1, 2, 3, 4, 5]);
      expect(proxy[-1]).toBe(5);
      expect(proxy[-2]).toBe(4);
      expect(proxy[-5]).toBe(1);
    });

    test('setting with negative index works', () => {
      const proxy = createNegativeIndexProxy([1, 2, 3]);
      proxy[-1] = 10;
      expect(proxy[2]).toBe(10);
    });
  });

  describe('createAutoVivificationProxy', () => {
    test('auto-creates nested objects', () => {
      const proxy = createAutoVivificationProxy();
      proxy.a.b.c = 1;
      expect(proxy.a.b.c).toBe(1);
    });

    test('works with deep nesting', () => {
      const proxy = createAutoVivificationProxy();
      proxy.x.y.z.w.v = 'deep';
      expect(proxy.x.y.z.w.v).toBe('deep');
    });
  });

  describe('createPrivateProxy', () => {
    test('hides specified properties from get', () => {
      const proxy = createPrivateProxy({ a: 1, _secret: 42 }, ['_secret']);
      expect(proxy.a).toBe(1);
      expect(proxy._secret).toBeUndefined();
    });

    test('hides from has (in operator)', () => {
      const proxy = createPrivateProxy({ _secret: 42 }, ['_secret']);
      expect('_secret' in proxy).toBe(false);
    });

    test('hides from Object.keys', () => {
      const proxy = createPrivateProxy({ a: 1, _secret: 42 }, ['_secret']);
      expect(Object.keys(proxy)).toEqual(['a']);
    });
  });

  describe('createRevocableProxy', () => {
    test('proxy works before revoke', () => {
      const { proxy, revoke } = createRevocableProxy({ x: 1 });
      expect(proxy.x).toBe(1);
    });

    test('throws after revoke', () => {
      const { proxy, revoke } = createRevocableProxy({ x: 1 });
      revoke();
      expect(() => proxy.x).toThrow();
    });
  });

  describe('createObservableProxy', () => {
    test('calls callback on change', () => {
      const calls = [];
      const proxy = createObservableProxy({}, (prop, val) => calls.push([prop, val]));

      proxy.a = 1;
      proxy.b = 2;

      expect(calls).toEqual([['a', 1], ['b', 2]]);
    });
  });

  describe('createMemoizingProxy', () => {
    test('memoizes function calls', () => {
      let callCount = 0;
      const fn = (x) => { callCount++; return x * 2; };
      const proxy = createMemoizingProxy(fn);

      expect(proxy(5)).toBe(10);
      expect(proxy(5)).toBe(10);
      expect(proxy(3)).toBe(6);

      expect(callCount).toBe(2);
    });
  });

  describe('getNestedProperty', () => {
    test('gets nested value', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(getNestedProperty(obj, 'a.b.c')).toBe(42);
    });

    test('returns undefined for missing path', () => {
      const obj = { a: { b: 1 } };
      expect(getNestedProperty(obj, 'a.x.y')).toBeUndefined();
    });

    test('handles top-level properties', () => {
      expect(getNestedProperty({ x: 5 }, 'x')).toBe(5);
    });
  });

});
