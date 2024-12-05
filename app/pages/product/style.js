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

  background: ${colors["white-300"]};
  box-shadow: 10px 13px 8.3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  @media (max-width: 320px) {
    padding-left: 30px;
    width: 280px;
  }

  @media (min-width: 321px) and (max-width: 600px) {
    padding-left: 30px;
    width: 340px;
  }
`;

export const Label = styled.label`
  width: 220px;
  height: 15px;

  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;

  color: ${colors["black-200"]};
`;

export const Input = styled.input`
  width: 330px;
  height: 35px;
  border: 1.5px solid ${colors["green-200"]};
  border-radius: 10px;
  padding: 10px;

  transition: all 0.3s ease;

  &::-webkit-input-placeholder {
    color: ${colors["gray-100"]};
  }

  &:focus {
    border-color: ${colors["green-300"]};
    background-color: ${colors["white-400"]};
  }

  @media (max-width: 320px) {
    width: 230px;
  }

  @media (min-width: 321px) and (max-width: 600px) {
    width: 290px;
  }
`;

export const Button = styled.button`
  width: 330px;
  height: 40px;
  margin-top: 50px;
  
  background-color: ${colors["green-200"]};
  color: ${colors["white-100"]};
  border: none;
  border-radius: 10px;

  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02rem;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: ${colors["green-300"]};
  }

  @media (max-width: 320px) {
    width: 230px;
  }

  @media (min-width: 321px) and (max-width: 600px) {
    width: 290px;
  }
`;

export const ButtonCancel = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 330px;
  height: 35px;
  margin-top: 25px;
  
  background-color: ${colors["red-100"]};
  color: ${colors["white-100"]};
  border: none;
  border-radius: 10px;

  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02rem;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: ${colors["red-200"]};
  }

  @media (max-width: 320px) {
    width: 230px;
  }

  @media (min-width: 321px) and (max-width: 600px) {
    width: 290px;
  }
`;

export const FileInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

export const FileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 35px;
  border: 1.5px solid ${colors["green-200"]};
  border-radius: 10px;
  padding: 0 15px;
  background-color: ${colors["white-100"]};
  color: ${colors["black-300"]};
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors["green-300"]};
    background-color: ${colors["white-500"]};
  }

  &:focus-within {
    border-color: ${colors["green-300"]};
    background-color: ${colors["white-400"]};
  }

  @media (max-width: 320px) {
    width: 230px;
  }

  @media (min-width: 321px) and (max-width: 600px) {
    width: 290px;
  }
`;