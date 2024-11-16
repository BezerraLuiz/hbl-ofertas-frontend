import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

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

  @media (max-width: 600px) {
    width: 280px;
    height: 500px;
    flex-direction: column;
  }
  
  @media (min-width: 600px) and (max-width: 992px) {
    width: 700px;
    height: 400px;
  }
`;

export const ModalImage = styled.img`
  width: 50%;
  height: 100%;
  border-radius: 10px 0 0 10px;

  @media (max-width: 600px) {
    width: 100%;
    height: 50%;
    border-radius: 10px 10px 0 0;
  }
`;

export const ModalInfo = styled.div<{ isreadonly?: boolean }>`
  margin: 2.5%;

  @media (max-width: 600px) {
    margin: 2%;
  }

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

    @media (max-width: 600px) {
      margin-bottom: 5px;
    }
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

    @media (max-width: 600px) {
      margin-bottom: 0px;
    }
  }
`;

export const StyledInput = styled.input`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  letter-spacing: 0.02rem;
  text-transform: capitalize;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  outline: none;

  &:focus {
    border-color: #000000;
  }
`;

export const BackButton = styled.button`
  position: absolute;
  width: 120px;
  height: 45px;
  left: 750px;
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

  @media (max-width: 600px) {
    width: 70px;
    height: 30px;
    left: 205px;
    top: 465px;

    font-size: 14px;

    &:hover {
      background-color: none;
    }
  }

  @media (min-width: 600px) and (max-width: 992px) {
    width: 100px;
    height: 40px;
    left: 590px;
    top: 350px;

    font-size: 16px;
  }
`;

export const UpdateButton = styled.button`
  position: absolute;
  width: 120px;
  height: 45px;
  left: 621px;
  top: 440px;

  background: #3498db;
  border: none;
  border-radius: 5px;

  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.02rem;

  color: #f5f5f5;

  cursor: pointer;

  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: #428cbe;
  }

  @media (max-width: 600px) {
    width: 70px;
    height: 30px;
    left: 130px;
    top: 465px;

    font-size: 12px;

    &:hover {
      background-color: none;
    }
  }

  @media (min-width: 600px) and (max-width: 992px) {
    width: 100px;
    height: 40px;
    left: 480px;
    top: 350px;

    font-size: 16px;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  width: 120px;
  height: 45px;
  left: 490px;
  top: 440px;

  background: #d88a8a;
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
    background-color: #d47272;
  }

  @media (max-width: 600px) {
    width: 70px;
    height: 30px;
    left: 55px;
    top: 465px;

    font-size: 14px;

    &:hover {
      background-color: none;
    }
  }

  @media (min-width: 600px) and (max-width: 992px) {
    width: 100px;
    height: 40px;
    left: 370px;
    top: 350px;

    font-size: 16px;
  }
`;

export const StyledInputPrimary = styled.input`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  letter-spacing: 0.02rem;
  text-transform: capitalize;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const StyledInputSecondary = styled.input`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  letter-spacing: 0.02rem;
  text-transform: capitalize;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const StyledTextarea = styled.textarea`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  letter-spacing: 0.02rem;
  text-transform: capitalize;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
