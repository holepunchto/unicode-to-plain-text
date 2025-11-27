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
// Real languages are automatically preserved
toPlainText('Hello Γεια σας')  // => 'Hello Γεια σας' (Greek preserved)
toPlainText('Test Привет')     // => 'Test Привет' (Cyrillic preserved)

// But lookalike characters are converted
toPlainText('Α test')  // => 'A test' (Greek Alpha → Latin A)
```

Custom pipelines:

```js
import {
  pipe,
  handleUpsideDown,
  mapCharacters,
  normalizeUnicode,
  removeDecorations,
  normalizeWhitespace,
  normalizeCasing
} from 'unicode-to-plain-text'

// Create a custom pipeline
const customTransform = pipe(
  handleUpsideDown,
  mapCharacters,
  normalizeUnicode,
  removeDecorations,
  normalizeWhitespace
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

| Option           | Type    | Default | Description                                                                          |
| ---------------- | ------- | ------- | ------------------------------------------------------------------------------------ |
| `normalizeSpaces`| boolean | `true`  | Collapse multiple spaces and trim whitespace                                         |
| `skipEmoji`      | boolean | `false` | Preserve emoji characters (still removes other decorations like box drawing, arrows) |

#### Examples

```js
// Default behavior - emojis removed
toPlainText('Hello 🎉 World') // => 'Hello World'

// Preserve emojis
toPlainText('Hello 🎉 World', { skipEmoji: true }) // => 'Hello 🎉 World'

// Preserve spacing
toPlainText('Hello   World', { normalizeSpaces: false }) // => 'Hello   World'

// Combined options
toPlainText('𝐇𝐞𝐥𝐥𝐨  🎉  𝐖𝐨𝐫𝐥𝐝', { skipEmoji: true, normalizeSpaces: false })
// => 'Hello  🎉  World'
```

Returns a plain ASCII string with normalized whitespace and casing

### Individual Functions

- `handleUpsideDown(text)` - Reverses upside-down text
- `mapCharacters(text)` - Maps Unicode to ASCII equivalents
- `normalizeUnicode(text)` - Removes diacritics from Latin text
- `removeDecorations(text)` - Removes emojis and decorations
- `normalizeWhitespace(text)` - Normalizes and trims whitespace
- `normalizeCasing(text)` - Normalizes inconsistent casing
- `pipe(...fns)` - Composes functions into a pipeline

## License

Apache-2.0
