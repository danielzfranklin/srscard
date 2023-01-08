/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/{**,}/*.{ts,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ],
};
