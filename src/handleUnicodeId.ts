const UNICODE_LIST_RE = /^\d+,\d+(,\d+)*$/;

export const isUnicodeIdList = (text: string) => UNICODE_LIST_RE.test(text)

/**
 * Converts comma-separated Unicode code points (decimal) to their character equivalents.
 * @example: handleUnicodeId("74,97,122") → "Jaz"
 */
export const handleUnicodeId = (text: string): string => {
  if (!isUnicodeIdList(text)) return text

  return text
    .split(',')
    .map((n) => Number(n))
    .filter(n => n < 128)
    .map((n) => String.fromCharCode(n))
    .join('')
}
