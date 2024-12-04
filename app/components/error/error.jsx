'use-client'

import React from "react";
import PropTypes from "prop-types";
import { ErrorBox, ErrorContainer, ErrorMessage, ErrorTitle } from "./style";

export default function ErrorComponent({ message }) {
  return (
    <ErrorContainer>
      <ErrorBox>
        <ErrorTitle>Ocorreu um Erro</ErrorTitle>
        <ErrorMessage>{message}</ErrorMessage>
      </ErrorBox>
    </ErrorContainer>
  );
};

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
}