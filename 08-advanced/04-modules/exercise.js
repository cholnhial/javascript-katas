/**
 * ES Modules - Import/Export Patterns
 *
 * These exercises focus on understanding module patterns
 * and dynamic imports in JavaScript.
 */

// ============================================================================
// EXERCISE 1: createModuleExports
// ============================================================================
// Create a function that returns an object simulating what a module would export.
// Given a config object, return the appropriate exports structure.
//
// Config has:
// - defaultExport: value for default export (optional)
// - namedExports: object with named exports (optional)
//
// Return an object with:
// - default: the default export value (if provided)
// - ...all named exports spread in
//
// Example:
// createModuleExports({ defaultExport: MyClass, namedExports: { helper, util } })
// => { default: MyClass, helper: [function], util: [function] }
//
// createModuleExports({ namedExports: { foo: 1, bar: 2 } })
// => { foo: 1, bar: 2 }

function createModuleExports(config) {
  // Your code here
}

// ============================================================================
// EXERCISE 2: simulateNamedImport
// ============================================================================
// Simulate destructuring named imports from a module exports object.
// Given a module exports object and an array of names to import,
// return an object with only those named exports.
//
// Example:
// const moduleExports = { foo: 1, bar: 2, baz: 3, default: 'main' };
// simulateNamedImport(moduleExports, ['foo', 'baz'])
// => { foo: 1, baz: 3 }
//
// If a name doesn't exist, it should be undefined in the result.
// simulateNamedImport({ foo: 1 }, ['foo', 'missing'])
// => { foo: 1, missing: undefined }

function simulateNamedImport(moduleExports, names) {
  // Your code here
}

// ============================================================================
// EXERCISE 3: simulateReExport
// ============================================================================
// Simulate re-exporting from multiple modules.
// This is like: export { foo } from './moduleA'; export { bar } from './moduleB';
//
// Given an array of module export objects, combine all their named exports
// (excluding 'default') into a single object.
// If there are conflicts, later modules override earlier ones.
//
// Example:
// const moduleA = { foo: 1, bar: 2, default: 'A' };
// const moduleB = { baz: 3, bar: 'override', default: 'B' };
// simulateReExport([moduleA, moduleB])
// => { foo: 1, bar: 'override', baz: 3 }

function simulateReExport(modules) {
  // Your code here
}

// ============================================================================
// EXERCISE 4: createDynamicImporter
// ============================================================================
// Create a function that simulates dynamic import behavior.
// Given a "module registry" (object mapping paths to module exports),
// return an async function that "imports" modules by path.
//
// The returned function should:
// - Return a Promise that resolves to the module exports
// - Reject with Error "Module not found: <path>" if path doesn't exist
//
// Example:
// const registry = {
//   './utils': { helper: fn, default: mainFn },
//   './config': { PORT: 3000 }
// };
// const dynamicImport = createDynamicImporter(registry);
// await dynamicImport('./utils') => { helper: fn, default: mainFn }
// await dynamicImport('./missing') => throws "Module not found: ./missing"

function createDynamicImporter(moduleRegistry) {
  // Your code here
}

// ============================================================================
// EXERCISE 5: createLazyModule
// ============================================================================
// Create a lazy-loading module wrapper.
// Given a loader function (async function that returns module exports),
// return an object with a 'load' method that:
// - Calls the loader only once (on first load call)
// - Caches and returns the same promise for subsequent calls
// - Returns a promise that resolves to the module exports
//
// Example:
// let loadCount = 0;
// const loader = async () => { loadCount++; return { value: 42 }; };
// const lazy = createLazyModule(loader);
//
// await lazy.load() => { value: 42 }
// await lazy.load() => { value: 42 } (same result, loader not called again)
// loadCount => 1

function createLazyModule(loader) {
  // Your code here
}

// ============================================================================
// EXERCISE 6: createModuleNamespace
// ============================================================================
// Create a module namespace object (like: import * as ns from './module').
// Given module exports, create a namespace object that:
// - Has all named exports as properties
// - Has a Symbol.toStringTag property set to 'Module'
// - Is frozen (Object.isFrozen returns true)
//
// Note: 'default' should be included as a regular property if present.
//
// Example:
// const exports = { foo: 1, bar: 2, default: 'main' };
// const ns = createModuleNamespace(exports);
// ns.foo => 1
// ns.default => 'main'
// Object.isFrozen(ns) => true
// ns[Symbol.toStringTag] => 'Module'

function createModuleNamespace(moduleExports) {
  // Your code here
}

// ============================================================================
// EXERCISE 7: resolveModulePath
// ============================================================================
// Resolve a relative module path from a base path.
// Implement basic path resolution for ES module imports.
//
// Rules:
// - './' means same directory
// - '../' means parent directory
// - Normalize the path (remove redundant segments)
// - Base path is always a file path, import is relative to its directory
//
// Example:
// resolveModulePath('/src/utils/helper.js', './index')
// => '/src/utils/index'
//
// resolveModulePath('/src/utils/helper.js', '../config')
// => '/src/config'
//
// resolveModulePath('/src/deep/nested/file.js', '../../lib/util')
// => '/src/lib/util'

function resolveModulePath(basePath, importPath) {
  // Your code here
}

// ============================================================================
// EXERCISE 8: createCircularDependencyDetector
// ============================================================================
// Create a function that detects circular dependencies in a module graph.
// Given a dependency graph (object mapping module paths to arrays of dependencies),
// return a function that checks if importing a module would cause a circular dependency.
//
// Example:
// const graph = {
//   './a': ['./b'],
//   './b': ['./c'],
//   './c': ['./a']  // circular: a -> b -> c -> a
// };
// const detector = createCircularDependencyDetector(graph);
// detector('./a') => true (circular)
// detector('./d') => false (not in graph, no dependencies)
//
// const graph2 = {
//   './a': ['./b'],
//   './b': ['./c'],
//   './c': []
// };
// const detector2 = createCircularDependencyDetector(graph2);
// detector2('./a') => false (no circular dependency)

function createCircularDependencyDetector(dependencyGraph) {
  // Your code here
}

module.exports = {
  createModuleExports,
  simulateNamedImport,
  simulateReExport,
  createDynamicImporter,
  createLazyModule,
  createModuleNamespace,
  resolveModulePath,
  createCircularDependencyDetector
};
