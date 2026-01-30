const {
  compose,
  pipe,
  slugify,
  processNumber,
  getActiveNames,
  composeAsync,
  pipeAsync,
  tap,
  when,
  fork
} = require('./exercise');

describe('Function Composition Exercises', () => {
  
  describe('compose', () => {
    test('composes right-to-left', () => {
      const add1 = x => x + 1;
      const double = x => x * 2;
      expect(compose(add1, double)(5)).toBe(11); // double(5)=10, add1(10)=11
    });

    test('handles single function', () => {
      const add1 = x => x + 1;
      expect(compose(add1)(5)).toBe(6);
    });

    test('handles no functions', () => {
      expect(compose()(5)).toBe(5);
    });

    test('composes three functions', () => {
      const add1 = x => x + 1;
      const double = x => x * 2;
      const square = x => x * x;
      // square(5)=25, double(25)=50, add1(50)=51
      expect(compose(add1, double, square)(5)).toBe(51);
    });
  });

  describe('pipe', () => {
    test('pipes left-to-right', () => {
      const add1 = x => x + 1;
      const double = x => x * 2;
      expect(pipe(add1, double)(5)).toBe(12); // add1(5)=6, double(6)=12
    });

    test('handles single function', () => {
      const add1 = x => x + 1;
      expect(pipe(add1)(5)).toBe(6);
    });

    test('handles no functions', () => {
      expect(pipe()(5)).toBe(5);
    });
  });

  describe('slugify', () => {
    test('creates slug from string', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    test('handles special characters', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
    });

    test('handles extra spaces', () => {
      expect(slugify('  Hello   World  ')).toBe('hello-world');
    });

    test('handles mixed case', () => {
      expect(slugify('HeLLo WoRLD')).toBe('hello-world');
    });
  });

  describe('processNumber', () => {
    test('applies transformations', () => {
      expect(processNumber(5)).toBe(25);  // (5+10)*2-5 = 25
    });

    test('handles zero', () => {
      expect(processNumber(0)).toBe(15);  // (0+10)*2-5 = 15
    });

    test('handles negative', () => {
      expect(processNumber(-5)).toBe(5);  // (-5+10)*2-5 = 5
    });
  });

  describe('getActiveNames', () => {
    test('filters and transforms', () => {
      const users = [
        { name: 'alice', active: true },
        { name: 'bob', active: false },
        { name: 'charlie', active: true }
      ];
      expect(getActiveNames(users)).toEqual(['ALICE', 'CHARLIE']);
    });

    test('handles empty array', () => {
      expect(getActiveNames([])).toEqual([]);
    });

    test('handles no active users', () => {
      const users = [{ name: 'bob', active: false }];
      expect(getActiveNames(users)).toEqual([]);
    });
  });

  describe('composeAsync', () => {
    test('composes async functions right-to-left', async () => {
      const addAsync = async x => x + 1;
      const doubleAsync = async x => x * 2;
      // double(5)=10, add(10)=11
      expect(await composeAsync(addAsync, doubleAsync)(5)).toBe(11);
    });

    test('handles single async function', async () => {
      const addAsync = async x => x + 1;
      expect(await composeAsync(addAsync)(5)).toBe(6);
    });
  });

  describe('pipeAsync', () => {
    test('pipes async functions left-to-right', async () => {
      const addAsync = async x => x + 1;
      const doubleAsync = async x => x * 2;
      // add(5)=6, double(6)=12
      expect(await pipeAsync(addAsync, doubleAsync)(5)).toBe(12);
    });

    test('handles mixed sync and async', async () => {
      const sync = x => x + 1;
      const async_ = async x => x * 2;
      expect(await pipeAsync(sync, async_)(5)).toBe(12);
    });
  });

  describe('tap', () => {
    test('executes side effect and passes value through', () => {
      let captured;
      const logged = tap(x => { captured = x; });
      
      const result = pipe(
        x => x + 1,
        logged,
        x => x * 2
      )(5);
      
      expect(captured).toBe(6);
      expect(result).toBe(12);
    });

    test('value unchanged even if side effect returns something', () => {
      const result = tap(() => 'ignored')(42);
      expect(result).toBe(42);
    });
  });

  describe('when', () => {
    test('applies function when predicate is true', () => {
      const doubleIfPositive = when(x => x > 0, x => x * 2);
      expect(doubleIfPositive(5)).toBe(10);
    });

    test('passes through when predicate is false', () => {
      const doubleIfPositive = when(x => x > 0, x => x * 2);
      expect(doubleIfPositive(-5)).toBe(-5);
    });

    test('works in pipeline', () => {
      const process = pipe(
        x => x + 1,
        when(x => x > 5, x => x * 2)
      );
      expect(process(5)).toBe(12);  // 5+1=6, 6>5 so *2=12
      expect(process(3)).toBe(4);   // 3+1=4, 4<5 so unchanged
    });
  });

  describe('fork', () => {
    test('applies multiple transforms', () => {
      const stats = fork(
        arr => Math.min(...arr),
        arr => Math.max(...arr),
        arr => arr.length
      );
      expect(stats([1, 2, 3, 4, 5])).toEqual([1, 5, 5]);
    });

    test('handles single function', () => {
      const getLength = fork(arr => arr.length);
      expect(getLength([1, 2, 3])).toEqual([3]);
    });

    test('works with objects', () => {
      const extract = fork(
        obj => obj.name,
        obj => obj.age
      );
      expect(extract({ name: 'Alice', age: 30 })).toEqual(['Alice', 30]);
    });
  });

});
