/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1220',
          deep: '#070C16',
          elevated: '#131E33',
          glass: 'rgba(11, 18, 32, 0.72)'
        },
        saffron: {
          DEFAULT: '#FF9933',
          hover: '#F0851B'
        },
        gold: {
          DEFAULT: '#F4B942',
          muted: '#C99B3B'
        },
        ivory: {
          DEFAULT: '#F7F3EC',
          warm: '#EFE8DB'
        },
        emerald: {
          india: '#138808'
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
};

