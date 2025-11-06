import { UNICODE_RANGES } from './maps/UNICODE_RANGES'
import { MATH_SYMBOLS_MAP } from './maps/MATH_SYMBOLS_MAP'
import { MIRRORED_MAP } from './maps/MIRRORED_MAP'
import { CANADIAN_ABORIGINAL_MAP } from './maps/CANADIAN_ABORIGINAL_MAP'
import { SMALL_CAPS_MAP } from './maps/SMALL_CAPS_MAP'
import { STROKED_MAP } from './maps/STROKED_MAP'
import { SUPERSCRIPT_MAP } from './maps/SUPERSCRIPT_MAP'
import { SUBSCRIPT_MAP } from './maps/SUBSCRIPT_MAP'
import { CURRENCY_MAP } from './maps/CURRENCY_MAP'
import { CIRCLED_NUMBERS_MAP } from './maps/CIRCLED_NUMBERS_MAP'
import { BLACK_CIRCLES_MAP } from './maps/BLACK_CIRCLES_MAP'
import { DARK_SQUARES_MAP } from './maps/DARK_SQUARES_MAP'
import { REGIONAL_INDICATORS_MAP } from './maps/REGIONAL_INDICATORS_MAP'
import { PARENTHESIZED_MAP } from './maps/PARENTHESIZED_MAP'
import { MISCELLANEOUS_MAP } from './maps/MISCELLANEOUS_MAP'
/**
 * Maps fancy Unicode characters to plain ASCII.
 * Preserves real Greek/Ethiopic when detected.
 * @example: mapCharacters('HELLO Math ABC') → 'HELLO Math ABC'
 */
export const mapCharacters = (text: string): string => {
  const preserve = getPreserveSet(text)
  const map = getCharMap()

  return Array.from(text)
    .map((char) => (preserve.has(char) ? char : (map.get(char) ?? char)))
    .join('')
}

/**
 * Returns Set of chars to preserve (real Greek or Ethiopic).
 */
const getPreserveSet = (text: string): Set<string> => {
  const set = new Set<string>()

  if (hasRealGreek(text)) {
    addRange(set, 0x0370, 0x03ff) // Greek and Coptic
    addRange(set, 0x1f00, 0x1fff) // Greek Extended
  }

  if (hasRealEthiopic(text)) {
    addRange(set, 0x1200, 0x137f) // Ethiopic
  }

  return set
}

/**
 * Detects real Greek via final sigma or any Greek char.
 * @example: hasRealGreek('Γεια') → true
 */
const hasRealGreek = (text: string): boolean =>
  [...text].some((char) => {
    const code = char.charCodeAt(0)
    return (code >= 0x0370 && code <= 0x03ff) || (code >= 0x1f00 && code <= 0x1fff)
  })

/**
 * Detects real Ethiopic (Amharic) text by checking for long sequences or multiple words.
 * @example: hasRealEthiopic('ሰላም እንዴት ነህ') → true
 */
const hasRealEthiopic = (text: string): boolean => {
  let count = 0,
    hasSpace = false,
    inEthiopicWord = false
  for (const char of text) {
    const code = char.charCodeAt(0)
    if (code >= 0x1200 && code <= 0x137f) {
      if (++count > 5) return true
      if (inEthiopicWord && char === ' ') hasSpace = true
      inEthiopicWord = true
    } else inEthiopicWord = false
  }
  return hasSpace && count > 1
}

/**
 * Adds a range of Unicode code points to a Set using String.fromCodePoint.
 * @example: addRange(set, 0x0370, 0x03FF) → adds all Greek and Coptic chars
 */
const addRange = (set: Set<string>, start: number, end: number): void => {
  for (let i = start; i <= end; i++) set.add(String.fromCodePoint(i))
}

/**
 * Lazy char map.
 */
let CHAR_MAP: Map<string, string> | null = null

const buildCharMap = (): Map<string, string> => {
  const map = new Map<string, string>()

  for (const [start, base, length] of UNICODE_RANGES) {
    const baseCode = base.charCodeAt(0)
    for (let i = 0; i < length; i++) {
      map.set(String.fromCodePoint(start + i), String.fromCharCode(baseCode + i))
    }
  }

  const maps = [
    MATH_SYMBOLS_MAP,
    MIRRORED_MAP,
    CANADIAN_ABORIGINAL_MAP,
    SMALL_CAPS_MAP,
    STROKED_MAP,
    SUPERSCRIPT_MAP,
    SUBSCRIPT_MAP,
    CURRENCY_MAP,
    CIRCLED_NUMBERS_MAP,
    BLACK_CIRCLES_MAP,
    DARK_SQUARES_MAP,
    REGIONAL_INDICATORS_MAP,
    PARENTHESIZED_MAP,
    MISCELLANEOUS_MAP
  ]

  for (const m of maps) {
    for (const [f, p] of Object.entries(m)) map.set(f, p)
  }

  return map
}

const getCharMap = (): Map<string, string> => (CHAR_MAP ??= buildCharMap())
