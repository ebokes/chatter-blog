import "./globals.css";
import { Providers } from "./providers";
import { ChatterProvider } from "./context/ChatterContext";

export const metadata = {
  title: "Chatter",
  description: "A Haven for Text-Based Content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ChatterProvider>
          <Providers>{children}</Providers>
        </ChatterProvider>
      </body>
    </html>
  );
}
