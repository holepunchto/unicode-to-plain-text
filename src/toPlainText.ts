import { decodeUnicodeId, isCodePointList } from './decodeUnicodeId'
import { convertCharacters, PreserveOption, DEFAULT_PRESERVE_OPTION } from './convertCharacters'
import { normalizeCasing } from './normalizeCasing'
import { normalizeDiacritics } from './normalizeDiacritics'
import { normalizeDecorations, DEFAULT_SKIP_EMOJI } from './normalizeDecorations'
import { pipeWith, when } from './pipe'
import { validateInput } from './utils/validation'
import { DEFAULT_TRIM_OPTION, DEFAULT_NORMALIZE_SPACES, normalizeSpaces, TrimOption } from './normalizeSpaces'
import { normalizeFlipped } from './normalizeFlipped'
import { stripNonAscii, DEFAULT_ASCII_ONLY } from './stripNonAscii'

export type ToPlainTextOptions = {
  normalizeSpaces?: boolean
  skipEmoji?: boolean
  preserve?: PreserveOption
  trim?: TrimOption
  asciiOnly?: boolean
}

type Context = ToPlainTextOptions & { original: string }

const DEFAULT_OPTIONS: ToPlainTextOptions = {
  normalizeSpaces: DEFAULT_NORMALIZE_SPACES,
  skipEmoji: DEFAULT_SKIP_EMOJI,
  preserve: DEFAULT_PRESERVE_OPTION,
  trim: DEFAULT_TRIM_OPTION,
  asciiOnly: DEFAULT_ASCII_ONLY
}

/**
 * Converts fancy Unicode text to plain ASCII.
 * @example: toPlainText('𝐇𝐞𝐥𝐥𝐨') → 'Hello'
 * @example: toPlainText('Привет 𝐖𝐨𝐫𝐥𝐝', { preserve: ['cyrillic'] }) → 'Привет World'
 * @example: toPlainText('Café', { asciiOnly: true }) → 'Cafe'
 */
export const toPlainText = (text: string, options?: ToPlainTextOptions): string => {
  const validated = validateInput(text)

  if (isCodePointList(validated)) return decodeUnicodeId(validated)

  const context: Context = {
    ...DEFAULT_OPTIONS,
    ...(options || {}),
    original: validated
  }

  return pipeWith<string, Context>(
    normalizeFlipped,
    convertCharacters,
    normalizeDiacritics,
    normalizeDecorations,
    when(normalizeCasing, (value, { original }) => value !== original),
    when(normalizeSpaces, (_, { normalizeSpaces }) => !!normalizeSpaces),
    when(stripNonAscii, (_, { asciiOnly }) => !!asciiOnly)
  )(validated, context)
}
