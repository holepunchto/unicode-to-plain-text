const test = require('brittle')
const { validateInput } = require('../../dist/utils/validation.js')

test('validateInput - Valid inputs', (t) => {
  t.is(validateInput('hello'), 'hello', 'accepts valid string')
  t.is(validateInput(''), '', 'accepts empty string')
  t.is(validateInput('   '), '   ', 'accepts whitespace string')
  t.is(validateInput('𝐇𝐞𝐥𝐥𝐨'), '𝐇𝐞𝐥𝐥𝐨', 'accepts Unicode strings')
  t.is(validateInput('こんにちは'), 'こんにちは', 'accepts Japanese characters')
})

test('validateInput - Invalid inputs - primitives', (t) => {
  t.exception.all(() => validateInput(null), TypeError, 'throws TypeError for null')
  t.exception.all(() => validateInput(undefined), TypeError, 'throws TypeError for undefined')
  t.exception.all(() => validateInput(123), TypeError, 'throws TypeError for numbers')
  t.exception.all(() => validateInput(true), TypeError, 'throws TypeError for boolean true')
  t.exception.all(() => validateInput(false), TypeError, 'throws TypeError for boolean false')
})

test('validateInput - Invalid inputs - objects', (t) => {
  t.exception.all(() => validateInput({}), TypeError, 'throws TypeError for empty objects')
  t.exception.all(() => validateInput({ text: 'hello' }), TypeError, 'throws TypeError for objects with properties')

  t.exception.all(() => validateInput([]), TypeError, 'throws TypeError for empty arrays')
  t.exception.all(() => validateInput(['hello']), TypeError, 'throws TypeError for arrays with elements')

  t.exception.all(() => validateInput(() => 'hello'), TypeError, 'throws TypeError for functions')

  t.exception.all(() => validateInput(Symbol('test')), TypeError, 'throws TypeError for symbols')
})

test('validateInput - Error messages', (t) => {
  try {
    validateInput(123)
    t.fail('should have thrown')
  } catch (err) {
    t.is(err.message, 'Expected string, got number. Received: 123', 'error message for number')
  }

  try {
    validateInput(null)
    t.fail('should have thrown')
  } catch (err) {
    t.is(err.message, 'Expected string, got null. Received: null', 'error message for null')
  }

  try {
    validateInput({})
    t.fail('should have thrown')
  } catch (err) {
    t.is(err.message, 'Expected string, got object. Received: {}', 'error message for object')
  }
})
