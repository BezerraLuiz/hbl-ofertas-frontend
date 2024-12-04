"use client";

import { React, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { usePathname } from "next/navigation";
import { deleteProduct, updateProduct } from "@/api/Products/ProductsApi";
import { deleteImage } from "@/api/Images/ImagesApi";
import ErrorComponent from "../error/error";
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

export default function ProductModal({ isOpen, isClose, productDetails }) {
  const pathname = usePathname();
  const [readOnly, setReadOnly] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [priceProduct, setPriceProduct] = useState("");
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState("");

  const skuRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, [])

  useEffect(() => {
    if (productDetails?.price) {
      // eslint-disable-next-line no-undef
      const valueMonetary = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(productDetails.price);

      setPriceProduct(valueMonetary);
    }
  }, [productDetails.price]);

  useEffect(() => {
    if (isClient) {
      if (pathname === "/") {
        setReadOnly(true);
        setButtonVisible(false);
      } else {
        setReadOnly(false);
        setButtonVisible(true);
      }
    }
  }, [pathname, isClient]);

  const handlerDeleteProduct = async () => {
    try {
      const resDeleteProduct = await deleteProduct(productDetails.sku);
      if (resDeleteProduct.error) {
        throw new Error(resDeleteProduct.message);
      };
  
      const resDeleteImage = await deleteImage(productDetails.imageId);
      if (resDeleteImage.error) {
        throw new Error(resDeleteImage.message);
      };
  
      setIsError(false);
      setMessageError("");
      window.location.reload(true);
    } catch (error) {
      setIsError(true);
      setMessageError(error.message);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    };
  };
  
  const handlerUpdateProduct = async () => {
    const formattedPrice = parseFloat(priceRef.current.value.replace('R$', '').replace('.', '').replace(',', '.').trim());

    const res = await updateProduct(
      productDetails.id,
      skuRef.current.value,
      nameRef.current.value,
      formattedPrice,
      descriptionRef.current.value
    );

    if (res.error) {
      setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 1500)
      setMessageError(res.message);
    } else {
      setIsError(false);
      setMessageError("");
      window.location.reload(true);
    };
  };

  const handleFormatarMoeda = (e, setState) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setState(value);
  };

  if (!isOpen) return null;

  return (
    <>
      {isError && <ErrorComponent message={messageError} />}

      <ModalBackground />
      <ModalOverlay>
        <ModalImage
          src={`https://images.weserv.nl/?url=drive.google.com/uc?id=${productDetails.imageId}`}
          alt="img-product"
        />
        <ModalInfo>
          <StyledInputPrimary
            defaultValue={productDetails.sku}
            readOnly={readOnly}
            ref={skuRef}
          />
          <StyledInputSecondary
            defaultValue={productDetails.name}
            readOnly={readOnly}
            ref={nameRef}
          />
          <StyledInputSecondary
            defaultValue={priceProduct}
            readOnly={readOnly}
            ref={priceRef}
            onChange={(e) => handleFormatarMoeda(e, setPriceProduct)}
          />
          <StyledTextarea
            defaultValue={productDetails.description}
            readOnly={readOnly}
            ref={descriptionRef}
          />
        </ModalInfo>

        <>
          <BackButton onClick={isClose}>Voltar</BackButton>
          {buttonVisible && (
            <UpdateButton onClick={handlerUpdateProduct}>Atualizar</UpdateButton>
          )}
          {buttonVisible && (
            <DeleteButton onClick={handlerDeleteProduct}>Deletar</DeleteButton>
          )}
        </>
      </ModalOverlay>
    </>
  );
}

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isClose: PropTypes.func.isRequired,
  productDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageId: PropTypes.string.isRequired,
  }).isRequired,
};
