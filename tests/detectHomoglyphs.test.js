import { test } from 'brittle'
import { hasHomoglyphs, analyzeHomoglyphs, isSuspiciousMix } from '../dist/detectHomoglyphs.js'

// ============================================================================
// hasHomoglyphs - Basic detection
// ============================================================================

test('hasHomoglyphs - Detects Cyrillic lookalikes', (t) => {
    // Cyrillic 'а' looks like Latin 'a'
    t.is(hasHomoglyphs('pаypal'), true, 'Cyrillic a in paypal')
    t.is(hasHomoglyphs('аpple'), true, 'Cyrillic a at start')
    t.is(hasHomoglyphs('gооgle'), true, 'Cyrillic o in google')
})

test('hasHomoglyphs - Detects Greek lookalikes', (t) => {
    // Greek capital letters
    t.is(hasHomoglyphs('ΑPPLE'), true, 'Greek Alpha in APPLE')
    t.is(hasHomoglyphs('GΟΟGLE'), true, 'Greek Omicron in GOOGLE')
})

test('hasHomoglyphs - Returns false for pure scripts', (t) => {
    t.is(hasHomoglyphs('paypal'), false, 'pure Latin')
    t.is(hasHomoglyphs('Привет'), false, 'pure Cyrillic')
    t.is(hasHomoglyphs('Γεια'), false, 'pure Greek')
    t.is(hasHomoglyphs('Hello World'), false, 'Latin with spaces')
    t.is(hasHomoglyphs(''), false, 'empty string')
})

test('hasHomoglyphs - Numbers and punctuation', (t) => {
    t.is(hasHomoglyphs('test123'), false, 'no homoglyphs with numbers')
    t.is(hasHomoglyphs('hello!@#'), false, 'no homoglyphs with punctuation')
})

// ============================================================================
// analyzeHomoglyphs - Detailed analysis
// ============================================================================

test('analyzeHomoglyphs - Returns match details', (t) => {
    const result = analyzeHomoglyphs('pаypal')
    t.is(result.hasHomoglyphs, true)
    t.is(result.matches.length, 1)
    t.is(result.matches[0].char, 'а')
    t.is(result.matches[0].position, 1)
    t.is(result.matches[0].looksLike, 'a')
    t.is(result.matches[0].writingSystem, 'cyrillic')
})

test('analyzeHomoglyphs - Multiple matches', (t) => {
    const result = analyzeHomoglyphs('gооgle')
    t.is(result.matches.length, 2)
    t.is(result.matches[0].position, 1)
    t.is(result.matches[1].position, 2)
})

test('analyzeHomoglyphs - No matches for clean text', (t) => {
    const result = analyzeHomoglyphs('google')
    t.is(result.hasHomoglyphs, false)
    t.alike(result.matches, [])
})

// ============================================================================
// isSuspiciousMix - Script mixing detection
// ============================================================================

test('isSuspiciousMix - Detects Latin + Cyrillic mix', (t) => {
    t.is(isSuspiciousMix('Hello Привет'), true, 'obvious mix')
    t.is(isSuspiciousMix('pаypal'), true, 'hidden mix with homoglyph')
})

test('isSuspiciousMix - Detects Latin + Greek mix', (t) => {
    t.is(isSuspiciousMix('Hello Γεια'), true)
    t.is(isSuspiciousMix('ΑPPLE'), true, 'hidden mix with Greek Alpha')
})

test('isSuspiciousMix - Pure scripts are not suspicious', (t) => {
    t.is(isSuspiciousMix('Hello World'), false, 'pure Latin')
    t.is(isSuspiciousMix('Привет мир'), false, 'pure Cyrillic')
    t.is(isSuspiciousMix('Γεια σου'), false, 'pure Greek')
})

test('isSuspiciousMix - Non-confusable mixes are not suspicious', (t) => {
    // CJK + Latin is common and not used for spoofing
    t.is(isSuspiciousMix('Hello 你好'), false, 'Latin + CJK')
    t.is(isSuspiciousMix('Hello שלום'), false, 'Latin + Hebrew')
    t.is(isSuspiciousMix('Hello مرحبا'), false, 'Latin + Arabic')
})
