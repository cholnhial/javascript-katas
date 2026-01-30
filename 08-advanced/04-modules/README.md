# ES Modules - Import/Export Patterns

## Concept

ES Modules are JavaScript's native module system introduced in ES6. They provide a way to organize code into reusable pieces with explicit imports and exports.

```javascript
// Named exports
export const helper = () => {};
export function util() {}

// Default export
export default class MyClass {}

// Importing
import MyClass, { helper, util } from './module';
```

## Java vs JavaScript

```java
// Java - packages and imports
package com.example.utils;

public class Helper {
    public static void doSomething() {}
}

// In another file:
import com.example.utils.Helper;
Helper.doSomething();
```

```javascript
// JavaScript - ES Modules
// utils/helper.js
export function doSomething() {}

// In another file:
import { doSomething } from './utils/helper.js';
doSomething();
```

## Export Patterns

### Named Exports
```javascript
// Inline export
export const PI = 3.14159;
export function square(x) { return x * x; }

// Export list
const a = 1;
const b = 2;
export { a, b };

// Renamed export
export { a as alpha, b as beta };
```

### Default Export
```javascript
// Only one per module
export default class Calculator {}

// Or with declaration
const config = { debug: true };
export default config;

// Or inline
export default function() {}
```

### Re-exports
```javascript
// Re-export everything
export * from './utils';

// Re-export specific items
export { helper, util } from './helpers';

// Re-export with rename
export { default as MyLib } from './library';
```

## Import Patterns

### Named Imports
```javascript
import { foo, bar } from './module';

// With renaming
import { foo as myFoo } from './module';
```

### Default Import
```javascript
import MyClass from './module';

// Combined with named
import MyClass, { helper } from './module';
```

### Namespace Import
```javascript
import * as Utils from './utils';
Utils.helper();
Utils.default;  // If module has default export
```

### Dynamic Import
```javascript
// Returns a Promise
const module = await import('./module.js');

// Conditional loading
if (needsFeature) {
  const { feature } = await import('./feature.js');
}
```

## Common Gotchas

### 1. Imports Are Hoisted
```javascript
// This works! Imports are hoisted
console.log(helper());
import { helper } from './utils';

// But this is bad style - always put imports at top
```

### 2. Imports Are Read-Only
```javascript
import { count } from './counter';

count = 5;  // TypeError: Assignment to constant variable

// Export a setter function instead
import { count, setCount } from './counter';
setCount(5);  // OK
```

### 3. Live Bindings (Not Copies)
```javascript
// counter.js
export let count = 0;
export function increment() { count++; }

// main.js
import { count, increment } from './counter';
console.log(count);  // 0
increment();
console.log(count);  // 1 (it's a live binding!)
```

### 4. Default vs Named Export Confusion
```javascript
// WRONG - trying to destructure default export
import { default } from './module';  // SyntaxError

// RIGHT
import myDefault from './module';
// Or
import { default as myDefault } from './module';
```

### 5. File Extensions
```javascript
// Browser requires extensions
import { foo } from './utils.js';  // Required in browsers

// Node.js depends on package.json "type" field
// "type": "module" -> use .js or .mjs
// "type": "commonjs" -> use .mjs for ESM
```

### 6. Circular Dependencies
```javascript
// a.js
import { b } from './b';
export const a = 'a' + b;

// b.js
import { a } from './a';
export const b = 'b' + a;

// Can lead to undefined values during initialization
// Solution: restructure or use functions
```

### 7. Top-Level Await
```javascript
// Only works in modules (not regular scripts)
const data = await fetchData();  // OK in ES modules

// Blocks importing module until resolved
```

## CommonJS vs ES Modules

| Feature | CommonJS | ES Modules |
|---------|----------|------------|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Asynchronous |
| Binding | Copy of value | Live binding |
| Parsing | Runtime | Static (compile time) |
| Node.js | Default (until type: module) | Requires .mjs or type: module |
| Browser | Requires bundler | Native support |

```javascript
// CommonJS
const { helper } = require('./utils');
module.exports = { myFunc };

// ES Modules
import { helper } from './utils';
export { myFunc };
```

## Real-World Use Cases

### 1. Lazy Loading Routes
```javascript
const routes = {
  '/dashboard': () => import('./pages/Dashboard'),
  '/settings': () => import('./pages/Settings'),
};

async function navigate(path) {
  const module = await routes[path]();
  renderPage(module.default);
}
```

### 2. Feature Flags
```javascript
async function loadFeature(featureName) {
  try {
    const module = await import(`./features/${featureName}.js`);
    return module.default;
  } catch {
    return null;  // Feature not available
  }
}
```

### 3. Plugin Systems
```javascript
async function loadPlugins(pluginPaths) {
  const plugins = await Promise.all(
    pluginPaths.map(path => import(path))
  );
  return plugins.map(p => p.default);
}
```

### 4. Tree-Shaking Friendly Exports
```javascript
// Good - allows tree shaking
export function helper1() {}
export function helper2() {}

// Less optimal - harder to tree shake
export default {
  helper1() {},
  helper2() {}
};
```

### 5. Barrel Files
```javascript
// components/index.js
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';

// Usage
import { Button, Input } from './components';
```

## MDN Documentation

- [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [Dynamic import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)

## Exercise

Open `exercise.js` and implement the functions. Run tests with:
```bash
npm run test:kata modules
```
