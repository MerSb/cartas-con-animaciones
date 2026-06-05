import type { Metadata } from "next";
import "@fontsource/press-start-2p/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carta Kawaii del Perrito",
  description: "Una experiencia interactiva muy adorable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-pixel">{children}</body>
    </html>
  );
}