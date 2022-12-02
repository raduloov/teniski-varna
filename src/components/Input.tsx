import React from 'react';
import { icons } from '../assets/icons';
import styled from 'styled-components';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input = ({
  onChange,
  placeholder = 'Looking for fashion'
}: Props) => {
  return (
    <InputContainer>
      <SearchContainer>
        <icons.FaSearch />
      </SearchContainer>
      <input placeholder={placeholder} onChange={onChange} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  padding: 0.75rem;
  background-color: #f7f7f7;
  border-radius: 2rem;
  margin: auto;
  position: relative;
  color: #9b9b9b;
  input {
    width: 100%;
    outline: none;
    background-color: transparent;
  }
`;

const SearchContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: #ffffff;
  margin-right: 0.75rem;
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.1));
  svg {
    color: #9b9b9b;
  }
`;
