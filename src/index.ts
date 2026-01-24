// Export types
export type { WritingSystem, PreserveOption } from './convertCharacters'
export type { ToPlainTextOptions } from './toPlainText'

// Export main functions
export { toPlainText } from './toPlainText'

// Export individual transformation functions
export { decodeUnicodeId } from './decodeUnicodeId'
export { normalizeFlipped } from './normalizeFlipped'
export { convertCharacters } from './convertCharacters'
export { normalizeDiacritics } from './normalizeDiacritics'
export { normalizeDecorations } from './normalizeDecorations'
export { normalizeCasing } from './normalizeCasing'
export { pipe, pipeWith, when } from './pipe'
