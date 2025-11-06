import { UPSIDE_DOWN_MAP } from './maps/UPSIDE_DOWN_MAP'
import { FLIP_EMOTICONS_MAP } from './maps/FLIP_EMOTICONS_MAP'
import { MIRRORED_MAP, MIRRORED_LETTER_SWAPS } from './maps/MIRRORED_MAP'

/**
 * Handles upside-down and mirrored (flipped) text.
 * Removes emoticons, detects type, normalizes.
 * @example: handleFlipped('xᴎiwblɘꟻ ɘꙅoᴙdmA') → 'Jazquelyn Ambrose'
 */
export const handleFlipped = (text: string): string => {
  let result = removeEmoticons(text)

  if (isUpsideDown(result)) {
    return [...result]
      .map((c) => UPSIDE_DOWN_MAP[c] ?? c)
      .reverse()
      .join('')
  }

  if (isMirrored(result)) {
    return [...result]
      .reverse()
      .map((c) => MIRRORED_LETTER_SWAPS[c] ?? c)
      .join('')
  }

  return result
}

/**
 * Removes known flipped emoticons recursively.
 */
const removeEmoticons = (text: string): string => {
  const emoticon = FLIP_EMOTICONS_MAP.find((e) => text.includes(e))
  return emoticon ? removeEmoticons(text.replace(emoticon, '').trim()) : text
}

/**
 * Detects upside-down text (higher tolerance).
 */
const isUpsideDown = (text: string): boolean => {
  const chars = [...text].filter((c) => c.trim() !== '')
  const flipped = chars.filter(
    (c) => UPSIDE_DOWN_MAP[c] && !UPSIDE_DOWN_MAP[UPSIDE_DOWN_MAP[c]]
  ).length
  return flipped > 2 || flipped / chars.length > 0.5
}

/**
 * Detects mirrored text (stricter: needs both count and ratio).
 * Uses non-bidirectional mirrored chars from MIRRORED_MAP for detection.
 */
const isMirrored = (text: string): boolean => {
  const chars = [...text].filter((c) => c.trim() !== '')
  // Filter for non-bidirectional mirrored chars (chars that map but their mapped value doesn't map back)
  const mirrored = chars.filter((c) => {
    const mapped = MIRRORED_MAP[c as keyof typeof MIRRORED_MAP]
    return mapped && !MIRRORED_MAP[mapped as keyof typeof MIRRORED_MAP]
  }).length
  return mirrored > 2 && mirrored / chars.length >= 0.3
}
