const test = require('brittle')
const { isAsciiOnly } = require('../dist/isAsciiOnly.js')
const { normalizeCasing } = require('../dist/normalizeCasing.js')
const { removeDecorations } = require('../dist/removeDecorations.js')

test('isAsciiOnly - boundaries', (t) => {
  t.is(isAsciiOnly('\x7f'), true, 'char 127 (DEL)')
  t.is(isAsciiOnly('\x80'), false, 'char 128')
  t.is(isAsciiOnly('\x00'), true, 'char 0 (NULL)')
  t.is(isAsciiOnly(' !"#$%&'), true, 'printable ASCII')
})

test('isAsciiOnly - mixed content', (t) => {
  t.is(isAsciiOnly('Hello World'), true, 'pure ASCII')
  t.is(isAsciiOnly('test\u0100'), false, 'ASCII + Unicode')
  t.is(isAsciiOnly(''), true, 'empty string')
})

test('isAsciiOnly - edge cases', (t) => {
  t.is(isAsciiOnly('test\t\ntext'), true, 'tabs and newlines')
  t.is(isAsciiOnly('café'), false, 'extended ASCII')
})

test('normalizeCasing - thresholds', (t) => {
  t.is(normalizeCasing('AAAa'), 'AAAA', '75% uppercase → all upper')
  t.is(normalizeCasing('AAaa'), 'AAaa', '50% → unchanged')
  t.is(normalizeCasing('AAAB'), 'AAAB', '100% → unchanged')
})

test('normalizeCasing - balanced', (t) => {
  t.is(normalizeCasing('AbCd'), 'AbCd', '50-50 case')
  t.is(normalizeCasing('CamelCase'), 'camelcase', 'CamelCase → lowercase')
})

test('normalizeCasing - single chars', (t) => {
  t.is(normalizeCasing('A'), 'A', 'uppercase')
  t.is(normalizeCasing('a'), 'a', 'lowercase')
})

test('normalizeCasing - with numbers', (t) => {
  t.is(normalizeCasing('aBc123DeF'), 'aBc123DeF', 'numbers preserved')
  t.is(normalizeCasing('123ABC'), '123ABC', 'starts with numbers')
})

test('normalizeCasing - edge cases', (t) => {
  t.is(normalizeCasing(''), '', 'empty string')
  t.is(normalizeCasing('   '), '   ', 'only spaces')
  t.is(normalizeCasing('123 456'), '123 456', 'no letters')
})

test('removeDecorations - spam ratio', (t) => {
  t.is(removeDecorations('✨test✨'), 'test', '40% boundary')
  t.is(removeDecorations('✨✨✨a✨✨✨'), '', 'high decoration')
})

test('removeDecorations - edge cases', (t) => {
  t.is(removeDecorations('✨🌟💫'), '', 'only decorations')
  t.is(removeDecorations('test'), 'test', 'no decorations')
  t.is(removeDecorations(''), '', 'empty string')
})

test('removeDecorations - mixed', (t) => {
  t.is(removeDecorations('test 🎀 text'), 'test  text', 'emoji removal')
  t.is(removeDecorations('✨t✨e✨s✨t✨'), 'test', 'interspersed')
})
