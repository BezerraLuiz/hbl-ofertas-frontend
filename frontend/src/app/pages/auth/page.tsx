'use client'

import { Body, ContainerMain, Header, Logo, HeaderText, HeaderDivisor, Footer, Input, Label, Button } from "./style"

export default function Login() {
  return (
    <>
      <Body>
        <ContainerMain>
          <Header>
            <Logo>HBL</Logo>
            <div>
              <HeaderText>Olá, Hélio! Bem-vindo ao Admin Workspace</HeaderText>
              <HeaderDivisor></HeaderDivisor>
              <h2 style={{ color: "#fff" }}>OFERTAS</h2>
            </div>
          </Header>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px"}}>
            <Label>E-mail</Label>
            <Input type="email" placeholder="Digite o e-mail da conta..."/>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px"}}>
            <Label>Senha</Label>
            <Input type="password"/>
          </div>

          <Button>ENTRAR</Button>

          <Footer>Desenvolvido por Bytezest ©</Footer>
        </ContainerMain>
      </Body>
    </>
  )
}