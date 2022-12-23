import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { IconButton } from './IconButton';
import { Color } from '../assets/constants';

interface Props {
  value: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: IconType;
  type?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder = 'Looking for fashion',
  icon,
  type
}: Props) => {
  return (
    <InputContainer>
      {icon && <IconButton icon={icon} />}
      <input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
    </InputContainer>
  );
};

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
    ::placeholder {
      color: ${Color.MEDIUM_GRAY};
    }
  }
`;
