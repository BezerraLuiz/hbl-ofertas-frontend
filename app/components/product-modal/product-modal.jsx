"use client";

import { React } from "react";
import PropTypes from "prop-types";
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

export default function ProductModal({ isOpen, isClose }) {
  if (!isOpen) return null

  return (
    <>
      <ModalBackground /><ModalOverlay>
        <ModalImage src='' alt="img-product" />
        <ModalInfo>
          <StyledInputPrimary />
          <StyledInputSecondary />
          <StyledInputSecondary />
          <StyledTextarea />
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
  isClose: PropTypes.bool.isRequired
}