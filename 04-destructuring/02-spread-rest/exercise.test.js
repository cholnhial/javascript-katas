const {
  mergeArrays,
  cloneArray,
  surroundArray,
  mergeObjects,
  updateObject,
  removeProperty,
  sum,
  separateFirst,
  callWithArray,
  deepMerge,
  partial,
  flatten,
  toArray,
  fromEntries
} = require('./exercise');

describe('Spread & Rest Exercises', () => {

  describe('mergeArrays', () => {
    test('merges two arrays', () => {
      expect(mergeArrays([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
    });

    test('handles empty arrays', () => {
      expect(mergeArrays([], [1, 2])).toEqual([1, 2]);
      expect(mergeArrays([1, 2], [])).toEqual([1, 2]);
    });
  });

  describe('cloneArray', () => {
    test('creates a copy', () => {
      const original = [1, 2, 3];
      const copy = cloneArray(original);
      expect(copy).toEqual([1, 2, 3]);
      expect(copy).not.toBe(original);
    });
  });

  describe('surroundArray', () => {
    test('adds elements to beginning and end', () => {
      expect(surroundArray([2, 3], 1, 4)).toEqual([1, 2, 3, 4]);
    });

    test('does not mutate original', () => {
      const original = [2, 3];
      surroundArray(original, 1, 4);
      expect(original).toEqual([2, 3]);
    });
  });

  describe('mergeObjects', () => {
    test('merges two objects', () => {
      expect(mergeObjects({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    test('second overwrites first', () => {
      expect(mergeObjects({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });
  });

  describe('updateObject', () => {
    test('clones and updates', () => {
      const original = { name: 'Alice', age: 30 };
      const updated = updateObject(original, { age: 31 });

      expect(updated).toEqual({ name: 'Alice', age: 31 });
      expect(original.age).toBe(30);
    });

    test('can add new properties', () => {
      expect(updateObject({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });
  });

  describe('removeProperty', () => {
    test('removes specified property', () => {
      const result = removeProperty({ a: 1, b: 2, c: 3 }, 'b');
      expect(result).toEqual({ a: 1, c: 3 });
    });

    test('does not mutate original', () => {
      const original = { a: 1, b: 2 };
      removeProperty(original, 'b');
      expect(original).toEqual({ a: 1, b: 2 });
    });
  });

  describe('sum', () => {
    test('sums all arguments', () => {
      expect(sum(1, 2, 3, 4)).toBe(10);
    });

    test('handles single argument', () => {
      expect(sum(5)).toBe(5);
    });

    test('handles no arguments', () => {
      expect(sum()).toBe(0);
    });
  });

  describe('separateFirst', () => {
    test('separates first from rest', () => {
      expect(separateFirst(1, 2, 3, 4)).toEqual({ first: 1, rest: [2, 3, 4] });
    });

    test('handles single argument', () => {
      expect(separateFirst('only')).toEqual({ first: 'only', rest: [] });
    });
  });

  describe('callWithArray', () => {
    test('calls function with array elements as args', () => {
      const add = (a, b, c) => a + b + c;
      expect(callWithArray(add, [1, 2, 3])).toBe(6);
    });

    test('works with Math.max', () => {
      expect(callWithArray(Math.max, [1, 5, 3])).toBe(5);
    });
  });

  describe('deepMerge', () => {
    test('merges nested objects', () => {
      const target = { a: 1, nested: { x: 1 } };
      const source = { b: 2, nested: { y: 2 } };
      expect(deepMerge(target, source)).toEqual({
        a: 1,
        b: 2,
        nested: { x: 1, y: 2 }
      });
    });

    test('overwrites primitives', () => {
      expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });

    test('replaces arrays', () => {
      expect(deepMerge({ arr: [1, 2] }, { arr: [3, 4] })).toEqual({ arr: [3, 4] });
    });

    test('handles deeply nested objects', () => {
      const target = { a: { b: { c: 1 } } };
      const source = { a: { b: { d: 2 } } };
      expect(deepMerge(target, source)).toEqual({
        a: { b: { c: 1, d: 2 } }
      });
    });
  });

  describe('partial', () => {
    test('prepends arguments', () => {
      const greet = (greeting, name) => `${greeting}, ${name}!`;
      const sayHello = partial(greet, 'Hello');
      expect(sayHello('World')).toBe('Hello, World!');
    });

    test('works with multiple prepended args', () => {
      const add = (a, b, c) => a + b + c;
      const add5 = partial(add, 2, 3);
      expect(add5(4)).toBe(9);
    });
  });

  describe('flatten', () => {
    test('flattens one level', () => {
      expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
    });

    test('handles empty arrays', () => {
      expect(flatten([[], [1], []])).toEqual([1]);
    });
  });

  describe('toArray', () => {
    test('converts array-like to array', () => {
      const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
      expect(toArray(arrayLike)).toEqual(['a', 'b', 'c']);
    });

    test('works with string', () => {
      expect(toArray('abc')).toEqual(['a', 'b', 'c']);
    });
  });

  describe('fromEntries', () => {
    test('creates object from entries', () => {
      expect(fromEntries([['a', 1], ['b', 2]])).toEqual({ a: 1, b: 2 });
    });

    test('handles empty array', () => {
      expect(fromEntries([])).toEqual({});
    });
  });

});
