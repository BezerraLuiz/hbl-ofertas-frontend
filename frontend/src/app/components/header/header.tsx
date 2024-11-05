"use client";

import {
  HeaderStyle,
  Logo,
  ContainerButtonShop,
  ShopImage,
  ShopText,
  ContainerSearchBar,
  SearchImage,
  SearchInput,
} from "./style";
import { useEffect, useState } from "react";

export default function Header() {
  const [label, setLabel] = useState("VISITE NOSSA LOJA");
  const [isHome, setIsHome] = useState(true);
  const [placeholder, setPlaceholder] = useState("Insira o nome do produto...");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        setIsHome(false);
        setLabel("SAIR DA CONTA");
        setPlaceholder("Insira o SKU do produto...");
      }
    }
  }, []);

  return (
    <>
      <HeaderStyle>
        <div style={{ display: "flex", alignItems: "baseline", gap: "5%" }}>
          <Logo>HBL</Logo>
          <h2 style={{ color: "#fff" }}>OFERTAS</h2>
        </div>

        <ContainerSearchBar>
          <SearchImage src="/search.svg" alt="search" />
          <SearchInput
            type="text"
            placeholder={placeholder}
          />
        </ContainerSearchBar>

        <ContainerButtonShop
          href={isHome ? "https://hblvendas.com.br/" : "/pages/login"}
          target={isHome ? "_blank" : "_self"}
        >
          <ShopText>{label}</ShopText>
          {isHome && <ShopImage src="/shop.svg" alt="shop" />}
        </ContainerButtonShop>
      </HeaderStyle>
    </>
  );
}
