import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { IconButton } from './IconButton';
import { Color } from '../assets/constants';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: IconType;
}

export const Input = ({
  onChange,
  placeholder = 'Looking for fashion',
  icon
}: Props) => {
  return (
    <InputContainer>
      {icon && <IconButton icon={icon} />}
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
