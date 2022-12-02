import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';

interface Props {
  label: string;
  backgroundColor?: Color;
  onClick?: () => void;
}

interface ButtonContainerProps {
  backgroundColor: Color;
}

export const Button = ({
  label,
  backgroundColor = Color.ACCENT,
  onClick
}: Props) => {
  return (
    <ButtonContainer backgroundColor={backgroundColor} onClick={onClick}>
      {label}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  background: ${(props) => props.backgroundColor};
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 500;
  :active {
    filter: brightness(0.9);
  }
`;
