export const UPSIDE_DOWN_MAP: Readonly<Record<string, string>> = {
  // ────── Symmetric letter pairs (both directions) ──────
  q: 'b', // q rotated = b
  p: 'd', // p rotated = d
  u: 'n', // u rotated = n
  n: 'u', // n rotated = u
  b: 'q', // b rotated = q
  d: 'p', // d rotated = p

  // ────── Other rotated letters (one-way) ──────
  ɐ: 'a',
  ɔ: 'c',
  ǝ: 'e',
  ɟ: 'f',
  ƃ: 'g',
  ɥ: 'h',
  ᴉ: 'i',
  ɾ: 'j',
  ʞ: 'k',
  ɯ: 'm',
  ɹ: 'r',
  ʇ: 't',
  ʌ: 'v',
  ʍ: 'w',
  ʎ: 'y',
  ı: 'i',

  // ────── Uppercase ──────
  '∀': 'A',
  Ɔ: 'C',
  ᗡ: 'D',
  Ǝ: 'E',
  Ⅎ: 'F',
  פ: 'G',
  ſ: 'J',
  Ӽ: 'K',
  '⅃': 'L',
  ꟽ: 'M',
  ᴚ: 'R',
  '⊥': 'T',
  Λ: 'V',
  '⅄': 'Y',

  // ────── Digits (symmetric) ──────
  Ɩ: '1',
  ᄅ: '2',
  Ɛ: '3',
  ㄣ: '4',
  ϛ: '5',
  '6': '9',
  '9': '6',
  ㄥ: '7',
  '0': '0',
  '8': '8',

  // ────── Punctuation (symmetric) ──────
  '¡': '!',
  '¿': '?',
  '˙': '.',
  '‚': "'",
  '„': '"',
  '\u2018': ',', // ‘
  '\u2019': ',', // ’
  '‾': '_',
  '⅋': '&',
  '−': '-',
  '/': '\\',
  '\\': '/',
  '(': ')',
  ')': '(',
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
  '<': '>',
  '>': '<',

  // ────── Math / Logic (symmetric) ──────
  '∧': '∨',
  '∨': '∧',
  '∩': '∪',
  '∪': '∩',
  '⊓': '⊔',
  '⊔': '⊓',
  '⊏': '⊐',
  '⊐': '⊏',
  '⊑': '⊒',
  '⊒': '⊑',

  // ────── Meme / Table-flip extras ──────
  '╯': '╭',
  '╭': '╯',
  '︵': '︶',
  '︶': '︵'
} as const
