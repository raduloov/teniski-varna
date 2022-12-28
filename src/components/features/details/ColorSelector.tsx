import React from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import {
  availableTShirtColors,
  TShirtColor
} from '../../../containers/adminPanel/utils';

interface ButtonWrapperProps {
  color: TShirtColor;
  selected: boolean;
}

interface ColorButtonProps {
  color: TShirtColor;
  selected: boolean;
  onSelectColor: (color: TShirtColor) => void;
}

interface ColorSelectorProps {
  selectedColor: TShirtColor | null;
  onSelectColor: (size: TShirtColor) => void;
}

const ColorButton = ({ color, selected, onSelectColor }: ColorButtonProps) => {
  return (
    <ButtonWrapper
      color={color}
      selected={selected}
      onClick={() => onSelectColor(color)}
    />
  );
};

export const ColorSelector = ({
  selectedColor,
  onSelectColor
}: ColorSelectorProps) => {
  return (
    <SelectorWrapper>
      {availableTShirtColors.map((color) => (
        <ColorButton
          color={color}
          selected={selectedColor === color}
          onSelectColor={(color) => onSelectColor(color)}
          key={color}
        />
      ))}
    </SelectorWrapper>
  );
};

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background: ${(props) => props.color};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: ${(props) => (props.selected ? `3px solid ${Color.ACCENT}` : '')};
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.35);
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
  &:hover {
    opacity: 1;
  }
`;

const SelectorWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
