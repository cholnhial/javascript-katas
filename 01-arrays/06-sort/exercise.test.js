const {
  sortAscending,
  sortDescending,
  sortAlphabetically,
  sortByProperty,
  sortByStringProperty,
  sortByCategoryThenPrice,
  sortDates,
  sortByCustomPriority,
  sortByLengthThenAlpha,
  sortWithNullsLast
} = require('./exercise');

describe('Array.sort() Exercises', () => {
  
  describe('sortAscending', () => {
    test('sorts ascending', () => {
      expect(sortAscending([3, 1, 4, 1, 5])).toEqual([1, 1, 3, 4, 5]);
    });

    test('does not mutate original', () => {
      const original = [3, 1, 2];
      sortAscending(original);
      expect(original).toEqual([3, 1, 2]);
    });

    test('handles negative numbers', () => {
      expect(sortAscending([-5, 10, -3, 0])).toEqual([-5, -3, 0, 10]);
    });
  });

  describe('sortDescending', () => {
    test('sorts descending', () => {
      expect(sortDescending([3, 1, 4, 1, 5])).toEqual([5, 4, 3, 1, 1]);
    });

    test('does not mutate original', () => {
      const original = [3, 1, 2];
      sortDescending(original);
      expect(original).toEqual([3, 1, 2]);
    });
  });

  describe('sortAlphabetically', () => {
    test('sorts case-insensitive', () => {
      expect(sortAlphabetically(['Banana', 'apple', 'Cherry']))
        .toEqual(['apple', 'Banana', 'Cherry']);
    });

    test('handles same start', () => {
      expect(sortAlphabetically(['ab', 'Aa', 'aC']))
        .toEqual(['Aa', 'ab', 'aC']);
    });
  });

  describe('sortByProperty', () => {
    test('sorts by numeric property', () => {
      const input = [{ age: 30 }, { age: 20 }, { age: 25 }];
      expect(sortByProperty(input, 'age')).toEqual([
        { age: 20 }, { age: 25 }, { age: 30 }
      ]);
    });

    test('does not mutate original', () => {
      const original = [{ x: 2 }, { x: 1 }];
      sortByProperty(original, 'x');
      expect(original).toEqual([{ x: 2 }, { x: 1 }]);
    });
  });

  describe('sortByStringProperty', () => {
    test('sorts by string property', () => {
      const input = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
      expect(sortByStringProperty(input, 'name')).toEqual([
        { name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }
      ]);
    });
  });

  describe('sortByCategoryThenPrice', () => {
    test('sorts by category then price', () => {
      const input = [
        { category: 'B', price: 10 },
        { category: 'A', price: 30 },
        { category: 'A', price: 10 },
        { category: 'B', price: 5 }
      ];
      expect(sortByCategoryThenPrice(input)).toEqual([
        { category: 'A', price: 10 },
        { category: 'A', price: 30 },
        { category: 'B', price: 5 },
        { category: 'B', price: 10 }
      ]);
    });
  });

  describe('sortDates', () => {
    test('sorts dates chronologically', () => {
      const input = ['2023-03-15', '2023-01-01', '2023-02-20'];
      expect(sortDates(input)).toEqual(['2023-01-01', '2023-02-20', '2023-03-15']);
    });

    test('handles same month', () => {
      const input = ['2023-01-31', '2023-01-15', '2023-01-01'];
      expect(sortDates(input)).toEqual(['2023-01-01', '2023-01-15', '2023-01-31']);
    });
  });

  describe('sortByCustomPriority', () => {
    test('sorts by custom priority order', () => {
      const tasks = [
        { name: 'A', priority: 'low' },
        { name: 'B', priority: 'high' },
        { name: 'C', priority: 'medium' }
      ];
      const order = ['high', 'medium', 'low'];
      expect(sortByCustomPriority(tasks, order)).toEqual([
        { name: 'B', priority: 'high' },
        { name: 'C', priority: 'medium' },
        { name: 'A', priority: 'low' }
      ]);
    });
  });

  describe('sortByLengthThenAlpha', () => {
    test('sorts by length then alphabetically', () => {
      expect(sortByLengthThenAlpha(['bb', 'aaa', 'a', 'cc', 'ab']))
        .toEqual(['a', 'ab', 'bb', 'cc', 'aaa']);
    });

    test('handles same length', () => {
      expect(sortByLengthThenAlpha(['c', 'a', 'b']))
        .toEqual(['a', 'b', 'c']);
    });
  });

  describe('sortWithNullsLast', () => {
    test('sorts with nulls at end', () => {
      expect(sortWithNullsLast([3, null, 1, undefined, 2]))
        .toEqual([1, 2, 3, null, undefined]);
    });

    test('handles all nulls', () => {
      const result = sortWithNullsLast([null, undefined, null]);
      expect(result.every(v => v == null)).toBe(true);
    });

    test('handles no nulls', () => {
      expect(sortWithNullsLast([3, 1, 2])).toEqual([1, 2, 3]);
    });
  });

});
