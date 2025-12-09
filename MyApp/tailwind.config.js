/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{js,jsx,ts,tsx}", "!./node_modules/**"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        night: {
          dark: "#222831",
          gray: "#393E46",
        },
        accent: {
          teal: "#00ADB5",
        },
        light: {
          base: "#EEEEEE",
          subtle: "#EEEEEECC",
        },
        category: {
          music: "#FF2E9D",
          theatre: "#FF6B00",
          art: "#8A2BE2",
          cinema: "#00CED1",
          literature: "#D4AF37",
          sport: "#32CD32",
          festival: "#FF0080",
          fair: "#FF4500",
          family: "#FFB347",
          food: "#FF4D6D",
          standup: "#1E90FF",
          dance: "#FF00FF",
          education: "#00CED1",
          business: "#32CD32",
          culture: "#FF69B4",
          religion: "#FFA500",
          tech: "#00B8D9",
          outdoor: "#2E8B57",
          holiday: "#FF2400",
        },
      },
    },
  },
  plugins: [],
};
