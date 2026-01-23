# unicode-to-plain-text

Convert fancy Unicode text to plain ASCII with smart language preservation

## Install

```
npm i unicode-to-plain-text
```

## Usage

Basic usage:

```js
import { toPlainText } from 'unicode-to-plain-text'

// Mathematical styles
toPlainText('𝐇𝐞𝐥𝐥𝐨 𝐖𝐨𝐫𝐥𝐝') // => 'Hello World'

// Enclosed characters
toPlainText('🅣🅔🅢🅣') // => 'TEST'

// Fullwidth forms
toPlainText('ＨＥＬＬＯ') // => 'HELLO'
```

Language preservation:

```js
// Preserve specific writing systems
toPlainText('Привет 𝐖𝐨𝐫𝐥𝐝', { preserve: ['cyrillic'] }) // => 'Привет World'
toPlainText('你好 𝐖𝐨𝐫𝐥𝐝', { preserve: ['cjk'] })       // => '你好 World'

// But lookalike characters are converted when not preserved
toPlainText('Α test')  // => 'A test' (Greek Alpha → Latin A)
```

Sanitize user input:

```js
import { sanitize } from 'unicode-to-plain-text'

// Clean and validate display names
sanitize('𝐉𝐨𝐡𝐧 𝐃𝐨𝐞')
// => { text: 'John Doe', valid: true, graphemeCount: 8 }

sanitize('   ')
// => { text: '', valid: false, graphemeCount: 0, error: 'whitespace_only' }

sanitize('AB', { minGraphemes: 3 })
// => { text: 'AB', valid: false, graphemeCount: 2, error: 'too_short' }
```

Custom pipelines:

```js
import {
  pipe,
  handleFlipped,
  mapCharacters,
  normalizeUnicode,
  removeDecorations,
  normalizeCasing
} from 'unicode-to-plain-text'

// Create a custom pipeline
const customTransform = pipe(
  handleFlipped,
  mapCharacters,
  normalizeUnicode,
  removeDecorations
)

const result = customTransform('𝐓𝐄𝐒𝐓')
```

## API

### toPlainText(text, options?)

Converts fancy Unicode text to plain ASCII

| Property  | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| `text`    | string | Input text with Unicode characters |
| `options` | object | Optional configuration object      |

#### Options

| Option            | Type           | Default | Description                                              |
| ----------------- | -------------- | ------- | -------------------------------------------------------- |
| `normalizeSpaces` | boolean        | `true`  | Collapse spaces, convert whitespace, strip invisible     |
| `skipEmoji`       | boolean        | `false` | Preserve emoji characters                                |
| `preserve`        | PreserveOption | `[]`    | Writing systems to preserve: `'all'` or array            |
| `trim`            | TrimOption     | `'all'` | Trim mode: `'all'`, `'start'`, `'end'`, or `'none'`      |

**PreserveOption**: `'all'` | `WritingSystem[]`

**WritingSystem**: `'greek'` | `'cyrillic'` | `'arabic'` | `'hebrew'` | `'cjk'` | `'ethiopic'` | `'thai'` | `'devanagari'`

#### Examples

```js
// Default behavior - emojis removed
toPlainText('Hello 🎉 World') // => 'Hello World'

// Preserve emojis
toPlainText('Hello 🎉 World', { skipEmoji: true }) // => 'Hello 🎉 World'

// Preserve spacing
toPlainText('Hello   World', { normalizeSpaces: false }) // => 'Hello   World'

// Preserve specific writing systems
toPlainText('שלום 𝐖𝐨𝐫𝐥𝐝', { preserve: ['hebrew'] }) // => 'שלום World'

// Preserve all writing systems
toPlainText('καλημέρί', { preserve: 'all' }) // => 'καλημέρί'

// Control trimming
toPlainText('  hello  ', { trim: 'start' }) // => 'hello '
toPlainText('  hello  ', { trim: 'none' })  // => ' hello '
```

### sanitize(text, options?)

Sanitizes and validates text for use as display names

| Property  | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| `text`    | string | Input text to sanitize             |
| `options` | object | Optional configuration object      |

#### Options

| Option        | Type           | Default | Description                         |
| ------------- | -------------- | ------- | ----------------------------------- |
| `minGraphemes`| number         | `1`     | Minimum grapheme count              |
| `maxGraphemes`| number         | `64`    | Maximum grapheme count              |
| `preserve`    | WritingSystem[]| -       | Writing systems to preserve         |
| `skipEmoji`   | boolean        | `false` | Preserve emoji characters           |
| `trim`        | TrimOption     | `'all'` | Trim mode                           |

#### Returns

```ts
{
  text: string        // Sanitized text
  valid: boolean      // Whether validation passed
  graphemeCount: number
  error?: 'empty' | 'too_short' | 'too_long' | 'whitespace_only'
}
```

### Individual Functions

- `handleFlipped(text)` - Handles upside-down and mirrored text
- `mapCharacters(text, options?)` - Maps Unicode to ASCII equivalents
- `normalizeUnicode(text)` - Removes diacritics from Latin text
- `removeDecorations(text, options?)` - Removes emojis and decorations
- `normalizeSpaces(text, options?)` - Normalizes whitespace with trim control
- `normalizeCasing(text)` - Normalizes inconsistent casing
- `pipe(...fns)` - Composes functions into a pipeline
- `pipeWith(...fns)` - Pipe with shared context
- `when(fn, condition)` - Conditional pipeline step

## License

Apache-2.0
