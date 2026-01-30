const {
  filterEvens,
  filterLongerThan,
  removeFalsy,
  filterByProperty,
  unique,
  filterInRange,
  filterByWhitelist,
  filterByNestedProperty
} = require('./exercise');

describe('Array.filter() Exercises', () => {
  
  describe('filterEvens', () => {
    test('filters even numbers', () => {
      expect(filterEvens([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
    });

    test('handles empty array', () => {
      expect(filterEvens([])).toEqual([]);
    });

    test('handles all odd', () => {
      expect(filterEvens([1, 3, 5])).toEqual([]);
    });

    test('handles negative evens', () => {
      expect(filterEvens([-2, -1, 0, 1, 2])).toEqual([-2, 0, 2]);
    });
  });

  describe('filterLongerThan', () => {
    test('filters strings longer than n', () => {
      expect(filterLongerThan(['a', 'ab', 'abc', 'abcd'], 2)).toEqual(['abc', 'abcd']);
    });

    test('handles n = 0', () => {
      expect(filterLongerThan(['', 'a', 'ab'], 0)).toEqual(['a', 'ab']);
    });

    test('handles empty array', () => {
      expect(filterLongerThan([], 5)).toEqual([]);
    });

    test('handles no matches', () => {
      expect(filterLongerThan(['a', 'b'], 5)).toEqual([]);
    });
  });

  describe('removeFalsy', () => {
    test('removes all falsy values', () => {
      expect(removeFalsy([0, 1, false, 2, '', 3, null, undefined, NaN]))
        .toEqual([1, 2, 3]);
    });

    test('handles empty array', () => {
      expect(removeFalsy([])).toEqual([]);
    });

    test('handles all falsy', () => {
      expect(removeFalsy([0, false, '', null])).toEqual([]);
    });

    test('handles all truthy', () => {
      expect(removeFalsy([1, 'hello', true, {}])).toEqual([1, 'hello', true, {}]);
    });
  });

  describe('filterByProperty', () => {
    test('filters objects by property value', () => {
      const input = [{status: 'active'}, {status: 'inactive'}, {status: 'active'}];
      expect(filterByProperty(input, 'status', 'active')).toEqual([
        {status: 'active'},
        {status: 'active'}
      ]);
    });

    test('handles numeric values', () => {
      const input = [{id: 1}, {id: 2}, {id: 1}];
      expect(filterByProperty(input, 'id', 1)).toEqual([{id: 1}, {id: 1}]);
    });

    test('handles no matches', () => {
      const input = [{a: 1}, {a: 2}];
      expect(filterByProperty(input, 'a', 3)).toEqual([]);
    });
  });

  describe('unique', () => {
    test('removes duplicate numbers', () => {
      expect(unique([1, 2, 2, 3, 1, 4, 3])).toEqual([1, 2, 3, 4]);
    });

    test('removes duplicate strings', () => {
      expect(unique(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
    });

    test('handles empty array', () => {
      expect(unique([])).toEqual([]);
    });

    test('handles already unique', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('filterInRange', () => {
    test('filters numbers within range', () => {
      expect(filterInRange([1, 5, 10, 15, 20], 5, 15)).toEqual([5, 10, 15]);
    });

    test('handles inclusive boundaries', () => {
      expect(filterInRange([5, 10], 5, 10)).toEqual([5, 10]);
    });

    test('handles no matches', () => {
      expect(filterInRange([1, 2, 3], 10, 20)).toEqual([]);
    });

    test('handles negative ranges', () => {
      expect(filterInRange([-5, -3, 0, 3, 5], -4, 4)).toEqual([-3, 0, 3]);
    });
  });

  describe('filterByWhitelist', () => {
    test('keeps only whitelisted values', () => {
      expect(filterByWhitelist([1, 2, 3, 4, 5], [2, 4, 6])).toEqual([2, 4]);
    });

    test('handles strings', () => {
      expect(filterByWhitelist(['a', 'b', 'c'], ['b', 'd'])).toEqual(['b']);
    });

    test('handles empty whitelist', () => {
      expect(filterByWhitelist([1, 2, 3], [])).toEqual([]);
    });

    test('preserves duplicates in original', () => {
      expect(filterByWhitelist([1, 2, 2, 3], [2])).toEqual([2, 2]);
    });
  });

  describe('filterByNestedProperty', () => {
    test('filters by nested property', () => {
      const input = [
        { address: { city: 'NYC' } },
        { address: { city: 'LA' } },
        { address: { city: 'NYC' } }
      ];
      expect(filterByNestedProperty(input, 'address.city', 'NYC')).toEqual([
        { address: { city: 'NYC' } },
        { address: { city: 'NYC' } }
      ]);
    });

    test('handles deeper nesting', () => {
      const input = [
        { a: { b: { c: 1 } } },
        { a: { b: { c: 2 } } }
      ];
      expect(filterByNestedProperty(input, 'a.b.c', 1)).toEqual([
        { a: { b: { c: 1 } } }
      ]);
    });

    test('handles missing nested properties', () => {
      const input = [
        { address: { city: 'NYC' } },
        { address: {} },
        { name: 'test' }
      ];
      expect(filterByNestedProperty(input, 'address.city', 'NYC')).toEqual([
        { address: { city: 'NYC' } }
      ]);
    });
  });

});
