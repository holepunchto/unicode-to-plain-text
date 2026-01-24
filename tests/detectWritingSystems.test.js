import { test } from 'brittle'
import { detectWritingSystems, getWritingSystem } from '../dist/detectWritingSystems.js'

// ============================================================================
// detectWritingSystems - Basic functionality
// ============================================================================

test('detectWritingSystems - Single writing system detection', (t) => {
    const latin = detectWritingSystems('Hello World')
    t.alike(latin.writingSystems, ['latin'])
    t.is(latin.mixed, false)
    t.is(latin.primary, 'latin')

    const cyrillic = detectWritingSystems('Привет мир')
    t.alike(cyrillic.writingSystems, ['cyrillic'])
    t.is(cyrillic.mixed, false)
    t.is(cyrillic.primary, 'cyrillic')

    const greek = detectWritingSystems('Γεια σου')
    t.alike(greek.writingSystems, ['greek'])
    t.is(greek.mixed, false)
    t.is(greek.primary, 'greek')
})

test('detectWritingSystems - Mixed writing system detection', (t) => {
    const mixed = detectWritingSystems('Привет World')
    t.is(mixed.writingSystems.length, 2)
    t.ok(mixed.writingSystems.includes('cyrillic'))
    t.ok(mixed.writingSystems.includes('latin'))
    t.is(mixed.mixed, true)
})

test('detectWritingSystems - Primary writing system is most common', (t) => {
    // More Cyrillic than Latin
    const result = detectWritingSystems('Привет мир hi')
    t.is(result.primary, 'cyrillic')

    // More Latin than CJK
    const result2 = detectWritingSystems('Hello World 你好')
    t.is(result2.primary, 'latin')
})

test('detectWritingSystems - Empty and whitespace', (t) => {
    const empty = detectWritingSystems('')
    t.alike(empty.writingSystems, [])
    t.is(empty.mixed, false)
    t.is(empty.primary, null)

    const spaces = detectWritingSystems('   ')
    t.alike(spaces.writingSystems, [])
    t.is(spaces.primary, null)
})

test('detectWritingSystems - Numbers and punctuation ignored', (t) => {
    const result = detectWritingSystems('123 !@# hello')
    t.alike(result.writingSystems, ['latin'])
    t.is(result.mixed, false)
})

// ============================================================================
// detectWritingSystems - All writing systems
// ============================================================================

test('detectWritingSystems - Detects all writing systems', (t) => {
    t.is(detectWritingSystems('Hello').primary, 'latin')
    t.is(detectWritingSystems('Привет').primary, 'cyrillic')
    t.is(detectWritingSystems('Γεια').primary, 'greek')
    t.is(detectWritingSystems('مرحبا').primary, 'arabic')
    t.is(detectWritingSystems('שלום').primary, 'hebrew')
    t.is(detectWritingSystems('你好').primary, 'cjk')
    t.is(detectWritingSystems('こんにちは').primary, 'cjk')
    t.is(detectWritingSystems('สวัสดี').primary, 'thai')
    t.is(detectWritingSystems('नमस्ते').primary, 'devanagari')
    t.is(detectWritingSystems('ሰላም').primary, 'ethiopic')
})

test('detectWritingSystems - Latin extended characters', (t) => {
    // Latin with diacritics should still be latin
    const result = detectWritingSystems('Café résumé')
    t.alike(result.writingSystems, ['latin'])
    t.is(result.primary, 'latin')
})

// ============================================================================
// getWritingSystem
// ============================================================================

test('getWritingSystem - Basic ASCII', (t) => {
    t.is(getWritingSystem('A'), 'latin')
    t.is(getWritingSystem('z'), 'latin')
    t.is(getWritingSystem('M'), 'latin')
})

test('getWritingSystem - Non-letter returns null', (t) => {
    t.is(getWritingSystem('1'), null)
    t.is(getWritingSystem(' '), null)
    t.is(getWritingSystem('!'), null)
})

test('getWritingSystem - Various writing systems', (t) => {
    t.is(getWritingSystem('Б'), 'cyrillic')
    t.is(getWritingSystem('α'), 'greek')
    t.is(getWritingSystem('中'), 'cjk')
    t.is(getWritingSystem('ת'), 'hebrew')
})
