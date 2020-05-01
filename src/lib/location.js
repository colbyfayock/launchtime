/**
 * isPostalCode
 * @param {number|string} value Ex: 12345
 */
export function isPostalCode(value) {
  return /\d{5}/.test(value)
}