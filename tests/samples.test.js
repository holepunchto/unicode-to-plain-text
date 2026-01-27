const test = require('brittle')
const { sanitize, toPlainText } = require('../dist/index.js')

// ============================================================
// USERNAME SAMPLES - Use sanitize() for strict validation
// ============================================================

test('Username: converts fancy Unicode and validates', (t) => {
  const result = sanitize('𝓳𝓸𝓱𝓷_𝓭𝓸𝓮', { minLength: 3, maxLength: 20 })
  t.is(result.text, 'john_doe')
  t.is(result.valid, true)
})

test('Username: ASCII-only mode for URL-safe usernames', (t) => {
  const result = sanitize('user_名前', { asciiOnly: true, minLength: 1 })
  t.is(result.text, 'user_')
  t.is(result.valid, true)
})

test('Username: rejects homoglyph spoofing attacks', (t) => {
  // 'pаypal' contains Cyrillic 'а' (U+0430) instead of Latin 'a'
  const result = sanitize('pаypal', { rejectHomoglyphs: true })
  t.is(result.valid, false)
  t.is(result.error, 'homoglyphs')
})

test('Username: enforces allowed writing systems', (t) => {
  const result = sanitize('Иван_user', { allowedWritingSystems: ['latin'] })
  t.is(result.valid, false)
  t.is(result.error, 'disallowed_writing_system')
})

test('Username: validates minimum length', (t) => {
  const result = sanitize('ab', { minLength: 3 })
  t.is(result.valid, false)
  t.is(result.error, 'too_short')
})

test('Username: validates maximum length', (t) => {
  const result = sanitize('a'.repeat(100), { maxLength: 20 })
  t.is(result.valid, false)
  t.is(result.error, 'too_long')
})

test('Username: truncates when enabled', (t) => {
  const result = sanitize('a'.repeat(100), { maxLength: 20, truncate: true })
  t.is(result.text.length, 20)
  t.is(result.valid, true)
})

test('Username: international with allowed Cyrillic', (t) => {
  const result = sanitize('Иван123', {
    minLength: 3,
    maxLength: 20,
    allowedWritingSystems: ['latin', 'cyrillic']
  })
  t.is(result.valid, true)
})

// ============================================================
// DISPLAY NAME SAMPLES - Use toPlainText() for flexible conversion
// ============================================================

test('Display name: converts fancy Unicode to readable text', (t) => {
  const result = toPlainText('𝐉𝐨𝐡𝐧 𝐃𝐨𝐞')
  t.is(result, 'John Doe')
})

test('Display name: preserves emojis when requested', (t) => {
  const result = toPlainText('Dev 👨‍💻 Team', { skipEmoji: true })
  t.is(result, 'Dev 👨‍💻 Team')
})

test('Display name: preserves Cyrillic names', (t) => {
  const result = toPlainText('Иван Петров', { preserve: ['cyrillic'] })
  t.is(result, 'Иван Петров')
})

test('Display name: preserves Chinese characters by default', (t) => {
  const result = toPlainText('张伟 Zhang Wei')
  t.is(result, '张伟 Zhang Wei')
})

test('Display name: converts fancy text while preserving CJK', (t) => {
  const result = toPlainText('𝓙𝓸𝓱𝓷 田中')
  t.is(result, 'John 田中')
})

test('Display name: normalizes spaces and trims', (t) => {
  const result = toPlainText('  John    Doe  ', { normalizeSpaces: true, trim: 'all' })
  t.is(result, 'John Doe')
})

test('Display name: removes emojis by default', (t) => {
  const result = toPlainText('John 🎉 Doe')
  t.is(result, 'John Doe')
})

// ============================================================
// COMPARISON: Same input, different use cases
// ============================================================

test('Comparison: fancy input as username vs display name', (t) => {
  const input = '𝐉𝐨𝐡𝐧_𝐃𝐨𝐞'

  // As username: validation included
  const username = sanitize(input, { minLength: 3, maxLength: 20 })
  t.is(username.text, 'John_doe')
  t.is(username.valid, true)
  t.is(username.length, 8)

  const displayName = toPlainText(input)
  t.is(displayName, 'John_doe')
})

test('Comparison: spoofed input handling', (t) => {
  const spoofed = 'аdmin'

  const username = sanitize(spoofed, { rejectHomoglyphs: true })
  t.is(username.valid, false)
  t.is(username.error, 'homoglyphs')

  const displayName = toPlainText(spoofed)
  t.is(displayName, 'аdmin')
})
