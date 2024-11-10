import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const ContainerMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

export const ContainerInfoProduct = styled.div`
  padding-left: 65px;
  
  width: 450px;
  height: 600px;

  background: #f5f5f5;
  box-shadow: 10px 13px 8.3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const Label = styled.label`
  width: 220px;
  height: 15px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;

  color: #4d4d4d;
`;

export const Input = styled.input`
  width: 330px;
  height: 35px;
  border: 1.5px solid ${colors["green-200"]};
  border-radius: 10px;
  padding: 10px;

  transition: all 0.3s ease;

  &::-webkit-input-placeholder {
    color: #cecece;
  }

  &:focus {
    border-color: #798c76;
    background-color: #E7E6E6;
  }
`;

export const Button = styled.button`
  width: 330px;
  height: 40px;
  margin-top: 50px;
  
  background-color: ${colors["green-200"]};
  color: ${colors.white};
  border: none;
  border-radius: 10px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02rem;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #798C76;
  }
`;

export const ButtonCancel = styled.button`
  width: 330px;
  height: 35px;
  margin-top: 25px;
  
  background-color: #D88A8A;
  color: ${colors.white};
  border: none;
  border-radius: 10px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02rem;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #D47272;
  }
`;
