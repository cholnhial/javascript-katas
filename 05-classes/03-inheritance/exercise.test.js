const {
  Shape,
  RectangleShape,
  Vehicle,
  Car,
  ElectricCar,
  DataProcessor,
  StringProcessor,
  TimestampMixin,
  Logger,
  TimestampLogger,
  PrefixLogger,
  Animal,
  DogClass
} = require('./exercise');

describe('Inheritance Exercises', () => {

  describe('Shape and RectangleShape', () => {
    test('Shape has name and getInfo', () => {
      const shape = new Shape('Circle');
      expect(shape.name).toBe('Circle');
      expect(shape.getInfo()).toBe('Shape: Circle');
    });

    test('RectangleShape extends Shape', () => {
      const rect = new RectangleShape(5, 3);
      expect(rect instanceof Shape).toBe(true);
      expect(rect.name).toBe('Rectangle');
    });

    test('RectangleShape has area', () => {
      expect(new RectangleShape(4, 5).area()).toBe(20);
    });

    test('RectangleShape overrides getInfo', () => {
      expect(new RectangleShape(4, 5).getInfo()).toBe('Shape: Rectangle (4x5)');
    });
  });

  describe('Vehicle hierarchy', () => {
    test('Vehicle base class', () => {
      const v = new Vehicle('Toyota');
      expect(v.describe()).toBe('A Toyota vehicle');
    });

    test('Car extends Vehicle', () => {
      const car = new Car('Honda', 'Civic');
      expect(car instanceof Vehicle).toBe(true);
      expect(car.brand).toBe('Honda');
      expect(car.model).toBe('Civic');
      expect(car.describe()).toBe('A Honda Civic');
    });

    test('ElectricCar extends Car', () => {
      const ev = new ElectricCar('Tesla', 'Model 3', 310);
      expect(ev instanceof Car).toBe(true);
      expect(ev instanceof Vehicle).toBe(true);
      expect(ev.describe()).toBe('A Tesla Model 3 with 310 mile range');
    });
  });

  describe('DataProcessor template method', () => {
    test('DataProcessor throws on direct use', () => {
      const dp = new DataProcessor();
      expect(() => dp.validate('data')).toThrow('Must implement validate');
      expect(() => dp.transform('data')).toThrow('Must implement transform');
    });

    test('DataProcessor.save works', () => {
      const dp = new DataProcessor();
      expect(dp.save('test')).toBe('Saved: test');
    });

    test('StringProcessor validates strings', () => {
      const sp = new StringProcessor();
      expect(() => sp.validate(123)).toThrow();
      expect(sp.validate('hello')).toBeUndefined();
    });

    test('StringProcessor transforms to uppercase', () => {
      const sp = new StringProcessor();
      expect(sp.transform('hello')).toBe('HELLO');
    });

    test('process chains validate -> transform -> save', () => {
      const sp = new StringProcessor();
      expect(sp.process('hello')).toBe('Saved: HELLO');
    });
  });

  describe('TimestampMixin', () => {
    test('adds timestamps to class', () => {
      class Item {
        constructor(name) {
          this.name = name;
        }
      }

      const TimestampedItem = TimestampMixin(Item);
      const item = new TimestampedItem('test');

      expect(item.name).toBe('test');
      expect(item.createdAt).toBeInstanceOf(Date);
    });

    test('touch updates updatedAt', () => {
      class Item {}
      const TimestampedItem = TimestampMixin(Item);
      const item = new TimestampedItem();

      const before = item.updatedAt;
      item.touch();
      expect(item.updatedAt).not.toBe(before);
    });
  });

  describe('Logger hierarchy', () => {
    test('Logger base class', () => {
      const logger = new Logger();
      expect(logger.log('test')).toBe('[LOG] test');
    });

    test('TimestampLogger prepends timestamp', () => {
      const logger = new TimestampLogger();
      const result = logger.log('test');
      // Should match pattern like [2024-01-01T00:00:00.000Z] [LOG] test
      expect(result).toMatch(/^\[\d{4}-\d{2}-\d{2}T.+\] \[LOG\] test$/);
    });

    test('PrefixLogger adds custom prefix', () => {
      const logger = new PrefixLogger('DEBUG');
      expect(logger.log('test')).toBe('[LOG] [DEBUG] test');
    });
  });

  describe('Animal static inheritance', () => {
    test('Animal static methods', () => {
      expect(Animal.kingdom()).toBe('Animalia');
      const animal = Animal.create('Lion');
      expect(animal.name).toBe('Lion');
    });

    test('DogClass inherits and adds static methods', () => {
      expect(DogClass.kingdom()).toBe('Animalia'); // inherited
      expect(DogClass.species()).toBe('Canis familiaris');
    });

    test('DogClass.create returns DogClass instance', () => {
      const dog = DogClass.create('Rex');
      expect(dog instanceof DogClass).toBe(true);
      expect(dog.name).toBe('Rex');
      expect(dog.bark()).toBe('Woof!');
    });
  });

});
