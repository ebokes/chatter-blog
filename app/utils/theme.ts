import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#fff", //floating nav ==> Light mode
      200: "#F5F5F5",
      250: "#eeeded",
      300: "#F9FAFB", //Heading ==> Dark mode
      350: "#94A3B8", //Text ===> Dark mode
      390: "#dedcdc",
      400: "#d0d0d0",
      410: "#4b5a70", //floating nav border ==> Dark mode
      420: "#f0f3f7", //floating nav border ==> Light mode
      430: "#e0e4e9", //floating nav border ==> Light mode
      450: "#606477",
      460: "#334155", //floating nav ==> Dark mode
      470: "#19202a",
      480: "#1a202c",
      500: "#ffedcc7f",
      600: "#2B6CB0",
      650: "#2c5382b7",
      700: "#3182CE",
      800: "#171923",
      850: "#0f172a", //Heading ==> Light mode
      900: "#475569", //Texr ===> Light mode
      950: "#1a202c",
      970: "#4BB543",
    },
  },
});

export default theme;
