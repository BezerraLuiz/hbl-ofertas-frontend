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

  @media (max-width: 600px) {
    padding: 0 5px 0 5px;
    gap: 7px;
  }

  @media (min-width: 600px) and (max-width: 768px) {
    
  }
`;

export const ContainerLogo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 7px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0px;
  }

  @media (min-width: 600px) and (max-width: 768px) {
    gap: 0px;
  }
`;

export const Logo = styled.h1`
  font-size: 80px;
  letter-spacing: -5px;
  color: ${colors["white-100"]};
  margin-right: 10px;

  @media (max-width: 600px) {
    font-size: 30px;
    letter-spacing: -2.5px;
  }

  @media (min-width: 600px) and (max-width: 768px) {
    font-size: 40px;
    letter-spacing: -2.5px;
  }
`;

export const TextLogo = styled.h2`
  color: ${colors["white-100"]};

  @media (max-width: 600px) {
    font-size: 20px;
  }

  @media (min-width: 600px) and (max-width: 768px) {
   font-size: 26px; 
  }
`;

export const ContainerSearchBar = styled.span`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 500px;
  height: 40px;
  padding: 10px;

  background: ${colors["white-100"]};
  border: 1.5px solid #8A9D87;
  border-radius: 10px;

  &:focus-within {
    border: 1.5px solid black;
  }

  @media (max-width: 600px) {
    gap: 10px;
  }

  @media (min-width: 600px) and (max-width: 768px) {
    width: 350px;
    margin: 0px 10px 0px 10px;
  }
`;

export const SearchImage = styled.img`
  width: 25px;
  height: auto;

  @media (max-width: 600px) {
    width: 15px;
  }
`;

export const SearchInput = styled.input`
  width: 250%;
  border: none;
  outline: none;

  @media (max-width: 600px) {
    width: 100%;

    &::-webkit-input-placeholder {
      font-size: 11px;
    }
  }

  @media (min-width: 600px) and (max-width: 768px) {
    width: 135%; 
  }
`;

export const ContainerButtonShop = styled.a`
  display: flex;
  align-items: end;
  justify-content: space-around;
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

  @media (max-width: 600px) {
    display: none;
  }
`;

export const ShopText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${colors["black-200"]};

  @media (min-width: 600px) and (max-width: 768px) {
   font-size: 13px;
  }
`;

export const ShopImage = styled.img`
  width: 20px;
  height: 20px;
`;

export const DesenvolvidoPor = styled.div`
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.02rem;
  text-transform: capitalize;

  color: #F5F5F5;
`;