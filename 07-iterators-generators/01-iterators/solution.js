/**
 * Iterators Solutions
 */

function createRangeIterator(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { value: undefined, done: true };
    }
  };
}

function createIterableRange(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current <= end) {
            return { value: current++, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  };
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const node = { value, next: null };
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  [Symbol.iterator]() {
    let current = this.head;
    return {
      next() {
        if (current) {
          const value = current.value;
          current = current.next;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
}

function createFibonacciIterator() {
  let [a, b] = [0, 1];
  return {
    next() {
      const value = a;
      [a, b] = [b, a + b];
      return { value, done: false };
    }
  };
}

function createResettableIterator(items) {
  let index = 0;
  return {
    next() {
      if (index < items.length) {
        return { value: items[index++], done: false };
      }
      return { value: undefined, done: true };
    },
    reset() {
      index = 0;
    }
  };
}

function concat(...iterables) {
  return {
    [Symbol.iterator]() {
      let iterableIndex = 0;
      let currentIterator = iterables[0]?.[Symbol.iterator]();

      return {
        next() {
          while (iterableIndex < iterables.length) {
            const result = currentIterator.next();
            if (!result.done) {
              return result;
            }
            iterableIndex++;
            if (iterableIndex < iterables.length) {
              currentIterator = iterables[iterableIndex][Symbol.iterator]();
            }
          }
          return { value: undefined, done: true };
        }
      };
    }
  };
}

function mapIterable(iterable, fn) {
  return {
    [Symbol.iterator]() {
      const iterator = iterable[Symbol.iterator]();
      return {
        next() {
          const result = iterator.next();
          if (result.done) {
            return result;
          }
          return { value: fn(result.value), done: false };
        }
      };
    }
  };
}

function filterIterable(iterable, predicate) {
  return {
    [Symbol.iterator]() {
      const iterator = iterable[Symbol.iterator]();
      return {
        next() {
          while (true) {
            const result = iterator.next();
            if (result.done) {
              return result;
            }
            if (predicate(result.value)) {
              return result;
            }
          }
        }
      };
    }
  };
}

function take(iterable, n) {
  return {
    [Symbol.iterator]() {
      const iterator = iterable[Symbol.iterator]();
      let count = 0;
      return {
        next() {
          if (count >= n) {
            return { value: undefined, done: true };
          }
          count++;
          return iterator.next();
        }
      };
    }
  };
}

function zip(...iterables) {
  return {
    [Symbol.iterator]() {
      const iterators = iterables.map(it => it[Symbol.iterator]());
      return {
        next() {
          const results = iterators.map(it => it.next());
          if (results.some(r => r.done)) {
            return { value: undefined, done: true };
          }
          return { value: results.map(r => r.value), done: false };
        }
      };
    }
  };
}

function createAsyncIterable(items, delay) {
  return {
    [Symbol.asyncIterator]() {
      let index = 0;
      return {
        async next() {
          if (index >= items.length) {
            return { value: undefined, done: true };
          }
          await new Promise(r => setTimeout(r, delay));
          return { value: items[index++], done: false };
        }
      };
    }
  };
}

module.exports = {
  createRangeIterator,
  createIterableRange,
  LinkedList,
  createFibonacciIterator,
  createResettableIterator,
  concat,
  mapIterable,
  filterIterable,
  take,
  zip,
  createAsyncIterable
};
