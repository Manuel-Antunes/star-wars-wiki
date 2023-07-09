// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const colors = require("tailwindcss/colors");
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const defaultTheme = require("tailwindcss/defaultTheme");

const slateGrayColor = {
  300: "#6D7A92",
  400: "#444B59",
  500: "#374562",
  700: "#23262C",
  800: "#151F28",
};

const navyColor = {
  50: "#E7E9EF",
  100: "#C2C9D6",
  200: "#A3ADC2",
  300: "#697A9B",
  400: "#5C6B8A",
  450: "#465675",
  500: "#384766",
  600: "#313E59",
  700: "#26334D",
  750: "#222E45",
  800: "#202B40",
  900: "#192132",
};

const royalBlueColor = {
  300: "#6770c6",
  500: "#5046E5",
  600: "#3F3AC9",
  700: "#2E2A9D",
  800: "#1E1A71",
  900: "#0F0B45",
};

const slateBlueColor = {
  800: "#6770c6",
};

const psycheGreenColor = {
  500: "#185471",
  700: "#0E2733",
};

const pineTreeColor = {
  600: "#2F2922",
};

const customColors = {
  navy: navyColor,
  "slate-150": "#E9EEF5",
  primary: "#5F5AF6",
  "primary-focus": "#4D47F5",
  "secondary-light": "#ff57d8",
  secondary: "#F000B9",
  "secondary-focus": "#BD0090",
  "accent-light": colors.indigo["400"],
  accent: "#5f5af6",
  "accent-focus": "#4d47f5",
  info: "#818CF8",
  "info-focus": colors.sky["600"],
  success: colors.emerald["500"],
  "success-focus": colors.emerald["600"],
  warning: "#ff9800",
  "warning-focus": "#e68200",
  error: "#ff5724",
  "error-focus": "#f03000",
  "royal-blue": royalBlueColor,
  "slate-blue": slateBlueColor,
  "slate-gray": slateGrayColor,
  "psyche-green": psycheGreenColor,
  "pine-tree": pineTreeColor,
  danger: "#ff2424",
  pistachio: "#10B981",
};

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        tiny: ["0.625rem", "0.8125rem"],
        "tiny+": ["0.6875rem", "0.875rem"],
        "xs+": ["0.8125rem", "1.125rem"],
        "sm+": ["0.9375rem", "1.375rem"],
      },
      colors: { ...customColors },
      opacity: {
        15: ".15",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
      },
      boxShadow: {
        soft: "0 3px 10px 0 rgb(48 46 56 / 6%)",
        "soft-dark": "0 3px 10px 0 rgb(25 33 50 / 30%)",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        scroll: { "0%": { top: "100%" }, "100%": { top: "-170%" } },
        "fade-out": {
          "0%": {
            opacity: 1,
            visibility: "visible",
          },
          "100%": {
            opacity: 0,
            visibility: "hidden",
          },
        },
        intro: {
          "0%": { opacity: 0 },
          "20%": { opacity: 1 },
          "90%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        logo: {
          "0%": { width: "18em", transform: "scale(2.75)", opacity: 1 },
          "50%": { opacity: 1, width: "18em" },
          "100%": { opacity: 0, transform: "scale(0.1)", width: "18em" },
        },
      },
      backgroundImage: {
        "bg-404": "url('/src/assets/images/illustrations/ufo-bg.svg')",
        "bg-404-dark":
          "url('/src/assets/images/illustrations/ufo-bg-dark.svg')",
      },
    },
  },
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  plugins: [],
};
