/**
 * Validates if a string strictly follows the Australian/US currency format.
 * @param text - The string to validate
 * @returns {boolean} True if the format is a valid currency string, false otherwise.
 */
export function isPriceInCurrencyFormat(text: string | null): boolean {
  if (!text) {
    return false;
  }
  // Validates format like $1,234.56 with optional commas and decimal places
  return /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/.test(text.trim());
}

/**
 * Converts a currency string into a raw numerical value
 * @param text - The currency string to be parsed (e.g., "$1,250.50" returns 1250.50).
 * @returns The extracted number or NAN
 */
export function parseCurrency(text: string): number {
  const normalized = text.replace(/[^0-9.]/g, ""); // removes $, commas and spaces
  return Number(normalized);
}
