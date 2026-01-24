const test = require('brittle')
const { normalizeFlipped } = require('../dist/index.js')

test('normalizeFlipped - upside-down boundary conditions', (t) => {
  t.is(normalizeFlipped('ɐqɔ'), 'cba', '66% (2/3) → flip')
  t.is(normalizeFlipped('ɐq'), 'ɐq', '50% (1/2) → no flip')
  t.is(normalizeFlipped('ɐ'), 'a', '100% (1/1) → flip')
  t.is(normalizeFlipped('ɐqcd'), 'ɐqcd', '25% (1/4) → no flip')
  t.is(normalizeFlipped('ɐqɔde'), 'ɐqɔde', '40% (2/5) → no flip')
  t.is(normalizeFlipped('ɐɔǝd'), 'peca', '75% (3/4) → flip')
  t.is(normalizeFlipped('xɐyɔzǝw'), 'wezcyax', '43% (3/7) → flip')
  t.is(normalizeFlipped('ɐBɔ'), 'cBa', 'mixed case → flip')
})

test('normalizeFlipped - emoticon handling', (t) => {
  t.not(normalizeFlipped('(╯°□°)╯︵ ┻━┻').includes('┻━┻'), 'table flip removed')
  t.not(normalizeFlipped('hello (╯°□°)╯︵ ┻━┻ world').includes('┻━┻'), 'emoticon in middle removed')
  t.not(normalizeFlipped('ɐqɔ (╯°□°)╯︵ ┻━┻').includes('┻━┻'), 'upside-down + emoticon removed')
  t.is(normalizeFlipped('no emoticon here'), 'no emoticon here', 'normal text unchanged')
})

test('normalizeFlipped - mirrored boundary conditions', (t) => {
  t.is(normalizeFlipped('ᴎɘꟻ'), 'ꟻɘᴎ', '100% (3/3) → reverse')
  t.is(normalizeFlipped('ᴎɘ'), 'ᴎɘ', '2 chars < 30% → no reverse')
  t.is(normalizeFlipped('ᴎɘꟻacefghi'), 'ihgfecaꟻɘᴎ', '30% (3/10) → reverse')
  t.is(normalizeFlipped('ᴎɘꟻxxxxxxxx'), 'ᴎɘꟻxxxxxxxx', '27% (3/11) → no reverse')
  t.is(normalizeFlipped('ᴎɘꟻꙅacefgh'), 'hgfecaꙅꟻɘᴎ', '40% (4/10) → reverse')
  t.is(normalizeFlipped('abcᴎɘꟻdefghi'), 'abcᴎɘꟻdefghi', '23% (3/13) → no reverse')
})

test('normalizeFlipped - mirrored letter swapping', (t) => {
  t.is(normalizeFlipped('xᴎiwblɘꟻ'), 'ꟻɘldwiᴎx', 'b→d swap in mirrored text')
  t.is(normalizeFlipped('xpᴎɘꙅqy'), 'ypꙅɘᴎqx', 'p↔q swap in mirrored text')
  t.is(normalizeFlipped('pdᴎɘꙅb'), 'dꙅɘᴎbq', 'b↔d and p→q swap together')
  t.is(normalizeFlipped('bdpq'), 'bdpq', 'isolated bdpq → no swap')
})

test('normalizeFlipped - edge cases', (t) => {
  t.is(normalizeFlipped(''), '', 'empty string')
  t.is(normalizeFlipped('   '), '   ', 'only spaces')
  t.is(normalizeFlipped('xyz'), 'xyz', 'normal letters')
  t.is(normalizeFlipped('∀Ɔǝ'), 'eCA', 'uppercase upside-down')
  t.is(normalizeFlipped('ɐɔǝ'), 'eca', 'lowercase upside-down')
})
