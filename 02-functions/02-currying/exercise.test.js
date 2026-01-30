const {
  curriedAdd,
  curriedMultiply,
  greet,
  filter,
  map,
  curry,
  prop,
  between,
  discount,
  format
} = require('./exercise');

describe('Currying Exercises', () => {
  
  describe('curriedAdd', () => {
    test('adds three numbers', () => {
      expect(curriedAdd(1)(2)(3)).toBe(6);
    });

    test('can be partially applied', () => {
      const add5 = curriedAdd(5);
      const add5And3 = add5(3);
      expect(add5And3(2)).toBe(10);
    });
  });

  describe('curriedMultiply', () => {
    test('multiplies three numbers', () => {
      expect(curriedMultiply(2)(3)(4)).toBe(24);
    });

    test('can be partially applied', () => {
      const double = curriedMultiply(2);
      expect(double(3)(4)).toBe(24);
    });
  });

  describe('greet', () => {
    test('creates greeting', () => {
      expect(greet('Hello')('World')).toBe('Hello, World!');
    });

    test('can be partially applied', () => {
      const sayHi = greet('Hi');
      expect(sayHi('Alice')).toBe('Hi, Alice!');
      expect(sayHi('Bob')).toBe('Hi, Bob!');
    });
  });

  describe('filter', () => {
    test('filters with predicate', () => {
      const getEvens = filter(n => n % 2 === 0);
      expect(getEvens([1, 2, 3, 4, 5])).toEqual([2, 4]);
    });

    test('can be reused', () => {
      const getPositive = filter(n => n > 0);
      expect(getPositive([-1, 0, 1, 2])).toEqual([1, 2]);
      expect(getPositive([5, -5, 10])).toEqual([5, 10]);
    });
  });

  describe('map', () => {
    test('maps with transform', () => {
      const double = map(n => n * 2);
      expect(double([1, 2, 3])).toEqual([2, 4, 6]);
    });

    test('can be reused', () => {
      const stringify = map(String);
      expect(stringify([1, 2, 3])).toEqual(['1', '2', '3']);
    });
  });

  describe('curry', () => {
    test('works with all args at once', () => {
      const add = curry((a, b, c) => a + b + c);
      expect(add(1, 2, 3)).toBe(6);
    });

    test('works one arg at a time', () => {
      const add = curry((a, b, c) => a + b + c);
      expect(add(1)(2)(3)).toBe(6);
    });

    test('works with mixed application', () => {
      const add = curry((a, b, c) => a + b + c);
      expect(add(1, 2)(3)).toBe(6);
      expect(add(1)(2, 3)).toBe(6);
    });

    test('works with two argument function', () => {
      const multiply = curry((a, b) => a * b);
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(2)(3)).toBe(6);
    });
  });

  describe('prop', () => {
    test('gets property', () => {
      const getName = prop('name');
      expect(getName({ name: 'Alice' })).toBe('Alice');
    });

    test('works with map', () => {
      const getAge = prop('age');
      const people = [{ age: 20 }, { age: 30 }];
      expect(people.map(getAge)).toEqual([20, 30]);
    });

    test('returns undefined for missing prop', () => {
      const getFoo = prop('foo');
      expect(getFoo({ bar: 1 })).toBeUndefined();
    });
  });

  describe('between', () => {
    test('checks if in range', () => {
      const inRange = between(0)(10);
      expect(inRange(5)).toBe(true);
      expect(inRange(0)).toBe(true);
      expect(inRange(10)).toBe(true);
      expect(inRange(-1)).toBe(false);
      expect(inRange(11)).toBe(false);
    });

    test('can create different ranges', () => {
      const isPercentage = between(0)(100);
      const isNegative = between(-Infinity)(0);
      
      expect(isPercentage(50)).toBe(true);
      expect(isNegative(-5)).toBe(true);
    });
  });

  describe('discount', () => {
    test('applies percentage discount', () => {
      const tenPercentOff = discount(0.1);
      expect(tenPercentOff(100)).toBe(90);
    });

    test('different discounts', () => {
      const half = discount(0.5);
      expect(half(200)).toBe(100);
      
      const noDiscount = discount(0);
      expect(noDiscount(100)).toBe(100);
    });
  });

  describe('format', () => {
    test('formats template string', () => {
      const template = format('Hello, {{name}}!');
      expect(template({ name: 'World' })).toBe('Hello, World!');
    });

    test('handles multiple placeholders', () => {
      const template = format('{{greeting}}, {{name}}!');
      expect(template({ greeting: 'Hi', name: 'Alice' })).toBe('Hi, Alice!');
    });

    test('reusable template', () => {
      const emailTemplate = format('Dear {{name}}, Your order #{{orderId}} is ready.');
      
      expect(emailTemplate({ name: 'Alice', orderId: '123' }))
        .toBe('Dear Alice, Your order #123 is ready.');
      expect(emailTemplate({ name: 'Bob', orderId: '456' }))
        .toBe('Dear Bob, Your order #456 is ready.');
    });
  });

});
