// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#fff",
      200: "#F5F5F5",
      300: "#F9FAFB", //Heading ==> Dark mode
      350: "#94A3B8", //Texr ===> Dark mode
      400: "#d0d0d0",
      450: "#606477",
      470: "#19202a",
      500: "#ffedcc7f",
      600: "#2B6CB0",
      650: "#2c5382b7",
      700: "#3182CE",
      // 600: "#543EE0",
      // 650: "#543EE052",
      // 700: "#715fe3",
      800: "#171923",
      850: "#0f172a", //Heading ==> Light mode
      900: "#475569", //Texr ===> Light mode
      950: "#1a202c",
      970: "#4BB543",
    },
  },
});

export default theme;
