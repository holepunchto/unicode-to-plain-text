export type TrimOption = 'all' | 'start' | 'end' | 'none'

export type TrimConfig = {
  trimStart: boolean
  trimEnd: boolean
}

export const DEFAULT_TRIM_OPTION: TrimOption = 'all'
export const DEFAULT_NORMALIZE_SPACES = true

export const getTrimConfig = (trim: TrimOption = DEFAULT_TRIM_OPTION): TrimConfig => ({
  trimStart: ['all', 'start'].includes(trim),
  trimEnd: ['all', 'end'].includes(trim)
})

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

  // Soft hyphen
  if (code === 0x00ad) return true

  // Arabic format characters (Cf)
  if (code >= 0x0600 && code <= 0x0605) return true
  if (code === 0x061c) return true
  if (code === 0x06dd) return true

  // Syriac abbreviation mark
  if (code === 0x070f) return true

  // Hangul Choseong / Jungseong Fillers
  if (code === 0x115f || code === 0x1160) return true

  // Khmer Vowel Inherent characters
  if (code === 0x17b4 || code === 0x17b5) return true

  // Mongolian Free Variation Selectors + Vowel Separator
  if (code >= 0x180b && code <= 0x180e) return true

  // Zero-width characters (except ZWJ 0x200D for emoji)
  if (code >= 0x200b && code <= 0x200f) return code !== 0x200d

  // Directional formatting + deprecated format characters
  if (code >= 0x202a && code <= 0x202e) return true
  if (code >= 0x2060 && code <= 0x206f) return true

  // Hangul Filler
  if (code === 0x3164) return true

  // BOM / Zero Width No-Break Space + reversed BOM
  if (code === 0xfeff || code === 0xfffe) return true

  // Interlinear annotation characters
  if (code >= 0xfff9 && code <= 0xfffb) return true

  // Halfwidth Hangul Filler
  if (code === 0xffa0) return true

  // Object Replacement Character
  if (code === 0xfffc) return true

  // Kaithi number sign
  if (code === 0x110bd) return true

  // Shorthand format controls
  if (code >= 0x1bca0 && code <= 0x1bca3) return true

  // Musical symbol enclosing marks
  if (code >= 0x1d173 && code <= 0x1d17a) return true

  // Language tag + tags block
  if (code === 0xe0001) return true
  if (code >= 0xe0020 && code <= 0xe007f) return true

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
  const { trimStart, trimEnd } = getTrimConfig(options?.trim)

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

