const {
  getFirstTwo,
  swap,
  getNameAndAge,
  renameProperty,
  withDefaults,
  extractNested,
  skipElements,
  headAndTail,
  extractAndCollectRest,
  createConnectionString,
  extractFromTuple,
  extractByKey
} = require('./exercise');

describe('Destructuring Exercises', () => {

  describe('getFirstTwo', () => {
    test('extracts first two elements', () => {
      expect(getFirstTwo([1, 2, 3, 4])).toEqual({ first: 1, second: 2 });
    });

    test('handles strings', () => {
      expect(getFirstTwo(['a', 'b', 'c'])).toEqual({ first: 'a', second: 'b' });
    });

    test('handles short arrays', () => {
      expect(getFirstTwo([1])).toEqual({ first: 1, second: undefined });
    });
  });

  describe('swap', () => {
    test('swaps two values', () => {
      expect(swap(1, 2)).toEqual([2, 1]);
    });

    test('swaps strings', () => {
      expect(swap('a', 'b')).toEqual(['b', 'a']);
    });
  });

  describe('getNameAndAge', () => {
    test('extracts name and age', () => {
      const person = { name: 'Alice', age: 30, city: 'NYC' };
      expect(getNameAndAge(person)).toEqual({ name: 'Alice', age: 30 });
    });
  });

  describe('renameProperty', () => {
    test('renames name to fullName', () => {
      expect(renameProperty({ name: 'Bob' })).toEqual({ fullName: 'Bob' });
    });
  });

  describe('withDefaults', () => {
    test('uses provided values', () => {
      expect(withDefaults({ name: 'Alice', age: 25 })).toEqual({ name: 'Alice', age: 25 });
    });

    test('uses default age', () => {
      expect(withDefaults({ name: 'Bob' })).toEqual({ name: 'Bob', age: 0 });
    });
  });

  describe('extractNested', () => {
    test('extracts nested properties', () => {
      const data = {
        user: {
          profile: {
            name: 'Alice',
            email: 'alice@test.com'
          }
        }
      };
      expect(extractNested(data)).toEqual({ name: 'Alice', email: 'alice@test.com' });
    });
  });

  describe('skipElements', () => {
    test('skips second element', () => {
      expect(skipElements([1, 2, 3, 4])).toEqual({ first: 1, third: 3 });
    });

    test('works with strings', () => {
      expect(skipElements(['a', 'b', 'c', 'd'])).toEqual({ first: 'a', third: 'c' });
    });
  });

  describe('headAndTail', () => {
    test('splits into head and tail', () => {
      expect(headAndTail([1, 2, 3, 4])).toEqual({ head: 1, tail: [2, 3, 4] });
    });

    test('handles single element', () => {
      expect(headAndTail([1])).toEqual({ head: 1, tail: [] });
    });

    test('handles empty array', () => {
      expect(headAndTail([])).toEqual({ head: undefined, tail: [] });
    });
  });

  describe('extractAndCollectRest', () => {
    test('extracts id and collects rest', () => {
      const obj = { id: 1, name: 'Alice', email: 'alice@test.com' };
      expect(extractAndCollectRest(obj)).toEqual({
        id: 1,
        other: { name: 'Alice', email: 'alice@test.com' }
      });
    });

    test('handles object with only id', () => {
      expect(extractAndCollectRest({ id: 42 })).toEqual({
        id: 42,
        other: {}
      });
    });
  });

  describe('createConnectionString', () => {
    test('uses all provided values', () => {
      expect(createConnectionString({ host: 'localhost', port: 3000, secure: true }))
        .toBe('https://localhost:3000');
    });

    test('uses defaults', () => {
      expect(createConnectionString({ host: 'localhost' }))
        .toBe('http://localhost:80');
    });

    test('uses default port with secure', () => {
      expect(createConnectionString({ host: 'api.example.com', secure: true }))
        .toBe('https://api.example.com:80');
    });
  });

  describe('extractFromTuple', () => {
    test('extracts from tuple', () => {
      expect(extractFromTuple(['temperature', { value: 72 }]))
        .toEqual({ name: 'temperature', value: 72 });
    });
  });

  describe('extractByKey', () => {
    test('extracts by computed key', () => {
      expect(extractByKey({ a: 1, b: 2 }, 'a')).toBe(1);
      expect(extractByKey({ a: 1, b: 2 }, 'b')).toBe(2);
    });

    test('returns undefined for missing key', () => {
      expect(extractByKey({ a: 1 }, 'b')).toBeUndefined();
    });
  });

});
