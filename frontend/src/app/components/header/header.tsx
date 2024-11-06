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
import { searchByNome, searchBySku } from "@/api/productApi";

export default function Header() {
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

  async function verificarPesquisa(e: React.FormEvent) {
    e.preventDefault();
    let response;

    if (typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        console.log("Page admin");
        response = await searchBySku(pesquisa);
        alert(JSON.stringify(response, null, 2));
      } else {
        console.log("Page client");
        response = await searchByNome(pesquisa);
        alert(JSON.stringify(response, null, 2));
      }
    }
  }

  return (
    <>
      <HeaderStyle>
        <div style={{ display: "flex", alignItems: "baseline", gap: "5%" }}>
          <Logo>HBL</Logo>
          <h2 style={{ color: "#fff" }}>OFERTAS</h2>
        </div>

        <ContainerSearchBar>
          <SearchImage src="/search.svg" alt="search" />
          <form onSubmit={verificarPesquisa}>
            <SearchInput type="text" placeholder={placeholder} onChange={(e) => setPesquisa(e.target.value)}/>
          </form>
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
