"use client";

import React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import { getProductBySku } from "@/api/Products/ProductsApi";
import ErrorComponent from "@/app/components/error/error";
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

export default function Header({ setSearchQuery, setProducts, visibleProduct }) {
  const pathname = usePathname();
  const [label, setLabel] = useState("VISITE NOSSA LOJA");
  const [isHome, setIsHome] = useState(true);
  const [placeholder, setPlaceholder] = useState("Insira o nome do produto...");
  const [isCreateProductPage, setIsCreateProductPage] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (pathname == "/pages/product") {
      setIsCreateProductPage(true);
    } else {
      setIsCreateProductPage(false);
      if (pathname != "/") {
        setIsHome(false);
        setLabel("SAIR DA CONTA");
        setPlaceholder("Insira o SKU do produto...");
      }
    }
  }, [pathname]);

  const handlerSearch = async (e) => {
    e.preventDefault();

    if (pathname != "/") {
      if (pesquisa == '') {
        setIsError(false);
        visibleProduct(false);
        setProducts([]);

        return;
      }

      const pesquisaFormatada = pesquisa.toUpperCase().replace(" ", "%20");
      
      const res = await getProductBySku(pesquisaFormatada);

      if (res.error == true) {
        setIsError(true);
        visibleProduct(false);
        setTimeout(() => {
          setIsError(false);
        }, 1000);
        setProducts([]);
      } else {
        setProducts(res.message);
        visibleProduct(true);
      };
    } else {
      setSearchQuery(pesquisa);
    }
  };

  return (
    <>
      {isError && <ErrorComponent message="Produto não encontrado!" />}
      <HeaderStyle>
        <ContainerLogo>
          <Logo>HBL</Logo>
          <TextLogo>OFERTAS</TextLogo>
        </ContainerLogo>

        {!isCreateProductPage && (
          <ContainerSearchBar>
            <SearchImage src="/search.svg" alt="search" />
            <form onSubmit={handlerSearch}>
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
          <DesenvolvidoPor>Desenvolvido por Bytezeset</DesenvolvidoPor>
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

Header.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
  visibleProduct: PropTypes.func.isRequired,
}