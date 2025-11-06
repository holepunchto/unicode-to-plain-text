const test = require('brittle')
const { handleFlipped } = require('../dist/index.js')

test('handleFlipped - upside-down boundary conditions', (t) => {
  t.is(handleFlipped('ɐqɔ'), 'cba', '66% (2/3) → flip')
  t.is(handleFlipped('ɐq'), 'ɐq', '50% (1/2) → no flip')
  t.is(handleFlipped('ɐ'), 'a', '100% (1/1) → flip')
  t.is(handleFlipped('ɐqcd'), 'ɐqcd', '25% (1/4) → no flip')
  t.is(handleFlipped('ɐqɔde'), 'ɐqɔde', '40% (2/5) → no flip')
  t.is(handleFlipped('ɐɔǝd'), 'peca', '75% (3/4) → flip')
  t.is(handleFlipped('xɐyɔzǝw'), 'wezcyax', '43% (3/7) → flip')
  t.is(handleFlipped('ɐBɔ'), 'cBa', 'mixed case → flip')
})

test('handleFlipped - emoticon handling', (t) => {
  t.not(handleFlipped('(╯°□°)╯︵ ┻━┻').includes('┻━┻'), 'table flip removed')
  t.not(handleFlipped('hello (╯°□°)╯︵ ┻━┻ world').includes('┻━┻'), 'emoticon in middle removed')
  t.not(handleFlipped('ɐqɔ (╯°□°)╯︵ ┻━┻').includes('┻━┻'), 'upside-down + emoticon removed')
  t.is(handleFlipped('no emoticon here'), 'no emoticon here', 'normal text unchanged')
})

test('handleFlipped - mirrored boundary conditions', (t) => {
  t.is(handleFlipped('ᴎɘꟻ'), 'ꟻɘᴎ', '100% (3/3) → reverse')
  t.is(handleFlipped('ᴎɘ'), 'ᴎɘ', '2 chars < 30% → no reverse')
  t.is(handleFlipped('ᴎɘꟻacefghi'), 'ihgfecaꟻɘᴎ', '30% (3/10) → reverse')
  t.is(handleFlipped('ᴎɘꟻxxxxxxxx'), 'ᴎɘꟻxxxxxxxx', '27% (3/11) → no reverse')
  t.is(handleFlipped('ᴎɘꟻꙅacefgh'), 'hgfecaꙅꟻɘᴎ', '40% (4/10) → reverse')
  t.is(handleFlipped('abcᴎɘꟻdefghi'), 'abcᴎɘꟻdefghi', '23% (3/13) → no reverse')
})

test('handleFlipped - mirrored letter swapping', (t) => {
  t.is(handleFlipped('xᴎiwblɘꟻ'), 'ꟻɘldwiᴎx', 'b→d swap in mirrored text')
  t.is(handleFlipped('xpᴎɘꙅqy'), 'ypꙅɘᴎqx', 'p↔q swap in mirrored text')
  t.is(handleFlipped('pdᴎɘꙅb'), 'dꙅɘᴎbq', 'b↔d and p→q swap together')
  t.is(handleFlipped('bdpq'), 'bdpq', 'isolated bdpq → no swap')
})

test('handleFlipped - edge cases', (t) => {
  t.is(handleFlipped(''), '', 'empty string')
  t.is(handleFlipped('   '), '   ', 'only spaces')
  t.is(handleFlipped('xyz'), 'xyz', 'normal letters')
  t.is(handleFlipped('∀Ɔǝ'), 'eCA', 'uppercase upside-down')
  t.is(handleFlipped('ɐɔǝ'), 'eca', 'lowercase upside-down')
})