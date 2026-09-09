/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        'primary-dark': '#2E1065',
        'secondary-accent': '#7C3AED',
        'secondary-accent-hover': '#9333EA',
        'text-primary': '#1E1B4B',
        'text-muted': '#6B7280'
      },
      backgroundImage: {
        'glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))'
      },
    },
  },
  plugins: [],
}
