const {
  createModuleExports,
  simulateNamedImport,
  simulateReExport,
  createDynamicImporter,
  createLazyModule,
  createModuleNamespace,
  resolveModulePath,
  createCircularDependencyDetector
} = require('./exercise');

describe('createModuleExports', () => {
  test('creates exports with default only', () => {
    const MyClass = class {};
    const result = createModuleExports({ defaultExport: MyClass });
    expect(result.default).toBe(MyClass);
  });

  test('creates exports with named exports only', () => {
    const result = createModuleExports({
      namedExports: { foo: 1, bar: 2 }
    });
    expect(result).toEqual({ foo: 1, bar: 2 });
    expect(result.default).toBeUndefined();
  });

  test('creates exports with both default and named', () => {
    const defaultFn = () => {};
    const helper = () => {};
    const result = createModuleExports({
      defaultExport: defaultFn,
      namedExports: { helper, value: 42 }
    });
    expect(result.default).toBe(defaultFn);
    expect(result.helper).toBe(helper);
    expect(result.value).toBe(42);
  });

  test('handles empty config', () => {
    const result = createModuleExports({});
    expect(result).toEqual({});
  });
});

describe('simulateNamedImport', () => {
  test('imports specified named exports', () => {
    const moduleExports = { foo: 1, bar: 2, baz: 3, default: 'main' };
    const result = simulateNamedImport(moduleExports, ['foo', 'baz']);
    expect(result).toEqual({ foo: 1, baz: 3 });
  });

  test('includes undefined for missing exports', () => {
    const moduleExports = { foo: 1 };
    const result = simulateNamedImport(moduleExports, ['foo', 'missing']);
    expect(result).toEqual({ foo: 1, missing: undefined });
    expect('missing' in result).toBe(true);
  });

  test('returns empty object for empty names array', () => {
    const moduleExports = { foo: 1, bar: 2 };
    const result = simulateNamedImport(moduleExports, []);
    expect(result).toEqual({});
  });

  test('can import default as named', () => {
    const moduleExports = { foo: 1, default: 'main' };
    const result = simulateNamedImport(moduleExports, ['default']);
    expect(result).toEqual({ default: 'main' });
  });
});

describe('simulateReExport', () => {
  test('combines named exports from multiple modules', () => {
    const moduleA = { foo: 1, bar: 2 };
    const moduleB = { baz: 3 };
    const result = simulateReExport([moduleA, moduleB]);
    expect(result).toEqual({ foo: 1, bar: 2, baz: 3 });
  });

  test('later modules override earlier ones', () => {
    const moduleA = { foo: 1, bar: 2 };
    const moduleB = { bar: 'override', baz: 3 };
    const result = simulateReExport([moduleA, moduleB]);
    expect(result).toEqual({ foo: 1, bar: 'override', baz: 3 });
  });

  test('excludes default exports', () => {
    const moduleA = { foo: 1, default: 'A' };
    const moduleB = { bar: 2, default: 'B' };
    const result = simulateReExport([moduleA, moduleB]);
    expect(result).toEqual({ foo: 1, bar: 2 });
    expect(result.default).toBeUndefined();
  });

  test('handles empty array', () => {
    const result = simulateReExport([]);
    expect(result).toEqual({});
  });
});

describe('createDynamicImporter', () => {
  test('returns module exports for valid path', async () => {
    const registry = {
      './utils': { helper: 'fn', default: 'main' }
    };
    const dynamicImport = createDynamicImporter(registry);
    const result = await dynamicImport('./utils');
    expect(result).toEqual({ helper: 'fn', default: 'main' });
  });

  test('rejects with error for missing module', async () => {
    const registry = { './utils': {} };
    const dynamicImport = createDynamicImporter(registry);
    await expect(dynamicImport('./missing')).rejects.toThrow('Module not found: ./missing');
  });

  test('works with multiple modules', async () => {
    const registry = {
      './a': { a: 1 },
      './b': { b: 2 }
    };
    const dynamicImport = createDynamicImporter(registry);
    expect(await dynamicImport('./a')).toEqual({ a: 1 });
    expect(await dynamicImport('./b')).toEqual({ b: 2 });
  });
});

describe('createLazyModule', () => {
  test('loads module on first call', async () => {
    const loader = jest.fn().mockResolvedValue({ value: 42 });
    const lazy = createLazyModule(loader);
    const result = await lazy.load();
    expect(result).toEqual({ value: 42 });
    expect(loader).toHaveBeenCalledTimes(1);
  });

  test('caches result for subsequent calls', async () => {
    const loader = jest.fn().mockResolvedValue({ value: 42 });
    const lazy = createLazyModule(loader);

    await lazy.load();
    await lazy.load();
    await lazy.load();

    expect(loader).toHaveBeenCalledTimes(1);
  });

  test('returns same promise for concurrent calls', async () => {
    const loader = jest.fn().mockResolvedValue({ value: 42 });
    const lazy = createLazyModule(loader);

    const promise1 = lazy.load();
    const promise2 = lazy.load();

    expect(promise1).toBe(promise2);
    await Promise.all([promise1, promise2]);
    expect(loader).toHaveBeenCalledTimes(1);
  });

  test('propagates loader errors', async () => {
    const loader = jest.fn().mockRejectedValue(new Error('Load failed'));
    const lazy = createLazyModule(loader);
    await expect(lazy.load()).rejects.toThrow('Load failed');
  });
});

describe('createModuleNamespace', () => {
  test('includes all named exports', () => {
    const exports = { foo: 1, bar: 2 };
    const ns = createModuleNamespace(exports);
    expect(ns.foo).toBe(1);
    expect(ns.bar).toBe(2);
  });

  test('includes default export', () => {
    const exports = { foo: 1, default: 'main' };
    const ns = createModuleNamespace(exports);
    expect(ns.default).toBe('main');
  });

  test('has Module toStringTag', () => {
    const ns = createModuleNamespace({ foo: 1 });
    expect(ns[Symbol.toStringTag]).toBe('Module');
  });

  test('is frozen', () => {
    const ns = createModuleNamespace({ foo: 1 });
    expect(Object.isFrozen(ns)).toBe(true);
  });

  test('cannot be modified (value unchanged after attempt)', () => {
    const ns = createModuleNamespace({ foo: 1 });
    // In strict mode this throws, in non-strict it silently fails
    // Either way, the value should remain unchanged
    try { ns.foo = 2; } catch (e) { /* expected in strict mode */ }
    try { ns.newProp = 3; } catch (e) { /* expected in strict mode */ }
    expect(ns.foo).toBe(1);
    expect(ns.newProp).toBeUndefined();
  });
});

describe('resolveModulePath', () => {
  test('resolves same directory import', () => {
    const result = resolveModulePath('/src/utils/helper.js', './index');
    expect(result).toBe('/src/utils/index');
  });

  test('resolves parent directory import', () => {
    const result = resolveModulePath('/src/utils/helper.js', '../config');
    expect(result).toBe('/src/config');
  });

  test('resolves multiple parent directories', () => {
    const result = resolveModulePath('/src/deep/nested/file.js', '../../lib/util');
    expect(result).toBe('/src/lib/util');
  });

  test('resolves complex path', () => {
    const result = resolveModulePath('/app/src/components/Button.js', '../hooks/useClick');
    expect(result).toBe('/app/src/hooks/useClick');
  });

  test('handles root level', () => {
    const result = resolveModulePath('/src/index.js', './utils');
    expect(result).toBe('/src/utils');
  });
});

describe('createCircularDependencyDetector', () => {
  test('detects simple circular dependency', () => {
    const graph = {
      './a': ['./b'],
      './b': ['./a']
    };
    const detector = createCircularDependencyDetector(graph);
    expect(detector('./a')).toBe(true);
    expect(detector('./b')).toBe(true);
  });

  test('detects longer circular chain', () => {
    const graph = {
      './a': ['./b'],
      './b': ['./c'],
      './c': ['./a']
    };
    const detector = createCircularDependencyDetector(graph);
    expect(detector('./a')).toBe(true);
  });

  test('returns false for no circular dependency', () => {
    const graph = {
      './a': ['./b'],
      './b': ['./c'],
      './c': []
    };
    const detector = createCircularDependencyDetector(graph);
    expect(detector('./a')).toBe(false);
  });

  test('returns false for module not in graph', () => {
    const graph = {
      './a': ['./b'],
      './b': []
    };
    const detector = createCircularDependencyDetector(graph);
    expect(detector('./missing')).toBe(false);
  });

  test('handles self-reference', () => {
    const graph = {
      './a': ['./a']
    };
    const detector = createCircularDependencyDetector(graph);
    expect(detector('./a')).toBe(true);
  });

  test('handles complex graph with no cycles', () => {
    const graph = {
      './a': ['./b', './c'],
      './b': ['./d'],
      './c': ['./d'],
      './d': []
    };
    const detector = createCircularDependencyDetector(graph);
    expect(detector('./a')).toBe(false);
  });
});
