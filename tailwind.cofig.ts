/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        
    "./components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",        
  ],
  theme: {
    extend: {
      colors: {
        ristek: {
          purple: "#5D49D0",
          dark: "#1A1A1A",
          light: "#F8F9FA",
        },
      },
    },
  },
  plugins: [],
}