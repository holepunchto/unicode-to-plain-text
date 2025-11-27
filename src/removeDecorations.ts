import { OTHER_DECORATIONS, isEmoji } from './maps/DECORATIVE_CHARS'

/**
 * Threshold: if cleaned text is less than this fraction of original → treat as spam.
 * 0.4 = 40% → means >60% was decoration.
 */
const SPAM_RATIO_THRESHOLD = 0.4

export type RemoveDecorationsOptions = {
  skipEmoji?: boolean
}

/**
 * Removes decorative characters.
 * Returns empty string if >70% of input was decoration (likely spam).
 * @example removeDecorations("Hello ✨ world ★") → "Hello  world "
 * @example removeDecorations("Hello 🎉 world", { skipEmoji: true }) → "Hello 🎉 world"
 */
export const removeDecorations = (text: string, options?: RemoveDecorationsOptions): string => {
  const cleaned = [...text]
    .filter((char) => {
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
