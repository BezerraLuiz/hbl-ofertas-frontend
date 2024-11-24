import React from "react";
import "./styles/globals.css";

export const metadata = {
  title: "HBL Ofertas",
  description: "HBL Ofertas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
