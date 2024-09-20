import React from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { icons } from '../../../assets/icons';
import {
  cartButtonSlideInAnimation,
  cartButtonSlideOutAnimation
} from '../../../utils/animations';

interface Props {
  isInBounds?: boolean;
  itemsQuantity: number;
  onOpenCart: () => void;
}

export const CartButton = ({
  onOpenCart,
  itemsQuantity,
  isInBounds = false
}: Props) => {
  return (
    <FixedCartWrapper isInBounds={isInBounds}>
      <CartContainer onClick={onOpenCart}>
        <icons.MdOutlineShoppingBag color={Color.GRAY} size={25} />
        <CartItemTick>{itemsQuantity}</CartItemTick>
      </CartContainer>
    </FixedCartWrapper>
  );
};

const CartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 50%;
  background-color: ${Color.WHITE};
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
`;

const CartItemTick = styled.div`
  background-color: ${Color.ACCENT};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  color: white;
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

const FixedCartWrapper = styled.div<{ isInBounds: boolean }>`
  z-index: 800;
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));
  ${({ isInBounds }) =>
    !isInBounds
      ? `
        position: fixed;
        top: 1.5rem;
        right: 1.5rem;
        ${cartButtonSlideOutAnimation}
      `
      : `
        ${cartButtonSlideInAnimation}
    `}
`;
