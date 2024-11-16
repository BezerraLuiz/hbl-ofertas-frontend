import { ErrorBox, ErrorContainer, ErrorMessage, ErrorTitle } from "./style";

export default function ErrorComponent({ message }: { message: string }) {
  return (
    <ErrorContainer>
      <ErrorBox>
        <ErrorTitle>Ocorreu um Erro</ErrorTitle>
        <ErrorMessage>{message}</ErrorMessage>
      </ErrorBox>
    </ErrorContainer>
  );
};