/**
 * Reduced Motion Accessibility Handler
 * Respects system-level accessibility settings (prefers-reduced-motion)
 * by gracefully disabling matrix 3D perspective transforms.
 */

(function () {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function updateMotionState(event) {
    const isReduced = event.matches;
    const portal = document.querySelector(".portal-card") || document.body;

    if (isReduced) {
      portal.style.transform = "none";
      portal.style.transition = "none";
      portal.classList.add("reduced-motion-active");
    } else {
      portal.classList.remove("reduced-motion-active");
      portal.style.removeProperty("transform");
      portal.style.removeProperty("transition");
    }
  }

  // Initial check
  updateMotionState(mediaQuery);

  // Dynamic listener for OS theme/accessibility adjustments
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", updateMotionState);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(updateMotionState);
  }
})();
