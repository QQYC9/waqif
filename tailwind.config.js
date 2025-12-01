/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00b3b3',
          50: '#e6f7f7',
          100: '#ccefef',
          200: '#99dfdf',
          300: '#66cfcf',
          400: '#33bfbf',
          500: '#00b3b3',
          600: '#00a1a1',
          700: '#008f8f',
          800: '#007d7d',
          900: '#006b6b',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
      fontSize: {
        'xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.5' }],
        'sm': ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', { lineHeight: '1.5' }],
        'base': ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.6' }],
        'lg': ['clamp(1.125rem, 1rem + 0.625vw, 1.5rem)', { lineHeight: '1.5' }],
        'xl': ['clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem)', { lineHeight: '1.4' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 1vw, 2.25rem)', { lineHeight: '1.3' }],
        '3xl': ['clamp(1.875rem, 1.5rem + 1.875vw, 3rem)', { lineHeight: '1.2' }],
        '4xl': ['clamp(2.25rem, 1.75rem + 2.5vw, 3.75rem)', { lineHeight: '1.1' }],
      },
      spacing: {
        'xs': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem)',
        'sm': 'clamp(0.5rem, 0.4rem + 0.5vw, 1rem)',
        'md': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
        'lg': 'clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)',
        'xl': 'clamp(2rem, 1.5rem + 2.5vw, 4rem)',
        '2xl': 'clamp(3rem, 2rem + 5vw, 6rem)',
      },
    },
  },
  plugins: [],
}
