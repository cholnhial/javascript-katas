const {
  doubleNumbers,
  extractNames,
  toUpperCase,
  addIndex,
  formatNames,
  squarePositive,
  celsiusToFahrenheit,
  zipToObjects
} = require('./exercise');

describe('Array.map() Exercises', () => {
  
  describe('doubleNumbers', () => {
    test('doubles each number', () => {
      expect(doubleNumbers([1, 2, 3])).toEqual([2, 4, 6]);
    });

    test('handles empty array', () => {
      expect(doubleNumbers([])).toEqual([]);
    });

    test('handles negative numbers', () => {
      expect(doubleNumbers([-1, -2, 3])).toEqual([-2, -4, 6]);
    });

    test('handles decimals', () => {
      expect(doubleNumbers([0.5, 1.5])).toEqual([1, 3]);
    });
  });

  describe('extractNames', () => {
    test('extracts name property from objects', () => {
      const input = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}];
      expect(extractNames(input)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    test('handles empty array', () => {
      expect(extractNames([])).toEqual([]);
    });

    test('handles objects with additional properties', () => {
      const input = [{name: 'Alice', age: 30}, {name: 'Bob', age: 25}];
      expect(extractNames(input)).toEqual(['Alice', 'Bob']);
    });
  });

  describe('toUpperCase', () => {
    test('converts strings to uppercase', () => {
      expect(toUpperCase(['hello', 'world'])).toEqual(['HELLO', 'WORLD']);
    });

    test('handles mixed case', () => {
      expect(toUpperCase(['HeLLo', 'WoRLd'])).toEqual(['HELLO', 'WORLD']);
    });

    test('handles empty array', () => {
      expect(toUpperCase([])).toEqual([]);
    });

    test('handles already uppercase', () => {
      expect(toUpperCase(['ABC'])).toEqual(['ABC']);
    });
  });

  describe('addIndex', () => {
    test('adds index to each element', () => {
      expect(addIndex([10, 20, 30])).toEqual([10, 21, 32]);
    });

    test('handles single element', () => {
      expect(addIndex([5])).toEqual([5]);
    });

    test('handles empty array', () => {
      expect(addIndex([])).toEqual([]);
    });

    test('handles zeros', () => {
      expect(addIndex([0, 0, 0])).toEqual([0, 1, 2]);
    });
  });

  describe('formatNames', () => {
    test('formats first and last name', () => {
      const input = [
        {firstName: 'John', lastName: 'Doe'},
        {firstName: 'Jane', lastName: 'Smith'}
      ];
      expect(formatNames(input)).toEqual(['John Doe', 'Jane Smith']);
    });

    test('handles empty array', () => {
      expect(formatNames([])).toEqual([]);
    });

    test('handles single person', () => {
      const input = [{firstName: 'Alice', lastName: 'Wonder'}];
      expect(formatNames(input)).toEqual(['Alice Wonder']);
    });
  });

  describe('squarePositive', () => {
    test('squares positive numbers, null for negative', () => {
      expect(squarePositive([2, -3, 4])).toEqual([4, null, 16]);
    });

    test('handles zero', () => {
      expect(squarePositive([0, 1, -1])).toEqual([0, 1, null]);
    });

    test('handles all negative', () => {
      expect(squarePositive([-1, -2, -3])).toEqual([null, null, null]);
    });

    test('handles all positive', () => {
      expect(squarePositive([1, 2, 3])).toEqual([1, 4, 9]);
    });
  });

  describe('celsiusToFahrenheit', () => {
    test('converts standard temperatures', () => {
      expect(celsiusToFahrenheit([0, 100])).toEqual([32, 212]);
    });

    test('handles negative celsius', () => {
      expect(celsiusToFahrenheit([-40])).toEqual([-40]); // -40°C = -40°F
    });

    test('handles room temperature', () => {
      expect(celsiusToFahrenheit([20])).toEqual([68]);
    });

    test('handles empty array', () => {
      expect(celsiusToFahrenheit([])).toEqual([]);
    });
  });

  describe('zipToObjects', () => {
    test('zips keys and values into objects', () => {
      expect(zipToObjects(['a', 'b'], [1, 2])).toEqual([
        {key: 'a', value: 1},
        {key: 'b', value: 2}
      ]);
    });

    test('handles empty arrays', () => {
      expect(zipToObjects([], [])).toEqual([]);
    });

    test('handles single pair', () => {
      expect(zipToObjects(['x'], [10])).toEqual([{key: 'x', value: 10}]);
    });

    test('handles different value types', () => {
      expect(zipToObjects(['str', 'num', 'bool'], ['hello', 42, true])).toEqual([
        {key: 'str', value: 'hello'},
        {key: 'num', value: 42},
        {key: 'bool', value: true}
      ]);
    });
  });

});
