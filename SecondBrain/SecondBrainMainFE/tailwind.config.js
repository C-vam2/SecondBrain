/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          600: "#4e46dc",
          300: "#e2e8fd",
          500: "#4c45b3",
        },
        grey: {
          900: "#505156",
          300: "#dddddd",
          100: "#f9fbfc",
        },
      },
    },
  },
  plugins: [],
};
