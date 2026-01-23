import { handleUnicodeId, isUnicodeIdList } from './handleUnicodeId'
import { mapCharacters, WritingSystem } from './mapCharacters'
import { normalizeCasing } from './normalizeCasing'
import { normalizeUnicode } from './normalizeUnicode'
import { removeDecorations } from './removeDecorations'
import { pipeWith, when } from './pipe'
import { validateInput } from './utils/validation'
import { normalizeSpaces, TrimOption } from './normalizeSpaces'
import { handleFlipped } from './handleFlipped'

export type ToPlainTextOptions = {
  normalizeSpaces?: boolean
  skipEmoji?: boolean
  preserve?: WritingSystem[]
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
export const toPlainText = (text: string, options = DEFAULT_OPTIONS): string => {
  const validated = validateInput(text)

  if (isUnicodeIdList(validated)) return handleUnicodeId(validated)

  const context: Context = { ...DEFAULT_OPTIONS, ...options, original: validated }

  return pipeWith<string, Context>(
    handleFlipped,
    mapCharacters,
    normalizeUnicode,
    removeDecorations,
    when(normalizeCasing, (value, { original }) => value !== original),
    when(normalizeSpaces, (_, { normalizeSpaces }) => !!normalizeSpaces)
  )(validated, context)
}
