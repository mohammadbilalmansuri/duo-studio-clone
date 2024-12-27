/** @type {import('tailwindcss').Config} */
export default {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FEFCFF",
      black: "#0F0D0D",
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
