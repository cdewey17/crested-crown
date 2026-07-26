(() => {
  "use strict";

  const body = document.body;
  const pdfButton = document.querySelector('[data-action="print"], #pdfButton');
  const modeToggle = document.querySelector('[data-action="toggle-theme"], #modeToggle');
  const modeIcon = modeToggle?.querySelector('.mode-icon');
  const storageKey = "crested-crown-theme";

  const romanToNumber = {
    I:1, II:2, III:3, IV:4, V:5, VI:6, VII:7, VIII:8, IX:9, X:10,
    XI:11, XII:12, XIII:13, XIV:14, XV:15, XVI:16, XVII:17, XVIII:18, XIX:19, XX:20
  };

  const sectionSlugs = {
    "the-threshold":1, threshold:1,
    "the-lore-core":2, lore:2,
    "the-daily-arc":3, "daily-arc":3,
    "energy-capacity-systems":4, energy:4, capacity:4,
    "the-focus-spell-system":5, "focus-spells":5,
    "the-apothecary":6, apothecary:6,
    "the-therapy-workbook":7, therapy:7,
    "the-body-quest":8, "body-quest":8,
    "the-realm-of-order":9, order:9,
    "the-feast-famine-realm":10, "feast-famine":10,
    "the-vessel-care-realm":11, "vessel-care":11,
    "thresholds-transitions":12, transitions:12,
    "the-outer-realm":13, outer:13,
    "the-emergency-deck":14, emergency:14,
    "memory-crystals-witnessing":15, witnessing:15,
    "reward-progression":16, rewards:16,
    "board-game-physical-systems":17, "board-game":17,
    "qr-digital-integration":18, digital:18,
    "maintenance-repair":19, maintenance:19, repair:19,
    "appendices-final-seal":20, appendices:20
  };

  const normalizeSection = (value) => {
    if (value == null || value === "") return null;
    const raw = String(value).trim();
    const numeric = Number(raw);
    if (Number.isInteger(numeric) && numeric >= 1 && numeric <= 20) return numeric;
    const roman = romanToNumber[raw.toUpperCase()];
    if (roman) return roman;
    const slug = raw.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return sectionSlugs[slug] ?? null;
  };

  const sectionSource =
    body.dataset.section ||
    document.documentElement.dataset.section ||
    document.querySelector('meta[name="crested-crown-section"]')?.content ||
    document.querySelector('[data-section]')?.dataset.section;

  const sectionNumber = normalizeSection(sectionSource);
  if (sectionNumber) body.dataset.section = String(sectionNumber);

  const setTheme = (theme, persist = true) => {
    const nightOn = theme === "night";
    body.classList.toggle("night", nightOn);

    if (modeToggle) {
      modeToggle.setAttribute("aria-pressed", String(nightOn));
      modeToggle.setAttribute("aria-label", nightOn ? "Switch to light mode" : "Switch to night mode");
      modeToggle.title = nightOn ? "Switch to light mode" : "Switch to night mode";
    }

    if (modeIcon) modeIcon.textContent = nightOn ? "📖" : "🌙";
    if (persist) localStorage.setItem(storageKey, nightOn ? "night" : "light");
  };

  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === "night" || savedTheme === "light") setTheme(savedTheme, false);

  pdfButton?.addEventListener("click", () => window.print());
  modeToggle?.addEventListener("click", () => {
    setTheme(body.classList.contains("night") ? "light" : "night");
  });

  window.CrestedCrown = Object.freeze({
    section: sectionNumber,
    setTheme,
    print: () => window.print()
  });
})();
