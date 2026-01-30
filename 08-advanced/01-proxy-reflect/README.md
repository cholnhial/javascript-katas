# Proxy and Reflect - Metaprogramming

## Concept

`Proxy` lets you intercept and customize fundamental operations on objects (get, set, delete, etc.). `Reflect` provides methods for those same operations with consistent behavior.

```javascript
const target = { name: 'Alice' };

const proxy = new Proxy(target, {
  get(target, property) {
    console.log(`Getting ${property}`);
    return target[property];
  }
});

proxy.name;  // Logs "Getting name", returns "Alice"
```

## Java vs JavaScript

```java
// Java - Dynamic Proxy
Object proxy = Proxy.newProxyInstance(
    loader,
    interfaces,
    (proxy, method, args) -> {
        System.out.println("Method: " + method.getName());
        return method.invoke(target, args);
    }
);
```

```javascript
// JavaScript - Proxy
const proxy = new Proxy(target, {
  get(target, prop, receiver) {
    console.log(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
});
```

## Proxy Traps

| Trap | Intercepts |
|------|------------|
| `get` | Property access: `obj.prop` |
| `set` | Property assignment: `obj.prop = value` |
| `has` | `in` operator: `prop in obj` |
| `deleteProperty` | `delete obj.prop` |
| `apply` | Function call: `fn()` |
| `construct` | `new` operator: `new Fn()` |
| `ownKeys` | `Object.keys()`, `for...in` |
| `getOwnPropertyDescriptor` | `Object.getOwnPropertyDescriptor()` |

## Common Patterns

### Validation
```javascript
const validated = new Proxy({}, {
  set(target, prop, value) {
    if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new Error('Age must be a positive number');
    }
    target[prop] = value;
    return true;
  }
});

validated.age = 25;   // OK
validated.age = -5;   // Error!
validated.age = 'old'; // Error!
```

### Default Values
```javascript
const withDefaults = new Proxy({}, {
  get(target, prop) {
    return prop in target ? target[prop] : 'default';
  }
});

withDefaults.missing;  // "default"
```

### Logging/Debugging
```javascript
function createLogger(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      console.log(`GET ${prop}`);
      return target[prop];
    },
    set(target, prop, value) {
      console.log(`SET ${prop} = ${value}`);
      target[prop] = value;
      return true;
    }
  });
}
```

### Negative Array Indices
```javascript
const pythonArray = new Proxy([1, 2, 3], {
  get(target, prop) {
    const index = Number(prop);
    if (index < 0) {
      return target[target.length + index];
    }
    return target[prop];
  }
});

pythonArray[-1];  // 3
pythonArray[-2];  // 2
```

## Using Reflect

`Reflect` provides standard ways to perform object operations:

```javascript
// Instead of:
target[prop];
target[prop] = value;
prop in target;
delete target[prop];

// Use Reflect:
Reflect.get(target, prop);
Reflect.set(target, prop, value);
Reflect.has(target, prop);
Reflect.deleteProperty(target, prop);
```

### Why Reflect?
```javascript
const proxy = new Proxy(target, {
  get(target, prop, receiver) {
    // Reflect preserves proper 'this' binding
    return Reflect.get(target, prop, receiver);
  }
});
```

## Common Gotchas

### 1. Must Return true from set
```javascript
// WRONG - causes TypeError in strict mode
set(target, prop, value) {
  target[prop] = value;
  // Missing return true!
}

// RIGHT
set(target, prop, value) {
  target[prop] = value;
  return true;
}
```

### 2. Proxy Target vs Proxy
```javascript
const target = { x: 1 };
const proxy = new Proxy(target, {});

proxy.x = 2;
target.x;  // 2 (target is modified!)

// Operations on proxy affect target
```

### 3. Private Fields Don't Work Through Proxies
```javascript
class Secret {
  #value = 42;
  getValue() { return this.#value; }
}

const proxy = new Proxy(new Secret(), {});
proxy.getValue();  // TypeError: Cannot read private member
```

### 4. Revocable Proxies
```javascript
const { proxy, revoke } = Proxy.revocable(target, {});
proxy.x;  // Works
revoke();
proxy.x;  // TypeError: proxy has been revoked
```

## Real-World Use Cases

1. **Vue.js Reactivity**
   ```javascript
   function reactive(obj) {
     return new Proxy(obj, {
       set(target, prop, value) {
         target[prop] = value;
         triggerUpdate(prop);
         return true;
       }
     });
   }
   ```

2. **API Mocking**
   ```javascript
   const api = new Proxy({}, {
     get(_, endpoint) {
       return (...args) => fetch(`/api/${endpoint}`, ...args);
     }
   });
   api.users();  // fetch('/api/users')
   ```

3. **Type Checking**
   ```javascript
   function typed(schema) {
     return new Proxy({}, {
       set(target, prop, value) {
         if (!schema[prop]?.(value)) {
           throw new TypeError(`Invalid type for ${prop}`);
         }
         target[prop] = value;
         return true;
       }
     });
   }
   ```

## MDN Documentation

- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [handler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata proxy-reflect
```
