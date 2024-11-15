"use client";

import { useState, useEffect, useRef } from "react";
import {
  ModalOverlay,
  ModalImage,
  ModalInfo,
  BackButton,
  ModalBackground,
  DeleteButton,
  UpdateButton,
} from "./style";
import { usePathname, useRouter } from "next/navigation";
import { deleteProduct, updateProduct } from "@/api/productApi";
import ErrorComponent from "../error/error";

export default function ProductModal({ product, onClose }) {
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
  const inputRef = useRef({
    productName: null,
    price: null,
    sku: null,
    description: null,
  });
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [response, setResponse] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (pathname == "/") {
      setIsReadOnly(true);
      setIsVisible(false);
    } else {
      setIsReadOnly(false);
      setIsVisible(true);
    }
  }, [pathname]);

  function handleChange(e, field) {
    setValues({ ...values, [field]: e.target.value });
    if (inputRef.current[field]) {
      inputRef.current[field].style.height = "auto";
      inputRef.current[
        field
      ].style.height = `${inputRef.current[field].scrollHeight}px`;
    }
  }

  function handleFormatarMoeda(e, setState) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    const formattedValue = (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).replace("R$", "").trim();
    setState(formattedValue);
  }
  
  async function deletarProduto(id: number) {
    const res = await deleteProduct(id);
    setResponse(res.message);

    if (res.error === false) {
      window.location.reload(true);
    } else {
      setMessage(res.message);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3500);
    }
  }

  async function atualizarProduto(id: number, sku: string, nome: string, valor: number, descricao: string) {
    const res = await updateProduct(id, sku, nome, valor, descricao);
    setResponse(res.message);

    if (res.error === false) {
      window.location.reload(true);
    } else {
      setMessage(res.message);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3500);
    }
  }

  function formatPriceToNumber(formattedPrice) {
    const cleanedValue = formattedPrice.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(cleanedValue);
  }

  return (
    <>
      {isError && <ErrorComponent message={message} />}

      <ModalBackground onClick={onClose} />
      <ModalOverlay>
        <ModalImage src={imagePath} alt="img-product" />
        <ModalInfo isreadonly={isReadOnly ? "true" : undefined}>
          <input
            style={{
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "24px",
              color: "#000000",
              letterSpacing: "0.02rem",
              textTransform: "capitalize",
            }}
            ref={(el) => (inputRef.current.productName = el)}
            value={values.productName}
            onChange={(e) => handleChange(e, "productName")}
            readOnly={isReadOnly}
          />
          <input
            style={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "18px",
              color: "#000000",
              letterSpacing: "0.02rem",
              textTransform: "capitalize",
            }}
            ref={(el) => (inputRef.current.price = el)}
            value={`R$ ${values.price}`}
            onChange={(e) => {
              handleChange(e, "price");
              handleFormatarMoeda(e, (formattedValue) => {
                setValues((prevValues) => ({
                  ...prevValues,
                  price: formattedValue,
                }));
              });
            }}
            readOnly={isReadOnly}
          />
          <input
            style={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "18px",
              color: "#000000",
              letterSpacing: "0.02rem",
              textTransform: "capitalize",
            }}
            ref={(el) => (inputRef.current.sku = el)}
            value={values.sku}
            onChange={(e) => handleChange(e, "sku")}
            readOnly={isReadOnly}
          />
          <textarea
            style={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "18px",
              color: "#000000",
              letterSpacing: "0.02rem",
              textTransform: "capitalize",
            }}
            ref={(el) => (inputRef.current.description = el)}
            value={values.description}
            onChange={(e) => handleChange(e, "description")}
            readOnly={isReadOnly}
          ></textarea>
        </ModalInfo>
        <BackButton onClick={onClose}>Voltar</BackButton>
        {isVisible && <UpdateButton
          onClick={() => {
            const priceNumber = formatPriceToNumber(values.price); // Convertendo preço de volta para número
            atualizarProduto(
              product.id,
              values.sku,
              values.productName,
              priceNumber,
              values.description
            );
          }}
        >
          Atualizar Produto
        </UpdateButton>}
        {isVisible && <DeleteButton onClick={() => deletarProduto(product.id)}>
          Excluir
        </DeleteButton>}
      </ModalOverlay>
    </>
  );
}