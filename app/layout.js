import React from "react";
import PropTypes from "prop-types";
import "./styles/globals.css";

export const metadata = {
  title: "HBL Ofertas",
  description: "HBL Ofertas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
