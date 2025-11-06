import { handleUnicodeId } from './handleUnicodeId'
import { mapCharacters } from './mapCharacters'
import { normalizeCasing } from './normalizeCasing'
import { normalizeUnicode } from './normalizeUnicode'
import { removeDecorations } from './removeDecorations'
import { pipe } from './pipe'
import { validateInput } from './utils/validation'
import { normalizeSpaces } from './normalizeSpaces'
import { isAsciiOnly } from './isAsciiOnly'
import { handleFlipped } from './handleFlipped'

/**
 * Converts fancy Unicode text to plain ASCII.
 *
 * This function processes text through a pipeline of transformations to convert
 * decorative Unicode characters (mathematical alphanumerics, enclosed characters,
 * fullwidth forms, etc.) into their plain ASCII equivalents while preserving
 * real language scripts like Greek, Cyrillic, and Ethiopic.
 *
 * @example
 * ```ts
 * toPlainText('𝐇𝐞𝐥𝐥𝐨 𝐖𝐨𝐫𝐥𝐝') // => 'Hello World'
 * toPlainText('🅣🅔🅢🅣') // => 'TEST'
 * toPlainText('ＨＥＬＬＯ') // => 'HELLO'
 * ```
 *
 * @example Preserves real languages
 * ```ts
 * toPlainText('Γεια σας') // => 'Γεια σας' (Greek preserved)
 * toPlainText('Привет') // => 'Привет' (Cyrillic preserved)
 * ```
 *
 * @see {@link https://github.com/holepunchto/unicode-to-plain-text}
 */
export const toPlainText = (text: string): string => {
  const validated = validateInput(text)

  if (isAsciiOnly(validated)) {
    return pipe(handleUnicodeId, normalizeSpaces)(validated)
  }

  return pipe(
    handleFlipped,
    mapCharacters,
    normalizeUnicode,
    removeDecorations,
    normalizeSpaces,
    normalizeCasing
  )(validated)
}

// Export individual transformation functions for advanced usage
export { handleUnicodeId } from './handleUnicodeId'
export { handleFlipped } from './handleFlipped'
export { mapCharacters } from './mapCharacters'
export { normalizeUnicode } from './normalizeUnicode'
export { removeDecorations } from './removeDecorations'
export { normalizeCasing } from './normalizeCasing'
export { pipe } from './pipe'
