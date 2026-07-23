/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          yellow: '#fdf6e3', // soft creamy yellow
          yellowLight: '#fffcf5', // almost white yellow
          yellowDark: '#f5e6b3', // darker pastel yellow for accents
          accent: '#e6c27a', // for buttons/interactive elements
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // We'll assume Inter font for a premium look
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        }
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
      }
    },
  },
  plugins: [],
}
