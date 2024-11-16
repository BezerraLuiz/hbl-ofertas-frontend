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
  DesenvolvidoPor,
  ContainerLogo,
  NumLogo,
  TextLogo,
  ContainerNumText,
} from "./style";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { searchBySku } from "@/api/productApi";

export default function Header({
  setSearchQuery,
  setProducts,
}: {
  setSearchQuery: (query: string) => void;
  setProducts: (products: unknown[]) => void;
}) {
  const [label, setLabel] = useState<string>("VISITE NOSSA LOJA");
  const [isHome, setIsHome] = useState<boolean>(true);
  const [placeholder, setPlaceholder] = useState<string>("Insira o nome do produto...");
  const [pesquisa, setPesquisa] = useState<string>("");
  const [isCreateProductPage, setIsCreateProductPage] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/pages/create%product") {
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
      <ContainerLogo>
        <Logo>HBL</Logo>
        <ContainerNumText>
          <NumLogo>50</NumLogo>
          <TextLogo>OFERTAS</TextLogo>
        </ContainerNumText>
      </ContainerLogo>

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
