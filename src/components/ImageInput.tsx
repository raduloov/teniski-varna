import React, { useRef } from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';

interface Props {
  file?: File | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageInput = ({ file, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FileInputContainer>
      <CustomFileInput type="file" ref={fileInputRef} onChange={onChange} />
      <CustomFileButton onClick={handleButtonClick}>
        {file ? file.name : 'Choose File'}
      </CustomFileButton>
    </FileInputContainer>
  );
};

const FileInputContainer = styled.label`
  display: flex;
  align-items: center;
`;

const CustomFileInput = styled.input`
  display: none;
`;

const CustomFileButton = styled.button`
  border: none;
  padding: 8px 16px;
  background-color: ${Color.LIGHT_GRAY};
  border-radius: 2rem;
  color: ${Color.GRAY};
  cursor: pointer;
  &:hover {
    background-color: ${Color.ACCENT};
    color: ${Color.BLACK};
  }
`;
