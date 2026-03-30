/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7fc',
          100: '#eceef9',
          200: '#d9ddf5',
          300: '#c6ccef',
          400: '#a5b1e8',
          500: '#7180bf',
          600: '#6573b5',
          700: '#5766ab',
          800: '#4759a1',
          900: '#374c97',
        },
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#f7f7f7',
          300: '#e0e0e0',
          400: '#d8d8d8',
          500: '#cccccc',
          600: '#b0b0b0',
          700: '#707070',
          800: '#4b4b4b',
          900: '#262626',
        },
        success: '#4d8355',
        danger: '#e85d5d',
        warning: '#d8bd5e',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', '1rem'],
        sm: ['0.875rem', '1.25rem'],
        base: ['1rem', '1.5rem'],
        lg: ['1.125rem', '1.75rem'],
        xl: ['1.25rem', '1.75rem'],
        '2xl': ['1.5rem', '2rem'],
        '3xl': ['1.875rem', '2.25rem'],
      },
    },
  },
  plugins: [],
}
