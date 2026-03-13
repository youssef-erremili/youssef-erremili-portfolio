/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./assets/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'shade-blue': '#000f19',
        'site-white': '#ffffff',
        'site-white-sm': '#fefefe',
        'site-green': '#3CCF91',
        'light-green': '#9ae6b4',
        'light-pink': '#fbb6ce',
        'light-yellow': '#faf089',
        'border-color': '#ffffff29',
        'site-gray': '#cacacc',
        'crimson': '#dc143c',
        'link-bg': '#202022',
        'tech-blue': '#2682fb',
        'tech-blue-bg': '#2269f722',
        'desc-gray': '#a0a0a0',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'spin-custom': 'spin 1s cubic-bezier(.4, 0, .2, 1) infinite',
        'spin-words': 'spin-words 4s infinite',
      },
      keyframes: {
        'spin-words': {
          '10%':  { transform: 'translateY(-102%)' },
          '25%':  { transform: 'translateY(-100%)' },
          '35%':  { transform: 'translateY(-202%)' },
          '50%':  { transform: 'translateY(-200%)' },
          '60%':  { transform: 'translateY(-302%)' },
          '75%':  { transform: 'translateY(-300%)' },
          '85%':  { transform: 'translateY(-402%)' },
          '100%': { transform: 'translateY(-400%)' },
        }
      }
    },
  },
  plugins: [],
}
