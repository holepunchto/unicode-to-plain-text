const test = require('brittle')
const { normalizeSpaces } = require('../dist/normalizeSpaces')

test('normalizeSpaces - basic whitespace', (t) => {
  t.is(normalizeSpaces('hello world'), 'hello world', 'single space')
  t.is(normalizeSpaces('hello  world'), 'hello world', 'double space')
  t.is(normalizeSpaces('hello   world'), 'hello world', 'triple space')
  t.is(normalizeSpaces('hello     world'), 'hello world', 'five spaces')
})

test('normalizeSpaces - trimming', (t) => {
  t.is(normalizeSpaces('  hello'), 'hello', 'leading spaces')
  t.is(normalizeSpaces('hello  '), 'hello', 'trailing spaces')
  t.is(normalizeSpaces('  hello  '), 'hello', 'both sides')
  t.is(normalizeSpaces('   hello world   '), 'hello world', 'trim + collapse')
})

test('normalizeSpaces - tabs', (t) => {
  t.is(normalizeSpaces('hello\tworld'), 'hello\tworld', 'single tab')
  t.is(normalizeSpaces('hello \t world'), 'hello world', 'space-tab-space')
  t.is(normalizeSpaces('\thello'), 'hello', 'leading tab')
  t.is(normalizeSpaces('hello\t'), 'hello', 'trailing tab')
})

test('normalizeSpaces - newlines', (t) => {
  t.is(normalizeSpaces('hello\nworld'), 'hello\nworld', 'single newline')
  t.is(normalizeSpaces('hello \n world'), 'hello world', 'space-newline-space')
  t.is(normalizeSpaces('\nhello'), 'hello', 'leading newline')
  t.is(normalizeSpaces('hello\n'), 'hello', 'trailing newline')
})

test('normalizeSpaces - mixed whitespace', (t) => {
  t.is(normalizeSpaces(' \n\t '), '', 'only whitespace')
  t.is(normalizeSpaces('hello \t\n world'), 'hello world', 'mixed types')
  t.is(normalizeSpaces('  \t hello  \n  world  \t  '), 'hello world', 'complex')
})

test('normalizeSpaces - special spaces', (t) => {
  t.is(normalizeSpaces('hello\u00a0world'), 'hello\u00a0world', 'non-breaking space')
  t.is(normalizeSpaces('hello \u00a0 world'), 'hello world', 'nbsp with spaces')
  t.is(normalizeSpaces('hello\u000cworld'), 'hello\u000cworld', 'form feed')
  t.is(normalizeSpaces('hello \u000c world'), 'hello world', 'ff with spaces')
  t.is(normalizeSpaces('hello\u000bworld'), 'hello\u000bworld', 'vertical tab')
  t.is(normalizeSpaces('hello \u000b world'), 'hello world', 'vt with spaces')
})

test('normalizeSpaces - edge cases', (t) => {
  t.is(normalizeSpaces(''), '', 'empty string')
  t.is(normalizeSpaces(' '), '', 'single space')
  t.is(normalizeSpaces('     '), '', 'multiple spaces')
  t.is(normalizeSpaces('a'), 'a', 'single letter')
  t.is(normalizeSpaces(' a '), 'a', 'letter with spaces')
})

test('normalizeSpaces - multiple words', (t) => {
  t.is(normalizeSpaces('one two three'), 'one two three', 'normal spacing')
  t.is(normalizeSpaces('one  two   three'), 'one two three', 'irregular spacing')
  t.is(normalizeSpaces('  one   two    three  '), 'one two three', 'complex spacing')
})

test('normalizeSpaces - Unicode', (t) => {
  t.is(normalizeSpaces('Γεια  σου'), 'Γεια σου', 'Greek')
  t.is(normalizeSpaces('  你好  世界  '), '你好 世界', 'Chinese')
  t.is(normalizeSpaces('Привет   мир'), 'Привет мир', 'Cyrillic')
})
