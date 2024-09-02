import React, { useRef } from 'react';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { icons } from '../../assets/icons';

interface FileButtonProps {
  fileSelected: boolean;
}
interface Props {
  fileName?: string;
  supportedTypes: Array<string>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMakeThumbnail?: (fileName: string) => void;
  thumbnailSelected?: boolean;
}

export const ImageInput = ({
  fileName,
  supportedTypes,
  onChange,
  onMakeThumbnail,
  thumbnailSelected
}: Props) => {
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
    <>
      <FileInputContainer>
        <FileInput type="file" ref={fileInputRef} onChange={onImagePicked} />
        <FileButton fileSelected={!!fileName} onClick={handleButtonClick}>
          {fileName ?? 'Choose File'}
        </FileButton>
      </FileInputContainer>
      {onMakeThumbnail && fileName && (
        <IconButton
          icon={icons.FaCheck}
          containerColor={thumbnailSelected ? Color.GREEN_CHECK : undefined}
          iconColor={thumbnailSelected ? Color.WHITE : undefined}
          onClick={() => onMakeThumbnail(fileName)}
        />
      )}
    </>
  );
};

const FileInputContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
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
