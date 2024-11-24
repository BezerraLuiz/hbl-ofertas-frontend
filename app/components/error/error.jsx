'use-client'

import React from "react";
import { ErrorBox, ErrorContainer, ErrorMessage, ErrorTitle } from "./style";

export default function ErrorComponent() {
  return (
    <ErrorContainer>
      <ErrorBox>
        <ErrorTitle>Ocorreu um Erro</ErrorTitle>
        <ErrorMessage>Mensagem de Erro</ErrorMessage>
      </ErrorBox>
    </ErrorContainer>
  );
};