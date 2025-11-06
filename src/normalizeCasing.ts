/** Threshold for dominant case detection (75% of letters) */
const STRONG_CASE_THRESHOLD = 0.75

/** Case pattern analysis result */
interface CasePattern {
  isProper: boolean
  isAllSame: boolean
  uppercaseCount: number
  lowercaseCount: number
  upperRatio: number
  lowerRatio: number
  isStrongUpper: boolean
  isStrongLower: boolean
  isBalanced: boolean
}

// ============================================================================
// CASE NORMALIZATION
// ============================================================================

/**
 * Smart case normalization for mixed-case outputs.
 * Only normalizes inconsistent patterns like "tEst" or "TeSt".
 * Preserves proper case like "Hello" or intentional all-caps/lowercase.
 */
export const normalizeCasing = (text: string): string =>
  text.split(' ').map(normalizeWord).join(' ')

/**
 * Normalizes case for a single word.
 */
const normalizeWord = (word: string): string => {
  if (!word || word.length <= 1) return word

  const letters = getLetters(word)
  if (letters.length <= 1) return word

  const casePattern = getCasePattern(word, letters)

  // Preserve proper case, all-upper, all-lower
  if (casePattern.isProper || casePattern.isAllSame) return word

  // Apply normalization for inconsistent patterns
  return applyNormalization(word, letters, casePattern)
}

/**
 * Extracts only letter characters from a word.
 */
const getLetters = (word: string): string[] => Array.from(word).filter((c) => /[a-zA-Z]/.test(c))

/**
 * Analyzes the case pattern of a word.
 */
const getCasePattern = (word: string, letters: string[]): CasePattern => {
  const uppercaseCount = letters.filter((c) => c === c.toUpperCase()).length
  const lowercaseCount = letters.length - uppercaseCount
  const upperRatio = uppercaseCount / letters.length
  const lowerRatio = lowercaseCount / letters.length

  // Check if it's proper case (first uppercase, rest lowercase)
  const firstLetterIndex = Array.from(word).findIndex((c) => /[a-zA-Z]/.test(c))
  const hasUpperFirst = firstLetterIndex >= 0 && /[A-Z]/.test(word[firstLetterIndex])
  const restAfterFirst = word.slice(firstLetterIndex + 1)
  const isProper = hasUpperFirst && restAfterFirst === restAfterFirst.toLowerCase()

  return {
    isProper,
    isAllSame: word === word.toUpperCase() || word === word.toLowerCase(),
    uppercaseCount,
    lowercaseCount,
    upperRatio,
    lowerRatio,
    isStrongUpper: upperRatio >= STRONG_CASE_THRESHOLD,
    isStrongLower: lowerRatio >= STRONG_CASE_THRESHOLD,
    isBalanced: Math.abs(uppercaseCount - lowercaseCount) <= 1
  }
}

/**
 * Applies case normalization based on pattern analysis.
 */
const applyNormalization = (word: string, letters: string[], pattern: CasePattern): string => {
  // Strong dominance: normalize to dominant case
  if (pattern.isStrongUpper) return word.toUpperCase()
  if (pattern.isStrongLower) return word.toLowerCase()

  // Detect "improper proper case" (e.g., "AmBrose") - first letter uppercase with mid-word uppercase anomalies
  // If lowercase is clearly dominant and first letter is uppercase, normalize to proper case
  const firstLetterIndex = Array.from(word).findIndex((c) => /[a-zA-Z]/.test(c))
  if (firstLetterIndex >= 0 && /[A-Z]/.test(word[firstLetterIndex]) && pattern.lowerRatio > 0.5) {
    // Convert to proper case (first uppercase, rest lowercase)
    return word.slice(0, firstLetterIndex + 1) + word.slice(firstLetterIndex + 1).toLowerCase()
  }

  // Balanced case: check interior letters for tie-breaking
  if (pattern.isBalanced && letters.length >= 3) {
    const interiorBias = getInteriorCaseBias(letters)
    if (interiorBias === 'lower') return word.toLowerCase()
    if (interiorBias === 'upper') return word.toUpperCase()

    // Use boundary letters as final tie-breaker
    const boundaryBias = getBoundaryCaseBias(letters)
    if (boundaryBias) return boundaryBias === 'upper' ? word.toUpperCase() : word.toLowerCase()
  }

  // Keep ambiguous mixed case as-is
  return word
}

/**
 * Determines case bias from interior letters (excluding first/last).
 */
const getInteriorCaseBias = (letters: string[]): 'upper' | 'lower' | null => {
  const middle = letters.slice(1, -1)
  const upperCount = middle.filter((c) => c === c.toUpperCase()).length
  const lowerCount = middle.length - upperCount

  if (lowerCount > upperCount) return 'lower'
  if (upperCount > lowerCount) return 'upper'
  return null
}

/**
 * Determines case bias from first and last letters.
 */
const getBoundaryCaseBias = (letters: string[]): 'upper' | 'lower' | null => {
  const firstUpper = letters[0] === letters[0].toUpperCase()
  const lastUpper = letters[letters.length - 1] === letters[letters.length - 1].toUpperCase()

  if (firstUpper && lastUpper) return 'upper'
  if (!firstUpper && !lastUpper) return 'lower'
  return null
}
