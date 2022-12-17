import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { TShirtSize } from '../domain/models/ProductDTO';

interface ButtonWrapperProps {
  selected: boolean;
}

interface SizeButtonProps {
  label: TShirtSize;
  selected: boolean;
  onSelectSize: (size: TShirtSize) => void;
}

interface SizeSelectorProps {
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
  selectedSize,
  onSelectSize
}: SizeSelectorProps) => {
  return (
    <SelectorWrapper>
      <SizeButton
        label={TShirtSize.S}
        selected={selectedSize === TShirtSize.S}
        onSelectSize={(size) => onSelectSize(size)}
      />
      <SizeButton
        label={TShirtSize.M}
        selected={selectedSize === TShirtSize.M}
        onSelectSize={(size) => onSelectSize(size)}
      />
      <SizeButton
        label={TShirtSize.L}
        selected={selectedSize === TShirtSize.L}
        onSelectSize={(size) => onSelectSize(size)}
      />
      <SizeButton
        label={TShirtSize.XL}
        selected={selectedSize === TShirtSize.XL}
        onSelectSize={(size) => onSelectSize(size)}
      />
    </SelectorWrapper>
  );
};

const ButtonWrapper = styled.div<ButtonWrapperProps>`
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
  gap: 5px;
`;
