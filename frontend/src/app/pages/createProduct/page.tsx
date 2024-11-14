"use client";

import Header from "@/app/components/header/header";
import { useState, useEffect } from "react";
import {
  ContainerMain,
  ContainerInfoProduct,
  Label,
  Input,
  Button,
  ButtonCancel,
  FileInput,
  FileLabel,
} from "./style";
import { createProductApi } from "@/api/productApi";
import { useRouter } from "next/navigation";
import ErrorComponent from "@/app/components/error/error";

export default function createProduct() {
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProducts] = useState("");
  const [sku, setSku] = useState("");
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [fileName, setFileName] = useState("Selecionar Arquivo");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();

  async function submitFormulario(e: React.FormEvent) {
    e.preventDefault();
    const valor = convertToNumber(preco);

    console.log("!")

    if (sku == "" || nome == "" || preco == "" || descricao == "" || imagem == null) {
      const res = await createProductApi(sku, nome, valor, descricao, imagem);
      setResponse(res.message);
      console.log(res.message);

      if (res.error === false) {
        router.push("/pages/admin");
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3500);
      }
    } else {
      setMessage("Preencha todos os dados do produto");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3500);
    } 
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }

    if (e.target.files) {
      setImagem(e.target.files[0]);
    }
  };

  function handleFormatarMoeda(e, setState) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setState(value);
  }

  function convertToNumber(valor: string) {
    return parseFloat(
      valor.replace("R$", "").replace(/\./g, "").replace(",", ".")
    );
  }

  function cancelarCadastro() {
    router.push("/pages/admin"); 
  }

  return (
    <>
      {isError && <ErrorComponent message={message}/>}
      <Header setSearchQuery={setSearchQuery} setProducts={setProducts} />

      <ContainerMain>
        <ContainerInfoProduct>
          <form onSubmit={submitFormulario}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "32px",
              }}
            >
              <FileInput type="file" id="file-upload" required onChange={handleFileChange} />
              <FileLabel htmlFor="file-upload">{fileName}</FileLabel>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "24px",
              }}
            >
              <Label>Nome</Label>
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "24px",
              }}
            >
              <Label>Código</Label>
              <Input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "24px",
              }}
            >
              <Label>Valor</Label>
              <Input
                type="text"
                value={preco}
                onChange={(e) => handleFormatarMoeda(e, setPreco)}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "24px",
              }}
            >
              <Label>Descrição</Label>
              <Input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>

            <Button>CADASTRAR</Button>
            <ButtonCancel onClick={cancelarCadastro}>CANCELAR</ButtonCancel>
          </form>
        </ContainerInfoProduct>
      </ContainerMain>
    </>
  );
}
