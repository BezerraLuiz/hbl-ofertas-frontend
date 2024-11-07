import { colors } from "@/app/styles/colors";
import styled from "styled-components";

export const Body = styled.body`
  background-color: ${colors.white};
`;

export const ContainerMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  width: 400px;
  min-height: 500px;

  background: #d5e8d4;
  box-shadow: 10px 13px 8.3px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex-direction: column;

  opacity: 0;
  transform: translate(-50%, -60%);
  animation: fadeInUp 1s forwards;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;


export const Header = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 150px;

  background: #8a9d87;
  border-radius: 0px 0px 20px 20px;
`;

export const Logo = styled.h1`
  font-size: 80px;
  letter-spacing: -5px;
  color: ${colors.white};
`;


export const HeaderText = styled.p`
  width: 213px;
  height: 48px;

  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #f5f5f5;
`;

export const HeaderDivisor = styled.div`
  width: 213px;
  height: 0px;

  border: 1px solid #f5f5f5;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 10px;

  width: 100%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;

  color: #4d4d4d;
`;

export const Label = styled.label`
  width: 220px;
  height: 15px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;

  color: #4d4d4d;
`;

export const Input = styled.input`
  width: 330px;
  height: 35px;
  border: 1.5px solid ${colors["green-200"]};
  border-radius: 10px;
  padding: 10px;
  
  transition: all 0.3s ease;

  &::-webkit-input-placeholder {
    color: #CECECE;
  }

  &:focus {
    border-color: #798C76;
    background-color: #CECECE;
  }
`;


export const Button = styled.button`
  width: 330px;
  height: 35px;
  margin-top: 53px;
  
  background-color: ${colors["green-200"]};
  color: ${colors.white};
  border: none;
  border-radius: 10px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02rem;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #798C76;
  }
`;
