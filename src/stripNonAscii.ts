import { getTrimConfig } from './normalizeSpaces'
import type { TrimOption } from './normalizeSpaces'

export type StripNonAsciiOptions = {
  trim?: TrimOption
  normalizeSpaces?: boolean
}

export const DEFAULT_ASCII_ONLY = false

const isAsciiWhitespace = (code: number): boolean =>
  code === 0x20 || (code >= 0x09 && code <= 0x0d)

/**
 * Strips all non-ASCII characters from text.
 * Only keeps characters in the 0x00-0x7F range.
 * Always respects trim option. Collapses spaces only when normalizeSpaces is true.
 * @example: stripNonAscii('Café') → 'Caf'
 * @example: stripNonAscii('你好 Hello 世界') → 'Hello'
 */
export const stripNonAscii = <Options extends StripNonAsciiOptions>(
  text: string,
  options?: Options
): string => {
  const { trimStart, trimEnd } = getTrimConfig(options?.trim)
  const collapse = options?.normalizeSpaces ?? false

  const result: string[] = []
  let lastWasSpace = false
  let seenNonSpace = false

  for (const char of text) {
    const code = char.codePointAt(0)
    if (code === undefined || code > 0x7f) continue

    if (isAsciiWhitespace(code)) {
      if (collapse && lastWasSpace) continue
      if (!seenNonSpace && trimStart) continue

      lastWasSpace = true
      result.push(char)
    } else {
      result.push(char)
      lastWasSpace = false
      seenNonSpace = true
    }
  }

  // Remove trailing whitespace if needed
  if (trimEnd) {
    while (result.length > 0) {
      const last = result[result.length - 1]
      const code = last.codePointAt(0)
      if (code !== undefined && isAsciiWhitespace(code)) {
        result.pop()
      } else {
        break
      }
    }
  }

  return result.join('')
}

/**
 * Checks if a string contains only ASCII characters.
 */
export const isAscii = (text: string): boolean => {
  for (const char of text) {
    const code = char.codePointAt(0)
    if (code === undefined || code > 0x7f) return false
  }
  return true
}
