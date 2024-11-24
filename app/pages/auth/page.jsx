"use client";

import React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/app/components/loading/loading";
import ErrorComponent from "@/app/components/error/error";
import {
  ContainerMain,
  Header,
  Logo,
  HeaderText,
  HeaderDivisor,
  Footer,
  Input,
  Label,
  Button,
} from "./style";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    sessionStorage.clear();
    document.body.style.backgroundColor = pathname === "/pages/auth" ? "#fff" : "";
  }, [pathname]);

  return (
    <>
      {isLoading && <Loading />}
      {isError && <ErrorComponent />}
      <ContainerMain>
        <Header>
          <Logo>HBL</Logo>
          <div>
            <HeaderText>Olá, Hélio! Bem-vindo ao Admin Workspace</HeaderText>
            <HeaderDivisor />
            <h2 style={{ color: "#fff" }}>OFERTAS</h2>
          </div>
        </Header>

        <form >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Label>E-mail</Label>
            <Input
              type="email"
              placeholder="Digite o e-mail da conta..."
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Label>Senha</Label>
            <Input type="password" required />
          </div>

          <Button>ENTRAR</Button>
        </form>

        <Footer>Desenvolvido por Bytezest ©</Footer>
      </ContainerMain>
    </>
  );
}
