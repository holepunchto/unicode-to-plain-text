import { getWritingSystem } from './detectWritingSystems'
import type { WritingSystem } from './convertCharacters'

/**
 * High-risk homoglyph pairs: characters from different writing systems that look similar.
 * Map from confusable character → [equivalent ASCII, source writing system]
 */
const CONFUSABLES: Record<string, [string, WritingSystem]> = {
  'а': ['a', 'cyrillic'], // Cyrillic small a
  'е': ['e', 'cyrillic'], // Cyrillic small ie
  'о': ['o', 'cyrillic'], // Cyrillic small o
  'р': ['p', 'cyrillic'], // Cyrillic small er
  'с': ['c', 'cyrillic'], // Cyrillic small es
  'у': ['y', 'cyrillic'], // Cyrillic small u
  'х': ['x', 'cyrillic'], // Cyrillic small ha
  'А': ['A', 'cyrillic'], // Cyrillic capital A
  'В': ['B', 'cyrillic'], // Cyrillic capital Ve
  'Е': ['E', 'cyrillic'], // Cyrillic capital Ie
  'К': ['K', 'cyrillic'], // Cyrillic capital Ka
  'М': ['M', 'cyrillic'], // Cyrillic capital Em
  'Н': ['H', 'cyrillic'], // Cyrillic capital En
  'О': ['O', 'cyrillic'], // Cyrillic capital O
  'Р': ['P', 'cyrillic'], // Cyrillic capital Er
  'С': ['C', 'cyrillic'], // Cyrillic capital Es
  'Т': ['T', 'cyrillic'], // Cyrillic capital Te
  'Х': ['X', 'cyrillic'], // Cyrillic capital Ha

  'Α': ['A', 'greek'], // Greek capital Alpha
  'Β': ['B', 'greek'], // Greek capital Beta
  'Ε': ['E', 'greek'], // Greek capital Epsilon
  'Ζ': ['Z', 'greek'], // Greek capital Zeta
  'Η': ['H', 'greek'], // Greek capital Eta
  'Ι': ['I', 'greek'], // Greek capital Iota
  'Κ': ['K', 'greek'], // Greek capital Kappa
  'Μ': ['M', 'greek'], // Greek capital Mu
  'Ν': ['N', 'greek'], // Greek capital Nu
  'Ο': ['O', 'greek'], // Greek capital Omicron
  'Ρ': ['P', 'greek'], // Greek capital Rho
  'Τ': ['T', 'greek'], // Greek capital Tau
  'Υ': ['Y', 'greek'], // Greek capital Upsilon
  'Χ': ['X', 'greek'], // Greek capital Chi
  'ο': ['o', 'greek'], // Greek small omicron
  'ν': ['v', 'greek'], // Greek small nu
  'ρ': ['p', 'greek']  // Greek small rho
}

export type HomoglyphMatch = {
  char: string
  position: number
  looksLike: string
  writingSystem: WritingSystem
}

export type HomoglyphAnalysis = {
  hasHomoglyphs: boolean
  matches: HomoglyphMatch[]
}

/**
 * Checks if text contains homoglyphs in a mixed-script context.
 * Returns true only when Latin characters appear alongside confusable characters
 * from other scripts (Cyrillic, Greek).
 * @example: hasHomoglyphs('pаypal') → true (Cyrillic 'а' mixed with Latin)
 * @example: hasHomoglyphs('paypal') → false (all Latin)
 * @example: hasHomoglyphs('Привет') → false (all Cyrillic, no mix)
 */
export const hasHomoglyphs = (text: string): boolean => {
  let hasLatin = false
  let hasConfusable = false

  for (const char of text) {
    const system = getWritingSystem(char)
    if (system === 'latin') {
      hasLatin = true
    }
    if (CONFUSABLES[char]) {
      hasConfusable = true
    }

    if (hasLatin && hasConfusable) return true
  }

  return false
}

/**
 * Analyzes text for homoglyphs and returns detailed information.
 * @example: analyzeHomoglyphs('pаypal') → { hasHomoglyphs: true, matches: [...] }
 */
export const analyzeHomoglyphs = (text: string): HomoglyphAnalysis => {
  const matches: HomoglyphMatch[] = []
  let position = 0

  for (const char of text) {
    const confusable = CONFUSABLES[char]
    if (confusable) {
      matches.push({
        char,
        position,
        looksLike: confusable[0],
        writingSystem: confusable[1]
      })
    }
    position++
  }

  return {
    hasHomoglyphs: matches.length > 0,
    matches
  }
}

/**
 * Checks if text mixes writing systems in a suspicious way (Latin + lookalike systems).
 * Returns true if text contains both Latin and characters from systems with homoglyphs.
 */
export const isSuspiciousMix = (text: string): boolean => {
  let hasLatin = false
  let hasConfusableSystem = false

  for (const char of text) {
    const system = getWritingSystem(char)

    if (system === 'latin') {
      hasLatin = true
    } else if (system === 'cyrillic' || system === 'greek') {
      hasConfusableSystem = true
    }

    if (hasLatin && hasConfusableSystem) return true
  }

  return false
}
