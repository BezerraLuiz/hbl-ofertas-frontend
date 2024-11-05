'use client'

import { HeaderStyle, Logo } from "./style"

export default function Header() {
  return (
    <>
      <HeaderStyle>
        <div style={{ display: "flex", alignItems: "baseline", gap: "5%"}}>
          <Logo>HBL</Logo>
          <h2 style={{color: "#fff"}}>OFERTAS</h2>
        </div>
      </HeaderStyle>
    </>
  )
}