/**
 * Accessible Clipboard Button Feedback
 * Handles copying contact details with tactile feedback and screen-reader announcements.
 */

(function () {
  const copyButtons = document.querySelectorAll("[data-copy-text]");
  const liveRegion = document.getElementById("a11y-status-announcer");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.getAttribute("data-copy-text");
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        const originalText = button.textContent;
        button.textContent = "Copied!";
        button.setAttribute("aria-live", "polite");

        if (liveRegion) {
          liveRegion.textContent = `Copied ${text} to clipboard.`;
        }

        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error("Clipboard write error:", err);
      }
    });
  });
})();
