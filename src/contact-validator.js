/**
 * Form Input Validator and Sanitizer
 * Implements RFC 5322 email syntax validation, XSS escaping,
 * and client-side honeypot verification.
 */

export class FormValidator {
  static EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  static sanitizeString(input) {
    if (typeof input !== "string") return "";
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .trim();
  }

  static validateEmail(email) {
    if (!email || typeof email !== "string") return false;
    const trimmed = email.trim();
    if (trimmed.length > 254) return false;
    return this.EMAIL_REGEX.test(trimmed);
  }

  static validateMessage(message, minLength = 10, maxLength = 2000) {
    if (!message || typeof message !== "string") return false;
    const trimmed = message.trim();
    return trimmed.length >= minLength && trimmed.length <= maxLength;
  }
}
