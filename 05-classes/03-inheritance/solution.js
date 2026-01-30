/**
 * Inheritance Solutions
 */

class Shape {
  constructor(name) {
    this.name = name;
  }

  getInfo() {
    return `Shape: ${this.name}`;
  }
}

class RectangleShape extends Shape {
  constructor(width, height) {
    super('Rectangle');
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  getInfo() {
    return `Shape: Rectangle (${this.width}x${this.height})`;
  }
}

class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }

  describe() {
    return `A ${this.brand} vehicle`;
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super(brand);
    this.model = model;
  }

  describe() {
    return `A ${this.brand} ${this.model}`;
  }
}

class ElectricCar extends Car {
  constructor(brand, model, range) {
    super(brand, model);
    this.range = range;
  }

  describe() {
    return `A ${this.brand} ${this.model} with ${this.range} mile range`;
  }
}

class DataProcessor {
  process(data) {
    this.validate(data);
    const transformed = this.transform(data);
    return this.save(transformed);
  }

  validate(data) {
    throw new Error('Must implement validate');
  }

  transform(data) {
    throw new Error('Must implement transform');
  }

  save(data) {
    return `Saved: ${data}`;
  }
}

class StringProcessor extends DataProcessor {
  validate(data) {
    if (typeof data !== 'string') {
      throw new Error('Data must be a string');
    }
  }

  transform(data) {
    return data.toUpperCase();
  }
}

function TimestampMixin(BaseClass) {
  return class extends BaseClass {
    constructor(...args) {
      super(...args);
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }

    touch() {
      this.updatedAt = new Date();
    }
  };
}

class Logger {
  log(message) {
    return `[LOG] ${message}`;
  }
}

class TimestampLogger extends Logger {
  log(message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${super.log(message)}`;
  }
}

class PrefixLogger extends Logger {
  constructor(prefix) {
    super();
    this.prefix = prefix;
  }

  log(message) {
    return `[LOG] [${this.prefix}] ${message}`;
  }
}

class Animal {
  constructor(name) {
    this.name = name;
  }

  static kingdom() {
    return 'Animalia';
  }

  static create(name) {
    return new this(name);
  }
}

class DogClass extends Animal {
  static species() {
    return 'Canis familiaris';
  }

  bark() {
    return 'Woof!';
  }
}

module.exports = {
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
};
