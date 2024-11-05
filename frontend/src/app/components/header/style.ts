import styled from "styled-components";
import { colors } from "@/app/styles/colors";

export const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100px;
  padding: 0 20px 0 20px;
 
  border-radius: 0 0 20px 20px;
  background-color: ${colors["green-200"]};
`;

export const Logo = styled.h1`
  font-size: 80px;
  letter-spacing: -5px;
  color: ${colors.white};
`;

export const ContainerButtonShop = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 210px;
  height: 40px;
  padding: 10px;

  border-radius: 10px;
  background-color: ${colors["green-100"]};
`;

export const ShopText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${colors["text-200"]};
`;

export const ShopImage = styled.img`
  width: 20px;
  height: 20px;
`;