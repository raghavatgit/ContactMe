/**
 * Honeypot Anti-Spam Validator
 * Evaluates hidden trap input fields and submission timestamp thresholds
 * to neutralize automated spam bots.
 */

export class HoneypotGuard {
  constructor(honeypotFieldId = "hp_company_field", minFillTimeMs = 2000) {
    this.fieldId = honeypotFieldId;
    this.minFillTimeMs = minFillTimeMs;
    this.loadTime = Date.now();
  }

  isSubmissionLegitimate(form) {
    const hpInput = form.querySelector(`#${this.fieldId}`);

    // If honeypot input is populated, it is automated bot activity
    if (hpInput && hpInput.value.trim() !== "") {
      return false;
    }

    // If form submitted faster than humanly possible, flag as bot
    const elapsed = Date.now() - this.loadTime;
    if (elapsed < this.minFillTimeMs) {
      return false;
    }

    return true;
  }
}
