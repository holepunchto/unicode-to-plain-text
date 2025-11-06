/**
 * Validates that input is a string type.
 */
export const validateInput = (text: unknown): string => {
  if (typeof text !== 'string') {
    const receivedType = text === null ? 'null' : typeof text
    const receivedValue =
      text === undefined ? 'undefined' : text === null ? 'null' : JSON.stringify(text)

    throw new TypeError(`Expected string, got ${receivedType}. Received: ${receivedValue}`)
  }

  return text
}
