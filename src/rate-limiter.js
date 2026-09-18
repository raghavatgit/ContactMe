/**
 * Client-Side Submission Rate Limiter
 * Enforces cooldown intervals between consecutive contact form submissions
 * to prevent accidental double-clicks and abusive submission loops.
 */

export class SubmissionRateLimiter {
  constructor(cooldownMs = 5000) {
    this.cooldownMs = cooldownMs;
    this.lastSubmissionTime = 0;
  }

  canSubmit() {
    const now = Date.now();
    return now - this.lastSubmissionTime >= this.cooldownMs;
  }

  recordSubmission() {
    this.lastSubmissionTime = Date.now();
  }

  getRemainingCooldownSeconds() {
    const elapsed = Date.now() - this.lastSubmissionTime;
    const remaining = Math.max(0, this.cooldownMs - elapsed);
    return Math.ceil(remaining / 1000);
  }
}
