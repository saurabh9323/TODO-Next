import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        brand: {
          purple: "rgb(var(--brand-600, 146 71 143) / <alpha-value>)", white: "rgb(var(--brand-50, 250 246 250) / <alpha-value>)", lavender: "rgb(var(--brand-200, 255 227 254) / <alpha-value>)", lilac: "rgb(var(--brand-100, 253 237 252) / <alpha-value>)",
          strawberry: "#F64D94", gold: "#FFBF3F", icy: "#B3E0FF", petal: "#FFD1E8",
          veil: "#FFE5F0", honeydew: "#ECF7EC", beige: "#FFFDE7",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        ink: {
          50: "#FAF6FA", 100: "#FDEDFC", 200: "#C9AFDB", 300: "#9F849F", 400: "#6B6B6B",
          500: "#552752", 600: "#3A1C39", 700: "#2C192E", 800: "#241426", 900: "#190F1C", 950: "#000000",
        },
        amber: {
          50: "#FFFDE7", 100: "#FFF5C7", 200: "#FFE89A", 300: "#FFD567", 400: "#FFBF3F",
          500: "#E8A82E", 600: "#B97D16", 700: "#845710", 800: "#5E3D0C", 900: "#402906",
        },
        teal: {
          50: "#eef6f6",
          100: "#d3e9e8",
          200: "#a7d3d1",
          300: "#78b9b6",
          400: "#4c9d99",
          500: "#2f7f7c",
          600: "#246463",
          700: "#1c4f4e",
          800: "#163e3d",
          900: "#0f2c2b",
        },
        violet: {
          50: "rgb(var(--brand-50, 250 246 250) / <alpha-value>)", 100: "rgb(var(--brand-100, 253 237 252) / <alpha-value>)", 200: "rgb(var(--brand-200, 255 227 254) / <alpha-value>)", 300: "rgb(var(--brand-300, 228 184 225) / <alpha-value>)", 400: "rgb(var(--brand-400, 188 120 184) / <alpha-value>)",
          500: "rgb(var(--brand-500, 164 89 160) / <alpha-value>)", 600: "rgb(var(--brand-600, 146 71 143) / <alpha-value>)", 700: "rgb(var(--brand-700, 121 55 117) / <alpha-value>)", 800: "rgb(var(--brand-800, 97 45 94) / <alpha-value>)", 900: "rgb(var(--brand-900, 73 32 71) / <alpha-value>)", 950: "rgb(var(--brand-950, 43 16 42) / <alpha-value>)",
        },
        indigo: {
          50: "#FAF6FA", 100: "#FDEDFC", 200: "#FFE3FE", 300: "#E4B8E1", 400: "#BC78B8",
          500: "#A459A0", 600: "#92478F", 700: "#793775", 800: "#612D5E", 900: "#492047", 950: "#2B102A",
        },
        rose: {
          50: "#FFF0F7", 100: "#FFE5F0", 200: "#FFD1E8", 300: "#FF9FCB", 400: "#F86EAA",
          500: "#F64D94", 600: "#D9367B", 700: "#A92963", 800: "#7D214C", 900: "#551735", 950: "#321020",
        },
        blue: {
          50: "#F1FAFF", 100: "#E0F3FF", 200: "#B3E0FF", 300: "#8BCEF9", 400: "#5EB5EB",
          500: "#3897D0", 600: "#2878AA", 700: "#205D83", 800: "#194762", 900: "#133548", 950: "#0C2230",
        },
        emerald: {
          50: "#ECF7EC", 100: "#D9EFD9", 200: "#B7DFB7", 300: "#8CC98C", 400: "#63AD63",
          500: "#438E43", 600: "#337333", 700: "#295A29", 800: "#214721", 900: "#193719", 950: "#0E230E",
        },
        green: {
          50: "#ECF7EC", 100: "#D9EFD9", 200: "#B7DFB7", 300: "#8CC98C", 400: "#63AD63",
          500: "#438E43", 600: "#337333", 700: "#295A29", 800: "#214721", 900: "#193719", 950: "#0E230E",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        display: ["DM Serif Display", "Georgia", "serif"],
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        "timeline-flow": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 200%" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "timeline-flow": "timeline-flow 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
