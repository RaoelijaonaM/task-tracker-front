/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
    screens: {
      "2xl": "1920px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
