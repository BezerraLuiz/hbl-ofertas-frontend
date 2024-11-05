'use client'

import { HeaderStyle, Logo, ContainerButtonShop, ShopImage, ShopText } from "./style"

export default function Header() {
  return (
    <>
      <HeaderStyle>
        <div style={{ display: "flex", alignItems: "baseline", gap: "5%"}}>
          <Logo>HBL</Logo>
          <h2 style={{color: "#fff"}}>OFERTAS</h2>
        </div>

        <ContainerButtonShop>
          <ShopText>VISITE NOSSA LOJA</ShopText>
          <ShopImage src="/shop.svg" alt="shop"/>
        </ContainerButtonShop>
      </HeaderStyle>
    </>
  )
}