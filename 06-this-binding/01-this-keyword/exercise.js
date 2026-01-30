/**
 * The 'this' Keyword Exercises
 *
 * 'this' in JavaScript is determined by HOW a function is called, not where it's defined.
 * Coming from Java: 'this' always refers to the instance. In JS, it's dynamic!
 */

/**
 * Fix the counter - make increment work correctly
 * The problem: 'this' is lost when method is passed as callback
 * @returns {object} counter with working increment
 */
function createFixedCounter() {
  return {
    count: 0,
    // Fix this method so it works even when detached:
    // const inc = counter.increment;
    // inc(); // should still work
    increment: function() {
      this.count++;
      return this.count;
    }
  };
  // Your fix here - modify the increment method
}

/**
 * Create an object where 'this' works in nested function
 * @returns {object}
 */
function createObjectWithNested() {
  return {
    name: 'outer',
    // getInnerName should return 'outer' using 'this'
    // but it calls an inner function
    getInnerName: function() {
      // Problem: inner function loses 'this'
      function inner() {
        return this.name;
      }
      return inner();
    }
  };
  // Your fix here - fix getInnerName to work correctly
}

/**
 * Create a Person that uses arrow functions to preserve 'this'
 * @param {string} name
 * @returns {object}
 */
function createPersonWithArrow(name) {
  return {
    name,
    friends: ['Alice', 'Bob'],
    // listFriends should return ["Alice is friends with {name}", "Bob is..."]
    // Use arrow function in map to preserve 'this'
    listFriends: function() {
      // Your code here - use arrow function to access this.name
    }
  };
}

/**
 * Create a timer that uses 'this' correctly in setTimeout
 * @returns {object}
 */
function createTimer() {
  return {
    seconds: 0,
    // start() should increment seconds every 100ms
    // stop() should clear the interval
    // getSeconds() returns current seconds
    intervalId: null,

    start: function() {
      // Your code here - make sure 'this' works in setInterval callback
    },

    stop: function() {
      // Your code here
    },

    getSeconds: function() {
      return this.seconds;
    }
  };
}

/**
 * Demonstrate 'this' in different contexts
 * Return an object showing what 'this' refers to in each case
 */
function demonstrateThis() {
  const obj = {
    name: 'myObject',

    // Regular method - 'this' is the object
    regularMethod: function() {
      return this.name;
    },

    // Arrow method - 'this' is lexically bound (from where function is defined)
    arrowMethod: () => {
      return typeof this; // What will this be?
    },

    // Method that returns a function
    getRegularFunction: function() {
      return function() {
        return this; // What will this be when called?
      };
    },

    // Method that returns an arrow function
    getArrowFunction: function() {
      return () => {
        return this.name; // Arrow preserves 'this' from getArrowFunction
      };
    }
  };

  return obj;
}

/**
 * Fix a class method to work as an event handler
 * Event handlers lose 'this' context
 */
class Button {
  constructor(label) {
    this.label = label;
    this.clickCount = 0;
    // Your code here - bind handleClick in constructor OR use arrow function
  }

  // This method should work even when passed as: element.onclick = button.handleClick
  handleClick() {
    this.clickCount++;
    return `${this.label} clicked ${this.clickCount} times`;
  }
}

/**
 * Create object with method that can be safely detached
 * @param {string} greeting
 * @returns {object}
 */
function createGreeter(greeting) {
  // Return object where greet() can be detached and still work
  // const greet = greeter.greet;
  // greet('World'); // should still work
  return {
    greeting,
    greet: function(name) {
      return `${this.greeting}, ${name}!`;
    }
  };
  // Your fix here
}

/**
 * Create a calculator that chains methods but preserves 'this'
 * @returns {object}
 */
function createCalculator() {
  return {
    value: 0,

    add: function(n) {
      this.value += n;
      return this; // Return this for chaining
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

    // Create a delayed add that works correctly with 'this'
    delayedAdd: function(n, ms) {
      // Your code here - return a promise that adds n after ms milliseconds
      // Make sure 'this' is correct in the setTimeout callback
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
