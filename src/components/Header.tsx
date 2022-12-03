import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { icons } from '../assets/icons';
import { Color } from '../assets/constants';
import { Cart } from './Cart';

interface Props {
  cartItemsCount?: number;
}

export const Header = ({ cartItemsCount = 3 }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <HeaderContainer>
      <Cart setShowModal={setShowModal} showModal={showModal} />
      <LogoContainer>
        <Logo />
        <CartContainer onClick={() => setShowModal(true)}>
          <icons.MdOutlineShoppingBag />
          <CartItemTick>{cartItemsCount}</CartItemTick>
        </CartContainer>
      </LogoContainer>
      <Input icon={icons.FaSearch} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    cursor: pointer;
    width: 4.5rem;
    height: 4.5rem;
  }
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 50%;
  background-color: ${Color.WHITE};
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));
  svg {
    cursor: pointer;
    color: ${Color.GRAY};
    width: 2rem;
    height: 2rem;
  }
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
