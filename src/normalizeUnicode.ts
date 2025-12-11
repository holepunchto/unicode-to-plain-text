const shouldPreserveDiacritics = (code: number): boolean => {
  // ç, Ç, ğ, Ğ, ı, İ, ö, Ö, ş, Ş, ü, Ü
  return [
    0x00e7, 
    0x00c7, 
    0x011f, 
    0x011e, 
    0x0131, 
    0x0130, 
    0x00f6, 
    0x00d6, 
    0x015f, 
    0x015e, 
    0x00fc, 
    0x00dc
  ].includes(code)
}

const latinWithDiacritics = (code: number): boolean => {
  return (code >= 0x0041 && code <= 0x005a) || // A-Z
    (code >= 0x0061 && code <= 0x007a) || // a-z
    (code >= 0x00c0 && code <= 0x02ff) || // Latin-1 + A/B
    (code >= 0x1e00 && code <= 0x1eff) // Latin Extended Additional
} 

/**
 * Strips combining diacritics from Latin only.
 * Preserves Greek, Cyrillic, Turkish, etc.
 * @example: normalizeUnicode('J̌äz') → 'Jaz'
 * @example: normalizeUnicode('Γεία') → 'Γεία'
 * @example: normalizeUnicode('ıİöÖçÇşŞğĞüÜ') → 'ıİöÖçÇşŞğĞüÜ'
 */
export const normalizeUnicode = (text: string): string => {
  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0)

      if(latinWithDiacritics(code) && !shouldPreserveDiacritics(code)) {
        return char.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
      }

      return char
    })
    .join('')
}
