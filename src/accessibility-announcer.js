/**
 * WCAG 2.1 AA Screen Reader Live Announcer
 * Safely announces asynchronous updates via dynamically managed aria-live regions.
 */

export class ScreenReaderAnnouncer {
  constructor() {
    this.liveRegion = null;
    this.initRegion();
  }

  initRegion() {
    if (typeof document === "undefined") return;
    let existing = document.getElementById("a11y-status-announcer");
    if (!existing) {
      existing = document.createElement("div");
      existing.id = "a11y-status-announcer";
      existing.setAttribute("role", "status");
      existing.setAttribute("aria-live", "polite");
      existing.setAttribute("aria-atomic", "true");
      // Screen reader only visibility style
      Object.assign(existing.style, {
        position: "absolute",
        width: "1px",
        height: "1px",
        margin: "-1px",
        padding: "0",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        border: "0",
        whiteSpace: "nowrap"
      });
      document.body.appendChild(existing);
    }
    this.liveRegion = existing;
  }

  announce(message, politeness = "polite") {
    if (!this.liveRegion) return;
    this.liveRegion.setAttribute("aria-live", politeness);
    this.liveRegion.textContent = "";
    // Allow DOM tick to register clearing before assigning new text
    window.setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = message;
      }
    }, 50);
  }
}
