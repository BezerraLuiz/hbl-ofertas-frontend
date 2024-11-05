import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "HBL - OFERTAS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
