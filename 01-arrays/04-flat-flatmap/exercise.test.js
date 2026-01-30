const {
  flattenOneLevel,
  flattenToDepth,
  flattenDeep,
  splitAndFlatten,
  getAllTags,
  duplicateElements,
  doubleEvens,
  cartesianProduct,
  compactAndFlatten,
  expandRanges
} = require('./exercise');

describe('Array.flat() & flatMap() Exercises', () => {
  
  describe('flattenOneLevel', () => {
    test('flattens one level', () => {
      expect(flattenOneLevel([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
    });

    test('does not flatten deeper', () => {
      expect(flattenOneLevel([[1, [2, 3]], [4]])).toEqual([1, [2, 3], 4]);
    });

    test('handles empty array', () => {
      expect(flattenOneLevel([])).toEqual([]);
    });

    test('handles mixed content', () => {
      expect(flattenOneLevel([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
    });
  });

  describe('flattenToDepth', () => {
    test('flattens to specified depth', () => {
      expect(flattenToDepth([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
    });

    test('handles depth 0', () => {
      expect(flattenToDepth([[1], [2]], 0)).toEqual([[1], [2]]);
    });

    test('handles depth 1', () => {
      expect(flattenToDepth([1, [2, [3]]], 1)).toEqual([1, 2, [3]]);
    });
  });

  describe('flattenDeep', () => {
    test('completely flattens', () => {
      expect(flattenDeep([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
    });

    test('handles already flat', () => {
      expect(flattenDeep([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('handles empty nested', () => {
      expect(flattenDeep([[], [[], [1]]])).toEqual([1]);
    });
  });

  describe('splitAndFlatten', () => {
    test('splits and flattens sentences', () => {
      expect(splitAndFlatten(['hello world', 'foo bar']))
        .toEqual(['hello', 'world', 'foo', 'bar']);
    });

    test('handles single words', () => {
      expect(splitAndFlatten(['one', 'two'])).toEqual(['one', 'two']);
    });

    test('handles empty array', () => {
      expect(splitAndFlatten([])).toEqual([]);
    });
  });

  describe('getAllTags', () => {
    test('extracts all tags', () => {
      const posts = [
        { title: 'A', tags: ['js', 'web'] },
        { title: 'B', tags: ['python'] },
        { title: 'C', tags: ['js', 'node'] }
      ];
      expect(getAllTags(posts)).toEqual(['js', 'web', 'python', 'js', 'node']);
    });

    test('handles empty tags', () => {
      const posts = [{ tags: [] }, { tags: ['a'] }];
      expect(getAllTags(posts)).toEqual(['a']);
    });
  });

  describe('duplicateElements', () => {
    test('duplicates each element', () => {
      expect(duplicateElements([1, 2, 3])).toEqual([1, 1, 2, 2, 3, 3]);
    });

    test('handles strings', () => {
      expect(duplicateElements(['a', 'b'])).toEqual(['a', 'a', 'b', 'b']);
    });

    test('handles empty array', () => {
      expect(duplicateElements([])).toEqual([]);
    });
  });

  describe('doubleEvens', () => {
    test('doubles only even numbers', () => {
      expect(doubleEvens([1, 2, 3, 4, 5])).toEqual([4, 8]);
    });

    test('handles all odd', () => {
      expect(doubleEvens([1, 3, 5])).toEqual([]);
    });

    test('handles all even', () => {
      expect(doubleEvens([2, 4, 6])).toEqual([4, 8, 12]);
    });

    test('handles zero', () => {
      expect(doubleEvens([0, 1, 2])).toEqual([0, 4]);
    });
  });

  describe('cartesianProduct', () => {
    test('generates all pairs', () => {
      expect(cartesianProduct([1, 2], ['a', 'b'])).toEqual([
        [1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']
      ]);
    });

    test('handles empty first array', () => {
      expect(cartesianProduct([], ['a', 'b'])).toEqual([]);
    });

    test('handles empty second array', () => {
      expect(cartesianProduct([1, 2], [])).toEqual([]);
    });

    test('handles single elements', () => {
      expect(cartesianProduct([1], [2])).toEqual([[1, 2]]);
    });
  });

  describe('compactAndFlatten', () => {
    test('removes empty and flattens', () => {
      expect(compactAndFlatten([[1, 2], [], [3], [], [4, 5]]))
        .toEqual([1, 2, 3, 4, 5]);
    });

    test('handles all empty', () => {
      expect(compactAndFlatten([[], [], []])).toEqual([]);
    });
  });

  describe('expandRanges', () => {
    test('expands ranges', () => {
      expect(expandRanges([[1, 3], [7, 9]])).toEqual([1, 2, 3, 7, 8, 9]);
    });

    test('handles single number ranges', () => {
      expect(expandRanges([[5, 5], [10, 10]])).toEqual([5, 10]);
    });

    test('handles empty input', () => {
      expect(expandRanges([])).toEqual([]);
    });
  });

});
