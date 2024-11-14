"use client";

import { useState, useEffect, useRef } from "react";
import {
  ModalOverlay,
  ModalImage,
  ModalInfo,
  BackButton,
  ModalBackground,
  DeleteButton,
} from "./style";
import { usePathname } from "next/navigation";

export default function ProductModal({ product, onClose }) {
  const { nome, valor, sku, descricao, imagePath } = product;
  const [isReadOnly, setIsReadOnly] = useState(false);
  const isreadonly: boolean = false;
  const pathname = usePathname();
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

  useEffect(() => {
    if (pathname == "/") {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
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

  return (
    <>
      <ModalBackground onClick={onClose} />
      <ModalOverlay>
        <ModalImage src={imagePath} alt="img-product" />
        <ModalInfo isreadonly={isReadOnly}>
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
            onChange={(e) => handleChange(e, "price")}
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
        <DeleteButton onClick={onClose}>Excluir</DeleteButton>
      </ModalOverlay>
    </>
  );
}
