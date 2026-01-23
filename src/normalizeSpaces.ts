export type TrimOption = 'all' | 'start' | 'end' | 'none'

export type NormalizeSpacesOptions = {
  trim?: TrimOption
}

const isWhitespace = (char: string): boolean => char.trim().length === 0

const isInvisible = (char: string): boolean => {
  const code = char.codePointAt(0)
  if (code === undefined) return false

  // Control characters (except whitespace 0x09-0x0D)
  if (code < 0x20) return code < 0x09 || code > 0x0d
  if (code === 0x7f) return true
  if (code >= 0x80 && code <= 0x9f) return true

  // Zero-width characters (except ZWJ 0x200D for emoji)
  if (code >= 0x200b && code <= 0x200f) return code !== 0x200d

  // Format characters
  if (code >= 0x202a && code <= 0x202e) return true
  if (code >= 0x2060 && code <= 0x2069) return true
  if (code === 0xfeff) return true

  return false
}

/**
 * Normalizes whitespace: converts all types to space, strips invisible chars,
 * collapses consecutive spaces, and trims based on mode.
 * @example: normalizeSpaces("  hello   world  ") → "hello world"
 */
export const normalizeSpaces = <Options extends NormalizeSpacesOptions>(
  text: string,
  options?: Options
): string => {
  const trimStart = options?.trim === 'all' || options?.trim === 'start' || options?.trim === undefined
  const trimEnd = options?.trim === 'all' || options?.trim === 'end' || options?.trim === undefined

  const result: string[] = []
  let lastWasSpace = false
  let seenNonSpace = false

  for (const char of text) {
    if (isInvisible(char)) continue

    if (isWhitespace(char)) {
      if (lastWasSpace) continue
      if (!seenNonSpace && trimStart) continue

      lastWasSpace = true
      result.push(' ')
    } else {
      result.push(char)
      lastWasSpace = false
      seenNonSpace = true
    }
  }

  // Remove trailing space if needed
  if (lastWasSpace && trimEnd) {
    result.pop()
  }

  return result.join('')
}

