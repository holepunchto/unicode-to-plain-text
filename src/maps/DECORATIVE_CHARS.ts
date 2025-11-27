/**
 * Decorative characters and emoji detection for text processing.
 */

/**
 * Emoji Unicode ranges (code points).
 * Based on Unicode Standard for emoji detection.
 */
const EMOJI_RANGES: readonly [number, number][] = [
  [0x1f300, 0x1f9ff], // Miscellaneous Symbols and Pictographs, Emoticons, etc.
  [0x1fa00, 0x1faff], // Supplemental Symbols and Pictographs
  [0x2600, 0x26ff], // Miscellaneous Symbols (☀️⚠️❤️ etc.)
  [0x2700, 0x27bf], // Dingbats (✅❌✨ etc.)
  [0x2300, 0x23ff], // Miscellaneous Technical (⌚ etc.)
  [0x2b50, 0x2b55], // Stars and circles (⭐⭕ etc.)
  [0xfe00, 0xfe0f], // Variation Selectors (emoji modifiers)
  [0x200d, 0x200d] // Zero Width Joiner (for compound emojis)
]

export const isEmoji = (char: string): boolean => {
  const codePoint = char.codePointAt(0)
  if (codePoint === undefined) return false

  for (const [start, end] of EMOJI_RANGES) {
    if (codePoint >= start && codePoint <= end) return true
  }
  return false
}

// Non-emoji decorative characters (always removed)
export const EMOTICON_DECORATIONS = '࿐►❚»«ᅳಠ益ノ彡‿ꜟ｡◥◤ﾟ言╬'
export const BOX_BLOCKS = '░▒▓█▀▄▌▐▖▞▚▅⯊◀◗◣◤⧗'
export const CHESS_PIECES = '♔♕♖♗♘♙♚♛♜♝♞♟'
export const BOX_DRAWING_LINES = '┃━┏┓┗┛├┤┬┴┼╋═║╔╗╚╝╠╣╦╩╬'
export const ARROWS_SYMBOLS = '↳↔↕➔►◗☡☭☋☿☈♗♭→'
export const EMOTICON_PUNCTUATION = 'ʘ·¯´`().,'
export const STARS_DECORATIVE = '※★☆✦✧✴✶✷✸✹✺'
export const MUSIC_DECORATIVE = '♪♫'

type DecorativeRange = readonly [number, number, string]

// Decoration-only ranges (these never contain emojis)
const DECORATION_ONLY_RANGES: readonly DecorativeRange[] = [
  [0x2500, 0x257f, 'Box Drawing'],
  [0x2580, 0x259f, 'Block Elements'],
  [0x2200, 0x22ff, 'Mathematical Operators'],
  [0x25a0, 0x25ff, 'Geometric Shapes'],
  [0x2b00, 0x2b4f, 'Miscellaneous Symbols and Arrows (non-emoji part)'],
  [0x2460, 0x24ff, 'Enclosed Alphanumerics'],
  [0x0300, 0x036f, 'Combining Diacritical Marks (zalgo text)'],
  [0x20d0, 0x20ff, 'Combining Diacritical Marks for Symbols'],
  [0xfe20, 0xfe2f, 'Combining Half Marks'],
  [0x1ab0, 0x1aff, 'Combining Diacritical Marks Extended'],
  [0x1dc0, 0x1dff, 'Combining Diacritical Marks Supplement']
] as const

// Helper to expand ranges to character strings
const expandRanges = (ranges: readonly DecorativeRange[]): string =>
  ranges
    .flatMap(([start, end]) =>
      Array.from({ length: end - start + 1 }, (_, index) => String.fromCodePoint(start + index))
    )
    .join('')

const EXPLICIT_DECORATIONS = [
  EMOTICON_DECORATIONS,
  BOX_BLOCKS,
  CHESS_PIECES,
  BOX_DRAWING_LINES,
  ARROWS_SYMBOLS,
  EMOTICON_PUNCTUATION,
  STARS_DECORATIVE,
  MUSIC_DECORATIVE
].join('')

// Other decorative characters set (always removed) - excludes emoji chars
export const OTHER_DECORATIONS = new Set<string>(
  EXPLICIT_DECORATIONS + expandRanges(DECORATION_ONLY_RANGES)
)

// All decorative characters (default behavior - removes everything)
export const DECORATIVE_CHARS = OTHER_DECORATIONS
