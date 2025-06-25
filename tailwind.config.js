/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Standard for React/Vite if components are in src
    "./components/**/*.{js,ts,jsx,tsx}", // Covering current flat structure
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // If you create a pages dir
    "./App.tsx",
    "./index.tsx"
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#67e8f9', // cyan-300
          DEFAULT: '#06b6d4', // cyan-500
          dark: '#0e7490', // cyan-700
        },
        secondary: {
          light: '#93c5fd', // blue-300
          DEFAULT: '#3b82f6', // blue-500
          dark: '#1d4ed8', // blue-700
        },
        accent: '#10b981', // emerald-500
        neutral: {
          100: '#f3f4f6', // gray-100
          200: '#e5e7eb', // gray-200
          300: '#d1d5db', // gray-300
          // For dark mode text or elements
          400: '#9ca3af', // gray-400 (added for dark mode text)
          500: '#6b7280', // gray-500 (added)
          600: '#4b5563', // gray-600 (added for dark mode borders/backgrounds)
          700: '#374151', // gray-700
          800: '#1f2937', // gray-800
          900: '#111827', // gray-900
        }
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // If you need this plugin, install it via npm
  ],
}