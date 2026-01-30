const {
  invokeWithCall,
  invokeWithApply,
  createBound,
  myBind,
  myCall,
  borrowMethod,
  bindWithArgs,
  arrayMax,
  debugThis,
  autoBind,
  AnimalConstructor,
  DogConstructor,
  throttle
} = require('./exercise');

describe('bind, call, apply Exercises', () => {

  describe('invokeWithCall', () => {
    test('calls function with context', () => {
      function greet(greeting) {
        return `${greeting}, ${this.name}!`;
      }
      const context = { name: 'World' };
      expect(invokeWithCall(greet, context, 'Hello')).toBe('Hello, World!');
    });

    test('passes multiple arguments', () => {
      function sum(a, b, c) {
        return this.base + a + b + c;
      }
      expect(invokeWithCall(sum, { base: 10 }, 1, 2, 3)).toBe(16);
    });
  });

  describe('invokeWithApply', () => {
    test('calls function with context and args array', () => {
      function greet(greeting, punctuation) {
        return `${greeting}, ${this.name}${punctuation}`;
      }
      const context = { name: 'World' };
      expect(invokeWithApply(greet, context, ['Hello', '!'])).toBe('Hello, World!');
    });
  });

  describe('createBound', () => {
    test('creates bound function', () => {
      function greet() {
        return `Hello, ${this.name}!`;
      }
      const bound = createBound(greet, { name: 'World' });
      expect(bound()).toBe('Hello, World!');
    });

    test('bound function accepts arguments', () => {
      function add(a, b) {
        return this.base + a + b;
      }
      const bound = createBound(add, { base: 10 });
      expect(bound(5, 3)).toBe(18);
    });
  });

  describe('myBind', () => {
    test('binds context without native bind', () => {
      function greet() {
        return `Hi, ${this.name}!`;
      }
      const bound = myBind(greet, { name: 'Test' });
      expect(bound()).toBe('Hi, Test!');
    });

    test('passes through arguments', () => {
      function format(a, b) {
        return `${this.prefix}${a}${b}`;
      }
      const bound = myBind(format, { prefix: '>' });
      expect(bound('x', 'y')).toBe('>xy');
    });
  });

  describe('myCall', () => {
    test('calls with context without native call', () => {
      function greet(greeting) {
        return `${greeting}, ${this.name}!`;
      }
      expect(myCall(greet, { name: 'World' }, 'Hello')).toBe('Hello, World!');
    });
  });

  describe('borrowMethod', () => {
    test('borrows method from another object', () => {
      const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
      const result = borrowMethod(arrayLike, Array.prototype, 'join', '-');
      expect(result).toBe('a-b-c');
    });

    test('borrows slice from array', () => {
      const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
      const result = borrowMethod(arrayLike, Array.prototype, 'slice', 1);
      expect(result).toEqual([2, 3]);
    });
  });

  describe('bindWithArgs', () => {
    test('binds context and prepends args', () => {
      function greet(greeting, name) {
        return `${greeting}, ${name}! From ${this.sender}`;
      }
      const bound = bindWithArgs(greet, { sender: 'App' }, 'Hello');
      expect(bound('World')).toBe('Hello, World! From App');
    });
  });

  describe('arrayMax', () => {
    test('finds max in array using apply', () => {
      expect(arrayMax([1, 5, 3, 9, 2])).toBe(9);
    });

    test('handles negative numbers', () => {
      expect(arrayMax([-5, -1, -10])).toBe(-1);
    });
  });

  describe('debugThis', () => {
    test('calls function with correct this', () => {
      const obj = {
        value: 42,
        getValue: function() { return this.value; }
      };
      const debugged = debugThis(obj.getValue);
      expect(debugged.call(obj)).toBe(42);
    });

    test('returns function result', () => {
      function add(a, b) { return this.base + a + b; }
      const debugged = debugThis(add);
      expect(debugged.call({ base: 10 }, 1, 2)).toBe(13);
    });
  });

  describe('Function.prototype.myPrototypeBind', () => {
    test('binds this', () => {
      function greet() {
        return `Hi, ${this.name}!`;
      }
      const bound = greet.myPrototypeBind({ name: 'Test' });
      expect(bound()).toBe('Hi, Test!');
    });
  });

  describe('autoBind', () => {
    test('auto-binds all methods', () => {
      const obj = {
        name: 'test',
        getName: function() { return this.name; },
        greet: function() { return `Hello, ${this.name}`; }
      };
      const bound = autoBind(obj);

      const getName = bound.getName;
      const greet = bound.greet;

      expect(getName()).toBe('test');
      expect(greet()).toBe('Hello, test');
    });

    test('preserves non-function properties', () => {
      const obj = { value: 42, getValue: function() { return this.value; } };
      const bound = autoBind(obj);
      expect(bound.value).toBe(42);
    });
  });

  describe('AnimalConstructor and DogConstructor', () => {
    test('DogConstructor chains to AnimalConstructor', () => {
      const dog = new DogConstructor('Rex', 'German Shepherd');
      expect(dog.name).toBe('Rex');
      expect(dog.breed).toBe('German Shepherd');
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('throttles function calls', () => {
      let count = 0;
      const increment = throttle(function() { count++; }, 100);

      increment();
      increment();
      increment();

      expect(count).toBe(1);

      jest.advanceTimersByTime(100);
      increment();

      expect(count).toBe(2);
    });

    test('preserves this context', () => {
      const obj = {
        value: 0,
        increment: throttle(function() { this.value++; }, 100)
      };

      obj.increment();
      expect(obj.value).toBe(1);
    });
  });

});
