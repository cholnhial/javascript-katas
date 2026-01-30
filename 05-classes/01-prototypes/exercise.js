/**
 * Prototypes Exercises
 *
 * JavaScript uses prototypal inheritance, not classical inheritance.
 * Every object has a prototype chain for property lookup.
 * Coming from Java: forget classes - think delegation chains.
 */

/**
 * Create a constructor function for Person with name property
 * Add a greet method to the prototype
 * @constructor
 * @param {string} name
 */
function Person(name) {
  // Your code here - set this.name
}
// Add Person.prototype.greet = function() that returns "Hello, I'm {name}"

/**
 * Create a Dog constructor with name and breed
 * Add bark() to prototype that returns "Woof!"
 * Add describe() that returns "{name} is a {breed}"
 */
function Dog(name, breed) {
  // Your code here
}
// Add prototype methods

/**
 * Add a method to ALL arrays (Array.prototype)
 * first() - returns first element or undefined
 * DO NOT MODIFY - just uncomment and use
 */
function addArrayFirst() {
  // Your code here - add Array.prototype.first
}

/**
 * Create an object that inherits from another using Object.create
 * @param {object} proto - prototype object
 * @param {object} props - own properties to add
 * @returns {object}
 */
function createFrom(proto, props) {
  // Your code here - use Object.create
}

/**
 * Check if object has OWN property (not inherited)
 * @param {object} obj
 * @param {string} prop
 * @returns {boolean}
 */
function hasOwnProp(obj, prop) {
  // Your code here
}

/**
 * Get the prototype of an object
 * @param {object} obj
 * @returns {object|null}
 */
function getProto(obj) {
  // Your code here
}

/**
 * Check if proto is in obj's prototype chain
 * @param {object} obj
 * @param {object} proto
 * @returns {boolean}
 */
function isInPrototypeChain(obj, proto) {
  // Your code here - can use isPrototypeOf or manual chain walking
}

/**
 * Create a constructor function with inheritance
 * Animal -> Dog (Dog extends Animal)
 * Animal has: name, speak() returns "..."
 * Dog adds: breed, speak() returns "Woof!"
 */
function Animal(name) {
  // Your code here
}
// Add Animal.prototype.speak

function DogAnimal(name, breed) {
  // Your code here - call Animal constructor
}
// Set up prototype chain and add speak override

/**
 * Mixin pattern - add methods from one object to another's prototype
 * @param {Function} Target - constructor function
 * @param {object} mixin - object with methods to add
 */
function applyMixin(Target, mixin) {
  // Your code here - copy methods to Target.prototype
}

/**
 * Create a simple class-like structure using closures (private state)
 * Returns constructor that creates objects with private count
 * @returns {Function} Constructor for Counter objects
 */
function createCounterClass() {
  // Your code here - return a constructor function
  // Created objects should have increment(), decrement(), getCount()
  // count should be private (not accessible as property)
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
