/**
 * bind, call, and apply Exercises
 *
 * These methods let you explicitly set 'this' for a function.
 * - call: invoke with 'this' and individual args
 * - apply: invoke with 'this' and args array
 * - bind: create new function with bound 'this'
 */

/**
 * Use call to invoke a function with specific 'this'
 * @param {Function} fn - function to call
 * @param {object} context - 'this' context
 * @param  {...any} args - arguments to pass
 * @returns {any}
 */
function invokeWithCall(fn, context, ...args) {
  // Your code here - use fn.call()
}

/**
 * Use apply to invoke a function with specific 'this' and args array
 * @param {Function} fn - function to call
 * @param {object} context - 'this' context
 * @param {any[]} args - arguments array
 * @returns {any}
 */
function invokeWithApply(fn, context, args) {
  // Your code here - use fn.apply()
}

/**
 * Create a bound function
 * @param {Function} fn
 * @param {object} context
 * @returns {Function}
 */
function createBound(fn, context) {
  // Your code here - use fn.bind()
}

/**
 * Implement your own simplified bind
 * @param {Function} fn
 * @param {object} context
 * @returns {Function}
 */
function myBind(fn, context) {
  // Your code here - don't use native bind
  // Return a function that calls fn with context as 'this'
}

/**
 * Implement your own simplified call
 * @param {Function} fn
 * @param {object} context
 * @param  {...any} args
 * @returns {any}
 */
function myCall(fn, context, ...args) {
  // Your code here - don't use native call/apply
  // Hint: temporarily add fn as a method of context
}

/**
 * Borrow a method from one object to use on another
 * @param {object} borrower - object that needs the method
 * @param {object} lender - object that has the method
 * @param {string} methodName - name of method to borrow
 * @param  {...any} args - arguments for the method
 * @returns {any}
 */
function borrowMethod(borrower, lender, methodName, ...args) {
  // Your code here - use call or apply
}

/**
 * Create a function that's partially applied with bound 'this'
 * @param {Function} fn
 * @param {object} context
 * @param  {...any} boundArgs - arguments to prepend
 * @returns {Function}
 */
function bindWithArgs(fn, context, ...boundArgs) {
  // Your code here - bind 'this' AND prepend arguments
}

/**
 * Use apply to find max of array (like Math.max but for arrays)
 * @param {number[]} nums
 * @returns {number}
 */
function arrayMax(nums) {
  // Your code here - use apply with Math.max
}

/**
 * Create a function that logs 'this' before calling original
 * @param {Function} fn
 * @returns {Function}
 */
function debugThis(fn) {
  // Return function that:
  // 1. Logs what 'this' is
  // 2. Calls fn with same 'this' and args
  // 3. Returns fn's result
}

/**
 * Implement Function.prototype.bind partially (basic version)
 * This should work: fn.myBind(context)()
 */
Function.prototype.myPrototypeBind = function(context) {
  // 'this' here is the function being bound
  // Your code here
};

/**
 * Create an object with methods that are all auto-bound
 * @param {object} obj
 * @returns {object}
 */
function autoBind(obj) {
  // Return new object where all function properties are bound to obj
}

/**
 * Use call to chain constructors (pseudo-inheritance without class)
 * Animal constructor sets this.name
 * Dog constructor should call Animal, then set this.breed
 */
function AnimalConstructor(name) {
  this.name = name;
}

function DogConstructor(name, breed) {
  // Your code here - use call to invoke AnimalConstructor with 'this'
  this.breed = breed;
}

/**
 * Create a throttled function that preserves 'this'
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function throttle(fn, delay) {
  // Return function that:
  // - Only calls fn at most once per delay ms
  // - Preserves 'this' context
}

module.exports = {
  invokeWithCall,
  invokeWithApply,
  createBound,
  myBind,
  myCall,
  borrowMethod,
  bindWithArgs,
  arrayMax,
  debugThis,
  autoBind,
  AnimalConstructor,
  DogConstructor,
  throttle
};
