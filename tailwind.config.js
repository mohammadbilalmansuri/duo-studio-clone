/** @type {import('tailwindcss').Config} */
export default {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#e5e7eb",
      black: "#030712",
      gray: "#6b7280",
      pink: "#f9a8d4",
    },
    screens: {
      xs: "480px",
      sm: "680px",
      md: "880px",
      lg: "1080px",
      xl: "1280px",
      "2xl": "1480px",
      "3xl": "1680px",
    },
    extend: {},
  },
  plugins: [],
};
