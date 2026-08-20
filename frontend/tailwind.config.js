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
        paper: "#F8FAFC",
        coral: "#F97367",
        mint: "#0EA5A4",
        plum: "#56204F",
        orchid: "#A44A9D",
        blush: "#FFF6FC",
        lilac: "#F4E6F3",
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
