const theme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      serif: ['Rubik', ...theme.fontFamily.serif]
    },
    extend: {
      fontFamily: {
        rubik: 'Rubik'
      },
      colors: {
        'very-dark-gray': 'hsl(0, 0%, 17%)',
        'dark-gray': 'hsl(0, 0%, 59%)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
