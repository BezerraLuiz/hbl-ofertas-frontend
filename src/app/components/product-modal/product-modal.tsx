"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  ModalOverlay,
  ModalImage,
  ModalInfo,
  BackButton,
  ModalBackground,
  DeleteButton,
  UpdateButton,
  StyledInputPrimary,
  StyledInputSecondary,
  StyledTextarea,
} from "./style";
import { usePathname } from "next/navigation";
import { deleteProduct, updateProduct } from "@/api/productApi";
import ErrorComponent from "../error/error";

export default function ProductModal({
  product,
  onClose,
}: {
  product: {
    id: number;
    nome: string;
    valor: number;
    sku: string;
    descricao: string;
    imagePath: string;
  };
  onClose: () => void;
}) {
  const { nome, valor, sku, descricao, imagePath } = product;

  const [values, setValues] = useState({
    productName: nome,
    price: valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    sku: sku,
    description: descricao,
  });

  const productNameRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const skuRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      setIsReadOnly(true);
      setIsVisible(false);
    } else {
      setIsReadOnly(false);
      setIsVisible(true);
    }
  }, [pathname]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof values
  ) {
    setValues({ ...values, [field]: e.target.value });
    if (field === "description" && descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }

  function handleFormatarMoeda(
    e: ChangeEvent<HTMLInputElement>
  ) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    const formattedValue = (Number(value) / 100)
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
      .replace("R$", "")
      .trim();
    setValues((prevValues) => ({
      ...prevValues,
      price: formattedValue,
    }));
  }

  async function deletarProduto(id: number) {
    const res = await deleteProduct(id);

    if (res.error === false) {
      window.location.reload();
    } else {
      setMessage(res.message);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3500);
    }
  }

  async function atualizarProduto(
    id: number,
    sku: string,
    nome: string,
    valor: number,
    descricao: string
  ) {
    const res = await updateProduct(id, sku, nome, valor, descricao);

    if (res.error === false) {
      window.location.reload();
    } else {
      setMessage(res.message);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3500);
    }
  }

  function formatPriceToNumber(formattedPrice: string): number {
    const cleanedValue = formattedPrice
      .replace(/[^\d,]/g, "")
      .replace(",", ".");
    return parseFloat(cleanedValue);
  }

  return (
    <>
      {isError && <ErrorComponent message={message} />}

      <ModalBackground onClick={onClose} />
      <ModalOverlay>
        <ModalImage src={imagePath} alt="img-product" />
        <ModalInfo isreadonly={isReadOnly}>
          <StyledInputPrimary
            ref={productNameRef}
            value={values.productName}
            onChange={(e) => handleChange(e, "productName")}
            readOnly={isReadOnly}
          />
          <StyledInputSecondary
            ref={priceRef}
            value={`R$ ${values.price}`}
            onChange={(e) => {
              handleChange(e, "price");
              handleFormatarMoeda(e);
            }}
            readOnly={isReadOnly}
          />
          <StyledInputSecondary
            ref={skuRef}
            value={values.sku}
            onChange={(e) => handleChange(e, "sku")}
            readOnly={isReadOnly}
          />
          <StyledTextarea
            ref={descriptionRef}
            value={values.description}
            onChange={(e) => handleChange(e, "description")}
            readOnly={isReadOnly}
          />
        </ModalInfo>

        {isVisible && (
          <>
            <BackButton onClick={onClose}>Voltar</BackButton>
            <UpdateButton
              onClick={() =>
                atualizarProduto(
                  product.id,
                  values.sku,
                  values.productName,
                  formatPriceToNumber(values.price),
                  values.description
                )
              }
            >
              Atualizar
            </UpdateButton>
            <DeleteButton onClick={() => deletarProduto(product.id)}>
              Deletar
            </DeleteButton>
          </>
        )}
      </ModalOverlay>
    </>
  );
}