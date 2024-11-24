"use client";

import React from "react";
import { useState } from "react";
import Header from "@/app/components/header/header";
import ErrorComponent from "@/app/components/error/error";
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

export default function CreateProduct() {
  const [fileName, setFileName] = useState("Selecionar Arquivo");
  const [isError, setIsError] = useState(false);

  return (
    <>
      {isError && <ErrorComponent/>}
      <Header/>

      <ContainerMain>
        <ContainerInfoProduct>
          <form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "32px",
              }}
            >
              <FileInput
                type="file"
                id="file-upload"
                required
              />
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