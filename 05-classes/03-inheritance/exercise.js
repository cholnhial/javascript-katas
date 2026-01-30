/**
 * Inheritance Exercises
 *
 * ES6 class inheritance uses extends and super.
 * Coming from Java: similar syntax, but remember JS uses prototype chain.
 */

/**
 * Create Shape base class and Rectangle subclass
 * Shape:
 * - constructor takes name
 * - getInfo() returns "Shape: {name}"
 *
 * RectangleShape extends Shape:
 * - constructor takes width, height
 * - name should be "Rectangle"
 * - area() returns width * height
 * - getInfo() returns "Shape: Rectangle (WxH)"
 */
class Shape {
  // Your code here
}

class RectangleShape extends Shape {
  // Your code here - use super
}

/**
 * Create Vehicle -> Car -> ElectricCar hierarchy
 *
 * Vehicle:
 * - constructor takes brand
 * - describe() returns "A {brand} vehicle"
 *
 * Car extends Vehicle:
 * - constructor takes brand, model
 * - describe() returns "A {brand} {model}"
 *
 * ElectricCar extends Car:
 * - constructor takes brand, model, range (miles)
 * - describe() returns "A {brand} {model} with {range} mile range"
 */
class Vehicle {
  // Your code here
}

class Car extends Vehicle {
  // Your code here
}

class ElectricCar extends Car {
  // Your code here
}

/**
 * Create abstract-like base class with template method pattern
 *
 * DataProcessor:
 * - process(data) method that: validates, transforms, saves (in order)
 * - validate(data) - throw "Must implement validate" if called directly
 * - transform(data) - throw "Must implement transform" if called directly
 * - save(data) - returns "Saved: {data}"
 *
 * StringProcessor extends DataProcessor:
 * - validate(data) - throw if not a string
 * - transform(data) - returns data.toUpperCase()
 */
class DataProcessor {
  // Your code here
}

class StringProcessor extends DataProcessor {
  // Your code here
}

/**
 * Create mixin pattern with class inheritance
 *
 * Timestamps mixin adds:
 * - createdAt property set in constructor
 * - updatedAt property
 * - touch() method that updates updatedAt
 *
 * Create: TimestampMixin(BaseClass) function that returns extended class
 */
function TimestampMixin(BaseClass) {
  // Your code here - return class that extends BaseClass
}

/**
 * Create a class hierarchy with method that calls super at different points
 *
 * Logger:
 * - log(message) returns "[LOG] {message}"
 *
 * TimestampLogger extends Logger:
 * - log(message) returns "[{timestamp}] [LOG] {message}"
 *   where timestamp is new Date().toISOString()
 *
 * PrefixLogger extends Logger:
 * - constructor takes prefix
 * - log(message) returns "[LOG] [{prefix}] {message}"
 */
class Logger {
  // Your code here
}

class TimestampLogger extends Logger {
  // Your code here
}

class PrefixLogger extends Logger {
  // Your code here
}

/**
 * Demonstrate static method inheritance
 *
 * Animal:
 * - static kingdom() returns "Animalia"
 * - static create(name) returns new instance
 * - constructor takes name
 *
 * Dog extends Animal:
 * - static species() returns "Canis familiaris"
 * - bark() returns "Woof!"
 */
class Animal {
  // Your code here
}

class DogClass extends Animal {
  // Your code here
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
