const test = require('brittle')
const { sanitize, toPlainText } = require('../dist/index.js')

test('toPlainText - preserve option', (t) => {
    // Same input, different output based on preserve
    const greekInput = 'καλημέρί'
    t.is(toPlainText(greekInput), 'καλημερi', 'without preserve: accents stripped')
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

test('toPlainText - preserve latin (EU languages)', (t) => {
    // Turkish
    const turkish = 'ıİöÖçÇşŞğĞüÜ'
    t.is(toPlainText(turkish), 'ıIooccssgguu', 'without preserve: chars normalized')
    t.is(toPlainText(turkish, { preserve: ['latin'] }), turkish, 'Turkish preserved')

    // French
    const french = 'àâäæçéèêëïîôùûüœÿ'
    t.is(toPlainText(french, { preserve: ['latin'] }), french, 'French preserved')

    // German
    const german = 'äöüßÄÖÜ'
    t.is(toPlainText(german, { preserve: ['latin'] }), german, 'German preserved')

    // Polish
    const polish = 'ąćęłńóśźż'
    t.is(toPlainText(polish, { preserve: ['latin'] }), polish, 'Polish preserved')

    // Nordic
    const nordic = 'åäöæø'
    t.is(toPlainText(nordic, { preserve: ['latin'] }), nordic, 'Nordic preserved')

    // Mixed with fancy unicode (case gets normalized after fancy conversion)
    t.is(toPlainText('𝐇𝐞𝐥𝐥𝐨 Ömer', { preserve: ['latin'] }), 'Hello ömer', 'fancy converted, Latin ö kept')
})

test('toPlainText - normalizeSpaces strips invisible chars', (t) => {
    t.is(toPlainText('Hello\x00World'), 'HelloWorld')
    t.is(toPlainText('Hello\u200BWorld'), 'HelloWorld')
})

test('sanitize - basic validation', (t) => {
    t.is(sanitize('John Doe').text, 'John Doe')
    t.is(sanitize('John Doe').valid, true)
    t.is(sanitize('John Doe').length, 8)
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
    t.is(sanitize('AB', { minLength: 3 }).error, 'too_short')
    t.is(sanitize('A'.repeat(65)).error, 'too_long')
    t.is(sanitize('A'.repeat(64)).valid, true)
})

test('sanitize - emoji length counting', (t) => {
    t.is(sanitize('👨‍👩‍👧‍👦', { skipEmoji: true }).length, 11, 'ZWJ family length')
    t.is(sanitize('👋', { skipEmoji: true }).length, 2)
})

test('sanitize - type validation', (t) => {
    t.exception.all(() => sanitize(null), TypeError)
    t.exception.all(() => sanitize(undefined), TypeError)
    t.exception.all(() => sanitize(123), TypeError)
})

// ============================================================================
// NEW v2.0.0 SANITIZE OPTIONS
// ============================================================================

test('sanitize - truncate option', (t) => {
    // Without truncate (default): returns error
    const long = 'A'.repeat(100)
    t.is(sanitize(long, { maxLength: 10 }).valid, false)
    t.is(sanitize(long, { maxLength: 10 }).error, 'too_long')

    // With truncate: truncates and returns valid
    const truncated = sanitize(long, { maxLength: 10, truncate: true })
    t.is(truncated.valid, true)
    t.is(truncated.text, 'AAAAAAAAAA')
    t.is(truncated.length, 10)
})

test('sanitize - truncate with length', (t) => {
    // Length-based truncation
    const withEmoji = 'Hello 👋 World'
    const result = sanitize(withEmoji, { maxLength: 8, truncate: true, skipEmoji: true })
    t.is(result.valid, true)
    t.is(result.length, 8)
})

test('sanitize - rejectHomoglyphs option', (t) => {
    // Normal text passes
    t.is(sanitize('paypal').valid, true)

    // Text with homoglyphs (Cyrillic 'а' mixed with Latin)
    const spoofed = 'pаypal' // Cyrillic 'а' U+0430
    t.is(sanitize(spoofed).valid, true, 'passes without option')
    t.is(sanitize(spoofed, { rejectHomoglyphs: true }).valid, false, 'fails with option')
    t.is(sanitize(spoofed, { rejectHomoglyphs: true }).error, 'homoglyphs')

    // Pure Cyrillic passes (no mix = no homoglyph)
    t.is(sanitize('Привет', { rejectHomoglyphs: true }).valid, true)
})

test('sanitize - allowedWritingSystems option', (t) => {
    // Latin only
    t.is(sanitize('Hello', { allowedWritingSystems: ['latin'] }).valid, true)
    t.is(sanitize('Привет', { allowedWritingSystems: ['latin'] }).valid, false, 'Cyrillic rejected')
    t.is(sanitize('Привет', { allowedWritingSystems: ['latin'] }).error, 'disallowed_writing_system')

    // Multiple allowed
    t.is(sanitize('Hello Привет', { allowedWritingSystems: ['latin', 'cyrillic'] }).valid, true)

    // Cyrillic only
    t.is(sanitize('Привет', { allowedWritingSystems: ['cyrillic'] }).valid, true)
    t.is(sanitize('Hello', { allowedWritingSystems: ['cyrillic'] }).valid, false)
})

test('sanitize - asciiOnly option', (t) => {
    t.is(sanitize('Café', { asciiOnly: true }).text, 'Cafe')
    t.is(sanitize('你好', { asciiOnly: true }).valid, false, 'becomes whitespace_only')
    t.is(sanitize('你好', { asciiOnly: true }).error, 'whitespace_only')
})

test('sanitize - combined options', (t) => {
    // truncate + asciiOnly
    const result = sanitize('Hello Привет World', { asciiOnly: true, truncate: true, maxLength: 5 })
    t.is(result.valid, true)
    t.is(result.length, 5)

    // allowedWritingSystems + rejectHomoglyphs
    t.is(sanitize('Hello', { allowedWritingSystems: ['latin'], rejectHomoglyphs: true }).valid, true)
})
