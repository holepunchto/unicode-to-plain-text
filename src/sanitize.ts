import { toPlainText } from './toPlainText'
import { validateInput } from './utils/validation'
import { detectWritingSystems } from './detectWritingSystems'
import { hasHomoglyphs } from './detectHomoglyphs'
import type { PreserveOption, WritingSystem } from './convertCharacters'
import type { TrimOption } from './normalizeSpaces'

export type SanitizeOptions = {
  minLength?: number
  maxLength?: number
  preserve?: PreserveOption
  skipEmoji?: boolean
  trim?: TrimOption
  truncate?: boolean
  allowedWritingSystems?: WritingSystem[]
  rejectHomoglyphs?: boolean
  asciiOnly?: boolean
}

export type SanitizeError =
  | 'empty'
  | 'too_short'
  | 'too_long'
  | 'whitespace_only'
  | 'homoglyphs'
  | 'disallowed_writing_system'

export type SanitizeResult = {
  text: string
  valid: boolean
  length: number
  error?: SanitizeError
}

const DEFAULT_MIN_LENGTH = 1
const DEFAULT_MAX_LENGTH = 64

/**
 * Sanitizes text using toPlainText, then validates.
 * @example: sanitize('𝐉𝐨𝐡𝐧  ') → { text: 'John', valid: true, length: 4 }
 * @example: sanitize('pаypal', { rejectHomoglyphs: true }) → { ..., valid: false, error: 'homoglyphs' }
 */
export const sanitize = (text: string, options?: SanitizeOptions): SanitizeResult => {
  const input = validateInput(text)
  const minLength = options?.minLength ?? DEFAULT_MIN_LENGTH
  const maxLength = options?.maxLength ?? DEFAULT_MAX_LENGTH

  if (input.length === 0) {
    return { text: '', valid: false, length: 0, error: 'empty' }
  }

  // Check for homoglyphs before any transformation
  if (options?.rejectHomoglyphs && hasHomoglyphs(input)) {
    return { text: input, valid: false, length: input.length, error: 'homoglyphs' }
  }

  let result = toPlainText(input, {
    normalizeSpaces: true,
    skipEmoji: options?.skipEmoji,
    preserve: options?.preserve,
    trim: options?.trim,
    asciiOnly: options?.asciiOnly
  })

  // Check allowed writing systems if specified
  if (options?.allowedWritingSystems && options.allowedWritingSystems.length > 0) {
    const { writingSystems } = detectWritingSystems(result)
    const disallowed = writingSystems.filter((s) => !options.allowedWritingSystems!.includes(s))
    if (disallowed.length > 0) {
      return { text: result, valid: false, length: result.length, error: 'disallowed_writing_system' }
    }
  }

  if (result.length === 0) {
    return { text: '', valid: false, length: 0, error: 'whitespace_only' }
  }

  if (result.length < minLength) {
    return { text: result, valid: false, length: result.length, error: 'too_short' }
  }

  // Truncate if enabled, otherwise error on too_long
  if (result.length > maxLength) {
    if (options?.truncate) {
      result = result.slice(0, maxLength)
    } else {
      return { text: result, valid: false, length: result.length, error: 'too_long' }
    }
  }

  return { text: result, valid: true, length: result.length }
}

