/**
 * WeakMap and WeakSet Solutions
 */

function createClassWithPrivateData() {
  const privateData = new WeakMap();

  return class SecretHolder {
    constructor(secret) {
      privateData.set(this, { secret });
    }

    getSecret() {
      return privateData.get(this).secret;
    }

    setSecret(newSecret) {
      privateData.get(this).secret = newSecret;
    }
  };
}

function createObjectTracker() {
  const processed = new WeakSet();

  return {
    process(obj) {
      processed.add(obj);
    },
    isProcessed(obj) {
      return processed.has(obj);
    }
  };
}

function createWeakCache(compute) {
  const cache = new WeakMap();

  return function(obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = compute(obj);
    cache.set(obj, result);
    return result;
  };
}

function createEventManager() {
  const nodeEvents = new WeakMap();

  return {
    addEventListener(node, event, handler) {
      if (!nodeEvents.has(node)) {
        nodeEvents.set(node, new Map());
      }
      const events = nodeEvents.get(node);
      if (!events.has(event)) {
        events.set(event, []);
      }
      events.get(event).push(handler);
    },
    trigger(node, event, data) {
      const events = nodeEvents.get(node);
      if (!events) return;
      const handlers = events.get(event);
      if (!handlers) return;
      handlers.forEach(handler => handler(data));
    }
  };
}

function memoizeWithWeakMap(fn) {
  const cache = new WeakMap();

  return function(obj, ...args) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = fn(obj, ...args);
    cache.set(obj, result);
    return result;
  };
}

function createVisitTracker() {
  let visited = new WeakSet();

  return {
    visit(node) {
      visited.add(node);
    },
    hasVisited(node) {
      return visited.has(node);
    },
    reset() {
      visited = new WeakSet();
    }
  };
}

function createMetadataStore() {
  const store = new WeakMap();

  return {
    setMeta(obj, key, value) {
      if (!store.has(obj)) {
        store.set(obj, {});
      }
      store.get(obj)[key] = value;
    },
    getMeta(obj, key) {
      const meta = store.get(obj);
      return meta ? meta[key] : undefined;
    },
    hasMeta(obj, key) {
      const meta = store.get(obj);
      return meta ? key in meta : false;
    }
  };
}

function createBrandCheck(Constructor) {
  const branded = new WeakSet();

  return {
    brand(instance) {
      branded.add(instance);
    },
    isBranded(obj) {
      return branded.has(obj);
    }
  };
}

function createDIContainer() {
  const factories = new WeakMap();
  const instances = new WeakMap();

  return {
    register(token, factory) {
      factories.set(token, factory);
    },
    resolve(token) {
      if (instances.has(token)) {
        return instances.get(token);
      }
      const factory = factories.get(token);
      if (!factory) {
        throw new Error('No factory registered for token');
      }
      const instance = factory();
      instances.set(token, instance);
      return instance;
    }
  };
}

function explainWeakMapBehavior() {
  return {
    mapBehavior: 'With Map, even if the key object is set to null, the Map still holds a reference to it, preventing garbage collection. The entry remains in the Map.',
    weakMapBehavior: 'With WeakMap, when the key object is set to null and no other references exist, the object can be garbage collected. The WeakMap entry is automatically removed.',
    useCase: 'Use WeakMap when you want to associate data with objects without preventing those objects from being garbage collected. Common uses: private data storage, caching computed values, and tracking objects without memory leaks.'
  };
}

module.exports = {
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
};
