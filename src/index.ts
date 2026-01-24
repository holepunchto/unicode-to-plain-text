// Export types
export type { WritingSystem, PreserveOption } from './convertCharacters'
export type { ToPlainTextOptions } from './toPlainText'
export type { SanitizeOptions, SanitizeResult, SanitizeError } from './sanitize'

// Export main functions
export { toPlainText } from './toPlainText'
export { sanitize } from './sanitize'

// Export individual transformation functions
export { decodeUnicodeId } from './decodeUnicodeId'
export { normalizeFlipped } from './normalizeFlipped'
export { convertCharacters } from './convertCharacters'
export { normalizeDiacritics } from './normalizeDiacritics'
export { normalizeDecorations } from './normalizeDecorations'
export { normalizeCasing } from './normalizeCasing'
export { pipe, pipeWith, when } from './pipe'
