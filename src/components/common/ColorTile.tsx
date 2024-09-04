import React from 'react';
import styled from 'styled-components';
import {
  mapTShirtColorToHex,
  TShirtColor
} from '../../containers/adminPanel/utils';
import { Color } from '../../assets/constants';

interface Props {
  color: string;
}

export const ColorTile = ({ color }: Props) => {
  const hexColor = mapTShirtColorToHex(color as TShirtColor);
  const textColor =
    color === TShirtColor.BLACK ||
    color === TShirtColor.BLUE ||
    color === TShirtColor.DARK_BLUE
      ? Color.WHITE
      : Color.BLACK;

  return (
    <Tile color={hexColor} textColor={textColor}>
      {color.replace('_', ' ').toUpperCase()}
    </Tile>
  );
};

const Tile = styled.div<{ color: string; textColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  text-align: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 12px;
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};
`;
