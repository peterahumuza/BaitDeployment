/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/public/assets/img/bgFull2.png')",
      },
      colors: {
        'backlight': '#f5f5f5',
        'backgreen': '#8bd9c3',
        'backgreendark': '#064a37',
        'backblue': '#84d3db',
        'backbluedark': '#02616b',
        'backpurple': "#c1bbed",
        'backpurpledark': "#211c4a",
        'buttons': '#f5f5f5',
        'box': '#FAFAFA',
        'boxlight': '#f5f5f5',
        'meditron': '#6C5CE7',
        'highlight': '#2ae8b2',
      },
    },
  },
  plugins: [],
};
