/**
 * Checks if a string contains only ASCII characters (code points 0–127).
 * @example isAsciiOnly("Hello123") → true
 */
export const isAsciiOnly = (text: string): boolean =>
  [...text].every((char) => char.charCodeAt(0) <= 127)
