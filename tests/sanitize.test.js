const test = require('brittle')
const { sanitize, toPlainText } = require('../dist/index.js')

test('toPlainText - preserve option', (t) => {
    // Same input, different output based on preserve
    const greekInput = 'καλημέρί'
    t.is(toPlainText(greekInput), 'καλημέρi', 'without preserve: ί → i')
    t.is(toPlainText(greekInput, { preserve: ['greek'] }), 'καλημέρί', 'with preserve: ί unchanged')
    t.not(toPlainText(greekInput), toPlainText(greekInput, { preserve: ['greek'] }), 'outputs differ')

    const cyrillicInput = 'ԊԄllo'
    t.is(toPlainText(cyrillicInput), 'Hello', 'without preserve: Ԋ/Ԅ → H/E')
    t.is(toPlainText(cyrillicInput, { preserve: ['cyrillic'] }), 'ԊԄllo', 'with preserve: unchanged')
    t.not(toPlainText(cyrillicInput), toPlainText(cyrillicInput, { preserve: ['cyrillic'] }), 'outputs differ')
})

test('toPlainText - preserve all shortcut', (t) => {
    const greekInput = 'καλημέρί'
    const cyrillicInput = 'ԊԄllo'

    // 'all' preserves all writing systems
    t.is(toPlainText(greekInput, { preserve: 'all' }), 'καλημέρί', 'preserve all keeps Greek')
    t.is(toPlainText(cyrillicInput, { preserve: 'all' }), 'ԊԄllo', 'preserve all keeps Cyrillic')

    // Still converts fancy unicode
    t.is(toPlainText('𝐇𝐞𝐥𝐥𝐨', { preserve: 'all' }), 'Hello', 'still converts fancy')
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
    const input = 'ԊԄllo'
    t.is(sanitize(input).text, 'Hello', 'without preserve: Ԋ/Ԅ converted')
    t.is(sanitize(input, { preserve: ['cyrillic'] }).text, 'ԊԄllo', 'with preserve: unchanged')
    t.is(sanitize(input, { preserve: 'all' }).text, 'ԊԄllo', 'preserve all: unchanged')
    t.not(sanitize(input).text, sanitize(input, { preserve: ['cyrillic'] }).text, 'outputs differ')
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
