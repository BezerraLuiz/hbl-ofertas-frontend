"use client";

import { useRef, useState } from "react";
import { ModalOverlay, ModalImage, ModalInfo, BackButton } from "./style";
import { usePathname } from "next/navigation";

export default function ProductModal() {
  const [values, setValues] = useState({
    productName: "Bastão de Selfie",
    price: "R$ 10,99",
    sku: "SKU 306098",
    description: "Marca Samsung. Base de alumínio com controladora bluetooth",
  });
  const inputRef = useRef({
    productName: null,
    price: null,
    sku: null,
    description: null,
  });
  const pathname = usePathname();

  const handleChange = (e, field) => {
    setValues({ ...values, [field]: e.target.value });
    if (inputRef.current[field]) {
      inputRef.current[field].style.height = "auto";
      inputRef.current[
        field
      ].style.height = `${inputRef.current[field].scrollHeight}px`;
    }
  };

  const isReadOnly = pathname === "/";

  return (
    <>
      <ModalOverlay>
        <ModalImage
          src="/products/bastao_de_selfie_1731182043506.jpg"
          alt="img-product"
        />
        <ModalInfo isreadonly={isReadOnly.toString()}>
          <input
            style={{
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "24px",
              color: "#000000",
              letterSpacing: "0.02rem",
              textTransform: "capitalize"
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
              textTransform: "capitalize"
            }}
            ref={(el) => (inputRef.current.price = el)}
            value={values.price}
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
              textTransform: "capitalize"
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
              textTransform: "capitalize"
            }}
            ref={(el) => (inputRef.current.description = el)}
            value={values.description}
            onChange={(e) => handleChange(e, "description")}
            readOnly={isReadOnly}
          ></textarea>
        </ModalInfo>
        <BackButton>Voltar</BackButton>
      </ModalOverlay>
    </>
  );
}