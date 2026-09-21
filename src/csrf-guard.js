/**
 * Client-Side CSRF Nonce Generator
 * Generates cryptographically random UUIDv4 nonces
 * attached to contact payloads to prevent duplicate replay injections.
 */

export class ClientCsrfGuard {
  static generateNonce() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback crypto getRandomValues generator
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  static attachToForm(formElement) {
    let input = formElement.querySelector("input[name='_csrf_nonce']");
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = "_csrf_nonce";
      formElement.appendChild(input);
    }
    input.value = this.generateNonce();
    return input.value;
  }
}
