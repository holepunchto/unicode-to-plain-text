const CODE_POINT_LIST_RE = /^\d+,\d+(,\d+)*$/;

export const isCodePointList = (text: string) => CODE_POINT_LIST_RE.test(text)

/**
 * Converts comma-separated Unicode code points (decimal) to their character equivalents.
 * @example: decodeUnicodeId("74,97,122") → "Jaz"
 */
export const decodeUnicodeId = (text: string): string => {
  if (!isCodePointList(text)) return text

  return text
    .split(',')
    .map((n) => Number(n))
    .filter(n => n < 128)
    .map((n) => String.fromCharCode(n))
    .join('')
}
