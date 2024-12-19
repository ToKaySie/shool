/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            'h1,h2,h3,h4': {
              color: '#1a202c',
              fontWeight: '700',
            },
            code: {
              color: '#744210',
              backgroundColor: '#fefcbf',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#2d3748',
              color: '#e2e8f0',
              overflow: 'auto',
              padding: '1rem',
              borderRadius: '0.375rem',
            },
          },
        },
        invert: {
          css: {
            color: '#d1d5db',
            'h1,h2,h3,h4': {
              color: '#fff',
            },
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            code: {
              color: '#fbbf24',
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
