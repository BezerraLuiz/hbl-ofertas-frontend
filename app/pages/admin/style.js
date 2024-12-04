import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const ContainerMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  margin-top: 43px;
`;

export const Button = styled.button`
  width: 400px;
  height: 40px;

  background: ${colors["green-200"]};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: ${colors["white-300"]};

  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: ${colors["white-300"]};
    color: ${colors["green-200"]};
    transform: scale(1.1);
  }
`;

export const Divisor = styled.div`
  width: 600px;
  height: 0px;

  border: 2.5px solid ${colors["black-400"]};
`;

export const TextWpp = styled.p`
  position: absolute;
  bottom: 32.5px;
  right: 100px;

  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;

  color: ${colors["black-200"]};

  text-transform: capitalize;
`;