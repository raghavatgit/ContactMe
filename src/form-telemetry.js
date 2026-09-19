/**
 * Non-Intrusive Form Engagement Telemetry
 * Tracks user dwell time, interaction sequences, and input corrections
 * to monitor UX bottlenecks without external analytics beacons.
 */

export class FormTelemetry {
  constructor(formElement) {
    this.form = formElement;
    this.startTime = 0;
    this.fieldInteractions = 0;
    this.correctionCount = 0;
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener("focusin", () => {
      if (this.startTime === 0) {
        this.startTime = performance.now();
      }
      this.fieldInteractions++;
    }, { once: false });

    this.form.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        this.correctionCount++;
      }
    });
  }

  getMetrics() {
    const elapsedSeconds = this.startTime > 0 ? (performance.now() - this.startTime) / 1000 : 0;
    return {
      timeToFillSeconds: Math.round(elapsedSeconds * 10) / 10,
      fieldInteractions: this.fieldInteractions,
      correctionCount: this.correctionCount,
    };
  }
}
