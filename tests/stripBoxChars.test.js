const test = require('brittle')
const { stripBoxChars } = require('../dist/index.js')

test('stripBoxChars - edge cases', (t) => {
  t.is(stripBoxChars(''), '', 'empty string')
  t.is(stripBoxChars('hello'), 'hello', 'plain ascii unchanged')
  t.is(stripBoxChars('Hello World 123'), 'Hello World 123', 'plain text unchanged')
})

test('stripBoxChars - private use area stripped', (t) => {
  t.is(stripBoxChars(''), '', 'PUA first char stripped')
  t.is(stripBoxChars(''), '', 'PUA last char (Apple logo) stripped')
  t.is(stripBoxChars('helloworld'), 'helloworld', 'PUA in middle stripped')
})

test('stripBoxChars - ancient / undeciphered scripts stripped', (t) => {
  t.is(stripBoxChars('𐇐'), '', 'Phaistos Disc stripped')
  t.is(stripBoxChars('𐋠'), '', 'Coptic Epact Numbers stripped')
  t.is(stripBoxChars('𐕰'), '', 'Vithkuqi stripped')
  t.is(stripBoxChars('𐗀'), '', 'Todhri stripped')
  t.is(stripBoxChars('𐞀'), '', 'Latin Extended-F stripped')
  t.is(stripBoxChars('𐵀'), '', 'Garay stripped')
  t.is(stripBoxChars('𐹠'), '', 'Rumi Numeral Symbols stripped')
  t.is(stripBoxChars('𐼀'), '', 'Old Sogdian stripped')
  t.is(stripBoxChars('𐽰'), '', 'Old Uyghur stripped')
  t.is(stripBoxChars('𐿠'), '', 'Elymaic stripped')
})

test('stripBoxChars - Lycian / Carian kept (false positives)', (t) => {
  t.is(stripBoxChars('𐊀'), '𐊀', 'Lycian kept')
  t.is(stripBoxChars('𐊠'), '𐊠', 'Carian kept')
})

test('stripBoxChars - obscure Indic scripts stripped', (t) => {
  t.is(stripBoxChars('𑎀'), '', 'Tulu-Tigalari stripped')
  t.is(stripBoxChars('𑛐'), '', 'Myanmar Extended-C stripped')
  t.is(stripBoxChars('𑠀'), '', 'Dogra stripped')
  t.is(stripBoxChars('𑤀'), '', 'Dives Akuru stripped')
  t.is(stripBoxChars('𑦠'), '', 'Nandinagari stripped')
  t.is(stripBoxChars('𑨀'), '', 'Zanabazar Square stripped')
  t.is(stripBoxChars('𑩐'), '', 'Soyombo stripped')
  t.is(stripBoxChars('𑬀'), '', 'Devanagari Extended-A stripped')
  t.is(stripBoxChars('𑯀'), '', 'Sunuwar stripped')
  t.is(stripBoxChars('𑻠'), '', 'Makasar stripped')
  t.is(stripBoxChars('𑼀'), '', 'Kawi stripped')
  t.is(stripBoxChars('𑾰'), '', 'Lisu Supplement stripped')
})

test('stripBoxChars - Egyptian / Anatolian stripped', (t) => {
  t.is(stripBoxChars('𒾐'), '', 'Cypro-Minoan stripped')
  t.is(stripBoxChars('𓐰'), '', 'Egyptian Hieroglyph Format Controls stripped')
  t.is(stripBoxChars('𔐀'), '', 'Anatolian Hieroglyphs stripped')
})

test('stripBoxChars - minority scripts stripped', (t) => {
  t.is(stripBoxChars('𖄀'), '', 'Gurung Khema stripped')
  t.is(stripBoxChars('𖩰'), '', 'Tangsa stripped')
  t.is(stripBoxChars('𖵀'), '', 'Kirat Rai stripped')
  t.is(stripBoxChars('𖹀'), '', 'Medefaidrin stripped')
  t.is(stripBoxChars('𖿠'), '', 'Ideographic Symbols stripped')
})

test('stripBoxChars - Tangut / Khitan stripped', (t) => {
  t.is(stripBoxChars('𗀀'), '', 'Tangut stripped')
  t.is(stripBoxChars('𘠀'), '', 'Tangut Components stripped')
  t.is(stripBoxChars('𘬀'), '', 'Khitan Small Script stripped')
})

test('stripBoxChars - historical Japanese kana stripped', (t) => {
  t.is(stripBoxChars('𚿰'), '', 'Kana Extended-B stripped')
  t.is(stripBoxChars('𛀀'), '', 'Kana Supplement stripped')
  t.is(stripBoxChars('𛄀'), '', 'Kana Extended-A stripped')
  t.is(stripBoxChars('𛅰'), '', 'Nushu stripped')
})

test('stripBoxChars - musical notation stripped', (t) => {
  t.is(stripBoxChars('𜼀'), '', 'Znamenny Musical Notation stripped')
  t.is(stripBoxChars('𝀀'), '', 'Byzantine Musical Symbols stripped')
  t.is(stripBoxChars('𝇨'), '', 'Musical Symbol U+1D1E8 stripped')
  t.is(stripBoxChars('𝈀'), '', 'Ancient Greek Musical Notation stripped')
  t.is(stripBoxChars('𝋀'), '', 'Kaktovik Numerals stripped')
  t.is(stripBoxChars('𝋠'), '', 'Mayan Numerals stripped')
})

test('stripBoxChars - sign writing / phonetic extensions stripped', (t) => {
  t.is(stripBoxChars('𝠀'), '', 'Sutton SignWriting stripped')
  t.is(stripBoxChars('𝼀'), '', 'Latin Extended-G stripped')
  t.is(stripBoxChars('𞀰'), '', 'Cyrillic Extended-D stripped')
  t.is(stripBoxChars('𞊐'), '', 'Toto stripped')
  t.is(stripBoxChars('𞗐'), '', 'Ol Onal stripped')
  t.is(stripBoxChars('𞟠'), '', 'Ethiopic Extended-B stripped')
})

test('stripBoxChars - symbol blocks stripped', (t) => {
  t.is(stripBoxChars('🙐'), '', 'Ornamental Dingbats stripped')
  t.is(stripBoxChars('🞀'), '', 'Geometric Shapes Extended lower stripped')
  t.is(stripBoxChars('🠀'), '', 'Supplemental Arrows-C stripped')
  t.is(stripBoxChars('🨀'), '', 'Chess Symbols stripped')
  t.is(stripBoxChars('🯻'), '', 'Symbols for Legacy Computing last 5 stripped')
})

test('stripBoxChars - emoji kept', (t) => {
  t.is(stripBoxChars('🎉🔥💯'), '🎉🔥💯', 'common emoji kept')
  t.is(stripBoxChars('🇺🇸'), '🇺🇸', 'flag emoji kept')
  t.is(stripBoxChars('🟠🟡🟢🟣🟤'), '🟠🟡🟢🟣🟤', 'colored circle emoji kept')
  t.is(stripBoxChars('🬀'), '🬀', 'Symbols for Legacy Computing first char kept')
  t.is(stripBoxChars('🈚🈯🈲🉐'), '🈚🈯🈲🉐', 'Japanese enclosed emoji kept')
})

test('stripBoxChars - common writing systems kept', (t) => {
  t.is(stripBoxChars('مرحبا'), 'مرحبا', 'Arabic kept')
  t.is(stripBoxChars('สวัสดี'), 'สวัสดี', 'Thai kept')
  t.is(stripBoxChars('你好世界'), '你好世界', 'CJK kept')
  t.is(stripBoxChars('Привет'), 'Привет', 'Cyrillic kept')
  t.is(stripBoxChars('שלום'), 'שלום', 'Hebrew kept')
  t.is(stripBoxChars('Այբ'), 'Այբ', 'Armenian kept')
  t.is(stripBoxChars('あいう'), 'あいう', 'Hiragana kept')
  t.is(stripBoxChars('안녕'), '안녕', 'Hangul kept')
  t.is(stripBoxChars('𐊀𐊠'), '𐊀𐊠', 'Lycian and Carian kept')
})

test('stripBoxChars - math alphanumeric kept', (t) => {
  t.is(stripBoxChars('𝐇𝐞𝐥𝐥𝐨'), '𝐇𝐞𝐥𝐥𝐨', 'math bold kept')
  t.is(stripBoxChars('𝌀'), '𝌀', 'Tai Xuan Jing kept')
  t.is(stripBoxChars('𒀀'), '𒀀', 'Cuneiform kept')
})

test('stripBoxChars - mixed content', (t) => {
  t.is(stripBoxChars('Hi 𝇨 مرحبا 🎉'), 'Hi  مرحبا 🎉', 'strips box char, keeps arabic and emoji')
  t.is(stripBoxChars('Hello𝀀World'), 'HelloWorld', 'strips inline box char')
  t.is(stripBoxChars('test𛀀𝈀end'), 'testend', 'strips multiple box chars')
})

test('stripBoxChars - lone surrogates stripped', (t) => {
  t.is(stripBoxChars('\uD800'), '', 'lone high surrogate stripped')
  t.is(stripBoxChars('\uDFFF'), '', 'lone low surrogate stripped')
  t.is(stripBoxChars('a\uD800b'), 'ab', 'lone surrogate in middle stripped')
})

test('stripBoxChars - supplementary PUA stripped', (t) => {
  t.is(stripBoxChars('\u{F0000}'), '', 'Supplementary PUA-A stripped')
  t.is(stripBoxChars('\u{100000}'), '', 'Supplementary PUA-B stripped')
})

test('stripBoxChars - Small Kana Extension stripped', (t) => {
  t.is(stripBoxChars('\u{1B132}'), '', 'Small Kana Extension U+1B132 stripped')
  t.is(stripBoxChars('\u{1B150}'), '', 'Small Kana Extension U+1B150 stripped')
})

test('stripBoxChars - Musical Symbols lower range kept (renders on iOS)', (t) => {
  t.is(stripBoxChars('𝄞'), '𝄞', 'treble clef U+1D11E kept')
  t.is(stripBoxChars('𝄢'), '𝄢', 'bass clef U+1D122 kept')
})
