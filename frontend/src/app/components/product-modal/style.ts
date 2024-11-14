import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  width: 881px;
  height: 495px;

  background: #f5f5f5;
  box-shadow: 8px 9px 21.7px rgba(0, 0, 0, 0.61);
  border-radius: 10px;
  z-index: 999;
`;

export const ModalImage = styled.img`
  width: 50%;
  height: 100%;
  border-radius: 10px 0 0 10px;
`;

export const ModalInfo = styled.div`
  margin: 2.5%;

  & input {
    width: 100%;
    min-height: 35px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1.5px solid ${colors["text-200"]};
    border-radius: 10px;
    transition: all 0.3s ease;
    resize: none;
    overflow: hidden;
    background-color: #f5f5f5;

    &::-webkit-input-placeholder {
      color: #cecece;
    }

    &:focus {
      border-color: #798c76;
      background-color: #cecece;
    }

    ${(props) =>
      props.isreadonly &&
      `
        cursor: not-allowed;
        pointer-events: none;
        border: none;
    `}
  }

  & textarea {
    width: 100%;
    min-height: 35px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1.5px solid ${colors["text-200"]};
    border-radius: 10px;
    transition: all 0.3s ease;
    resize: none;
    overflow: hidden;
    background-color: #f5f5f5;

    &::-webkit-input-placeholder {
      color: #cecece;
    }

    &:focus {
      border-color: #798c76;
      background-color: #cecece;
    }

    ${(props) =>
      props.isreadonly &&
      `
        cursor: not-allowed;
        pointer-events: none;
        border: none;
    `}
  }
`;

export const BackButton = styled.button`
  position: absolute;
  width: 150px;
  height: 40px;
  left: 720px;
  top: 440px;

  background: #8a9d87;
  border: none;
  border-radius: 5px;

  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.02rem;

  color: #f5f5f5;

  cursor: pointer;

  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: #768874;
  }
`;
