import { PreserveOption, WRITING_SYSTEM_RANGES, WRITING_SYSTEMS, isInRanges, WritingSystem } from './convertCharacters'

export type NormalizeDiacriticsOptions = {
  preserve?: PreserveOption
}

const COMBINING_MARK_START = 0x0300
const COMBINING_MARK_END = 0x036f

// Only these writing systems use combining diacritical marks (0x0300-0x036F)
// Other systems (CJK, Arabic, Hebrew, etc.) use different composition systems
const NORMALIZABLE_SYSTEMS: WritingSystem[] = ['latin', 'greek', 'cyrillic']

const isCombiningMark = (code: number): boolean =>
  code >= COMBINING_MARK_START && code <= COMBINING_MARK_END

const getWritingSystem = (code: number): WritingSystem | null => {
  for (const system of WRITING_SYSTEMS) {
    if (isInRanges(code, WRITING_SYSTEM_RANGES[system])) return system
  }
  return null
}

const stripDiacritics = (char: string): string => {
  let result = ''
  for (const c of char.normalize('NFD')) {
    if (!isCombiningMark(c.charCodeAt(0))) result += c
  }
  return result
}

/**
 * Strips diacritics from Latin, Greek, and Cyrillic characters unless preserved.
 * Other scripts (CJK, Arabic, Hebrew, etc.) are unchanged - they use different composition systems.
 * @example: normalizeDiacritics('café') → 'cafe'
 * @example: normalizeDiacritics('café', { preserve: ['latin'] }) → 'café'
 * @example: normalizeDiacritics('Γεία') → 'Γεια'
 * @example: normalizeDiacritics('Γεία', { preserve: ['greek'] }) → 'Γεία'
 */
export const normalizeDiacritics = (text: string, options?: NormalizeDiacriticsOptions): string => {
  const preserve = options?.preserve

  if (preserve === 'all') return text

  const preserveSet = Array.isArray(preserve) ? preserve : []

  return Array.from(text)
    .map((char) => {
      const system = getWritingSystem(char.charCodeAt(0))

      if (system && preserveSet.includes(system)) return char
      if (system && NORMALIZABLE_SYSTEMS.includes(system)) return stripDiacritics(char)

      return char
    })
    .join('')
}
