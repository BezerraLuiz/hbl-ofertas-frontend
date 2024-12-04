"use client";

import { React, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header/header";
import ErrorComponent from "@/app/components/error/error";
import { uploadImage } from "@/api/Images/ImagesApi";
import { createProduct } from "@/api/Products/ProductsApi";
import Loading from "@/app/components/loading/loading";
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
  const router = useRouter();
  const [fileName, setFileName] = useState("Selecionar Arquivo");
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const response = sessionStorage.getItem("user");
    if (response != "admin") {
      router.push("/pages/auth");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handlerCancelCreation = () => {
    router.push("admin");
  };

  const handlerFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(e.target.files[0]);
      setFileName(file.name);
    }
  }

  const handleFormatarMoeda = (e, setState) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setState(value);
  };

  const handlerCreateProduct = async (e) => {
    e.preventDefault();
  
    try {
      setIsLoading(true);
      
      const resUploadImage = await uploadImage(image);
      if (resUploadImage.error) {
        throw new Error(resUploadImage.message);
      };
      const imageId = resUploadImage.message;
  
      const formattedPrice = parseFloat(
        price.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
      );
      const formattedSku = sku.toUpperCase();
  
      const resCreateProduct = await createProduct(formattedSku, name, formattedPrice, description, imageId);
      if (resCreateProduct.error) {
        throw new Error(resCreateProduct.message);
      };
  
      setIsError(false);
      setTimeout(() => {
        router.push("admin");
      }, 500);
    } catch (error) {
      setIsError(true);
      setMessageError(error.message);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    };
  };
  

  return (
    <>
      {isLoading && <Loading />}
      {isError && <ErrorComponent message={messageError} />}
      <Header />

      <ContainerMain>
        <ContainerInfoProduct>
          <form onSubmit={handlerCreateProduct}>
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
                onChange={handlerFileChange}
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
                onChange={(e) => setName(e.target.value)}
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
                value={price}
                onChange={(e) => handleFormatarMoeda(e, setPrice)}
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
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <Button>CADASTRAR</Button>
            <ButtonCancel onClick={handlerCancelCreation}>CANCELAR</ButtonCancel>
          </form>
        </ContainerInfoProduct>
      </ContainerMain>
    </>
  );
}
