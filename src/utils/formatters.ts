/**
 * Utility functions for Nigerian currency formatting and helpers
 */

export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}

/**
 * Validate Nigerian phone numbers
 * Accepts formats:
 * 08012345678, 09012345678, 07012345678, 09112345678, +2348012345678, 2348012345678
 */
export function isValidNigerianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const pattern = /^(\+?234|0)(70|80|81|90|91)\d{8}$/;
  return pattern.test(cleaned);
}

/**
 * Format Nigerian phone into clean display: +234 803 123 4567
 */
export function formatNigerianPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (cleaned.startsWith('+234') && cleaned.length === 14) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)} ${cleaned.slice(10)}`;
  }
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return `+234 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}
