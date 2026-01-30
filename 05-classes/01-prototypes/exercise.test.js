const {
  Person,
  Dog,
  addArrayFirst,
  createFrom,
  hasOwnProp,
  getProto,
  isInPrototypeChain,
  Animal,
  DogAnimal,
  applyMixin,
  createCounterClass
} = require('./exercise');

describe('Prototypes Exercises', () => {

  describe('Person', () => {
    test('creates person with name', () => {
      const person = new Person('Alice');
      expect(person.name).toBe('Alice');
    });

    test('has greet on prototype', () => {
      const person = new Person('Bob');
      expect(person.greet()).toBe("Hello, I'm Bob");
      expect(person.hasOwnProperty('greet')).toBe(false);
    });

    test('multiple instances share prototype method', () => {
      const p1 = new Person('A');
      const p2 = new Person('B');
      expect(p1.greet).toBe(p2.greet);
    });
  });

  describe('Dog', () => {
    test('creates dog with name and breed', () => {
      const dog = new Dog('Rex', 'German Shepherd');
      expect(dog.name).toBe('Rex');
      expect(dog.breed).toBe('German Shepherd');
    });

    test('has bark method', () => {
      const dog = new Dog('Rex', 'Husky');
      expect(dog.bark()).toBe('Woof!');
    });

    test('has describe method', () => {
      const dog = new Dog('Rex', 'Husky');
      expect(dog.describe()).toBe('Rex is a Husky');
    });
  });

  describe('addArrayFirst', () => {
    beforeEach(() => {
      addArrayFirst();
    });

    afterEach(() => {
      delete Array.prototype.first;
    });

    test('adds first method to arrays', () => {
      expect([1, 2, 3].first()).toBe(1);
    });

    test('returns undefined for empty array', () => {
      expect([].first()).toBeUndefined();
    });
  });

  describe('createFrom', () => {
    test('creates object with prototype', () => {
      const proto = { greet: () => 'hello' };
      const obj = createFrom(proto, { name: 'test' });

      expect(obj.name).toBe('test');
      expect(obj.greet()).toBe('hello');
      expect(Object.getPrototypeOf(obj)).toBe(proto);
    });

    test('own properties are enumerable', () => {
      const obj = createFrom({}, { a: 1, b: 2 });
      expect(Object.keys(obj)).toEqual(['a', 'b']);
    });
  });

  describe('hasOwnProp', () => {
    test('returns true for own property', () => {
      const obj = { a: 1 };
      expect(hasOwnProp(obj, 'a')).toBe(true);
    });

    test('returns false for inherited property', () => {
      const proto = { inherited: true };
      const obj = Object.create(proto);
      expect(hasOwnProp(obj, 'inherited')).toBe(false);
    });

    test('returns false for non-existent property', () => {
      expect(hasOwnProp({}, 'missing')).toBe(false);
    });
  });

  describe('getProto', () => {
    test('gets prototype of object', () => {
      const proto = { x: 1 };
      const obj = Object.create(proto);
      expect(getProto(obj)).toBe(proto);
    });

    test('returns Object.prototype for plain object', () => {
      expect(getProto({})).toBe(Object.prototype);
    });
  });

  describe('isInPrototypeChain', () => {
    test('returns true for direct prototype', () => {
      const proto = {};
      const obj = Object.create(proto);
      expect(isInPrototypeChain(obj, proto)).toBe(true);
    });

    test('returns true for ancestor prototype', () => {
      const grandpa = {};
      const parent = Object.create(grandpa);
      const child = Object.create(parent);
      expect(isInPrototypeChain(child, grandpa)).toBe(true);
    });

    test('returns false for unrelated object', () => {
      const obj = {};
      const other = {};
      expect(isInPrototypeChain(obj, other)).toBe(false);
    });
  });

  describe('Animal and DogAnimal', () => {
    test('Animal has name and speak', () => {
      const animal = new Animal('Generic');
      expect(animal.name).toBe('Generic');
      expect(animal.speak()).toBe('...');
    });

    test('DogAnimal extends Animal', () => {
      const dog = new DogAnimal('Rex', 'Husky');
      expect(dog.name).toBe('Rex');
      expect(dog.breed).toBe('Husky');
      expect(dog instanceof Animal).toBe(true);
    });

    test('DogAnimal overrides speak', () => {
      const dog = new DogAnimal('Rex', 'Husky');
      expect(dog.speak()).toBe('Woof!');
    });
  });

  describe('applyMixin', () => {
    test('adds methods to prototype', () => {
      function MyClass() {}
      const mixin = {
        foo: function() { return 'foo'; },
        bar: function() { return 'bar'; }
      };

      applyMixin(MyClass, mixin);

      const instance = new MyClass();
      expect(instance.foo()).toBe('foo');
      expect(instance.bar()).toBe('bar');
    });

    test('methods are on prototype not instance', () => {
      function MyClass() {}
      applyMixin(MyClass, { test: () => 'test' });

      const instance = new MyClass();
      expect(instance.hasOwnProperty('test')).toBe(false);
    });
  });

  describe('createCounterClass', () => {
    test('creates counter with private state', () => {
      const Counter = createCounterClass();
      const counter = new Counter();

      expect(counter.getCount()).toBe(0);
      counter.increment();
      expect(counter.getCount()).toBe(1);
      counter.increment();
      counter.increment();
      expect(counter.getCount()).toBe(3);
      counter.decrement();
      expect(counter.getCount()).toBe(2);
    });

    test('count is not directly accessible', () => {
      const Counter = createCounterClass();
      const counter = new Counter();
      expect(counter.count).toBeUndefined();
    });

    test('instances are independent', () => {
      const Counter = createCounterClass();
      const c1 = new Counter();
      const c2 = new Counter();

      c1.increment();
      c1.increment();
      c2.increment();

      expect(c1.getCount()).toBe(2);
      expect(c2.getCount()).toBe(1);
    });
  });

});
