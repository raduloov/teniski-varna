import React from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';
import { Color } from '../assets/constants';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  iconButton?: IconType;
}

export const Input = ({
  onChange,
  placeholder = 'Looking for fashion',
  iconButton
}: Props) => {
  return (
    <InputContainer>
      {iconButton && <IconButton>{React.createElement(iconButton)}</IconButton>}
      <input placeholder={placeholder} onChange={onChange} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  padding: 0.75rem;
  background-color: ${Color.LIGHT_GRAY};
  border-radius: 2rem;
  position: relative;
  color: ${Color.GRAY};
  input {
    width: 100%;
    outline: none;
    background-color: transparent;
    ::placeholder {
      color: ${Color.MEDIUM_GRAY};
    }
  }
`;

const IconButton = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: ${Color.WHITE};
  margin-right: 0.75rem;
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.1));
  svg {
    cursor: pointer;
    color: ${Color.GRAY};
  }
`;
