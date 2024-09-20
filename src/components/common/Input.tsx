import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { Color } from '../../assets/constants';

interface Props {
  value: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: IconType;
  onIconClick?: () => void;
  onEnterKey?: () => void;
  type?: string;
  min?: number;
  max?: number;
}

export const Input = ({
  value,
  onChange,
  placeholder = 'Готина тениска...',
  icon,
  onEnterKey,
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
      <IconWrapper>{iconElement && iconElement}</IconWrapper>
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
        enterKeyHint="go"
        type={type}
        min={min}
        max={max}
      />
    </InputContainer>
  );
};

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
