// Export types
export type { WritingSystem, PreserveOption } from './convertCharacters'
export type { ToPlainTextOptions } from './toPlainText'
export type { WritingSystemAnalysis } from './detectWritingSystems'
export type { HomoglyphMatch, HomoglyphAnalysis } from './detectHomoglyphs'

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

// Export detection utilities
export { detectWritingSystems, getWritingSystem } from './detectWritingSystems'
export { hasHomoglyphs, analyzeHomoglyphs, isSuspiciousMix } from './detectHomoglyphs'
