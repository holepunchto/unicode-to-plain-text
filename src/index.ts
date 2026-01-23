// Export types
export type { WritingSystem } from './mapCharacters'
export type { ToPlainTextOptions } from './toPlainText'
export type { SanitizeOptions, SanitizeResult, SanitizeError } from './sanitize'

// Export main functions
export { toPlainText } from './toPlainText'
export { sanitize } from './sanitize'

// Export individual transformation functions
export { handleUnicodeId } from './handleUnicodeId'
export { handleFlipped } from './handleFlipped'
export { mapCharacters } from './mapCharacters'
export { normalizeUnicode } from './normalizeUnicode'
export { removeDecorations } from './removeDecorations'
export { normalizeCasing } from './normalizeCasing'
export { pipe, pipeWith, when } from './pipe'
