/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#D4AF37',
          500: '#C9A227',
          600: '#B8941F',
        },
        forest: {
          800: '#1A2E1A',
          900: '#0F1F0F',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
