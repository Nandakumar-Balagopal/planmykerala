module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32', // Kerala green
        secondary: '#FFB74D', // Warm orange
        accent: '#FFD54F', // Yellow accent
        background: '#F5F5F5', // Light background
        charcoal: '#36454F', // Adding charcoal color
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}