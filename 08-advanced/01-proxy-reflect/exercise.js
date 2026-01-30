/**
 * Proxy and Reflect Exercises
 *
 * Proxies let you intercept and customize object operations.
 * Reflect provides methods for interceptable operations.
 * Coming from Java: similar to dynamic proxies / AOP.
 */

/**
 * Create a proxy that logs all property access
 * @param {object} target
 * @returns {Proxy}
 */
function createLoggingProxy(target) {
  const log = [];
  const proxy = new Proxy(target, {
    // Your code here - log property gets
    // Push { type: 'get', property: key } to log array
  });
  proxy._log = log;
  return proxy;
}

/**
 * Create a proxy that makes an object read-only
 * @param {object} target
 * @returns {Proxy}
 */
function createReadOnlyProxy(target) {
  // Your code here - throw on set/delete
}

/**
 * Create a proxy with default values for missing properties
 * @param {object} target
 * @param {any} defaultValue
 * @returns {Proxy}
 */
function createDefaultProxy(target, defaultValue) {
  // Your code here - return defaultValue for missing properties
}

/**
 * Create a proxy that validates property values before setting
 * @param {object} target
 * @param {object} validators - { propertyName: (value) => boolean }
 * @returns {Proxy}
 */
function createValidatingProxy(target, validators) {
  // Your code here - throw if validator returns false
}

/**
 * Create a proxy that tracks property changes
 * @param {object} target
 * @returns {Proxy} - with _changes array of { property, oldValue, newValue }
 */
function createChangeTrackingProxy(target) {
  const changes = [];
  const proxy = new Proxy(target, {
    // Your code here - record changes
  });
  proxy._changes = changes;
  return proxy;
}

/**
 * Create a proxy that makes negative array indices work (like Python)
 * arr[-1] returns last element, arr[-2] returns second to last, etc.
 * @param {any[]} arr
 * @returns {Proxy}
 */
function createNegativeIndexProxy(arr) {
  // Your code here
}

/**
 * Create a proxy that auto-creates nested objects on access
 * obj.a.b.c = 1 should work even if a and b don't exist
 * @returns {Proxy}
 */
function createAutoVivificationProxy() {
  // Your code here
}

/**
 * Create a proxy that hides certain properties
 * @param {object} target
 * @param {string[]} hiddenProps
 * @returns {Proxy}
 */
function createPrivateProxy(target, hiddenProps) {
  // Your code here - hide properties from get, set, has, ownKeys
}

/**
 * Create a revocable proxy
 * @param {object} target
 * @returns {{ proxy: Proxy, revoke: Function }}
 */
function createRevocableProxy(target) {
  // Your code here - use Proxy.revocable
  // After revoke(), any operation should throw
}

/**
 * Create a proxy-based observable object
 * @param {object} target
 * @param {Function} callback - called on any change with (property, value)
 * @returns {Proxy}
 */
function createObservableProxy(target, callback) {
  // Your code here - call callback when properties change
}

/**
 * Create a memoizing proxy for a function
 * @param {Function} fn
 * @returns {Proxy}
 */
function createMemoizingProxy(fn) {
  // Your code here - use apply trap to memoize results
}

/**
 * Use Reflect to safely get a nested property
 * @param {object} obj
 * @param {string} path - like "a.b.c"
 * @returns {any} value or undefined if path doesn't exist
 */
function getNestedProperty(obj, path) {
  // Your code here - use Reflect.get
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
