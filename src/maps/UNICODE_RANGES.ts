/** Unicode range mapping tuple: [startCodePoint, baseChar, length] */
export type UnicodeRange = [number, string, number]

/**
 * Unicode range-based mappings for efficient character conversion.
 * Each entry: [startCodePoint, baseChar, length]
 */
export const UNICODE_RANGES: UnicodeRange[] = [
  // Mathematical Styles
  [0x1d400, 'A', 26], // Mathematical Bold uppercase
  [0x1d41a, 'a', 26], // Mathematical Bold lowercase
  [0x1d434, 'A', 26], // Mathematical Italic uppercase
  [0x1d44e, 'a', 26], // Mathematical Italic lowercase
  [0x1d468, 'A', 26], // Mathematical Bold Italic uppercase
  [0x1d482, 'a', 26], // Mathematical Bold Italic lowercase
  [0x1d49c, 'A', 26], // Mathematical Script uppercase
  [0x1d4b6, 'a', 26], // Mathematical Script lowercase
  [0x1d4d0, 'A', 26], // Mathematical Bold Script uppercase
  [0x1d4ea, 'a', 26], // Mathematical Bold Script lowercase
  [0x1d504, 'A', 26], // Mathematical Fraktur uppercase
  [0x1d51e, 'a', 26], // Mathematical Fraktur lowercase
  [0x1d56c, 'A', 26], // Mathematical Bold Fraktur uppercase
  [0x1d586, 'a', 26], // Mathematical Bold Fraktur lowercase
  [0x1d538, 'A', 26], // Mathematical Double-Struck uppercase
  [0x1d552, 'a', 26], // Mathematical Double-Struck lowercase
  [0x1d5a0, 'A', 26], // Mathematical Sans-Serif uppercase
  [0x1d5ba, 'a', 26], // Mathematical Sans-Serif lowercase
  [0x1d5d4, 'A', 26], // Mathematical Sans-Serif Bold uppercase
  [0x1d5ee, 'a', 26], // Mathematical Sans-Serif Bold lowercase
  [0x1d608, 'A', 26], // Mathematical Sans-Serif Italic uppercase
  [0x1d622, 'a', 26], // Mathematical Sans-Serif Italic lowercase
  [0x1d63c, 'A', 26], // Mathematical Sans-Serif Bold Italic uppercase
  [0x1d656, 'a', 26], // Mathematical Sans-Serif Bold Italic lowercase
  [0x1d670, 'A', 26], // Mathematical Monospace uppercase
  [0x1d68a, 'a', 26], // Mathematical Monospace lowercase
  [0x1d7ce, '0', 10], // Mathematical Bold Digits
  [0x1d7d8, '0', 10], // Mathematical Double-Struck Digits
  [0x1d7e2, '0', 10], // Mathematical Sans-Serif Digits
  [0x1d7ec, '0', 10], // Mathematical Sans-Serif Bold Digits
  [0x1d7f6, '0', 10], // Mathematical Monospace Digits

  // Decorative Enclosures
  [0x24b6, 'A', 26], // Circled uppercase
  [0x24d0, 'a', 26], // Circled lowercase
  [0x249c, 'a', 26], // Parenthesized lowercase
  [0x1f130, 'A', 26], // Squared uppercase
  [0x1f150, 'A', 26], // Negative Squared uppercase

  // Fullwidth Characters
  [0xff21, 'A', 26], // Fullwidth uppercase
  [0xff41, 'a', 26], // Fullwidth lowercase
  [0xff10, '0', 10] // Fullwidth numbers
]
