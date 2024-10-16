import React from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';

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
        color={quantity > 1 ? Color.BLACK : Color.MEDIUM_GRAY}
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
  padding: 0 20px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.color ?? Color.BLACK};
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  background: ${Color.LIGHT_GRAY};
  padding: 8px 0 8px 0;
`;
