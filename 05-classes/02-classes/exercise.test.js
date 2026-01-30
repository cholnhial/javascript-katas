const {
  Rectangle,
  BankAccount,
  Circle,
  MathUtils,
  Counter,
  Point,
  Temperature,
  StringBuilder,
  Range
} = require('./exercise');

describe('ES6 Classes Exercises', () => {

  describe('Rectangle', () => {
    test('creates rectangle with width and height', () => {
      const rect = new Rectangle(5, 3);
      expect(rect.width).toBe(5);
      expect(rect.height).toBe(3);
    });

    test('calculates area', () => {
      expect(new Rectangle(4, 5).area()).toBe(20);
    });

    test('calculates perimeter', () => {
      expect(new Rectangle(4, 5).perimeter()).toBe(18);
    });
  });

  describe('BankAccount', () => {
    test('creates account with initial balance', () => {
      const account = new BankAccount(100);
      expect(account.getBalance()).toBe(100);
    });

    test('defaults to zero balance', () => {
      const account = new BankAccount();
      expect(account.getBalance()).toBe(0);
    });

    test('deposits money', () => {
      const account = new BankAccount(100);
      account.deposit(50);
      expect(account.getBalance()).toBe(150);
    });

    test('withdraws money', () => {
      const account = new BankAccount(100);
      account.withdraw(30);
      expect(account.getBalance()).toBe(70);
    });

    test('throws on insufficient funds', () => {
      const account = new BankAccount(50);
      expect(() => account.withdraw(100)).toThrow();
    });
  });

  describe('Circle', () => {
    test('creates circle with radius', () => {
      const circle = new Circle(5);
      expect(circle.radius).toBe(5);
    });

    test('getter for diameter', () => {
      expect(new Circle(5).diameter).toBe(10);
    });

    test('setter for diameter', () => {
      const circle = new Circle(5);
      circle.diameter = 20;
      expect(circle.radius).toBe(10);
    });

    test('getter for area', () => {
      const circle = new Circle(2);
      expect(circle.area).toBeCloseTo(Math.PI * 4);
    });
  });

  describe('MathUtils', () => {
    test('add is static', () => {
      expect(MathUtils.add(2, 3)).toBe(5);
    });

    test('multiply is static', () => {
      expect(MathUtils.multiply(4, 5)).toBe(20);
    });

    test('clamp keeps value in range', () => {
      expect(MathUtils.clamp(5, 0, 10)).toBe(5);
      expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
      expect(MathUtils.clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('Counter', () => {
    test('starts at zero', () => {
      const counter = new Counter();
      expect(counter.getCount()).toBe(0);
    });

    test('increments and decrements', () => {
      const counter = new Counter();
      counter.increment();
      counter.increment();
      expect(counter.getCount()).toBe(2);
      counter.decrement();
      expect(counter.getCount()).toBe(1);
    });

    test('resets to zero', () => {
      const counter = new Counter();
      counter.increment();
      counter.increment();
      counter.reset();
      expect(counter.getCount()).toBe(0);
    });

    test('count is private', () => {
      const counter = new Counter();
      expect(counter.count).toBeUndefined();
      // @ts-ignore
      expect(counter['#count']).toBeUndefined();
    });
  });

  describe('Point', () => {
    test('creates point with x, y', () => {
      const p = new Point(3, 4);
      expect(p.x).toBe(3);
      expect(p.y).toBe(4);
    });

    test('fromArray factory', () => {
      const p = Point.fromArray([5, 6]);
      expect(p.x).toBe(5);
      expect(p.y).toBe(6);
    });

    test('fromObject factory', () => {
      const p = Point.fromObject({ x: 7, y: 8 });
      expect(p.x).toBe(7);
      expect(p.y).toBe(8);
    });

    test('origin factory', () => {
      const p = Point.origin();
      expect(p.x).toBe(0);
      expect(p.y).toBe(0);
    });

    test('distanceFrom calculates distance', () => {
      const p1 = new Point(0, 0);
      const p2 = new Point(3, 4);
      expect(p1.distanceFrom(p2)).toBe(5);
    });
  });

  describe('Temperature', () => {
    test('stores celsius', () => {
      const temp = new Temperature(25);
      expect(temp.celsius).toBe(25);
    });

    test('converts to fahrenheit', () => {
      const temp = new Temperature(0);
      expect(temp.toFahrenheit()).toBe(32);
      expect(new Temperature(100).toFahrenheit()).toBe(212);
    });

    test('toString returns formatted string', () => {
      expect(new Temperature(25).toString()).toBe('25°C');
    });

    test('valueOf returns celsius for comparisons', () => {
      const t1 = new Temperature(20);
      const t2 = new Temperature(30);
      expect(t1 < t2).toBe(true);
      expect(t1 + 5).toBe(25);
    });
  });

  describe('StringBuilder', () => {
    test('appends strings', () => {
      const sb = new StringBuilder();
      sb.append('hello').append(' ').append('world');
      expect(sb.toString()).toBe('hello world');
    });

    test('prepends strings', () => {
      const sb = new StringBuilder();
      sb.append('world').prepend('hello ');
      expect(sb.toString()).toBe('hello world');
    });

    test('converts to uppercase', () => {
      const sb = new StringBuilder();
      const result = sb.append('hello').toUpperCase().toString();
      expect(result).toBe('HELLO');
    });

    test('chains methods', () => {
      const result = new StringBuilder()
        .append('a')
        .append('b')
        .prepend('z')
        .toUpperCase()
        .toString();
      expect(result).toBe('ZAB');
    });
  });

  describe('Range', () => {
    test('iterates over range', () => {
      const range = new Range(1, 5);
      const values = [...range];
      expect(values).toEqual([1, 2, 3, 4, 5]);
    });

    test('works with for...of', () => {
      const range = new Range(3, 6);
      const values = [];
      for (const n of range) {
        values.push(n);
      }
      expect(values).toEqual([3, 4, 5, 6]);
    });

    test('handles single value range', () => {
      const range = new Range(5, 5);
      expect([...range]).toEqual([5]);
    });
  });

});
