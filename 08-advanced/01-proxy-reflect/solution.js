/**
 * Proxy and Reflect Solutions
 */

function createLoggingProxy(target) {
  const log = [];
  const proxy = new Proxy(target, {
    get(target, property, receiver) {
      if (property === '_log') return log;
      log.push({ type: 'get', property });
      return Reflect.get(target, property, receiver);
    }
  });
  return proxy;
}

function createReadOnlyProxy(target) {
  return new Proxy(target, {
    set() {
      throw new Error('Cannot modify read-only object');
    },
    deleteProperty() {
      throw new Error('Cannot delete from read-only object');
    }
  });
}

function createDefaultProxy(target, defaultValue) {
  return new Proxy(target, {
    get(target, property, receiver) {
      if (property in target) {
        return Reflect.get(target, property, receiver);
      }
      return defaultValue;
    }
  });
}

function createValidatingProxy(target, validators) {
  return new Proxy(target, {
    set(target, property, value, receiver) {
      if (property in validators) {
        if (!validators[property](value)) {
          throw new Error(`Invalid value for ${property}`);
        }
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}

function createChangeTrackingProxy(target) {
  const changes = [];
  const proxy = new Proxy(target, {
    set(target, property, value, receiver) {
      if (property === '_changes') {
        return Reflect.set(target, property, value, receiver);
      }
      const oldValue = target[property];
      changes.push({ property, oldValue, newValue: value });
      return Reflect.set(target, property, value, receiver);
    },
    get(target, property, receiver) {
      if (property === '_changes') return changes;
      return Reflect.get(target, property, receiver);
    }
  });
  return proxy;
}

function createNegativeIndexProxy(arr) {
  return new Proxy(arr, {
    get(target, property, receiver) {
      const index = Number(property);
      if (Number.isInteger(index) && index < 0) {
        return target[target.length + index];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      const index = Number(property);
      if (Number.isInteger(index) && index < 0) {
        target[target.length + index] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}

function createAutoVivificationProxy() {
  const handler = {
    get(target, property, receiver) {
      if (!(property in target)) {
        target[property] = new Proxy({}, handler);
      }
      return Reflect.get(target, property, receiver);
    }
  };
  return new Proxy({}, handler);
}

function createPrivateProxy(target, hiddenProps) {
  const hidden = new Set(hiddenProps);
  return new Proxy(target, {
    get(target, property, receiver) {
      if (hidden.has(property)) return undefined;
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (hidden.has(property)) return false;
      return Reflect.set(target, property, value, receiver);
    },
    has(target, property) {
      if (hidden.has(property)) return false;
      return Reflect.has(target, property);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter(key => !hidden.has(key));
    }
  });
}

function createRevocableProxy(target) {
  return Proxy.revocable(target, {});
}

function createObservableProxy(target, callback) {
  return new Proxy(target, {
    set(target, property, value, receiver) {
      const result = Reflect.set(target, property, value, receiver);
      callback(property, value);
      return result;
    }
  });
}

function createMemoizingProxy(fn) {
  const cache = new Map();
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = Reflect.apply(target, thisArg, args);
      cache.set(key, result);
      return result;
    }
  });
}

function getNestedProperty(obj, path) {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current == null || typeof current !== 'object') {
      return undefined;
    }
    current = Reflect.get(current, key);
  }

  return current;
}

module.exports = {
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
};
