import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const ContainerMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  gap: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 90px;
`;

export const Divisor = styled.div`
  width: 486px;
  height: 0px;

  border: 2.5px solid #000000;
`;

export const TextFooter = styled.div`
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 3%;
  color: ${colors["text-200"]};
`;

export const ContainerSocial = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 29px;
  margin-top: 25px;
`;

export const ImageSocial = styled.img``;