const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyan: defaultTheme.colors.cyan,
        silver: {
          DEFAULT: '#C0C0C0',
          50: '#F8F8F8',
          100: '#F2F2F2',
          200: '#E3E3E3',
          300: '#D1D1D1',
          400: '#B7B7B7',
          500: '#9E9E9E',
          600: '#7E7E7E',
          700: '#636363',
          800: '#4A4A4A',
          900: '#2E2E2E',
        },
      },
    },
  },
  plugins: [],
};