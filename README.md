# JavaScript Katas 🥋

A collection of JavaScript exercises designed for intermediate developers coming from Java who want to level up their JS skills.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run all tests (they'll fail initially - that's the point!)
npm test

# Run tests in watch mode (re-runs on file changes)
npm test:watch

# Run tests for a specific kata
npm run test:kata closures

# Run with coverage report
npm test:coverage
```

## 📁 Project Structure

```
javascript-katas/
├── 01-arrays/           # Array methods (map, filter, reduce, etc.)
├── 02-functions/        # Closures, currying, composition
├── 03-promises/         # Async patterns
├── 04-destructuring/    # Destructuring & spread
├── 05-classes/          # Prototypes & classes
├── 06-this-binding/     # this keyword & binding
├── 07-iterators-generators/  # Iterators & generators
├── 08-advanced/         # Proxy, WeakMap, event loop
└── package.json
```

Each kata folder contains:
- `README.md` - Concept explanation, gotchas, and resources
- `exercise.js` - Empty functions for you to implement
- `exercise.test.js` - Jest tests that verify your solution
- `solution.js` - Reference solution (no peeking until you try!)

## 🎯 How to Use

1. **Pick a kata** - Start with `01-arrays/01-map` if you're new
2. **Read the README** - Understand the concept and gotchas
3. **Run the tests** - `npm run test:kata map` to see what's failing
4. **Implement the functions** - Edit `exercise.js`
5. **Iterate** - Run tests until they pass
6. **Compare** - Check `solution.js` to see alternative approaches

## 📊 Kata Overview

### 01 - Arrays (6 katas)
| Kata | Concept | Difficulty |
|------|---------|------------|
| 01-map | Transform arrays | ⭐ |
| 02-filter | Filter elements | ⭐ |
| 03-reduce | Accumulate values | ⭐⭐ |
| 04-flat-flatmap | Flatten nested arrays | ⭐⭐ |
| 05-find-includes | Search arrays | ⭐ |
| 06-sort | Custom sorting | ⭐⭐ |

### 02 - Functions (5 katas)
| Kata | Concept | Difficulty |
|------|---------|------------|
| 01-closures | Closure patterns | ⭐⭐ |
| 02-currying | Curried functions | ⭐⭐⭐ |
| 03-composition | Function composition | ⭐⭐⭐ |
| 04-higher-order | HOF patterns | ⭐⭐ |
| 05-memoization | Caching results | ⭐⭐⭐ |

### 03 - Promises (4 katas)
| Kata | Concept | Difficulty |
|------|---------|------------|
| 01-basics | Creating & chaining | ⭐⭐ |
| 02-all-race | Parallel execution | ⭐⭐ |
| 03-async-await | Modern syntax | ⭐⭐ |
| 04-error-handling | Try/catch patterns | ⭐⭐⭐ |

### 04 - Destructuring (2 katas)
| Kata | Concept | Difficulty |
|------|---------|------------|
| 01-destructuring | Extract values | ⭐ |
| 02-spread-rest | Spread & rest | ⭐⭐ |

### 05 - Classes (3 katas)
| Kata | Concept | Difficulty |
|------|---------|------------|
| 01-prototypes | Prototype chain | ⭐⭐⭐ |
| 02-classes | ES6 classes | ⭐⭐ |
| 03-inheritance | Inheritance patterns | ⭐⭐ |

### 06 - this & Binding (2 katas)
| Kata | Concept | Difficulty |
|------|---------|------------|
| 01-this-keyword | Understanding this | ⭐⭐⭐ |
| 02-bind-call-apply | Explicit binding | ⭐⭐ |

### 07 - Iterators & Generators (2 katas)
| Kata | Concept | Difficulty |
|------|---------|------------|
| 01-iterators | Custom iterators | ⭐⭐⭐ |
| 02-generators | Generator functions | ⭐⭐⭐ |

### 08 - Advanced (4 katas)
| Kata | Concept | Difficulty |
|------|---------|------------|
| 01-proxy-reflect | Metaprogramming | ⭐⭐⭐ |
| 02-weakmap-weakset | Weak references | ⭐⭐⭐ |
| 03-event-loop | Microtasks | ⭐⭐⭐ |
| 04-modules | Import/export | ⭐⭐ |

## 🔄 Java vs JavaScript Mindset Shifts

Coming from Java, here are key mental shifts:

1. **Functions are values** - Pass them around like any other data
2. **No static typing** - Duck typing: if it walks like a duck...
3. **Prototypes, not classes** - Classes are syntactic sugar
4. **Single-threaded async** - No threads, but non-blocking I/O
5. **Truthy/Falsy** - More than just `true`/`false`
6. **`this` is dynamic** - Determined at call time, not definition
7. **Closures everywhere** - Functions remember their birth scope

## 💡 Tips

- **Don't peek at solutions** until you've genuinely tried
- **Use console.log** liberally to understand what's happening
- **Read the MDN links** in each README
- **Experiment in Node REPL** - just type `node` in terminal
- **Break things** - best way to learn!

## 🏆 Suggested Learning Path

1. Arrays (foundation for functional patterns)
2. Destructuring (write cleaner code)
3. Functions (closures & higher-order)
4. this & Binding (understand the quirks)
5. Classes & Prototypes (OOP in JS)
6. Promises (async is everywhere)
7. Iterators & Generators (advanced patterns)
8. Advanced topics (as needed)

Happy coding! 🚀
