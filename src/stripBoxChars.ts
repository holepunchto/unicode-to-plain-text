import { isInRanges } from './convertCharacters'

const STRIP_RANGES: [number, number][] = [
  [0xD800, 0xDFFF],   // Lone surrogates (invalid in well-formed Unicode)
  [0xE000, 0xF8FF],   // Private Use Area (BMP)

  // Ancient / undeciphered scripts
  [0x101D0, 0x1027F], // Phaistos Disc
  [0x102E0, 0x102FF], // Coptic Epact Numbers
  [0x10570, 0x105FF], // Vithkuqi, Todhri
  [0x10780, 0x107BF], // Latin Extended-F
  [0x10D40, 0x10D8F], // Garay
  [0x10E60, 0x10E7F], // Rumi Numeral Symbols
  [0x10F00, 0x10FFF], // Old Sogdian, Sogdian, Old Uyghur, Chorasmian, Elymaic

  // Obscure Indic / Southeast Asian scripts
  [0x11380, 0x113FF], // Tulu-Tigalari
  [0x116D0, 0x116FF], // Myanmar Extended-C
  [0x11800, 0x1184F], // Dogra
  [0x11900, 0x1195F], // Dives Akuru
  [0x119A0, 0x119FF], // Nandinagari
  [0x11A00, 0x11AAF], // Zanabazar Square, Soyombo
  [0x11B00, 0x11B5F], // Devanagari Extended-A
  [0x11BC0, 0x11BFF], // Sunuwar
  [0x11EE0, 0x11EFF], // Makasar
  [0x11F00, 0x11F5F], // Kawi
  [0x11FB0, 0x11FBF], // Lisu Supplement

  // Egyptian / Anatolian
  [0x12F90, 0x12FFF], // Cypro-Minoan
  [0x13430, 0x1467F], // Egyptian Hieroglyph Format Controls + Extended-A, Anatolian Hieroglyphs

  // Minority / regional scripts
  [0x16100, 0x1613F], // Gurung Khema
  [0x16A70, 0x16ACF], // Tangsa
  [0x16D40, 0x16D7F], // Kirat Rai
  [0x16E40, 0x16E9F], // Medefaidrin
  [0x16FE0, 0x16FFF], // Ideographic Symbols and Punctuation

  // Tangut, Khitan
  [0x17000, 0x18D7F], // Tangut, Tangut Components, Khitan Small Script, Tangut Supplement

  // Historical Japanese kana (including Small Kana Extension gap U+1B130–U+1B16F)
  [0x1AFF0, 0x1B2FF], // Kana Extended-B, Kana Supplement, Kana Extended-A, Small Kana Extension, Nushu

  // Legacy computing symbols
  [0x1CC00, 0x1CEBF], // Symbols for Legacy Computing Supplement

  // Musical notation
  // Note: U+1D100–U+1D1E7 (Musical Symbols lower) is intentionally kept —
  // common glyphs like treble clef (U+1D11E) and bass clef (U+1D122) render on iOS.
  [0x1CF00, 0x1CFCF], // Znamenny Musical Notation
  [0x1D000, 0x1D0FF], // Byzantine Musical Symbols
  [0x1D1E8, 0x1D24F], // Musical Symbols (upper) + Ancient Greek Musical Notation
  [0x1D2C0, 0x1D2FF], // Kaktovik Numerals, Mayan Numerals

  // Sign writing, phonetic / script extensions
  [0x1D800, 0x1DAAF], // Sutton SignWriting
  [0x1DF00, 0x1DFFF], // Latin Extended-G
  [0x1E030, 0x1E08F], // Cyrillic Extended-D
  [0x1E290, 0x1E2BF], // Toto
  [0x1E5D0, 0x1E5FF], // Ol Onal
  [0x1E7E0, 0x1E7FF], // Ethiopic Extended-B

  // Symbol blocks (confirmed unrendered on iOS notifications)
  [0x1F650, 0x1F67F], // Ornamental Dingbats
  [0x1F780, 0x1F7DF], // Geometric Shapes Extended (0x1F7E0+ are colored circle/square emoji — kept)
  [0x1F800, 0x1F8FF], // Supplemental Arrows-C
  [0x1FA00, 0x1FA6F], // Chess Symbols
  [0x1FBFB, 0x1FBFF], // Symbols for Legacy Computing (last 5 only)

  // Supplementary Private Use Areas
  [0xF0000, 0x10FFFF], // PUA-A and PUA-B
]

export const stripBoxChars = (text: string): string =>
  [...text].filter(c => {
    const cp = c.codePointAt(0)
    return cp !== undefined && !isInRanges(cp, STRIP_RANGES)
  }).join('')
