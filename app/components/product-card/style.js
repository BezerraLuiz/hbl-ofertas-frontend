import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 60%;
  background: ${colors["white-300"]};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin: 2.5%;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }

  @media (max-width: 320px) {
    width: 130px;

    &:hover {
      box-shadow: none;
      transform: none;
    }
  }

  @media (min-width: 321px) and (max-width: 600px) {
    width: 155px;

    &:hover {
      box-shadow: none;
      transform: none;
    }
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
  height: auto;
`;

export const CardText = styled.p`
  width: 100%;
  color: ${colors["text-200"]};
  font-weight: bold;
  font-size: 16px;
  text-transform: capitalize;
`;