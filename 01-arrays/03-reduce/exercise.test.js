const {
  sum,
  max,
  countOccurrences,
  groupBy,
  flatten,
  fromPairs,
  average,
  compose,
  partition,
  keyBy
} = require('./exercise');

describe('Array.reduce() Exercises', () => {
  
  describe('sum', () => {
    test('sums array of numbers', () => {
      expect(sum([1, 2, 3, 4])).toBe(10);
    });

    test('handles empty array', () => {
      expect(sum([])).toBe(0);
    });

    test('handles single element', () => {
      expect(sum([5])).toBe(5);
    });

    test('handles negative numbers', () => {
      expect(sum([1, -2, 3, -4])).toBe(-2);
    });
  });

  describe('max', () => {
    test('finds maximum value', () => {
      expect(max([3, 1, 4, 1, 5, 9, 2, 6])).toBe(9);
    });

    test('handles empty array', () => {
      expect(max([])).toBeUndefined();
    });

    test('handles single element', () => {
      expect(max([42])).toBe(42);
    });

    test('handles negative numbers', () => {
      expect(max([-5, -2, -8, -1])).toBe(-1);
    });
  });

  describe('countOccurrences', () => {
    test('counts string occurrences', () => {
      expect(countOccurrences(['a', 'b', 'a', 'c', 'a', 'b']))
        .toEqual({a: 3, b: 2, c: 1});
    });

    test('counts number occurrences', () => {
      expect(countOccurrences([1, 2, 1, 1, 3, 2]))
        .toEqual({1: 3, 2: 2, 3: 1});
    });

    test('handles empty array', () => {
      expect(countOccurrences([])).toEqual({});
    });
  });

  describe('groupBy', () => {
    test('groups by property', () => {
      const input = [
        {type: 'fruit', name: 'apple'},
        {type: 'veg', name: 'carrot'},
        {type: 'fruit', name: 'banana'}
      ];
      expect(groupBy(input, 'type')).toEqual({
        fruit: [{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}],
        veg: [{type: 'veg', name: 'carrot'}]
      });
    });

    test('handles empty array', () => {
      expect(groupBy([], 'type')).toEqual({});
    });

    test('handles single item', () => {
      expect(groupBy([{a: 1}], 'a')).toEqual({1: [{a: 1}]});
    });
  });

  describe('flatten', () => {
    test('flattens nested arrays', () => {
      expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
    });

    test('handles empty arrays', () => {
      expect(flatten([[], [1], []])).toEqual([1]);
    });

    test('handles empty input', () => {
      expect(flatten([])).toEqual([]);
    });

    test('preserves nested arrays beyond first level', () => {
      expect(flatten([[1, [2, 3]], [4]])).toEqual([1, [2, 3], 4]);
    });
  });

  describe('fromPairs', () => {
    test('creates object from pairs', () => {
      expect(fromPairs([['a', 1], ['b', 2], ['c', 3]]))
        .toEqual({a: 1, b: 2, c: 3});
    });

    test('handles empty array', () => {
      expect(fromPairs([])).toEqual({});
    });

    test('later pairs overwrite earlier', () => {
      expect(fromPairs([['a', 1], ['a', 2]])).toEqual({a: 2});
    });
  });

  describe('average', () => {
    test('calculates average', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
    });

    test('handles empty array', () => {
      expect(average([])).toBe(0);
    });

    test('handles single element', () => {
      expect(average([10])).toBe(10);
    });

    test('handles decimals', () => {
      expect(average([1, 2])).toBe(1.5);
    });
  });

  describe('compose', () => {
    test('composes two functions', () => {
      const add1 = x => x + 1;
      const double = x => x * 2;
      const composed = compose(add1, double);
      expect(composed(5)).toBe(11); // double(5) = 10, add1(10) = 11
    });

    test('composes three functions', () => {
      const add1 = x => x + 1;
      const double = x => x * 2;
      const square = x => x * x;
      const composed = compose(add1, double, square);
      expect(composed(3)).toBe(19); // square(3)=9, double(9)=18, add1(18)=19
    });

    test('handles single function', () => {
      const add1 = x => x + 1;
      expect(compose(add1)(5)).toBe(6);
    });

    test('handles no functions', () => {
      expect(compose()(5)).toBe(5);
    });
  });

  describe('partition', () => {
    test('partitions by predicate', () => {
      const [evens, odds] = partition([1, 2, 3, 4, 5], n => n % 2 === 0);
      expect(evens).toEqual([2, 4]);
      expect(odds).toEqual([1, 3, 5]);
    });

    test('handles empty array', () => {
      const [pass, fail] = partition([], x => x);
      expect(pass).toEqual([]);
      expect(fail).toEqual([]);
    });

    test('handles all passing', () => {
      const [pass, fail] = partition([2, 4, 6], n => n % 2 === 0);
      expect(pass).toEqual([2, 4, 6]);
      expect(fail).toEqual([]);
    });
  });

  describe('keyBy', () => {
    test('creates lookup by key', () => {
      const input = [{id: 1, name: 'a'}, {id: 2, name: 'b'}];
      expect(keyBy(input, 'id')).toEqual({
        1: {id: 1, name: 'a'},
        2: {id: 2, name: 'b'}
      });
    });

    test('handles empty array', () => {
      expect(keyBy([], 'id')).toEqual({});
    });

    test('later items overwrite earlier with same key', () => {
      const input = [{id: 1, v: 'first'}, {id: 1, v: 'second'}];
      expect(keyBy(input, 'id')).toEqual({1: {id: 1, v: 'second'}});
    });
  });

});
