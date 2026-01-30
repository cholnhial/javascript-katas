/**
 * ES6 Classes Exercises
 *
 * Classes are syntactic sugar over prototypes.
 * Coming from Java: familiar syntax but different behavior!
 */

/**
 * Create a basic Rectangle class
 * - constructor takes width and height
 * - area() returns width * height
 * - perimeter() returns 2 * (width + height)
 */
class Rectangle {
  // Your code here
}

/**
 * Create a BankAccount class
 * - constructor takes initial balance (default 0)
 * - deposit(amount) adds to balance
 * - withdraw(amount) subtracts from balance (throw Error if insufficient funds)
 * - getBalance() returns current balance
 */
class BankAccount {
  // Your code here
}

/**
 * Create a class with getter and setter
 * Circle class:
 * - constructor takes radius
 * - get diameter() returns radius * 2
 * - set diameter(d) sets radius to d / 2
 * - get area() returns PI * radius^2
 */
class Circle {
  // Your code here
}

/**
 * Create a class with static methods
 * MathUtils class:
 * - static add(a, b) returns a + b
 * - static multiply(a, b) returns a * b
 * - static clamp(value, min, max) returns value clamped between min and max
 */
class MathUtils {
  // Your code here - use static keyword
}

/**
 * Create a class with private field (using # syntax)
 * Counter class:
 * - private #count field
 * - increment() increases count
 * - decrement() decreases count
 * - getCount() returns count
 * - reset() sets count to 0
 */
class Counter {
  // Your code here - use #count for private field
}

/**
 * Create a class with static factory methods
 * Point class:
 * - constructor takes x, y
 * - static fromArray([x, y]) creates Point from array
 * - static fromObject({x, y}) creates Point from object
 * - static origin() returns new Point(0, 0)
 * - distanceFrom(otherPoint) returns distance between points
 */
class Point {
  // Your code here
}

/**
 * Create a class that implements toString and valueOf
 * Temperature class:
 * - constructor takes celsius value
 * - toFahrenheit() returns converted value
 * - toString() returns "{celsius}°C"
 * - valueOf() returns celsius value (for comparisons)
 */
class Temperature {
  // Your code here
}

/**
 * Create a class with method chaining (fluent interface)
 * StringBuilder class:
 * - append(str) adds string, returns this
 * - prepend(str) adds string to beginning, returns this
 * - toUpperCase() converts to uppercase, returns this
 * - toString() returns final string
 */
class StringBuilder {
  // Your code here
}

/**
 * Create a class with Symbol.iterator for iteration
 * Range class:
 * - constructor takes start and end
 * - [Symbol.iterator]() allows for...of iteration
 */
class Range {
  // Your code here
}

module.exports = {
  Rectangle,
  BankAccount,
  Circle,
  MathUtils,
  Counter,
  Point,
  Temperature,
  StringBuilder,
  Range
};
