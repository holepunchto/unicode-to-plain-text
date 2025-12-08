import { handleUnicodeId, isUnicodeIdList } from './handleUnicodeId'
import { mapCharacters } from './mapCharacters'
import { normalizeCasing } from './normalizeCasing'
import { normalizeUnicode } from './normalizeUnicode'
import { removeDecorations } from './removeDecorations'
import { pipe } from './pipe'
import { validateInput } from './utils/validation'
import { normalizeSpaces } from './normalizeSpaces'
import { handleFlipped } from './handleFlipped'

export type ToPlainTextOptions = {
  normalizeSpaces?: boolean
  skipEmoji?: boolean
}

const DEFAULT_OPTIONS: ToPlainTextOptions = {
  normalizeSpaces: true,
  skipEmoji: false
}

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
export const toPlainText = (text: string, options = DEFAULT_OPTIONS): string => {
  const validated = validateInput(text)
  
  if (isUnicodeIdList(validated)) return handleUnicodeId(validated)

  let result = pipe(
    handleFlipped,
    mapCharacters,
    normalizeUnicode,
  )(validated)

  const fancyReplaced = result !== validated

  result = removeDecorations(result, { skipEmoji: options?.skipEmoji ?? DEFAULT_OPTIONS.skipEmoji })
  if (fancyReplaced) result = normalizeCasing(result)

  const shouldNormalizeSpaces = options?.normalizeSpaces ?? DEFAULT_OPTIONS.normalizeSpaces
  if (shouldNormalizeSpaces) result = normalizeSpaces(result)

  return result
}

// Export individual transformation functions for advanced usage
export { handleUnicodeId } from './handleUnicodeId'
export { handleFlipped } from './handleFlipped'
export { mapCharacters } from './mapCharacters'
export { normalizeUnicode } from './normalizeUnicode'
export { removeDecorations } from './removeDecorations'
export { normalizeCasing } from './normalizeCasing'
export { pipe } from './pipe'
