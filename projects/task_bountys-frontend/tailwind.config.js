/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#E0F7F5',
          100: '#B3ECE7',
          200: '#80E0D8',
          300: '#4DD4C9',
          400: '#26C9BE',
          500: '#00BFA5', // Main primary color
          600: '#00AE95',
          700: '#009983',
          800: '#008572',
          900: '#00624F',
        },
        secondary: {
          50: '#EAE5F0',
          100: '#CBBEDA',
          200: '#A993C2',
          300: '#8768AA',
          400: '#6E4997',
          500: '#4A148C', // Main secondary color
          600: '#42127F',
          700: '#380E6F',
          800: '#2F0B5F',
          900: '#210642',
        },
        accent: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800',
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
          950: '#FF6D00', // Main accent color
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backgroundImage: {
        'graph-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgNjBDMTMuNDMxNSA2MCAwIDQ2LjU2ODUgMCAzMFMxMy40MzE1IDAgMzAgMHMzMCAxMy40MzE1IDMwIDMwLTEzLjQzMTUgMzAtMzAgMzB6bTAtNC41OTdDMjYuNTc5MiA1NS40MDMgMjMuNDYzIDU1LjQwMyAyMCA1NS40MDMgNy43MTA0MyA1NS40MDMgMCA0Ny42OTI2IDAgMzVjMC0zLjg1OTEgMC02Ljk3NTQgMC0xMC40MzNDMCAxMS43MTkgNy43MTA0MyA0IDE3Ljg4OTYgNGMyLjgzMDggMCA1LjI1NDYgMCA3LjY4MTEgMEM0NS4wMzQ2IDQgNTUgMTMuOTY1NCA1NSAzMy45NjkyIDU1IDQ1Ljk5NjYgNDUuMDM0NiA1NSAzMi43ODU0IDU1Yy0uNTUwOCAwLTEuMTg2MSAwLTEuOTIwMiAwLTYuMzY4LjI0OC01LjUxNzIuNDAzLTIuNzU5MSA0LjMzMi0xLjM5NTguMDQ2LTMuMDIwMS4wNzEtNC44NzMuMDcxeiIgZmlsbC1vcGFjaXR5PSIuMDIiIGZpbGw9IiMwMGFiZmYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4=')",
      },
    },
  },
  plugins: [],
};