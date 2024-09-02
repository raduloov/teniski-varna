import React from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { TShirtSize } from '../../../domain/models/ProductDTO';

interface ButtonWrapperProps {
  selected: boolean;
}

interface SizeButtonProps {
  label: TShirtSize;
  selected: boolean;
  onSelectSize: (size: TShirtSize) => void;
}

interface SizeSelectorProps {
  availableSizes: Array<TShirtSize>;
  selectedSize: TShirtSize | null;
  onSelectSize: (size: TShirtSize) => void;
}

const SizeButton = ({ label, selected, onSelectSize }: SizeButtonProps) => {
  return (
    <ButtonWrapper selected={selected} onClick={() => onSelectSize(label)}>
      {label}
    </ButtonWrapper>
  );
};

export const SizeSelector = ({
  availableSizes,
  selectedSize,
  onSelectSize
}: SizeSelectorProps) => {
  return (
    <SelectorWrapper>
      {availableSizes.map((size) => (
        <SizeButton
          label={size}
          selected={selectedSize === size}
          onSelectSize={(size) => onSelectSize(size)}
          key={size}
        />
      ))}
    </SelectorWrapper>
  );
};

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background: ${(props) => (props.selected ? Color.ACCENT : Color.LIGHT_GRAY)};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${(props) => (props.selected ? Color.BLACK : Color.GRAY)};
`;

const SelectorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
