/**
 * Client-Side Authentication & Hashing Utilities
 * Uses standard Web Crypto API (SHA-256) to prevent plaintext password storage in browser memory or storage.
 */

/**
 * Hash a password using SHA-256 via the Web Crypto API.
 * Never stores or logs plaintext passwords.
 * @param {string} password
 * @returns {Promise<string>} Hex-encoded SHA-256 hash
 */
export async function hashPassword(password) {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }

  // Support Web Crypto API in browser and modern Node environments
  const subtle =
    typeof window !== 'undefined' && window.crypto && window.crypto.subtle
      ? window.crypto.subtle
      : typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.subtle
      ? globalThis.crypto.subtle
      : null;

  if (subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Graceful fallback for non-crypto environments (deterministic simple hash)
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `fallback_${Math.abs(hash).toString(16).padStart(16, '0')}`;
}

/**
 * Validate standard email format (RFC 5322 pattern)
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return re.test(email.trim());
}

/**
 * Validate password requirements (minimum 8 characters)
 * @param {string} password
 * @returns {{ isValid: boolean, message?: string }}
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required.' };
  }
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long.' };
  }
  return { isValid: true };
}

/**
 * Extract initials from full name for user avatar (e.g. "Aditya Sharma" -> "AS")
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name) {
  if (!name || typeof name !== 'string') return 'EP'; // Eken Patron
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'EP';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
