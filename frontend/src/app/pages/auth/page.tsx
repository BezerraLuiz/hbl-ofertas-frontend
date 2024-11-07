"use client";

import { useEffect, useState } from "react";
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
import { authUser } from "@/api/userApi";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading/loading";
import ErrorComponent from "@/app/components/error/error";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState("")

  useEffect(() => {
    if (router.pathname === "/pages/auth") {
      document.body.style.backgroundColor = "#fff";
    } else {
      document.body.style.backgroundColor = "";
    }
  }, [router.pathname]);


  async function authenticate(e: React.FormEvent) {
    e.preventDefault();
  
    const res = await authUser(email, senha);
    setResponse(res.message);
    console.log(res.message);
  
    if (res.error === false) {
      setIsLoading(true);
      localStorage.setItem("user", "admin")
      setTimeout(() => {
        router.push("/pages/admin");
      }, 1500);
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3500);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      {isError && <ErrorComponent message={response} />}

      <ContainerMain>
        <Header>
          <Logo>HBL</Logo>
          <div>
            <HeaderText>Olá, Hélio! Bem-vindo ao Admin Workspace</HeaderText>
            <HeaderDivisor></HeaderDivisor>
            <h2 style={{ color: "#fff" }}>OFERTAS</h2>
          </div>
        </Header>

        <form onSubmit={authenticate}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "32px",
            }}
          >
            <Label>E-mail</Label>
            <Input
              type="email"
              placeholder="Digite o e-mail da conta..."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "32px",
            }}
          >
            <Label>Senha</Label>
            <Input
              type="password"
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <Button>ENTRAR</Button>
        </form>

        <Footer>Desenvolvido por Bytezest ©</Footer>
      </ContainerMain>
    </>
  );
}
