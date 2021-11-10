const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-img": "url('./img/cafer-mert-ceyhan-LAY19dUD_ro-unsplash.jpg')",
      }),
      gray: colors.gray,
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#232946",
      secondary: "#b8c1ec",
      primaryButton: "#eebbc3",
      danger: "#e3342f",
    }),
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked", "label-checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(({ addVariant, e }) => {
      addVariant("label-checked", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          const eClassName = e(`label-checked${separator}${className}`);
          const yourSelector = 'input[type="checkbox"]';
          return `${yourSelector}:checked ~ .${eClassName}`;
        });
      });
    }),
  ],
  future: {
    purgeLayersByDefault: true,
  },
};
