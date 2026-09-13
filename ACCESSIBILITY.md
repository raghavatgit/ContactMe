# Spatial UI Accessibility Specification

## Overview
ContactMe combines WebGL particle graphics and CSS3 3D perspective transforms. To ensure high usability for all visitors, the interface incorporates strict accessibility considerations:

1. **Reduced Motion Support:** Visitors with vestibular disorders can browse without disorienting spatial movement via `@media (prefers-reduced-motion: reduce)`.
2. **Keyboard Focus Hierarchy:** All interactive contact cards support tab navigation with explicit `:focus-visible` outline rings.
3. **High Contrast Typography:** Contrast ratios exceed WCAG 2.1 AA standards across both light and dark display modes.
