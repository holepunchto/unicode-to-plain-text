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
// => { text: 'John Doe', valid: true, length: 8 }

sanitize('   ')
// => { text: '', valid: false, length: 0, error: 'whitespace_only' }

sanitize('AB', { minLength: 3 })
// => { text: 'AB', valid: false, length: 2, error: 'too_short' }
```

Custom pipelines:

```js
import {
  pipe,
  normalizeFlipped,
  convertCharacters,
  normalizeDiacritics,
  normalizeDecorations,
  normalizeCasing
} from 'unicode-to-plain-text'

// Create a custom pipeline
const customTransform = pipe(
  normalizeFlipped,
  convertCharacters,
  normalizeDiacritics,
  normalizeDecorations
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
| `asciiOnly`       | boolean        | `false` | Strip all non-ASCII characters after normalization       |

**PreserveOption**: `'all'` | `WritingSystem[]`

**WritingSystem**: `'latin'` | `'greek'` | `'cyrillic'` | `'arabic'` | `'hebrew'` | `'cjk'` | `'ethiopic'` | `'thai'` | `'devanagari'`

> **Note**: `'latin'` preserves all European language diacritics (French, German, Spanish, Portuguese, Polish, Czech, Hungarian, Romanian, Turkish, Nordic, etc.)

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

// Preserve European diacritics (French, German, Turkish, Polish, etc.)
toPlainText('Ömer Şahin', { preserve: ['latin'] }) // => 'Ömer Şahin'
toPlainText('François Müller', { preserve: ['latin'] }) // => 'François Müller'

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

| Option            | Type             | Default | Description                                    |
| ----------------- | ---------------- | ------- | ---------------------------------------------- |
| `minLength`       | number           | `1`     | Minimum length count                           |
| `maxLength`       | number           | `64`    | Maximum length count                           |
| `preserve`        | WritingSystem[]  | -       | Writing systems to preserve                    |
| `skipEmoji`       | boolean          | `false` | Preserve emoji characters                      |
| `trim`            | TrimOption       | `'all'` | Trim mode                                      |
| `truncate`        | boolean          | `false` | Auto-truncate to maxLength instead of error    |
| `allowedWritingSystems`  | WritingSystem[]  | -       | Strict whitelist of allowed writing systems            |
| `rejectHomoglyphs`| boolean          | `false` | Fail validation if homoglyphs detected         |
| `asciiOnly`       | boolean          | `false` | Ensure output contains only ASCII              |

#### Returns

```ts
{
  text: string        // Sanitized text
  valid: boolean      // Whether validation passed
  length: number
  error?: 'empty' | 'too_short' | 'too_long' | 'whitespace_only' | 'homoglyphs' | 'disallowed_writing_system'
}
```

### Detection Utilities

- `detectWritingSystems(text)` - Returns `{ writingSystems: WritingSystem[], mixed: boolean, primary: WritingSystem | null }`
- `getWritingSystem(char)` - Returns the writing system for a single character
- `hasHomoglyphs(text)` - Checks if text contains cross-script visually confusable characters
- `analyzeHomoglyphs(text)` - Returns detailed analysis of homoglyph matches
- `isSuspiciousMix(text)` - Checks for Latin + Cyrillic/Greek mixing (common spoofing)

### Individual Functions

- `normalizeFlipped(text)` - Handles upside-down and mirrored text
- `convertCharacters(text, options?)` - Maps Unicode to ASCII equivalents
- `normalizeDiacritics(text)` - Removes diacritics from Latin text
- `normalizeDecorations(text, options?)` - Removes emojis and decorations
- `decodeUnicodeId(text)` - Converts comma-separated code points to string
- `normalizeSpaces(text, options?)` - Normalizes whitespace with trim control
- `normalizeCasing(text)` - Normalizes inconsistent casing
- `pipe(...fns)` - Composes functions into a pipeline
- `pipeWith(...fns)` - Pipe with shared context
- `when(fn, condition)` - Conditional pipeline step

## License

Apache-2.0
