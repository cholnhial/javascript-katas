# WeakMap and WeakSet - Weak References

## Concept

`WeakMap` and `WeakSet` hold "weak" references to objects. Unlike `Map` and `Set`, they don't prevent garbage collection of their keys. When an object key has no other references, it's automatically removed.

```javascript
let obj = { data: 'important' };
const weakMap = new WeakMap();
weakMap.set(obj, 'metadata');

weakMap.get(obj);  // 'metadata'

obj = null;  // Object can now be garbage collected
// WeakMap entry is automatically removed
```

## Java vs JavaScript

```java
// Java - WeakHashMap
Map<Object, String> weakMap = new WeakHashMap<>();
Object key = new Object();
weakMap.put(key, "value");
key = null;
// Entry removed after GC
```

```javascript
// JavaScript - WeakMap
const weakMap = new WeakMap();
let key = {};
weakMap.set(key, "value");
key = null;
// Entry removed after GC
```

## WeakMap vs Map

| Feature | Map | WeakMap |
|---------|-----|---------|
| Key types | Any value | Objects only |
| Enumerable | Yes (`keys()`, `values()`) | No |
| Size property | Yes | No |
| Prevents GC of keys | Yes | No |

```javascript
const map = new Map();
const weakMap = new WeakMap();

let obj = {};

map.set(obj, 'value');
weakMap.set(obj, 'value');

obj = null;

// map still has the entry (memory leak potential)
// weakMap entry will be garbage collected
```

## WeakSet vs Set

| Feature | Set | WeakSet |
|---------|-----|---------|
| Value types | Any value | Objects only |
| Enumerable | Yes | No |
| Size property | Yes | No |
| Prevents GC | Yes | No |

## Common Gotchas

### 1. Only Objects as Keys
```javascript
const wm = new WeakMap();

wm.set({}, 'ok');           // OK
wm.set(Symbol('s'), 'ok');  // OK (ES2023+)
wm.set('string', 'fail');   // TypeError!
wm.set(123, 'fail');        // TypeError!
```

### 2. Not Iterable
```javascript
const wm = new WeakMap();
wm.set({}, 1);

wm.keys();     // undefined (doesn't exist!)
wm.values();   // undefined
wm.entries();  // undefined
wm.forEach();  // undefined

// No way to iterate - this is by design
```

### 3. No Size Property
```javascript
const wm = new WeakMap();
wm.set({}, 1);
wm.set({}, 2);

wm.size;  // undefined
// Cannot know how many entries (they come and go with GC)
```

### 4. Checking for Existence
```javascript
const wm = new WeakMap();
const obj = {};

wm.has(obj);  // false
wm.set(obj, 'value');
wm.has(obj);  // true
wm.delete(obj);
wm.has(obj);  // false
```

## Use Cases

### Private Data Storage
```javascript
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password });
  }

  checkPassword(input) {
    return privateData.get(this).password === input;
  }
}

const user = new User('Alice', 'secret123');
user.name;           // 'Alice' (public)
user.password;       // undefined (private!)
user.checkPassword('secret123');  // true
```

### Caching Without Memory Leaks
```javascript
const cache = new WeakMap();

function expensiveOperation(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const result = /* expensive computation */;
  cache.set(obj, result);
  return result;
}

// When obj is no longer referenced elsewhere,
// cache entry is automatically cleaned up
```

### Tracking Object State
```javascript
const visited = new WeakSet();

function processNode(node) {
  if (visited.has(node)) {
    return;  // Already processed
  }

  visited.add(node);
  // Process node...

  for (const child of node.children) {
    processNode(child);
  }
}
// No memory leak: visited nodes can be GC'd when tree is discarded
```

### Metadata Storage
```javascript
const metadata = new WeakMap();

function addTimestamp(obj) {
  metadata.set(obj, {
    created: Date.now(),
    modified: Date.now()
  });
}

function touch(obj) {
  const meta = metadata.get(obj);
  if (meta) {
    meta.modified = Date.now();
  }
}
```

### Branding / Type Checking
```javascript
const branded = new WeakSet();

class MyClass {
  constructor() {
    branded.add(this);
  }

  static isInstance(obj) {
    return branded.has(obj);
  }
}

MyClass.isInstance(new MyClass());  // true
MyClass.isInstance({});             // false
```

## When to Use

**Use WeakMap/WeakSet when:**
- Associating data with objects you don't control
- You want automatic cleanup when objects are gone
- You don't need to enumerate entries
- Memory management is important

**Use Map/Set when:**
- You need primitive keys
- You need to iterate over entries
- You need to know the size
- You want entries to persist regardless of key references

## MDN Documentation

- [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata weakmap-weakset
```
