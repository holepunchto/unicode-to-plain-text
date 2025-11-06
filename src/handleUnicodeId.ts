/**
 * Converts comma-separated Unicode code points (decimal) to their character equivalents.
 * @example: handleUnicodeId("74,97,122") → "Jaz"
 */
export const handleUnicodeId = (text: string): string => {
  if (!text.includes(',') || text.split(',').some((number) => isNaN(+number))) return text

  return text
    .split(',')
    .map((n) => String.fromCharCode(Number(n.trim())))
    .join('')
}
