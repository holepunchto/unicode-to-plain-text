# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-27

### ⚠️ Breaking Changes

The following functions have been renamed for clarity and consistency:

| v1.x Name | v2.0 Name | Reason |
|-----------|-----------|--------|
| `handleUnicodeId` | `decodeUnicodeId` | Clearer action verb |
| `handleFlipped` | `normalizeFlipped` | Consistent `normalize*` prefix |
| `mapCharacters` | `convertCharacters` | Clearer intent |
| `normalizeUnicode` | `normalizeDiacritics` | More accurate description |
| `removeDecorations` | `normalizeDecorations` | Consistent `normalize*` prefix |

### Migration Guide

Update your imports:

```diff
import {
-  handleUnicodeId,
-  handleFlipped,
-  mapCharacters,
-  normalizeUnicode,
-  removeDecorations
+  decodeUnicodeId,
+  normalizeFlipped,
+  convertCharacters,
+  normalizeDiacritics,
+  normalizeDecorations
} from 'unicode-to-plain-text'
```

### Added

- `detectWritingSystems(text)` - Detect which writing systems are present in text
- `hasHomoglyphs(text)` - Check for visually confusable cross-writing-system characters
- `asciiOnly` option for `toPlainText` - Ensure output contains only ASCII characters
- `truncate` option for `sanitize` - Auto-truncate to maxLength instead of error
- `allowedWritingSystems` option for `sanitize` - Strict writing system whitelist
- `rejectHomoglyphs` option for `sanitize` - Fail validation on homoglyph detection
- New sanitize error types: `'homoglyphs'`, `'disallowed_writing_system'`

### Changed

- Internal module reorganization for better maintainability

## [1.1.0] - 2026-01-23

### Added

- `sanitize(text, options)` - Display name validation with length counting
- `preserve` option for `toPlainText` - Preserve specific writing systems
- Support for 9 writing systems: Greek, Cyrillic, Arabic, Hebrew, CJK, Ethiopic, Thai, Devanagari, Latin
- `trim` option for whitespace control

## [1.0.0] - 2026-01-22

### Added

- Initial stable release
- `toPlainText(text, options)` - Core Unicode to ASCII conversion
- Mathematical style character normalization
- Fullwidth character conversion
- Decorative character removal
- Emoji handling with `skipEmoji` option
- Pipeline utilities: `pipe`, `pipeWith`, `when`
