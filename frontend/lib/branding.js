export const defaultBrand = {
  name: "Todo Command",
  portalTitle: "Todo Command Center",
  tagline: "Secure task operations workspace",
  primary: "#A44A9D",
  sidebar: "#56204F",
  accent: "#F97367",
  background: "#FFF6FC",
  secondary: "#F4E6F3",
  surface: "#FFFFFF",
  text: "#17202A"
};

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;
  const number = parseInt(value, 16);
  return `${(number >> 16) & 255} ${(number >> 8) & 255} ${number & 255}`;
}

export function getBrand() {
  if (typeof window === "undefined") return defaultBrand;
  const stored = localStorage.getItem("todo_brand");
  return stored ? { ...defaultBrand, ...JSON.parse(stored) } : defaultBrand;
}

export function saveBrand(brand) {
  const nextBrand = { ...defaultBrand, ...brand };
  localStorage.setItem("todo_brand", JSON.stringify(nextBrand));
  applyBrand(nextBrand);
  window.dispatchEvent(new CustomEvent("todo-brand-updated", { detail: nextBrand }));
  return nextBrand;
}

export function applyBrand(brand = defaultBrand) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--brand-primary", hexToRgb(brand.primary));
  root.style.setProperty("--brand-sidebar", hexToRgb(brand.sidebar));
  root.style.setProperty("--brand-accent", hexToRgb(brand.accent));
  root.style.setProperty("--brand-background", hexToRgb(brand.background));
  root.style.setProperty("--brand-secondary", hexToRgb(brand.secondary));
  root.style.setProperty("--brand-surface", hexToRgb(brand.surface));
  root.style.setProperty("--brand-text", hexToRgb(brand.text));
  document.title = brand.portalTitle || defaultBrand.portalTitle;
}

export function resetBrand() {
  localStorage.removeItem("todo_brand");
  saveBrand(defaultBrand);
}
