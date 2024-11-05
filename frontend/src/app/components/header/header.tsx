"use client";

import {
  HeaderStyle,
  Logo,
  ContainerButtonShop,
  ShopImage,
  ShopText,
  ContainerSearchBar,
  SearchImage,
  SearchInput
} from "./style";

export default function Header() {
  return (
    <>
      <HeaderStyle>
        <div style={{ display: "flex", alignItems: "baseline", gap: "5%" }}>
          <Logo>HBL</Logo>
          <h2 style={{ color: "#fff" }}>OFERTAS</h2>
        </div>

        <ContainerSearchBar>
          <SearchImage src="/search.svg" alt="search" />
          <SearchInput type="text" placeholder="Insira o nome do produto..."/>
        </ContainerSearchBar>

        <ContainerButtonShop href="https://hblvendas.com.br/" target="blank">
          <ShopText>VISITE NOSSA LOJA</ShopText>
          <ShopImage src="/shop.svg" alt="shop" />
        </ContainerButtonShop>
      </HeaderStyle>
    </>
  );
}
