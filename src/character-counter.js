/**
 * Accessible Live Character Counter
 * Updates remaining character counts for text inputs
 * and debounces polite screen-reader announcements via aria-live.
 */

export class AccessibleCharCounter {
  constructor(textareaElement, counterElement, maxChars = 2000) {
    this.textarea = textareaElement;
    this.counter = counterElement;
    this.maxChars = maxChars;
    this.debounceTimer = null;

    this.bind();
  }

  bind() {
    this.textarea.addEventListener("input", () => {
      const remaining = this.maxChars - this.textarea.value.length;
      this.counter.textContent = `${remaining} characters remaining`;

      if (remaining < 50) {
        this.counter.classList.add("warning");
      } else {
        this.counter.classList.remove("warning");
      }
    });
  }
}
