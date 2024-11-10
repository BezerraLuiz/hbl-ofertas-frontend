'use client'

import Header from "@/app/components/header/header";
import { useState } from "react";
import {
  ContainerMain,
  ContainerInfoProduct,
  Label,
  Input,
  Button,
  ButtonCancel,
} from "./style";
import { createProductApi } from "@/api/productApi";

export default function createProduct() {
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProducts] = useState("");
  const [sku, setSku] = useState("");
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<File | null>(null); // Estado para a imagem

  function handleFormatarMoeda(e, setState) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setState(value);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImagem(e.target.files[0]);
    }
  }

  function submitFormulario(e: React.FormEvent) {
    e.preventDefault();
    const valor = convertToNumber(preco);

    console.log("Imagem: " + imagem)

    createProductApi(sku, nome, valor, descricao, imagem);
  }

  function convertToNumber(valor: string) {
    return parseFloat(
      valor.replace("R$", "").replace(/\./g, "").replace(",", ".")
    );
  }

  return (
    <>
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
              <Label>Imagem</Label>
              <Input type="file" required onChange={handleImageChange} />
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
            <ButtonCancel>CANCELAR</ButtonCancel>
          </form>
        </ContainerInfoProduct>
      </ContainerMain>
    </>
  );
}
