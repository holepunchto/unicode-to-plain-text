import { decodeUnicodeId, isCodePointList } from './decodeUnicodeId'
import { convertCharacters, PreserveOption } from './convertCharacters'
import { normalizeCasing } from './normalizeCasing'
import { normalizeDiacritics } from './normalizeDiacritics'
import { normalizeDecorations } from './normalizeDecorations'
import { pipeWith, when } from './pipe'
import { validateInput } from './utils/validation'
import { normalizeSpaces, TrimOption } from './normalizeSpaces'
import { normalizeFlipped } from './normalizeFlipped'

export type ToPlainTextOptions = {
  normalizeSpaces?: boolean
  skipEmoji?: boolean
  preserve?: PreserveOption
  trim?: TrimOption
}

type Context = ToPlainTextOptions & { original: string }

const DEFAULT_OPTIONS: ToPlainTextOptions = {
  normalizeSpaces: true,
  skipEmoji: false,
  preserve: [],
  trim: 'all'
}

/**
 * Converts fancy Unicode text to plain ASCII.
 * @example: toPlainText('𝐇𝐞𝐥𝐥𝐨') → 'Hello'
 * @example: toPlainText('Привет 𝐖𝐨𝐫𝐥𝐝', { preserve: ['cyrillic'] }) → 'Привет World'
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
    when(normalizeSpaces, (_, { normalizeSpaces }) => !!normalizeSpaces)
  )(validated, context)
}
