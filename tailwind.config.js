/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "Montserrat",
      },
      colors: {
        utama: "#292F36",
        tombol: "#98FAEC",
        ketiga: "#12F7D6",
        kempat: "#1A1E23",
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
};
