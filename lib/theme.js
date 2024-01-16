// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { Rubik } from "next/font/google";

const nextFont = Rubik({
  weight: ["400"],
  subsets: ["latin-ext"],
  fallback: ["Arial", "sans-serif"],
});

// 2. Add your color mode config
const config = {
  initialColorMode: "Light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  fonts: {
    body: nextFont.style.fontFamily,
    heading: nextFont.style.fontFamily,
    mono: nextFont.style.fontFamily,
  },
});

export default theme;
