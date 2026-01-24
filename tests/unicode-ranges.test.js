const test = require('brittle')
const { toPlainText } = require('../dist/index.js')

test('Greek Extended - basic (diacritics stripped by default)', (t) => {
  // Greek Extended diacritics are stripped by default
  t.is(toPlainText('ἀ'), 'α', 'alpha with psili → alpha')
  t.is(toPlainText('ἁ'), 'α', 'alpha with dasia → alpha')
  t.is(toPlainText('ἄ'), 'α', 'alpha with psili and oxia → alpha')
  t.is(toPlainText('ἇ'), 'α', 'alpha with dasia and perispomeni → alpha')
})

test('Greek Extended - capitals (diacritics stripped by default)', (t) => {
  t.is(toPlainText('Ἀ'), 'Α', 'capital alpha with psili → capital alpha')
  t.is(toPlainText('Ἁ'), 'Α', 'capital alpha with dasia → capital alpha')
  t.is(toPlainText('Ἅ'), 'Α', 'capital alpha with dasia and oxia → capital alpha')
})

test('Greek Extended - preserved with option', (t) => {
  t.is(toPlainText('ἀ', { preserve: ['greek'] }), 'ἀ', 'alpha with psili preserved')
  t.is(toPlainText('Ἅγιος', { preserve: ['greek'] }), 'Ἅγιος', 'word with diacritics preserved')
  t.is(toPlainText('Γεια ἀ', { preserve: ['greek'] }), 'Γεια ἀ', 'basic Greek & extended Greek preserved')
})

test('Greek Extended - in context (stripped by default)', (t) => {
  t.is(toPlainText('Ἅγιος'), 'Αγιος', 'word with diacritics stripped')
  t.is(toPlainText('Γεια ἀ'), 'Γεια α', 'basic Greek & extended Greek stripped')
})

test('Greek Extended - with decorations', (t) => {
  t.is(toPlainText('🌟ἀἁἄ🌟'), 'ααα', 'decorations removed, diacritics stripped')
  t.is(toPlainText('🌟ἀἁἄ🌟', { preserve: ['greek'] }), 'ἀἁἄ', 'decorations removed, diacritics preserved')
})

test('Combining diacritics - single marks', (t) => {
  t.is(toPlainText('a\u0300'), 'a', 'grave accent')
  t.is(toPlainText('e\u0301'), 'e', 'acute accent')
})

test('Combining diacritics - multiple marks', (t) => {
  t.is(toPlainText('a\u0300\u0301'), '', 'multiple marks removed')
})

test('Combining diacritics - in words', (t) => {
  t.is(toPlainText('cafe\u0301'), 'cafe', 'café with combining')
})

test('Latin Extended - basic', (t) => {
  t.is(toPlainText('Ǥǥ'), 'Gg', 'Latin Extended-A')
  t.is(toPlainText('ƀ'), 'b', 'Latin Extended-B')
})

test('Latin Extended - additional', (t) => {
  t.is(toPlainText('ẛ'), 'ſ', 'Latin Extended Additional')
})
