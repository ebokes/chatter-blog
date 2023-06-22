"use client";

import "./globals.css";
import { Providers } from "./providers";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./utils/theme";
import { ChatterProvider } from "./context/ChatterContext";
import Navbar from "./components/Navbar";

// export const metadata = {
//   title: "Chatter",
//   description: "A Haven for Text-Based Content",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ChatterProvider>
          <Providers>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {/* <Navbar /> */}
            {children}
          </Providers>
        </ChatterProvider>
      </body>
    </html>
  );
}
