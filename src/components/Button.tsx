import React from 'react';
import styled, { css } from 'styled-components';
import { Color } from '../assets/constants';

interface Props {
  label: string;
  onClick?: () => void;
  backgroundColor?: Color;
  type?: ButtonType;
  size?: ButtonSize;
}

interface ButtonContainerProps {
  backgroundColor?: Color;
  type?: ButtonType;
  size: any; // TODO Yavor: Set type
}

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  UNSELECTED = 'UNSELECTED'
}

export enum ButtonSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export const Button = ({
  label,
  backgroundColor = Color.ACCENT,
  type = ButtonType.PRIMARY,
  size = ButtonSize.MEDIUM,
  onClick
}: Props) => ButtonContainer({ label, backgroundColor, type, size, onClick });

const ButtonContainer = ({
  label,
  backgroundColor = Color.ACCENT,
  type = ButtonType.PRIMARY,
  size = ButtonSize.MEDIUM,
  onClick
}: Props) => {
  const buttonSize = getButtonSize(size);

  switch (type) {
    case ButtonType.PRIMARY:
      return (
        <ButtonPrimary
          backgroundColor={backgroundColor}
          size={buttonSize}
          onClick={onClick}
        >
          {label}
        </ButtonPrimary>
      );
    case ButtonType.SECONDARY:
      return (
        <ButtonSecondary
          backgroundColor={backgroundColor}
          size={buttonSize}
          onClick={onClick}
        >
          {label}
        </ButtonSecondary>
      );
    case ButtonType.UNSELECTED:
      return (
        <ButtonUnselected
          backgroundColor={backgroundColor}
          size={buttonSize}
          onClick={onClick}
        >
          {label}
        </ButtonUnselected>
      );
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case ButtonSize.SMALL:
      return;
    case ButtonSize.MEDIUM:
      return css`
        padding-top: 16px;
        padding-bottom: 16px;
        padding-left: 32px;
        padding-right: 32px;
        border-radius: 16px;
        font-size: 16px;
      `;
    case ButtonSize.LARGE:
      return css`
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 60px;
        padding-right: 60px;
        border-radius: 20px;
        font-size: 20px;
      `;
  }
};

const ButtonUnselected = styled.button<ButtonContainerProps>`
  cursor: pointer;
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
  ${(props) => props.size}
`;

const ButtonSecondary = styled.button<ButtonContainerProps>`
  /* TODO Yavor: Implement secondary button style  */
`;

const ButtonPrimary = styled.button<ButtonContainerProps>`
  cursor: pointer;
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
  ${(props) => props.size}
`;
