/**
 * Strips combining diacritics from Latin only.
 * Preserves Greek, Cyrillic, etc.
 * @example: normalizeUnicode('J̌äz') → 'Jaz'
 * @example: normalizeUnicode('Γεία') → 'Γεία'
 */
export const normalizeUnicode = (text: string): string => {
  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0)
      const isLatin =
        (code >= 0x0041 && code <= 0x005a) || // A-Z
        (code >= 0x0061 && code <= 0x007a) || // a-z
        (code >= 0x00c0 && code <= 0x02ff) || // Latin-1 + A/B
        (code >= 0x1e00 && code <= 0x1eff) // Latin Extended Additional

      return isLatin ? char.normalize('NFD').replace(/[\u0300-\u036F]/g, '') : char
    })
    .join('')
}
