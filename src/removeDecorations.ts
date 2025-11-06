import { DECORATIVE_CHARS } from './maps/DECORATIVE_CHARS'

/**
 * Threshold: if cleaned text is less than this fraction of original → treat as spam.
 * 0.4 = 40% → means >60% was decoration.
 */
const SPAM_RATIO_THRESHOLD = 0.4

/**
 * Removes decorative characters.
 * Returns empty string if >70% of input was decoration (likely spam).
 *  @example removeDecorations("Hello ✨ world ★") → "Hello  world "
 */
export const removeDecorations = (text: string): string => {
  const cleaned = [...text].filter((char) => !DECORATIVE_CHARS.has(char)).join('')

  const isMostlyDecoration = cleaned.length < text.length * SPAM_RATIO_THRESHOLD

  return isMostlyDecoration ? '' : cleaned
}
