import { toPlainText } from './toPlainText'
import { validateInput } from './utils/validation'
import { countGraphemes } from './utils/graphemes'
import type { PreserveOption } from './mapCharacters'
import type { TrimOption } from './normalizeSpaces'

export type SanitizeOptions = {
  minGraphemes?: number
  maxGraphemes?: number
  preserve?: PreserveOption
  skipEmoji?: boolean
  trim?: TrimOption
}

export type SanitizeError = 'empty' | 'too_short' | 'too_long' | 'whitespace_only'

export type SanitizeResult = {
  text: string
  valid: boolean
  graphemeCount: number
  error?: SanitizeError
}

const DEFAULT_MIN_GRAPHEMES = 1
const DEFAULT_MAX_GRAPHEMES = 64

/**
 * Sanitizes text using toPlainText, then validates.
 * @example: sanitize('𝐉𝐨𝐡𝐧  ') → { text: 'John', valid: true, graphemeCount: 4 }
 */
export const sanitize = (text: string, options?: SanitizeOptions): SanitizeResult => {
  const input = validateInput(text)
  const minGraphemes = options?.minGraphemes ?? DEFAULT_MIN_GRAPHEMES
  const maxGraphemes = options?.maxGraphemes ?? DEFAULT_MAX_GRAPHEMES

  const result = toPlainText(input, {
    normalizeSpaces: true,
    skipEmoji: options?.skipEmoji,
    preserve: options?.preserve,
    trim: options?.trim
  })

  const graphemeCount = countGraphemes(result)

  if (input.length === 0) {
    return { text: '', valid: false, graphemeCount: 0, error: 'empty' }
  }

  if (graphemeCount === 0) {
    return { text: '', valid: false, graphemeCount: 0, error: 'whitespace_only' }
  }

  if (graphemeCount < minGraphemes) {
    return { text: result, valid: false, graphemeCount, error: 'too_short' }
  }

  if (graphemeCount > maxGraphemes) {
    return { text: result, valid: false, graphemeCount, error: 'too_long' }
  }

  return { text: result, valid: true, graphemeCount }
}
