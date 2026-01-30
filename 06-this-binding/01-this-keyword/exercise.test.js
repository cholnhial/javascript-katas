const {
  createFixedCounter,
  createObjectWithNested,
  createPersonWithArrow,
  createTimer,
  demonstrateThis,
  Button,
  createGreeter,
  createCalculator
} = require('./exercise');

describe("'this' Keyword Exercises", () => {

  describe('createFixedCounter', () => {
    test('works when method is called normally', () => {
      const counter = createFixedCounter();
      expect(counter.increment()).toBe(1);
      expect(counter.increment()).toBe(2);
    });

    test('works when method is detached', () => {
      const counter = createFixedCounter();
      const inc = counter.increment;
      expect(inc()).toBe(1);
      expect(inc()).toBe(2);
    });
  });

  describe('createObjectWithNested', () => {
    test('inner function can access outer this.name', () => {
      const obj = createObjectWithNested();
      expect(obj.getInnerName()).toBe('outer');
    });
  });

  describe('createPersonWithArrow', () => {
    test('listFriends uses correct this', () => {
      const person = createPersonWithArrow('Charlie');
      expect(person.listFriends()).toEqual([
        'Alice is friends with Charlie',
        'Bob is friends with Charlie'
      ]);
    });
  });

  describe('createTimer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('increments seconds over time', () => {
      const timer = createTimer();
      timer.start();

      jest.advanceTimersByTime(350);
      expect(timer.getSeconds()).toBe(3);

      timer.stop();
    });

    test('stop prevents further increments', () => {
      const timer = createTimer();
      timer.start();

      jest.advanceTimersByTime(200);
      timer.stop();
      jest.advanceTimersByTime(200);

      expect(timer.getSeconds()).toBe(2);
    });
  });

  describe('demonstrateThis', () => {
    test('regularMethod has object as this', () => {
      const obj = demonstrateThis();
      expect(obj.regularMethod()).toBe('myObject');
    });

    test('arrowMethod has different this', () => {
      const obj = demonstrateThis();
      // Arrow function's 'this' is from outer scope (not the object)
      const result = obj.arrowMethod();
      expect(['undefined', 'object']).toContain(result);
    });

    test('getArrowFunction preserves this', () => {
      const obj = demonstrateThis();
      const arrowFn = obj.getArrowFunction();
      expect(arrowFn()).toBe('myObject');
    });

    test('getRegularFunction loses this', () => {
      const obj = demonstrateThis();
      const regularFn = obj.getRegularFunction();
      // When called without context, 'this' will be undefined (strict) or global
      const result = regularFn();
      expect(result === undefined || result === globalThis).toBe(true);
    });
  });

  describe('Button', () => {
    test('handleClick works when called normally', () => {
      const btn = new Button('Submit');
      expect(btn.handleClick()).toBe('Submit clicked 1 times');
      expect(btn.handleClick()).toBe('Submit clicked 2 times');
    });

    test('handleClick works when detached', () => {
      const btn = new Button('Submit');
      const handler = btn.handleClick;
      expect(handler()).toBe('Submit clicked 1 times');
      expect(handler()).toBe('Submit clicked 2 times');
    });
  });

  describe('createGreeter', () => {
    test('works when method is called normally', () => {
      const greeter = createGreeter('Hello');
      expect(greeter.greet('World')).toBe('Hello, World!');
    });

    test('works when method is detached', () => {
      const greeter = createGreeter('Hi');
      const greet = greeter.greet;
      expect(greet('There')).toBe('Hi, There!');
    });
  });

  describe('createCalculator', () => {
    test('chains methods correctly', () => {
      const calc = createCalculator();
      const result = calc.add(10).subtract(3).multiply(2).getValue();
      expect(result).toBe(14);
    });

    test('delayedAdd works with correct this', async () => {
      jest.useFakeTimers();

      const calc = createCalculator();
      calc.add(5);

      const promise = calc.delayedAdd(10, 100);

      jest.advanceTimersByTime(100);

      await promise;

      expect(calc.getValue()).toBe(15);

      jest.useRealTimers();
    });
  });

});
