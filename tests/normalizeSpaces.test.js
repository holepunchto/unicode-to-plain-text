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

test('normalizeSpaces - tabs converted to space', (t) => {
  t.is(normalizeSpaces('hello\tworld'), 'hello world', 'tab becomes space')
  t.is(normalizeSpaces('hello \t world'), 'hello world', 'space-tab-space collapsed')
  t.is(normalizeSpaces('\thello'), 'hello', 'leading tab trimmed')
  t.is(normalizeSpaces('hello\t'), 'hello', 'trailing tab trimmed')
})

test('normalizeSpaces - newlines converted to space', (t) => {
  t.is(normalizeSpaces('hello\nworld'), 'hello world', 'newline becomes space')
  t.is(normalizeSpaces('hello \n world'), 'hello world', 'space-newline-space collapsed')
  t.is(normalizeSpaces('\nhello'), 'hello', 'leading newline trimmed')
  t.is(normalizeSpaces('hello\n'), 'hello', 'trailing newline trimmed')
})

test('normalizeSpaces - mixed whitespace', (t) => {
  t.is(normalizeSpaces(' \n\t '), '', 'only whitespace')
  t.is(normalizeSpaces('hello \t\n world'), 'hello world', 'mixed types')
  t.is(normalizeSpaces('  \t hello  \n  world  \t  '), 'hello world', 'complex')
})

test('normalizeSpaces - special spaces converted', (t) => {
  t.is(normalizeSpaces('hello\u00a0world'), 'hello world', 'non-breaking space becomes space')
  t.is(normalizeSpaces('hello \u00a0 world'), 'hello world', 'nbsp with spaces collapsed')
  t.is(normalizeSpaces('hello\u000cworld'), 'hello world', 'form feed becomes space')
  t.is(normalizeSpaces('hello\u000bworld'), 'hello world', 'vertical tab becomes space')
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

test('normalizeSpaces - Unicode preserved', (t) => {
  t.is(normalizeSpaces('Γεια  σου'), 'Γεια σου', 'Greek')
  t.is(normalizeSpaces('  你好  世界  '), '你好 世界', 'Chinese')
  t.is(normalizeSpaces('Привет   мир'), 'Привет мир', 'Cyrillic')
})

test('normalizeSpaces - trim option', (t) => {
  t.is(normalizeSpaces('  hello  '), 'hello', 'trim:all (default) trims both')
  t.is(normalizeSpaces('  hello  ', { trim: 'all' }), 'hello', 'trim:all explicit')
  t.is(normalizeSpaces('  hello  ', { trim: 'start' }), 'hello ', 'trim:start keeps trailing')
  t.is(normalizeSpaces('  hello  ', { trim: 'end' }), ' hello', 'trim:end keeps leading')
  t.is(normalizeSpaces('  hello  ', { trim: 'none' }), ' hello ', 'trim:none keeps both')
})
