import React, { useRef } from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';

interface FileButtonProps {
  fileSelected: boolean;
}
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
      <FileInput type="file" ref={fileInputRef} onChange={onImagePicked} />
      <FileButton fileSelected={!!fileName} onClick={handleButtonClick}>
        {fileName ?? 'Choose File'}
      </FileButton>
    </FileInputContainer>
  );
};

const FileInputContainer = styled.label`
  display: flex;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const FileButton = styled.button<FileButtonProps>`
  border: none;
  padding: 8px 16px;
  background-color: ${(props) =>
    props.fileSelected ? Color.ACCENT : Color.LIGHT_GRAY};
  border-radius: 2rem;
  color: ${(props) => (props.fileSelected ? Color.BLACK : Color.GRAY)};
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;
