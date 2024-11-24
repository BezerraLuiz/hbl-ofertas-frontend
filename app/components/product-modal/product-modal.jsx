"use client";

import React from "react";
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

export default function ProductModal() {
  return (
    <>
      <ModalBackground />
      <ModalOverlay>
        <ModalImage src='' alt="img-product" />
        <ModalInfo>
          <StyledInputPrimary/>
          <StyledInputSecondary/>
          <StyledInputSecondary/>
          <StyledTextarea/>
        </ModalInfo>

          <>
            <BackButton>Voltar</BackButton>
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