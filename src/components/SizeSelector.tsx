import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';

export enum SizeLabel {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
}

interface ButtonWrapperProps {
  selected: boolean;
}

interface SizeButtonProps {
  label: SizeLabel;
  selected: boolean;
  onSelectSize: (size: SizeLabel) => void;
}

interface SizeSelectorProps {
  selectedSize: SizeLabel | null;
  onSelectSize: (size: SizeLabel) => void;
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
        label={SizeLabel.S}
        selected={selectedSize === SizeLabel.S}
        onSelectSize={(size) => onSelectSize(size)}
      />
      <SizeButton
        label={SizeLabel.M}
        selected={selectedSize === SizeLabel.M}
        onSelectSize={(size) => onSelectSize(size)}
      />
      <SizeButton
        label={SizeLabel.L}
        selected={selectedSize === SizeLabel.L}
        onSelectSize={(size) => onSelectSize(size)}
      />
      <SizeButton
        label={SizeLabel.XL}
        selected={selectedSize === SizeLabel.XL}
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
