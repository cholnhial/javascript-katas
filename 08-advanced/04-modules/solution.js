/**
 * ES Modules - Import/Export Patterns
 * SOLUTIONS
 */

function createModuleExports(config) {
  const result = {};

  if (config.defaultExport !== undefined) {
    result.default = config.defaultExport;
  }

  if (config.namedExports) {
    Object.assign(result, config.namedExports);
  }

  return result;
}

function simulateNamedImport(moduleExports, names) {
  const result = {};
  for (const name of names) {
    result[name] = moduleExports[name];
  }
  return result;
}

function simulateReExport(modules) {
  const result = {};
  for (const mod of modules) {
    for (const [key, value] of Object.entries(mod)) {
      if (key !== 'default') {
        result[key] = value;
      }
    }
  }
  return result;
}

function createDynamicImporter(moduleRegistry) {
  return async function(path) {
    if (!(path in moduleRegistry)) {
      throw new Error(`Module not found: ${path}`);
    }
    return moduleRegistry[path];
  };
}

function createLazyModule(loader) {
  let cachedPromise = null;

  return {
    load() {
      if (!cachedPromise) {
        cachedPromise = loader();
      }
      return cachedPromise;
    }
  };
}

function createModuleNamespace(moduleExports) {
  const ns = {
    ...moduleExports,
    [Symbol.toStringTag]: 'Module'
  };
  return Object.freeze(ns);
}

function resolveModulePath(basePath, importPath) {
  // Get the directory of the base file
  const baseDir = basePath.substring(0, basePath.lastIndexOf('/'));

  // Split the import path into segments
  const segments = importPath.split('/');

  // Start with base directory segments
  const resultSegments = baseDir.split('/').filter(s => s !== '');

  for (const segment of segments) {
    if (segment === '.') {
      // Current directory, do nothing
      continue;
    } else if (segment === '..') {
      // Parent directory, pop last segment
      resultSegments.pop();
    } else {
      // Regular segment, add to path
      resultSegments.push(segment);
    }
  }

  return '/' + resultSegments.join('/');
}

function createCircularDependencyDetector(dependencyGraph) {
  return function(startModule) {
    if (!(startModule in dependencyGraph)) {
      return false;
    }

    const visited = new Set();
    const recursionStack = new Set();

    function hasCycle(module) {
      if (recursionStack.has(module)) {
        return true;
      }
      if (visited.has(module)) {
        return false;
      }

      visited.add(module);
      recursionStack.add(module);

      const dependencies = dependencyGraph[module] || [];
      for (const dep of dependencies) {
        if (hasCycle(dep)) {
          return true;
        }
      }

      recursionStack.delete(module);
      return false;
    }

    return hasCycle(startModule);
  };
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
