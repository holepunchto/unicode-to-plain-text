const test = require('brittle')
const { sanitize, toPlainText } = require('../dist/index.js')

test('toPlainText - preserve prevents lookalike conversion', (t) => {
    // Greek ί (iota with tonos) is in char map → converted to 'i' without preserve
    t.is(toPlainText('καλημέρί'), 'καλημέρi', 'Greek ί converted without preserve')
    t.is(toPlainText('καλημέρί', { preserve: ['greek'] }), 'καλημέρί', 'Greek ί preserved')

    // Cyrillic Ԋ and Ԅ are in char map → converted then case-normalized
    t.is(toPlainText('ԊԄllo'), 'Hello', 'Cyrillic Ԋ/Ԅ converted without preserve')
    t.is(toPlainText('ԊԄllo', { preserve: ['cyrillic'] }), 'ԊԄllo', 'Cyrillic Ԋ/Ԅ preserved')
})

test('toPlainText - preserve with fancy unicode', (t) => {
    // Fancy unicode still converted, native scripts pass through
    t.is(toPlainText('Привет 𝐖𝐨𝐫𝐥𝐝'), 'Привет World', 'Cyrillic passes through')
    t.is(toPlainText('你好 𝐖𝐨𝐫𝐥𝐝'), '你好 World', 'CJK passes through')
    t.is(toPlainText('مرحبا 𝐖𝐨𝐫𝐥𝐝'), 'مرحبا World', 'Arabic passes through')
})

test('toPlainText - normalizeSpaces strips invisible chars', (t) => {
    t.is(toPlainText('Hello\x00World'), 'HelloWorld')
    t.is(toPlainText('Hello\u200BWorld'), 'HelloWorld')
})

test('sanitize - basic validation', (t) => {
    t.is(sanitize('John Doe').text, 'John Doe')
    t.is(sanitize('John Doe').valid, true)
    t.is(sanitize('John Doe').graphemeCount, 8)
    t.is(sanitize('').valid, false)
    t.is(sanitize('').error, 'empty')
    t.is(sanitize('   ').error, 'whitespace_only')
})

test('sanitize - cleaning logic', (t) => {
    t.is(sanitize('𝐉𝐨𝐡𝐧 𝐃𝐨𝐞').text, 'John Doe', 'converts fancy text')
    t.is(sanitize('🅣🅔🅢🅣').text, 'TEST', 'converts enclosed')
    t.is(sanitize('  Hello  ').text, 'Hello', 'trims whitespace')
})

test('sanitize - preserve option', (t) => {
    t.is(sanitize('ԊԄllo', { preserve: ['cyrillic'] }).text, 'ԊԄllo', 'Cyrillic lookalikes preserved')
    t.is(sanitize('ԊԄllo').text, 'Hello', 'Cyrillic lookalikes converted without preserve')
})

test('sanitize - whitespace handling', (t) => {
    t.is(sanitize('  Hello  ').text, 'Hello')
    t.is(sanitize('Hello    World').text, 'Hello World')
    t.is(sanitize('Hello\u00A0World').text, 'Hello World')
})

test('sanitize - trim option', (t) => {
    t.is(sanitize('Bob ').text, 'Bob', 'default trims all')
    t.is(sanitize('Bob ', { trim: 'start' }).text, 'Bob ', 'trim:start preserves trailing')
    t.is(sanitize('  Bob', { trim: 'start' }).text, 'Bob', 'trim:start removes leading')
})

test('sanitize - control char stripping', (t) => {
    t.is(sanitize('Hello\x00World').text, 'HelloWorld')
    t.is(sanitize('Hello\u200BWorld').text, 'HelloWorld')
})

test('sanitize - length validation', (t) => {
    t.is(sanitize('AB', { minGraphemes: 3 }).error, 'too_short')
    t.is(sanitize('A'.repeat(65)).error, 'too_long')
    t.is(sanitize('A'.repeat(64)).valid, true)
})

test('sanitize - emoji grapheme counting', (t) => {
    t.is(sanitize('👨‍👩‍👧‍👦', { skipEmoji: true }).graphemeCount, 1, 'ZWJ family = 1')
    t.is(sanitize('👋', { skipEmoji: true }).graphemeCount, 1)
})

test('sanitize - type validation', (t) => {
    t.exception.all(() => sanitize(null), TypeError)
    t.exception.all(() => sanitize(undefined), TypeError)
    t.exception.all(() => sanitize(123), TypeError)
})
