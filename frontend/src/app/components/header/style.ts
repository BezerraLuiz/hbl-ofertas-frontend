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