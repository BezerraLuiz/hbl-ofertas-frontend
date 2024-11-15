import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const ContainerMain = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    position: relative;
    bottom: 0;
    transform: translateX(0);
    width: 100%;
    padding: 10px;
    margin-bottom: 8px;
  }
`;

export const Divisor = styled.div`
  width: 486px;
  height: 0px;
  border: 2.5px solid #000000;

  @media (max-width: 600px) {
    width: 80%;
  }
`;

export const TextFooter = styled.div`
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 3%;
  color: ${colors["text-200"]};

  @media (max-width: 600px) {
    font-size: 16px;
    text-align: center;
  }
`;

export const ContainerSocial = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-top: 20px;

  @media (max-width: 600px) {
    gap: 15px;
  }
`;

export const ImageSocial = styled.img`
  width: 32px;
  height: 32px;

  @media (max-width: 600px) {
    width: 28px;
    height: 28px;
  }
`;
