"use client";

import { React, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/app/components/loading/loading";
import ErrorComponent from "@/app/components/error/error";
import { validateCredentials } from "@/api/Users/UsersApi";
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
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    sessionStorage.clear();
    document.body.style.backgroundColor = pathname === "/pages/auth" ? "#fff" : "";
  }, [pathname]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await validateCredentials(mail, password);

    if (res.error == true) {
      setMessageError(res.message);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } else {
      setIsError(false);
      setIsLoading(true);
      sessionStorage.setItem("user", "admin");
      setTimeout(() => {
        router.push("admin");
      }, 500);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {isError && <ErrorComponent message={messageError} />}
      <ContainerMain>
        <Header>
          <Logo>HBL</Logo>
          <div>
            <HeaderText>Olá, Hélio! Bem-vindo ao Admin Workspace</HeaderText>
            <HeaderDivisor />
            <h2 style={{ color: "#fff" }}>OFERTAS</h2>
          </div>
        </Header>

        <form onSubmit={handleLogin}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Label>E-mail</Label>
            <Input
              type="mail"
              placeholder="Digite o e-mail da conta..."
              onChange={((e) => { setMail(e.target.value) })}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Label>Senha</Label>
            <Input type="password" onChange={((e) => { setPassword(e.target.value) })} required />
          </div>

          <Button>ENTRAR</Button>
        </form>

        <Footer>Desenvolvido por Bytezest ©</Footer>
      </ContainerMain>
    </>
  );
}
