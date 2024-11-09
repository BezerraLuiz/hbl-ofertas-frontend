// Header.jsx

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

export default function Header({ setSearchQuery }) {
  const [label, setLabel] = useState("VISITE NOSSA LOJA");
  const [isHome, setIsHome] = useState(true);
  const [placeholder, setPlaceholder] = useState("Insira o nome do produto...");
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        setIsHome(false);
        setLabel("SAIR DA CONTA");
        setPlaceholder("Insira o SKU do produto...");
      }
    }
  }, []);

  function verificarPesquisa(e: React.FormEvent) {
    e.preventDefault();
    setSearchQuery(pesquisa);
  }

  function logout() {
    localStorage.clear();
  }

  return (
    <HeaderStyle>
      <div style={{ display: "flex", alignItems: "baseline", gap: "5%" }}>
        <Logo>HBL</Logo>
        <h2 style={{ color: "#fff" }}>OFERTAS</h2>
      </div>

      <ContainerSearchBar>
        <SearchImage src="/search.svg" alt="search" />
        <form onSubmit={verificarPesquisa}>
          <SearchInput
            type="text"
            placeholder={placeholder}
            value={pesquisa}
            onChange={(e) => {
              setPesquisa(e.target.value);
              setSearchQuery(e.target.value);
            }}
          />
        </form>
      </ContainerSearchBar>

      <ContainerButtonShop
        onClick={logout}
        href={isHome ? "https://hblvendas.com.br/" : "/pages/auth"}
        target={isHome ? "_blank" : "_self"}
      >
        <ShopText>{label}</ShopText>
        {isHome && <ShopImage src="/shop.svg" alt="shop" />}
      </ContainerButtonShop>
    </HeaderStyle>
  );
}
