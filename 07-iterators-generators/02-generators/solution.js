/**
 * Generators Solutions
 */

function* oneTwoThree() {
  yield 1;
  yield 2;
  yield 3;
}

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function* counter(start = 0) {
  let n = start;
  while (true) {
    yield n++;
  }
}

function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* cycle(items) {
  while (true) {
    for (const item of items) {
      yield item;
    }
  }
}

function* take(gen, n) {
  let count = 0;
  for (const value of gen) {
    if (count >= n) break;
    yield value;
    count++;
  }
}

function* map(gen, fn) {
  for (const value of gen) {
    yield fn(value);
  }
}

function* filter(gen, predicate) {
  for (const value of gen) {
    if (predicate(value)) {
      yield value;
    }
  }
}

function* unique(gen) {
  const seen = new Set();
  for (const value of gen) {
    if (!seen.has(value)) {
      seen.add(value);
      yield value;
    }
  }
}

function* flatten(arrays) {
  for (const arr of arrays) {
    for (const item of arr) {
      yield item;
    }
  }
}

function* concat(...iterables) {
  for (const iterable of iterables) {
    yield* iterable;
  }
}

function* accumulator() {
  let total = 0;
  while (true) {
    const value = yield total;
    if (value !== undefined) {
      total += value;
    }
  }
}

async function* delayedItems(items, delay) {
  for (const item of items) {
    await new Promise(r => setTimeout(r, delay));
    yield item;
  }
}

function* stateMachine() {
  let state = 'idle';

  while (state !== 'stopped') {
    const command = yield state;

    switch (state) {
      case 'idle':
        if (command === 'start') state = 'running';
        break;
      case 'running':
        if (command === 'pause') state = 'paused';
        else if (command === 'stop') state = 'stopped';
        break;
      case 'paused':
        if (command === 'resume') state = 'running';
        else if (command === 'stop') state = 'stopped';
        break;
    }
  }

  yield state; // yield 'stopped' one final time
}

async function* paginate(fetchPage) {
  let hasMore = true;

  while (hasMore) {
    const page = await fetchPage();
    for (const item of page.data) {
      yield item;
    }
    hasMore = page.hasMore;
  }
}

module.exports = {
  oneTwoThree,
  range,
  counter,
  fibonacci,
  cycle,
  take,
  map,
  filter,
  unique,
  flatten,
  concat,
  accumulator,
  delayedItems,
  stateMachine,
  paginate
};
