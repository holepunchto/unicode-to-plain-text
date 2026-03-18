import { OTHER_DECORATIONS, EMOTICON_PUNCTUATION, isEmoji } from './maps/DECORATIVE_CHARS'

/**
 * Threshold: if cleaned text is less than this fraction of original → treat as spam.
 * 0.4 = 40% → means >60% was decoration.
 */
const SPAM_RATIO_THRESHOLD = 0.4
export const DEFAULT_SKIP_EMOJI = false
export const DEFAULT_SKIP_EMOTICON_PUNCTUATION = false

export type NormalizeDecorationsOptions = {
  skipEmoji?: boolean
  skipEmoticonPunctuation?: boolean
}

/**
 * Removes decorative characters.
 * Returns empty string if >70% of input was decoration (likely spam).
 * @example normalizeDecorations("Hello ✨ world ★") → "Hello  world "
 * @example normalizeDecorations("Hello 🎉 world", { skipEmoji: true }) → "Hello 🎉 world"
 */
export const normalizeDecorations = (
  text: string,
  options?: NormalizeDecorationsOptions
): string => {
  const cleaned = [...text]
    .filter((char) => {
      if (options?.skipEmoticonPunctuation && EMOTICON_PUNCTUATION.includes(char)) return true
      // Always remove non-emoji decorations
      if (OTHER_DECORATIONS.has(char)) return false

      // If skipEmoji is true, keep emojis; otherwise remove them
      if (isEmoji(char)) return options?.skipEmoji ?? false

      // Keep everything else
      return true
    })
    .join('')

  const isMostlyDecoration = cleaned.length < text.length * SPAM_RATIO_THRESHOLD

  return isMostlyDecoration ? '' : cleaned
}
