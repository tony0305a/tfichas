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
      "grey-700":"#404040",
      "grey-400": "#7c7c8a",
      "grey-200": "#c4c4cc",
      "grey-100": "#e1e1e6",

      "cyan-500": "#81d8f7",
      "cyan-300": "#98e1fb",

      "red":"#ef4444",
      "red-900":"#450a0a",
      "green-700":"#4d7c0f",
      "green-500":"#65a30d",
      "purple":"#4c1d95",
      "stone":"#57534e",
      "sky":"#0c4a6e",

    },
    extend: {
      fontFamily: {
        sans: "Inter,sans-serif",
      },
    },
  },
  plugins: [],
};
