/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17202A",
        paper: "rgb(var(--brand-background, 248 250 252) / <alpha-value>)",
        coral: "rgb(var(--brand-accent, 249 115 103) / <alpha-value>)",
        mint: "#0EA5A4",
        plum: "rgb(var(--brand-sidebar, 86 32 79) / <alpha-value>)",
        orchid: "rgb(var(--brand-primary, 164 74 157) / <alpha-value>)",
        blush: "rgb(var(--brand-background, 255 246 252) / <alpha-value>)",
        lilac: "rgb(var(--brand-secondary, 244 230 243) / <alpha-value>)",
        amberline: "#F5B841",
        skyglass: "#EAF9FF"
      },
      boxShadow: {
        soft: "0 20px 55px rgba(23, 32, 42, 0.10)",
        glow: "0 24px 80px rgba(164, 74, 157, 0.22)",
        line: "0 1px 0 rgba(86, 32, 79, 0.08)"
      }
    }
  },
  plugins: []
};
