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
import { isEmoji } from './maps/DECORATIVE_CHARS'

export type WritingSystem =
  | 'greek'
  | 'cyrillic'
  | 'arabic'
  | 'hebrew'
  | 'cjk'
  | 'ethiopic'
  | 'thai'
  | 'devanagari'
  | 'latin'

export type PreserveOption = 'all' | WritingSystem[]

export const DEFAULT_PRESERVE_OPTION: PreserveOption = []

export const WRITING_SYSTEMS: WritingSystem[] = [
  'greek',
  'cyrillic',
  'arabic',
  'hebrew',
  'cjk',
  'ethiopic',
  'thai',
  'devanagari',
  'latin'
]

export const WRITING_SYSTEM_RANGES: Record<WritingSystem, [number, number][]> = {
  greek: [
    [0x0370, 0x03ff],
    [0x1f00, 0x1fff]
  ],
  cyrillic: [
    [0x0400, 0x04ff],
    [0x0500, 0x052f]
  ],
  arabic: [
    [0x0600, 0x06ff],
    [0x0750, 0x077f],
    [0x08a0, 0x08ff]
  ],
  hebrew: [[0x0590, 0x05ff]],
  cjk: [
    [0x4e00, 0x9fff],
    [0x3400, 0x4dbf],
    [0x3040, 0x309f],
    [0x30a0, 0x30ff],
    [0xac00, 0xd7af]
  ],
  ethiopic: [[0x1200, 0x137f]],
  thai: [[0x0e00, 0x0e7f]],
  devanagari: [[0x0900, 0x097f]],
  latin: [
    [0x00c0, 0x00ff],
    [0x0100, 0x017f],
    [0x0180, 0x024f],
    [0x1e00, 0x1eff]
  ]
}

export const isInRanges = (code: number, ranges: [number, number][]): boolean =>
  ranges.some(([start, end]) => code >= start && code <= end)

export type ConvertCharactersOptions = {
  preserve?: PreserveOption
  skipEmoji?: boolean
  skipCurrencyMap?: boolean
}

export const DEFAULT_SKIP_CURRENCY_MAP = false

/**
 * Maps fancy Unicode characters to plain ASCII.
 * @example: convertCharacters('𝐇𝐞𝐥𝐥𝐨', { preserve: ['cyrillic'] }) → 'Hello'
 */
export const convertCharacters = (text: string, options?: ConvertCharactersOptions): string => {
  const preserveSet = buildPreserveSet(options?.preserve)
  const skipEmoji = options?.skipEmoji ?? false
  const skipCurrencyMap = options?.skipCurrencyMap ?? false
  const map = getCharacterLookup()

  return Array.from(text)
    .map((char) => {
      if (preserveSet.has(char)) return char
      if (skipEmoji && isEmoji(char)) return char
      if (skipCurrencyMap && CURRENCY_MAP[char as keyof typeof CURRENCY_MAP]) return char
      return map.get(char) ?? char
    })
    .join('')
}

const buildPreserveSet = (preserve?: PreserveOption): Set<string> => {
  const set = new Set<string>()

  const systems = preserve === 'all' ? WRITING_SYSTEMS : preserve

  if (systems) {
    for (const system of systems) {
      const ranges = WRITING_SYSTEM_RANGES[system]
      if (ranges) {
        for (const [start, end] of ranges) addRange(set, start, end)
      }
    }
  }

  return set
}

const addRange = (set: Set<string>, start: number, end: number): void => {
  for (let i = start; i <= end; i++) set.add(String.fromCodePoint(i))
}

let CHARACTER_LOOKUP: Map<string, string> | null = null

const buildCharacterLookup = (): Map<string, string> => {
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

const getCharacterLookup = (): Map<string, string> => (CHARACTER_LOOKUP ??= buildCharacterLookup())
