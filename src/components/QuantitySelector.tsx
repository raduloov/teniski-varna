import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';

interface ButtonProps {
  color?: Color;
}

interface Props {
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

export const QuantitySelector = ({
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity
}: Props) => {
  return (
    <Wrapper>
      <Button
        color={quantity <= 1 ? Color.MEDIUM_GRAY : Color.BLACK}
        onClick={onDecreaseQuantity}
      >
        -
      </Button>
      <Quantity>{quantity}</Quantity>
      <Button onClick={onIncreaseQuantity}>+</Button>
    </Wrapper>
  );
};

const Quantity = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 0 20px 0 20px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.color ?? Color.BLACK};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: ${Color.LIGHT_GRAY};
  padding-top: 10px 0 10px 0;
`;
