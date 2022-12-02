import React from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { icons } from '../assets/icons';
import { Color } from '../assets/constants';
export const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo />
        <CartContainer>
          <icons.MdOutlineShoppingBag />
          <CartItemTick>3</CartItemTick>
        </CartContainer>
      </LogoContainer>
      <Input />
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
  filter: drop-shadow(0px 0px 4px rgba(57, 57, 57, 0.05));
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
