"use client";

import { useEffect, useState, useCallback } from "react";
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
import Loading from "@/app/components/loading/loading";
import ErrorComponent from "@/app/components/error/error";
import { useRouter, usePathname } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    sessionStorage.clear();
    document.body.style.backgroundColor = pathname === "/pages/auth" ? "#fff" : "";
  }, [pathname]);

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handleSenhaChange = useCallback((e) => setSenha(e.target.value), []);

  async function authenticate(e) {
    e.preventDefault();
    const res = await authUser(email, senha);
    setResponse(res.message);

    if (!res.error) {
      setIsLoading(true);
      sessionStorage.setItem("user", "admin");
      setTimeout(() => router.push("/pages/admin"), 1500);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 3500);
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
            <HeaderDivisor />
            <h2 style={{ color: "#fff" }}>OFERTAS</h2>
          </div>
        </Header>

        <form onSubmit={authenticate}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Label>E-mail</Label>
            <Input
              type="email"
              placeholder="Digite o e-mail da conta..."
              onChange={handleEmailChange}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Label>Senha</Label>
            <Input type="password" onChange={handleSenhaChange} required />
          </div>

          <Button>ENTRAR</Button>
        </form>

        <Footer>Desenvolvido por Bytezest ©</Footer>
      </ContainerMain>
    </>
  );
}
