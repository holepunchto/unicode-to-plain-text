const test = require('brittle')
const { toPlainText } = require('../dist/index.js')

test('Greek Extended - basic', (t) => {
  t.is(toPlainText('ἀ'), 'ἀ', 'alpha with psili')
  t.is(toPlainText('ἁ'), 'ἁ', 'alpha with dasia')
  t.is(toPlainText('ἄ'), 'ἄ', 'alpha with psili and oxia')
  t.is(toPlainText('ἇ'), 'ἇ', 'alpha with dasia and perispomeni')
})

test('Greek Extended - capitals', (t) => {
  t.is(toPlainText('Ἀ'), 'Ἀ', 'capital alpha with psili')
  t.is(toPlainText('Ἁ'), 'Ἁ', 'capital alpha with dasia')
  t.is(toPlainText('Ἅ'), 'Ἅ', 'capital alpha with dasia and oxia')
})

test('Greek Extended - in context', (t) => {
  t.is(toPlainText('Ἅγιος'), 'Ἅγιος', 'word with diacritics')
  t.is(toPlainText('Γεια ἀ'), 'Γεια ἀ', 'basic Greek & extended Greek')
})

test('Greek Extended - with decorations', (t) => {
  t.is(toPlainText('🌟ἀἁἄ🌟'), 'ἀἁἄ', 'decorations removed')
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
