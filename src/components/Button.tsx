import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';

interface Props {
  label: string;
  onClick?: () => void;
  backgroundColor?: Color;
  type?: ButtonType;
}

interface ButtonContainerProps {
  backgroundColor?: Color;
  type?: ButtonType;
}

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  UNSELECTED = 'UNSELECTED'
}

export const Button = ({
  label,
  backgroundColor = Color.ACCENT,
  type = ButtonType.PRIMARY,
  onClick
}: Props) => ButtonContainer({ label, backgroundColor, type, onClick });

const ButtonContainer = ({
  label,
  backgroundColor = Color.ACCENT,
  type = ButtonType.PRIMARY,
  onClick
}: Props) => {
  switch (type) {
    case ButtonType.PRIMARY:
      return (
        <ButtonPrimary backgroundColor={backgroundColor} onClick={onClick}>
          {label}
        </ButtonPrimary>
      );
    case ButtonType.SECONDARY:
      return (
        <ButtonSecondary backgroundColor={backgroundColor} onClick={onClick}>
          {label}
        </ButtonSecondary>
      );
    case ButtonType.UNSELECTED:
      return (
        <ButtonUnselected backgroundColor={backgroundColor} onClick={onClick}>
          {label}
        </ButtonUnselected>
      );
  }
};

const ButtonUnselected = styled.button<ButtonContainerProps>`
  white-space: nowrap;
  min-width: max-content;
  background: ${Color.LIGHT_GRAY};
  color: ${Color.MEDIUM_GRAY};
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

const ButtonSecondary = styled.button<ButtonContainerProps>`
  /* TODO Yavor: Implement secondary button style  */
`;

const ButtonPrimary = styled.button<ButtonContainerProps>`
  white-space: nowrap;
  min-width: max-content;
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
