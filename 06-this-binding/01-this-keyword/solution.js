/**
 * 'this' Keyword Solutions
 */

function createFixedCounter() {
  const counter = {
    count: 0
  };
  // Use arrow function to capture 'counter' via closure
  counter.increment = () => {
    counter.count++;
    return counter.count;
  };
  return counter;
}

function createObjectWithNested() {
  return {
    name: 'outer',
    getInnerName: function() {
      // Use arrow function to preserve 'this'
      const inner = () => {
        return this.name;
      };
      return inner();
    }
  };
}

function createPersonWithArrow(name) {
  return {
    name,
    friends: ['Alice', 'Bob'],
    listFriends: function() {
      // Arrow function preserves 'this' from listFriends
      return this.friends.map(friend => `${friend} is friends with ${this.name}`);
    }
  };
}

function createTimer() {
  return {
    seconds: 0,
    intervalId: null,

    start: function() {
      // Arrow function preserves 'this'
      this.intervalId = setInterval(() => {
        this.seconds++;
      }, 100);
    },

    stop: function() {
      clearInterval(this.intervalId);
    },

    getSeconds: function() {
      return this.seconds;
    }
  };
}

function demonstrateThis() {
  const obj = {
    name: 'myObject',

    regularMethod: function() {
      return this.name;
    },

    arrowMethod: () => {
      return typeof this;
    },

    getRegularFunction: function() {
      return function() {
        return this;
      };
    },

    getArrowFunction: function() {
      return () => {
        return this.name;
      };
    }
  };

  return obj;
}

class Button {
  constructor(label) {
    this.label = label;
    this.clickCount = 0;
    // Bind the method to this instance
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.clickCount++;
    return `${this.label} clicked ${this.clickCount} times`;
  }
}

function createGreeter(greeting) {
  const obj = {
    greeting
  };
  // Use arrow function to capture obj
  obj.greet = (name) => {
    return `${obj.greeting}, ${name}!`;
  };
  return obj;
}

function createCalculator() {
  return {
    value: 0,

    add: function(n) {
      this.value += n;
      return this;
    },

    subtract: function(n) {
      this.value -= n;
      return this;
    },

    multiply: function(n) {
      this.value *= n;
      return this;
    },

    getValue: function() {
      return this.value;
    },

    delayedAdd: function(n, ms) {
      return new Promise(resolve => {
        setTimeout(() => {
          this.value += n;
          resolve(this.value);
        }, ms);
      });
    }
  };
}

module.exports = {
  createFixedCounter,
  createObjectWithNested,
  createPersonWithArrow,
  createTimer,
  demonstrateThis,
  Button,
  createGreeter,
  createCalculator
};
