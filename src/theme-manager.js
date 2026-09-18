/**
 * Theme Controller
 * Synchronizes color scheme tokens with user preferences and OS settings.
 */

export class ThemeManager {
  static STORAGE_KEY = "user_theme_preference";

  constructor() {
    this.currentTheme = this.resolveInitialTheme();
    this.applyTheme(this.currentTheme);
    this.listenToSystemChanges();
  }

  resolveInitialTheme() {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem(ThemeManager.STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      try {
        localStorage.setItem(ThemeManager.STORAGE_KEY, theme);
      } catch (e) {
        // Storage restricted
      }
    }
  }

  toggleTheme() {
    const next = this.currentTheme === "dark" ? "light" : "dark";
    this.applyTheme(next);
    return next;
  }

  listenToSystemChanges() {
    if (typeof window === "undefined") return;
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const saved = localStorage.getItem(ThemeManager.STORAGE_KEY);
      if (!saved) {
        this.applyTheme(e.matches ? "dark" : "light");
      }
    });
  }
}
