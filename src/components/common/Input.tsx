import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { Color } from '../../assets/constants';
import { icons } from '../../assets/icons';

interface Props {
  value: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: IconType;
  clearIcon?: boolean;
  onClear?: () => void;
  onEnterKey?: () => void;
  onBlur?: () => void;
  type?: string;
  min?: number;
  max?: number;
}

export const Input = ({
  value,
  onChange,
  placeholder = 'Готина тениска...',
  icon,
  clearIcon,
  onClear,
  onEnterKey,
  onBlur,
  type,
  min,
  max
}: Props) => {
  const iconElement = icon
    ? React.createElement(icon, {
        size: 20,
        style: { color: Color.MEDIUM_GRAY }
      })
    : null;

  return (
    <InputContainer>
      {iconElement && <IconWrapper>{iconElement}</IconWrapper>}
      <input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnterKey) {
            e.currentTarget.blur(); // close keyboard
            onEnterKey();
          }
        }}
        onBlur={onBlur}
        enterKeyHint="go"
        type={type}
        min={min}
        max={max}
      />
      {clearIcon && (
        <ClearWrapper onClick={onClear}>
          <icons.RiCloseFill size={30} color={Color.MEDIUM_GRAY} />
        </ClearWrapper>
      )}
    </InputContainer>
  );
};

const ClearWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 8px;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 0.3rem;
  background-color: ${Color.LIGHT_GRAY};
  border-radius: 2rem;
  position: relative;
  color: ${Color.GRAY};
  input {
    width: 100%;
    margin-left: 0.75rem;
    outline: none;
    background-color: transparent;
    color: ${Color.DARK_GRAY};
    ::placeholder {
      color: ${Color.MEDIUM_GRAY};
    }
  }
`;
