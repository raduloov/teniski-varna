import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Color } from '../../assets/constants';
import { ActivityIndicator } from './ActivityIndicator';

interface Props {
  label: string;
  onClick?: () => void;
  backgroundColor?: Color;
  type?: ButtonType;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
}

interface ButtonContainerProps {
  backgroundColor?: Color;
  type?: ButtonType;
  size?: FlattenSimpleInterpolation;
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
  loading,
  onClick,
  disabled
}: Props) =>
  ButtonContainer({
    label,
    backgroundColor,
    type,
    size,
    loading,
    onClick,
    disabled
  });

const ButtonContainer = ({
  label,
  backgroundColor = Color.ACCENT,
  type = ButtonType.PRIMARY,
  size = ButtonSize.MEDIUM,
  loading,
  onClick,
  disabled
}: Props) => {
  const buttonSize = getButtonSize(size);

  switch (type) {
    case ButtonType.PRIMARY:
      return (
        <ButtonPrimary
          backgroundColor={backgroundColor}
          size={buttonSize}
          onClick={onClick}
          disabled={disabled}
        >
          {loading ? (
            <ActivityIndicator
              size={getActivityIndicatorSize(size)}
              color={Color.WHITE}
            />
          ) : (
            label
          )}
        </ButtonPrimary>
      );
    case ButtonType.SECONDARY:
      return (
        <ButtonSecondary
          backgroundColor={backgroundColor}
          size={buttonSize}
          onClick={onClick}
          disabled={disabled}
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
          disabled={disabled}
        >
          {label}
        </ButtonUnselected>
      );
  }
};

const getActivityIndicatorSize = (size: ButtonSize): number => {
  switch (size) {
    case ButtonSize.SMALL:
      return 10;
    case ButtonSize.MEDIUM:
      return 20;
    case ButtonSize.LARGE:
      return 30;
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case ButtonSize.SMALL:
      return css`
        min-height: 30px;
        min-width: 80px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 12px;
        padding-right: 12px;
        border-radius: 12px;
        font-size: 12px;
      `;
    case ButtonSize.MEDIUM:
      return css`
        min-height: 55px;
        min-width: 120px;
        padding-top: 16px;
        padding-bottom: 16px;
        padding-left: 32px;
        padding-right: 32px;
        border-radius: 16px;
        font-size: 16px;
      `;
    case ButtonSize.LARGE:
      return css`
        min-height: 65px;
        min-width: 200px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 20px;
        font-size: 20px;
      `;
  }
};

const ButtonUnselected = styled.button<ButtonContainerProps>`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  min-width: max-content;
  background: ${Color.LIGHT_GRAY};
  color: ${Color.MEDIUM_GRAY};
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  white-space: nowrap;
  font-weight: 500;
  ${(props) =>
    !props.disabled &&
    `
    &:active {
      filter: brightness(0.9);
    }
    &:hover {
      filter: brightness(0.9);
    }
  `}
  ${(props) => props.disabled && `opacity: 0.7;`}
  ${(props) => props.size}
`;

const ButtonSecondary = styled.button<ButtonContainerProps>`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  min-width: max-content;
  background: transparent;
  border: 2px solid ${(props) => props.backgroundColor};
  color: ${Color.WHITE};
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  white-space: nowrap;
  padding-right: 20px;
  font-weight: 500;
  ${(props) =>
    !props.disabled &&
    `
    &:active {
      filter: brightness(0.9);
    }
    &:hover {
      filter: brightness(0.9);
    }
  `}
  ${(props) => props.disabled && `opacity: 0.7;`}
  ${(props) => props.size}
`;

const ButtonPrimary = styled.button<ButtonContainerProps>`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  min-width: max-content;
  white-space: nowrap;
  background: ${(props) => props.backgroundColor};
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 500;
  ${(props) =>
    !props.disabled &&
    `
    &:active {
      filter: brightness(0.9);
    }
    &:hover {
      filter: brightness(0.9);
    }
  `}
  ${(props) => props.disabled && `opacity: 0.7;`}
  ${(props) => props.size}
`;
