import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#092C4C",
        primaryBlue: "#514EF3",
        blue: "#514EF3",
        green: "#2DC8A8",
        yellow: "#FFC357",
        grey90: "#526477",
        grey70: "#7E92A2",
        grey50: "#D6E1E6",
        grey30: "#EAEEF4",
        grey10: "#F6FAFD",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
});
