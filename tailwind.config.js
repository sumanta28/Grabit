 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    fontFamily: {
        sans: ["Lato", "sans-serif"], // Lato as default sans
      },
     extend: {},
   },
   plugins: [],
 }