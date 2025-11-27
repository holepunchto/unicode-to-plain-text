/**
 * Specific decorative characters organized by category.
 * These characters are removed during text processing.
 */

// Emoji characters (can be preserved with skipEmoji option)
export const STARS_SPARKLES_EMOJI = '⭐🌟💫✨'
export const STARS_SPARKLES_OTHER = '※★☆✦✧✴✶✷✸✹✺'
export const MUSIC_CELEBRATION = '🎀🎉🎊🎷🎵🎶🎸'
export const MUSIC_OTHER = '♪♫'
export const MISC_EMOJIS = '🌊🐋🐬🍳🍄💤🔱🏋🥄💲'

// Non-emoji decorative characters (always removed)
export const EMOTICON_DECORATIONS = '࿐►❚»«ᅳಠ益ノ彡‿ꜟ｡◥◤ﾟ言╬'
export const BOX_BLOCKS = '░▒▓█▀▄▌▐▖▞▚▅⯊◀◗◣◤⧗'
export const CHESS_PIECES = '♔♕♖♗♘♙♚♛♜♝♞♟'
export const BOX_DRAWING_LINES = '┃━┏┓┗┛├┤┬┴┼╋═║╔╗╚╝╠╣╦╩╬'
export const ARROWS_SYMBOLS = '↳↔↕➔►◗☡☭☋☿☈♗♭→'
export const EMOTICON_PUNCTUATION = 'ʘ·¯´`().,'

type DecorativeRange = readonly [number, number, string]

// Emoji ranges (preserved when skipEmoji: true)
export const EMOJI_RANGES: readonly DecorativeRange[] = [
  [0x1f300, 0x1f9ff, 'Emojis (Miscellaneous Symbols and Pictographs, Emoticons, etc.)'],
  [0x1fa00, 0x1faff, 'Supplemental Symbols and Pictographs']
] as const

// Non-emoji decorative ranges (always removed)
export const OTHER_DECORATIVE_RANGES: readonly DecorativeRange[] = [
  [0x2600, 0x26ff, 'Miscellaneous Symbols (including ⛎, ✌, ❎, etc.)'],
  [0x2700, 0x27bf, 'Dingbats (✓, ✦, ✧, ✨, ✴, etc.)'],
  [0x2300, 0x23ff, 'Miscellaneous Technical (⌘, ⊙, ⊕, etc.)'],
  [0x2200, 0x22ff, 'Mathematical Operators (∨, ∀, ∩, etc. – some used as decorations)'],
  [0x2500, 0x257f, 'Box Drawing (═, ║, ╔, ╗, etc.)'],
  [0x2580, 0x259f, 'Block Elements (█, ▓, ▒, ░, ▀, ▄, ▌, ▐, etc.)'],
  [0x25a0, 0x25ff, 'Geometric Shapes (■, □, ▲, ►, ◀, ◢, ◣, ◤, etc.)'],
  [0x2b00, 0x2bff, 'Miscellaneous Symbols and Arrows (⬤, ⯊, etc.)'],
  [0x2460, 0x24ff, 'Enclosed Alphanumerics (partial – decorative circled symbols)'],
  [0x0300, 0x036f, 'Combining Diacritical Marks (zalgo text)'],
  [0x20d0, 0x20ff, 'Combining Diacritical Marks for Symbols'],
  [0xfe20, 0xfe2f, 'Combining Half Marks'],
  [0x1ab0, 0x1aff, 'Combining Diacritical Marks Extended'],
  [0x1dc0, 0x1dff, 'Combining Diacritical Marks Supplement']
] as const

// Combined for backward compatibility
export const DECORATIVE_RANGES: readonly DecorativeRange[] = [
  ...EMOJI_RANGES,
  ...OTHER_DECORATIVE_RANGES
] as const

// Helper to expand ranges to character strings
const expandRanges = (ranges: readonly DecorativeRange[]): string =>
  ranges.flatMap(([start, end]) =>
    Array.from({ length: end - start + 1 }, (_, index) => String.fromCodePoint(start + index))
  ).join('')

// Emoji characters set (preserved when skipEmoji: true)
export const EMOJI_CHARS = new Set<string>(
  [
    STARS_SPARKLES_EMOJI,
    MUSIC_CELEBRATION,
    MISC_EMOJIS,
    expandRanges(EMOJI_RANGES)
  ].join('')
)

// Build OTHER_DECORATIONS excluding any chars that are in EMOJI_CHARS
const otherDecorationsBase = new Set<string>(
  [
    STARS_SPARKLES_OTHER,
    MUSIC_OTHER,
    EMOTICON_DECORATIONS,
    BOX_BLOCKS,
    CHESS_PIECES,
    BOX_DRAWING_LINES,
    ARROWS_SYMBOLS,
    EMOTICON_PUNCTUATION,
    expandRanges(OTHER_DECORATIVE_RANGES)
  ].join('')
)

// Other decorative characters set (always removed) - excludes emoji chars
export const OTHER_DECORATIONS = new Set<string>(
  [...otherDecorationsBase].filter((char) => !EMOJI_CHARS.has(char))
)

// All decorative characters (default behavior - removes everything)
export const DECORATIVE_CHARS = new Set<string>(
  [...EMOJI_CHARS, ...OTHER_DECORATIONS]
)
