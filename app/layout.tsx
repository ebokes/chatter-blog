import "./globals.css";
import { Providers } from "./providers";

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
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
