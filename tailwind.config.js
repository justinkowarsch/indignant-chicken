/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./blog/**/*.{md,mdx}",
    "./docs/**/*.{md,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'], // Enable Docusaurus dark mode detection
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
}

