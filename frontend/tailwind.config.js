/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      keyframes: {
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        scaleIn: 'scaleIn 0.2s ease-out',
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#e70012",        // Warna utama: merah cerah
          prm2: "#7B74DA",           // Warna sekunder: ungu ke biruan
          secondary: "#2A3382",      // Warna sekunder 2: biru tua
          accent: "#04c9c4",         // Warna aksen: turquoise terang
          neutral: "#d1d5db",        // Warna netral: abu-abu gelap
          accentcont: "#000000",     // Warna accent cont: hitam pekat
          "base-100": "#ffffff",     // Latar belakang utama: putih bersih
        },
        dark: {
          primary: "#2A3382",        // Warna utama: biru tua
          prm2: "#E9E7FF",           // Warna sekunder: ungu muda
          secondary: "#e70012",      // Warna sekunder 2: merah cerah
          accent: "#0091a5",         // Warna aksen: turquoise gelap
          neutral: "#2a2e37",        // Warna netral: abu-abu gelap
          accentcont: "#5A607F",     // Warna accent cont: abu-abu kebiruan (lebih soft)
          "base-100": "#191d24",     // Latar belakang utama: abu-abu gelap
        }
      }      
    ],
  },
}
