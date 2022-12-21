import React, { useRef } from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';

interface Props {
  fileName?: string;
  supportedTypes: Array<string>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageInput = ({ fileName, supportedTypes, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onImagePicked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    const typeSupported = file && supportedTypes.includes(file.type);

    if (typeSupported) {
      onChange(event);
    }
  };

  return (
    <FileInputContainer>
      <CustomFileInput
        type="file"
        ref={fileInputRef}
        onChange={onImagePicked}
      />
      <CustomFileButton onClick={handleButtonClick}>
        {fileName ?? 'Choose File'}
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
