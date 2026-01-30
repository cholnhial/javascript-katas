const {
  createClassWithPrivateData,
  createObjectTracker,
  createWeakCache,
  createEventManager,
  memoizeWithWeakMap,
  createVisitTracker,
  createMetadataStore,
  createBrandCheck,
  createDIContainer,
  explainWeakMapBehavior
} = require('./exercise');

describe('WeakMap and WeakSet Exercises', () => {

  describe('createClassWithPrivateData', () => {
    test('stores and retrieves secret', () => {
      const SecretHolder = createClassWithPrivateData();
      const holder = new SecretHolder('my-secret');

      expect(holder.getSecret()).toBe('my-secret');
    });

    test('secret is not accessible as property', () => {
      const SecretHolder = createClassWithPrivateData();
      const holder = new SecretHolder('my-secret');

      expect(holder.secret).toBeUndefined();
      expect(holder._secret).toBeUndefined();
      expect(Object.keys(holder)).not.toContain('secret');
    });

    test('can update secret', () => {
      const SecretHolder = createClassWithPrivateData();
      const holder = new SecretHolder('old');
      holder.setSecret('new');

      expect(holder.getSecret()).toBe('new');
    });

    test('instances have independent secrets', () => {
      const SecretHolder = createClassWithPrivateData();
      const h1 = new SecretHolder('secret1');
      const h2 = new SecretHolder('secret2');

      expect(h1.getSecret()).toBe('secret1');
      expect(h2.getSecret()).toBe('secret2');
    });
  });

  describe('createObjectTracker', () => {
    test('tracks processed objects', () => {
      const tracker = createObjectTracker();
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };

      expect(tracker.isProcessed(obj1)).toBe(false);
      tracker.process(obj1);
      expect(tracker.isProcessed(obj1)).toBe(true);
      expect(tracker.isProcessed(obj2)).toBe(false);
    });
  });

  describe('createWeakCache', () => {
    test('caches computed values', () => {
      let computeCount = 0;
      const cache = createWeakCache(obj => {
        computeCount++;
        return obj.value * 2;
      });

      const obj = { value: 5 };
      expect(cache(obj)).toBe(10);
      expect(cache(obj)).toBe(10);
      expect(computeCount).toBe(1);
    });

    test('different objects have different cache entries', () => {
      let computeCount = 0;
      const cache = createWeakCache(obj => {
        computeCount++;
        return obj.value;
      });

      cache({ value: 1 });
      cache({ value: 2 });
      expect(computeCount).toBe(2);
    });
  });

  describe('createEventManager', () => {
    test('registers and triggers events', () => {
      const manager = createEventManager();
      const node = { id: 'node1' };
      const results = [];

      manager.addEventListener(node, 'click', data => results.push(data));
      manager.trigger(node, 'click', 'clicked!');

      expect(results).toEqual(['clicked!']);
    });

    test('multiple handlers for same event', () => {
      const manager = createEventManager();
      const node = {};
      const results = [];

      manager.addEventListener(node, 'click', () => results.push(1));
      manager.addEventListener(node, 'click', () => results.push(2));
      manager.trigger(node, 'click');

      expect(results).toEqual([1, 2]);
    });

    test('different nodes are independent', () => {
      const manager = createEventManager();
      const node1 = {};
      const node2 = {};
      const results = [];

      manager.addEventListener(node1, 'click', () => results.push('node1'));
      manager.addEventListener(node2, 'click', () => results.push('node2'));
      manager.trigger(node1, 'click');

      expect(results).toEqual(['node1']);
    });
  });

  describe('memoizeWithWeakMap', () => {
    test('memoizes by object key', () => {
      let callCount = 0;
      const fn = memoizeWithWeakMap(obj => {
        callCount++;
        return obj.x + obj.y;
      });

      const obj = { x: 1, y: 2 };
      expect(fn(obj)).toBe(3);
      expect(fn(obj)).toBe(3);
      expect(callCount).toBe(1);
    });
  });

  describe('createVisitTracker', () => {
    test('tracks visited nodes', () => {
      const tracker = createVisitTracker();
      const node1 = { id: 1 };
      const node2 = { id: 2 };

      expect(tracker.hasVisited(node1)).toBe(false);
      tracker.visit(node1);
      expect(tracker.hasVisited(node1)).toBe(true);
      expect(tracker.hasVisited(node2)).toBe(false);
    });

    test('reset clears visited', () => {
      const tracker = createVisitTracker();
      const node = {};

      tracker.visit(node);
      expect(tracker.hasVisited(node)).toBe(true);

      tracker.reset();
      expect(tracker.hasVisited(node)).toBe(false);
    });
  });

  describe('createMetadataStore', () => {
    test('stores and retrieves metadata', () => {
      const store = createMetadataStore();
      const obj = {};

      store.setMeta(obj, 'created', Date.now());
      store.setMeta(obj, 'author', 'Alice');

      expect(store.getMeta(obj, 'author')).toBe('Alice');
      expect(store.hasMeta(obj, 'created')).toBe(true);
      expect(store.hasMeta(obj, 'missing')).toBe(false);
    });

    test('different objects have independent metadata', () => {
      const store = createMetadataStore();
      const obj1 = {};
      const obj2 = {};

      store.setMeta(obj1, 'name', 'first');
      store.setMeta(obj2, 'name', 'second');

      expect(store.getMeta(obj1, 'name')).toBe('first');
      expect(store.getMeta(obj2, 'name')).toBe('second');
    });
  });

  describe('createBrandCheck', () => {
    test('brands and checks instances', () => {
      function MyClass() {}
      const { brand, isBranded } = createBrandCheck(MyClass);

      const instance = new MyClass();
      expect(isBranded(instance)).toBe(false);

      brand(instance);
      expect(isBranded(instance)).toBe(true);
    });

    test('non-branded objects return false', () => {
      function MyClass() {}
      const { isBranded } = createBrandCheck(MyClass);

      expect(isBranded({})).toBe(false);
      expect(isBranded(new MyClass())).toBe(false);
    });
  });

  describe('createDIContainer', () => {
    test('registers and resolves dependencies', () => {
      const container = createDIContainer();
      const TOKEN = {};

      container.register(TOKEN, () => ({ value: 42 }));
      const instance = container.resolve(TOKEN);

      expect(instance.value).toBe(42);
    });

    test('caches resolved instances', () => {
      const container = createDIContainer();
      const TOKEN = {};
      let createCount = 0;

      container.register(TOKEN, () => {
        createCount++;
        return {};
      });

      const a = container.resolve(TOKEN);
      const b = container.resolve(TOKEN);

      expect(a).toBe(b);
      expect(createCount).toBe(1);
    });
  });

  describe('explainWeakMapBehavior', () => {
    test('provides explanations', () => {
      const explanation = explainWeakMapBehavior();

      expect(explanation.mapBehavior.length).toBeGreaterThan(10);
      expect(explanation.weakMapBehavior.length).toBeGreaterThan(10);
      expect(explanation.useCase.length).toBeGreaterThan(10);
    });
  });

});
