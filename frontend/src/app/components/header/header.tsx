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
  DesenvolvidoPor
} from "./style";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { searchBySku } from "@/api/productApi"; // Certifique-se de ter esta função

export default function Header({ setSearchQuery, setProducts }) {
  const [label, setLabel] = useState("VISITE NOSSA LOJA");
  const [isHome, setIsHome] = useState(true);
  const [placeholder, setPlaceholder] = useState("Insira o nome do produto...");
  const [pesquisa, setPesquisa] = useState("");
  const [isCreateProductPage, setIsCreateProductPage] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/pages/createProduct") {
      setIsCreateProductPage(true);
    } else {
      setIsCreateProductPage(false);
      if (pathname !== "/") {
        setIsHome(false);
        setLabel("SAIR DA CONTA");
        setPlaceholder("Insira o SKU do produto...");
      }
    }
  }, [pathname]);

  function verificarPesquisa(e: React.FormEvent) {
    e.preventDefault();
    if (pathname !== "/") {
      const pesquisaFormatada = pesquisa.toUpperCase().replace(" ", "%20");

      searchBySku(pesquisaFormatada)
        .then((result) => {
          if (result && Array.isArray(result.data)) {
            setProducts(result.data);
          } else {
            console.error(
              "Esperado um array de produtos, mas recebido:",
              result
            );
            setProducts([]);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
          setProducts([]);
        });
    } else {
      setSearchQuery(pesquisa);
    }
  }

  function logout() {
    sessionStorage.clear();
  }

  return (
    <HeaderStyle>
      <div style={{ display: "flex", alignItems: "baseline", gap: "5%" }}>
        <Logo>HBL</Logo>
        <h2 style={{ color: "#fff" }}>OFERTAS</h2>
      </div>

      {!isCreateProductPage && (
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
      )}

      {isCreateProductPage ? (
        <DesenvolvidoPor>Desenvolvido por Bytezeset©</DesenvolvidoPor>
      ) : (
        <ContainerButtonShop
          onClick={logout}
          href={isHome ? "https://hblvendas.com.br/" : "/pages/auth"}
          target={isHome ? "_blank" : "_self"}
        >
          <ShopText>{label}</ShopText>
          {isHome && <ShopImage src="/shop.svg" alt="shop" />}
        </ContainerButtonShop>
      )}
    </HeaderStyle>
  );
}
