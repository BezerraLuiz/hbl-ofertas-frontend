"use client";

import React from "react";
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
  TextLogo,
} from "./style";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [label, setLabel] = useState("VISITE NOSSA LOJA");
  const [isHome, setIsHome] = useState(true);
  const [placeholder, setPlaceholder] = useState("Insira o nome do produto...");
  const [isCreateProductPage, setIsCreateProductPage] = useState(false);
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

  return (
    <>
      <HeaderStyle>
        <ContainerLogo>
          <Logo>HBL</Logo>
          <TextLogo>OFERTAS</TextLogo>
        </ContainerLogo>

        {!isCreateProductPage && (
          <ContainerSearchBar>
            <SearchImage src="/search.svg" alt="search" />
            <form>
              <SearchInput
                type="text"
                placeholder={placeholder}
              />
            </form>
          </ContainerSearchBar>
        )}

        {isCreateProductPage ? (
          <DesenvolvidoPor>Desenvolvido por Bytezeset©</DesenvolvidoPor>
        ) : (
          <ContainerButtonShop
            href={isHome ? "https://hblvendas.com.br/" : "/pages/auth"}
            target={isHome ? "_blank" : "_self"}
          >
            <ShopText>{label}</ShopText>
            {isHome && <ShopImage src="/shop.svg" alt="shop" />}
          </ContainerButtonShop>
        )}
      </HeaderStyle>
    </>
  );
}
