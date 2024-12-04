"use client";

import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { usePathname } from "next/navigation";
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
  const [readOnly, setReadOnly] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (pathname === "/") {
        setReadOnly(true);
      } else {
        setReadOnly(false);
      }
    }
  }, [pathname, isClient]);

  if (!isOpen) return null;

  return (
    <>
      <ModalBackground /><ModalOverlay>
        <ModalImage src={`https://images.weserv.nl/?url=drive.google.com/uc?id=${productDetails.imageId}`} alt="img-product" />
        <ModalInfo>
          <StyledInputPrimary defaultValue={productDetails.sku} readOnly={readOnly} />
          <StyledInputSecondary defaultValue={productDetails.name} readOnly={readOnly} />
          <StyledInputSecondary defaultValue={productDetails.price} readOnly={readOnly} />
          <StyledTextarea defaultValue={productDetails.description} readOnly={readOnly} />
        </ModalInfo>

        <>
          <BackButton onClick={isClose}>Voltar</BackButton>
          <UpdateButton>
            Atualizar
          </UpdateButton>
          <DeleteButton>
            Deletar
          </DeleteButton>
        </>
      </ModalOverlay>
    </>
  );
}

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isClose: PropTypes.func.isRequired,
  productDetails: PropTypes.shape({
    sku: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageId: PropTypes.string.isRequired,
  }).isRequired,
};