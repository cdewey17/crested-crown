(() => {
  "use strict";

  const body = document.body;
  const pdfButton = document.querySelector('[data-action="print"]');
  const modeToggle = document.querySelector('[data-action="toggle-theme"]');
  const modeIcon = modeToggle?.querySelector('.mode-icon');
  const storageKey = "crested-crown-theme";

  const setTheme = (theme, persist = true) => {
    const nightOn = theme === "night";
    body.classList.toggle("night", nightOn);

    if (modeToggle) {
      modeToggle.setAttribute("aria-pressed", String(nightOn));
      modeToggle.setAttribute(
        "aria-label",
        nightOn ? "Switch to light mode" : "Switch to night mode"
      );
      modeToggle.title = nightOn ? "Switch to light mode" : "Switch to night mode";
    }

    if (modeIcon) modeIcon.textContent = nightOn ? "📖" : "🌙";
    if (persist) localStorage.setItem(storageKey, nightOn ? "night" : "light");
  };

  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === "night" || savedTheme === "light") {
    setTheme(savedTheme, false);
  }

  pdfButton?.addEventListener("click", () => window.print());
  modeToggle?.addEventListener("click", () => {
    setTheme(body.classList.contains("night") ? "light" : "night");
  });
})();
