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

export const ContainerSearchBar = styled.span`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 500px;
  height: 40px;
  padding: 10px;

  background: ${colors.white};
  border: 1.5px solid #8A9D87;
  border-radius: 10px;

  &:focus-within {
    border: 1.5px solid black;
  }
`;

export const SearchImage = styled.img`
  width: 25px;
  height: auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
`;

export const ContainerButtonShop = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 210px;
  height: 40px;
  padding: 10px;

  text-decoration: none;
  border-radius: 10px;
  background-color: ${colors["green-100"]};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #B6CFB4;
  }
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