/**
 * Mirrored/Flipped character mappings.
 * These characters appear horizontally flipped and need normalization.
 * Used for detection and normalization by mapCharacters.
 */
export const MIRRORED_MAP = {
  // Lowercase mirrored
  ɘ: 'e',
  ꙅ: 's',
  ᴎ: 'n',
  ꟻ: 'F',
  ᴙ: 'r',
  ꟼ: 'P',
  Я: 'R',
  ↄ: 'c',
  ϱ: 'g',
  ʜ: 'h',
  į: 'i',
  ɿ: 'r',
  ƨ: 's',

  // Additional mirrored characters
  ᙠ: 'C',
  Ꙅ: 'S'
} as const

/**
 * Bidirectional letter swaps needed after reversing mirrored text.
 * These letters are mirror images of each other (b↔d, p↔q).
 */
export const MIRRORED_LETTER_SWAPS: Record<string, string> = {
  b: 'd',
  d: 'b',
  p: 'q',
  q: 'p',
  B: 'D',
  D: 'B',
  P: 'Q',
  Q: 'P'
}
