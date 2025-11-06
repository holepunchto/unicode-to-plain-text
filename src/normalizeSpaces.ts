/**
 * Collapses multiple whitespace into a single space and trims the result.
 * @example: normalizeSpaces("  hello   \n\t  world  ") → "hello world"
 */
export const normalizeSpaces = (text: string): string =>
  text
    .trim()
    .split(' ')
    .filter((part) => part.trim() !== '')
    .join(' ')
