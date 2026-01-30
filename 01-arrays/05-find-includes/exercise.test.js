const {
  findFirstEven,
  findUserById,
  findNegativeIndex,
  contains,
  hasGreaterThan,
  allPositive,
  hasDuplicates,
  hasAnyRole,
  allInStock,
  findByNestedProperty
} = require('./exercise');

describe('Array Search Methods Exercises', () => {
  
  describe('findFirstEven', () => {
    test('finds first even', () => {
      expect(findFirstEven([1, 3, 4, 6, 8])).toBe(4);
    });

    test('returns undefined when no even', () => {
      expect(findFirstEven([1, 3, 5])).toBeUndefined();
    });

    test('handles empty array', () => {
      expect(findFirstEven([])).toBeUndefined();
    });

    test('handles zero', () => {
      expect(findFirstEven([1, 0, 2])).toBe(0);
    });
  });

  describe('findUserById', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ];

    test('finds existing user', () => {
      expect(findUserById(users, 2)).toEqual({ id: 2, name: 'Bob' });
    });

    test('returns undefined for missing user', () => {
      expect(findUserById(users, 99)).toBeUndefined();
    });

    test('handles empty array', () => {
      expect(findUserById([], 1)).toBeUndefined();
    });
  });

  describe('findNegativeIndex', () => {
    test('finds index of first negative', () => {
      expect(findNegativeIndex([1, 2, -3, -4])).toBe(2);
    });

    test('returns -1 when no negative', () => {
      expect(findNegativeIndex([1, 2, 3])).toBe(-1);
    });

    test('handles zero', () => {
      expect(findNegativeIndex([0, -1, 2])).toBe(1);
    });
  });

  describe('contains', () => {
    test('finds existing value', () => {
      expect(contains([1, 2, 3], 2)).toBe(true);
    });

    test('returns false for missing value', () => {
      expect(contains([1, 2, 3], 4)).toBe(false);
    });

    test('handles strings', () => {
      expect(contains(['a', 'b', 'c'], 'b')).toBe(true);
    });

    test('uses strict equality', () => {
      expect(contains([1, 2, 3], '2')).toBe(false);
    });
  });

  describe('hasGreaterThan', () => {
    test('returns true when value exceeds threshold', () => {
      expect(hasGreaterThan([1, 2, 3, 4, 5], 3)).toBe(true);
    });

    test('returns false when no value exceeds', () => {
      expect(hasGreaterThan([1, 2, 3], 5)).toBe(false);
    });

    test('handles equal values', () => {
      expect(hasGreaterThan([1, 2, 3], 3)).toBe(false);
    });
  });

  describe('allPositive', () => {
    test('returns true for all positive', () => {
      expect(allPositive([1, 2, 3])).toBe(true);
    });

    test('returns false with negative', () => {
      expect(allPositive([1, -2, 3])).toBe(false);
    });

    test('handles zero as not positive', () => {
      expect(allPositive([0, 1, 2])).toBe(false);
    });

    test('returns true for empty array', () => {
      expect(allPositive([])).toBe(true);
    });
  });

  describe('hasDuplicates', () => {
    test('detects duplicates', () => {
      expect(hasDuplicates([1, 2, 3, 2])).toBe(true);
    });

    test('returns false for unique', () => {
      expect(hasDuplicates([1, 2, 3])).toBe(false);
    });

    test('handles strings', () => {
      expect(hasDuplicates(['a', 'b', 'a'])).toBe(true);
    });

    test('handles empty array', () => {
      expect(hasDuplicates([])).toBe(false);
    });
  });

  describe('hasAnyRole', () => {
    test('returns true when role matches', () => {
      expect(hasAnyRole(['user', 'admin'], ['admin', 'super'])).toBe(true);
    });

    test('returns false when no role matches', () => {
      expect(hasAnyRole(['user'], ['admin', 'super'])).toBe(false);
    });

    test('handles empty user roles', () => {
      expect(hasAnyRole([], ['admin'])).toBe(false);
    });

    test('handles empty required roles', () => {
      expect(hasAnyRole(['admin'], [])).toBe(false);
    });
  });

  describe('allInStock', () => {
    test('returns true when all in stock', () => {
      const items = [{ quantity: 5 }, { quantity: 10 }];
      expect(allInStock(items)).toBe(true);
    });

    test('returns false when any out of stock', () => {
      const items = [{ quantity: 5 }, { quantity: 0 }];
      expect(allInStock(items)).toBe(false);
    });

    test('returns true for empty array', () => {
      expect(allInStock([])).toBe(true);
    });
  });

  describe('findByNestedProperty', () => {
    test('finds by nested property', () => {
      const objects = [
        { a: { b: 1 } },
        { a: { b: 2 } },
        { a: { b: 3 } }
      ];
      expect(findByNestedProperty(objects, 'a.b', 2)).toEqual({ a: { b: 2 } });
    });

    test('handles deeper nesting', () => {
      const objects = [
        { x: { y: { z: 'found' } } },
        { x: { y: { z: 'other' } } }
      ];
      expect(findByNestedProperty(objects, 'x.y.z', 'found'))
        .toEqual({ x: { y: { z: 'found' } } });
    });

    test('returns undefined when not found', () => {
      const objects = [{ a: { b: 1 } }];
      expect(findByNestedProperty(objects, 'a.b', 999)).toBeUndefined();
    });
  });

});
