const SECRET = "suf_admin_portal_secure_token_secret_key_2026";

// Helper to convert ArrayBuffer to a hex string
function bufToHex(buffer: ArrayBuffer): string {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

/**
 * Generates a cryptographically signed JSON Web Token style token for the admin role.
 * Token structure: Base64UrlEncoded(payload).SignatureHex
 */
export async function generateToken(): Promise<string> {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days expiration
  const payload = JSON.stringify({ role: "admin", exp });
  
  // Safe Base64 encoding supporting Unicode characters
  const base64Payload = btoa(unescape(encodeURIComponent(payload)));
  
  const encoder = new TextEncoder();
  const data = encoder.encode(base64Payload + SECRET);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const signature = bufToHex(hashBuffer);
  
  return `${base64Payload}.${signature}`;
}

/**
 * Validates the cryptographic token's signature, role, and expiration.
 */
export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  
  const [base64Payload, signature] = parts;
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(base64Payload + SECRET);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const expectedSignature = bufToHex(hashBuffer);
    
    if (signature !== expectedSignature) return false;
    
    const payloadStr = decodeURIComponent(escape(atob(base64Payload)));
    const payload = JSON.parse(payloadStr);
    
    if (payload.role !== "admin") return false;
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return false;
    
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Sets a persistent browser cookie with optimal security configurations.
 */
export function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  
  // SameSite=Strict and Secure for high-security environments
  document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Strict; Secure`;
}

/**
 * Reads a cookie value by name.
 */
export function getCookie(name: string): string | undefined {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return undefined;
}

/**
 * Erases a persistent browser cookie by name.
 */
export function eraseCookie(name: string): void {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict; Secure`;
}
