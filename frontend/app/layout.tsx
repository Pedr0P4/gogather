import "mapbox-gl/dist/mapbox-gl.css";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RolêNet",
  description: "Encontre e compartilhe os melhores rolês da cidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
