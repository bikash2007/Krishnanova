/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        "electric-magenta": "#FF1493",
        "cosmic-purple": "#8A2BE2",
        "neon-cyan": "#00FFFF",
        "golden-sunrise": "#FFD700",
        "iridescent-white": "#F8F8FF",
        "deep-space-blue": "#191970",
        "divine-orange": "#FF8C00",
        "royal-krishna-blue": "#1E3A8A",
        "deep-burgundy": "#8B0000",
      },
      animation: {
        "gentle-float": "gentleFloat 3s ease-in-out infinite",
        "pendulum-swing": "pendulumSwing 4s ease-in-out infinite",
        "particle-float": "float 6s ease-in-out infinite",
        "energy-flow": "energyFlow 4s ease-in-out infinite",
        "product-float": "productFloat 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
