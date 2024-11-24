import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999; 
`;

export const ErrorBox = styled.div`
  background-color: ${colors["white-100"]};
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const ErrorTitle = styled.h2`
  color: ${colors["red-300"]};
  font-size: 24px;
  margin-bottom: 10px;
  text-transform: capitalize;
`;

export const ErrorMessage = styled.p`
  color: ${colors["black-300"]};
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 600;
`;
