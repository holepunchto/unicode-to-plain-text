import { WRITING_SYSTEM_RANGES, WritingSystem, WRITING_SYSTEMS, isInRanges } from './convertCharacters'

export type WritingSystemAnalysis = {
  writingSystems: WritingSystem[]
  mixed: boolean
  primary: WritingSystem | null
}

/**
 * Detects which writing systems are present in text.
 * @example: detectWritingSystems('Hello World') → { writingSystems: ['latin'], mixed: false, primary: 'latin' }
 * @example: detectWritingSystems('Привет World') → { writingSystems: ['cyrillic', 'latin'], mixed: true, primary: 'cyrillic' }
 */
export const detectWritingSystems = (text: string): WritingSystemAnalysis => {
  const counts = new Map<WritingSystem, number>()

  for (const char of text) {
    const system = getWritingSystem(char)
    if (system) {
      counts.set(system, (counts.get(system) ?? 0) + 1)
    }
  }

  const writingSystems = Array.from(counts.keys())

  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])
  const primary = sorted.length > 0 ? sorted[0][0] : null

  return {
    writingSystems,
    mixed: writingSystems.length > 1,
    primary
  }
}

/**
 * Returns the writing system for a single character, or null if not in any known system.
 */
export const getWritingSystem = (char: string): WritingSystem | null => {
  const code = char.codePointAt(0)
  if (code === undefined) return null

  if ((code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a)) {
    return 'latin'
  }

  for (const system of WRITING_SYSTEMS) {
    const ranges = WRITING_SYSTEM_RANGES[system]
    if (isInRanges(code, ranges)) {
      return system
    }
  }

  return null
}

