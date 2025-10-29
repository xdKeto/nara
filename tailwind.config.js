/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        },
      }

      addUtilities(newUtilities)
    },
  ],
}
