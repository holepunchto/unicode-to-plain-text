/**
 * Counts graphemes (user-perceived characters) in a string.
 * @example: countGraphemes('👨‍👩‍👧‍👦') → 1
 */
export const countGraphemes = (text: string): number => {
  if (text.length === 0) return 0

  let count = 0
  for (const _ of new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)) {
    count++
  }
  return count
}
