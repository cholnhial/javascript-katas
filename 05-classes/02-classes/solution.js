/**
 * ES6 Classes Solutions
 */

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}

class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  get diameter() {
    return this.radius * 2;
  }

  set diameter(d) {
    this.radius = d / 2;
  }

  get area() {
    return Math.PI * this.radius * this.radius;
  }
}

class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}

class Counter {
  #count = 0;

  increment() {
    this.#count++;
  }

  decrement() {
    this.#count--;
  }

  getCount() {
    return this.#count;
  }

  reset() {
    this.#count = 0;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromArray([x, y]) {
    return new Point(x, y);
  }

  static fromObject({ x, y }) {
    return new Point(x, y);
  }

  static origin() {
    return new Point(0, 0);
  }

  distanceFrom(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  toFahrenheit() {
    return this.celsius * 9/5 + 32;
  }

  toString() {
    return `${this.celsius}°C`;
  }

  valueOf() {
    return this.celsius;
  }
}

class StringBuilder {
  constructor() {
    this.str = '';
  }

  append(s) {
    this.str += s;
    return this;
  }

  prepend(s) {
    this.str = s + this.str;
    return this;
  }

  toUpperCase() {
    this.str = this.str.toUpperCase();
    return this;
  }

  toString() {
    return this.str;
  }
}

class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
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
