/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // This ensures your LMS can see the A11yContext and TopUtilityBar!
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}" 
  ],
  darkMode: 'class', // Critical for your Accessibility Engine
  theme: {
    extend: {},
  },
  plugins: [
    // This plugin styles the reading assignments beautifully
    require('@tailwindcss/typography'),
  ],
}