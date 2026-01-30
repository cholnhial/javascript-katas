/**
 * bind, call, apply Solutions
 */

function invokeWithCall(fn, context, ...args) {
  return fn.call(context, ...args);
}

function invokeWithApply(fn, context, args) {
  return fn.apply(context, args);
}

function createBound(fn, context) {
  return fn.bind(context);
}

function myBind(fn, context) {
  return function(...args) {
    return fn.apply(context, args);
  };
}

function myCall(fn, context, ...args) {
  const key = Symbol('fn');
  context[key] = fn;
  const result = context[key](...args);
  delete context[key];
  return result;
}

function borrowMethod(borrower, lender, methodName, ...args) {
  return lender[methodName].call(borrower, ...args);
}

function bindWithArgs(fn, context, ...boundArgs) {
  return function(...args) {
    return fn.apply(context, [...boundArgs, ...args]);
  };
}

function arrayMax(nums) {
  return Math.max.apply(null, nums);
}

function debugThis(fn) {
  return function(...args) {
    console.log('this is:', this);
    return fn.apply(this, args);
  };
}

Function.prototype.myPrototypeBind = function(context) {
  const fn = this;
  return function(...args) {
    return fn.apply(context, args);
  };
};

function autoBind(obj) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'function') {
      result[key] = obj[key].bind(obj);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

function AnimalConstructor(name) {
  this.name = name;
}

function DogConstructor(name, breed) {
  AnimalConstructor.call(this, name);
  this.breed = breed;
}

function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
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
