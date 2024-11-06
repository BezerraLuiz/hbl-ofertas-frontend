import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const ContainerMain = styled.div`
  margin: 2.5%;
`;

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  width: 225px;
  height: 300px;
  background: #F5F5F5;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
  height: 198px;
`;

export const CardText = styled.p`
  color: ${colors["text-200"]};
  font-weight: bold;
  font-size: 16px;
  text-transform: capitalize;
`;