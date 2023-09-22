/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend'],
        'lexend-medium': ['Lexend-Medium'],
        'lexend-semibold': ['Lexend-SemiBold'],
        'lexend-bold': ['Lexend-Bold'],
      },
    },
  },
  plugins: [],
};
