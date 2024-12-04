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
  const pathname = usePathname();
  const [readOnly, setReadOnly] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [priceProduct, setPriceProduct] = useState("");

  useEffect(() => {
    setIsClient(true);
    
    if (productDetails?.price) {
      // eslint-disable-next-line no-undef
      const valueMonetary = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(productDetails.price);
  
      setPriceProduct(valueMonetary);
    };
  }, [productDetails]);

  useEffect(() => {
    if (isClient) {
      if (pathname == "/") {
        setReadOnly(true);
        setButtonVisible(false);
      } else {
        setReadOnly(false);
        setButtonVisible(true);
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
          <StyledInputSecondary defaultValue={priceProduct} readOnly={readOnly} />
          <StyledTextarea defaultValue={productDetails.description} readOnly={readOnly} />
        </ModalInfo>

        <>
          <BackButton onClick={isClose}>Voltar</BackButton>
          {buttonVisible && <UpdateButton>
            Atualizar
          </UpdateButton>}
          {buttonVisible && <DeleteButton>
            Deletar
          </DeleteButton>}
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