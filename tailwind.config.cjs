/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 24,
      xl: 28,
      "2xl": 32,
    },
    colors: {
      'transparent':'transparent',
      'black':'#000',
      'white':'#FFF',
      "grey-900": "#121214",
      "grey-800": "#202024",
      "grey-400": "#7c7c8a",
      "grey-200": "#c4c4cc",
      "grey-100": "#e1e1e6",

      "cyan-500": "#81d8f7",
      "cyan-300": "#98e1fb",

      "red":"#ef4444"
    },
    extend: {
      fontFamily: {
        sans: "Inter,sans-serif",
      },
    },
  },
  plugins: [],
};
