/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fade: "fadeOut 0.3s ease-in-out",
        slide: "slideRight 0.3s ease-out"
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: "50%", transform: "scale(0.95)" },
          "100%": { opacity: "100%", transform: "scale(1)" },
        },
        slideRight: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
      }),
    },
  },
  plugins: [],
};
