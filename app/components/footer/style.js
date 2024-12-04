import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const ContainerMain = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  margin-top: 15px;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    margin-bottom: 8px;
  }
`;

export const TextFooter = styled.div`
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 3%;
  color: ${colors["black-200"]};

  @media (max-width: 600px) {
    font-size: 16px;
    text-align: center;
  }

  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 0px;
    border: 2.5px solid ${colors["black-400"]};
    margin-bottom: 1.5%;

    @media (max-width: 600px) {
      width: 80%;
    }
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
