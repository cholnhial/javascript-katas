/**
 * Prototypes Solutions
 */

function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}
Dog.prototype.bark = function() {
  return 'Woof!';
};
Dog.prototype.describe = function() {
  return `${this.name} is a ${this.breed}`;
};

function addArrayFirst() {
  Array.prototype.first = function() {
    return this[0];
  };
}

function createFrom(proto, props) {
  const obj = Object.create(proto);
  Object.assign(obj, props);
  return obj;
}

function hasOwnProp(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function getProto(obj) {
  return Object.getPrototypeOf(obj);
}

function isInPrototypeChain(obj, proto) {
  return proto.isPrototypeOf(obj);
}

function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return '...';
};

function DogAnimal(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}
DogAnimal.prototype = Object.create(Animal.prototype);
DogAnimal.prototype.constructor = DogAnimal;
DogAnimal.prototype.speak = function() {
  return 'Woof!';
};

function applyMixin(Target, mixin) {
  Object.assign(Target.prototype, mixin);
}

function createCounterClass() {
  return function Counter() {
    let count = 0;

    this.increment = function() {
      count++;
    };

    this.decrement = function() {
      count--;
    };

    this.getCount = function() {
      return count;
    };
  };
}

module.exports = {
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
};
