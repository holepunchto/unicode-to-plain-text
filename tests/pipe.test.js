const test = require('brittle')
const { pipe } = require('../dist/pipe.js')

test('pipe - single function composition', (t) => {
  const identity = pipe((x) => x)
  t.is(identity(5), 5, 'identity function works')

  const double = pipe((x) => x * 2)
  t.is(double(5), 10, 'single transformation works')
})

test('pipe - two functions', (t) => {
  const addThenDouble = pipe(
    (x) => x + 1,
    (x) => x * 2
  )
  t.is(addThenDouble(5), 12, 'composes two functions correctly')
})

test('pipe - three functions', (t) => {
  const transform = pipe(
    (x) => x + 1,
    (x) => x * 2,
    (x) => x - 3
  )
  t.is(transform(5), 9, 'composes three functions correctly')
})

test('pipe - string transformations', (t) => {
  const transform = pipe(
    (s) => s.toUpperCase(),
    (s) => s.trim(),
    (s) => s.replace(/\s+/g, '_')
  )
  t.is(transform('  hello world  '), 'HELLO_WORLD', 'transforms strings correctly')
})

test('pipe - empty string handling', (t) => {
  const transform = pipe(
    (s) => s.trim(),
    (s) => s.toUpperCase()
  )
  t.is(transform(''), '', 'handles empty strings')
})

test('pipe - execution order', (t) => {
  const results = []
  const track = pipe(
    (x) => {
      results.push(1)
      return x + 1
    },
    (x) => {
      results.push(2)
      return x * 2
    },
    (x) => {
      results.push(3)
      return x - 3
    }
  )
  track(5)
  t.alike(results, [1, 2, 3], 'executes functions left to right')
})

test('pipe - type transformations', (t) => {
  const transform = pipe(
    (x) => x.toString(),
    (x) => x.length,
    (x) => x > 0
  )
  t.is(transform(123), true, 'handles type transformations')
  t.is(transform(0), true, 'handles zero')
})

test('pipe - arrays', (t) => {
  const transform = pipe(
    (arr) => arr.map((x) => x * 2),
    (arr) => arr.filter((x) => x > 5),
    (arr) => arr.length
  )
  t.is(transform([1, 2, 3, 4, 5]), 3, 'works with arrays')
})
