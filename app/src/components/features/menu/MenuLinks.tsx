import React, { useState } from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { Link } from 'react-router-dom';
import { icons } from '../../../assets/icons';
import { useAppSelector } from '../../../hooks/useRedux';
import { Cart } from '../cart/Cart';

const pages = [
  {
    name: 'Начало',
    icon: icons.FaHome,
    path: '/'
  },
  {
    name: 'Любими',
    icon: icons.FaHeart,
    path: '/favorites'
  },
  {
    name: 'За нас',
    icon: icons.FaInfoCircle,
    path: '/about'
  },
  {
    name: 'Контакти',
    icon: icons.FaPhone,
    path: '/contact'
  },
  {
    name: 'FAQ',
    icon: icons.FaQuestionCircle,
    path: '/faq'
  },
  {
    name: 'Кошница',
    icon: icons.FaShoppingBag,
    path: null
  }
];

interface MenuLinkProps {
  currentPage: string;
  onClick?: () => void;
}

export const MenuLinks = ({ currentPage, onClick }: MenuLinkProps) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const cartItems = useAppSelector((state) => state.cart);

  const cartItemsQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCloseCart = () => {
    setShowCart(false);
    onClick && onClick();
  };

  return (
    <NavigationContainer>
      <Cart
        cartItems={cartItems}
        showCart={showCart}
        onCloseCart={handleCloseCart}
      />
      {pages.map((page) =>
        page.path === null ? (
          <CartButton key={page.name} onClick={() => setShowCart(true)}>
            <CartItemTick>{cartItemsQuantity}</CartItemTick>
            <page.icon color={Color.DARK_GRAY} size={25} />
            {page.name}
          </CartButton>
        ) : (
          <StyledLink
            $currentPage={currentPage === page.path}
            to={page.path}
            onClick={onClick}
            key={page.path}
          >
            <page.icon
              color={currentPage === page.path ? Color.WHITE : Color.DARK_GRAY}
              size={25}
              style={{ transition: 'none' }}
            />
            {page.name}
          </StyledLink>
        )
      )}
    </NavigationContainer>
  );
};

const CartItemTick = styled.div`
  background-color: ${Color.ACCENT};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  color: white;
  top: -5px;
  left: -5px;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

const CartButton = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: ${Color.DARK_GRAY};
  cursor: pointer;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: ${Color.ACCENT};
    transform: scale(1.05);
  }
`;

// currentPage prefixed with $ to avoid conflict with the prop name
const StyledLink = styled(Link)<{ $currentPage: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: ${Color.DARK_GRAY};
  cursor: pointer;
  text-decoration: none;
  border-radius: 10px;

  &:hover {
    background-color: ${Color.LIGHT_GRAY};
  }

  ${({ $currentPage }) =>
    $currentPage &&
    `
      background-color: ${Color.GRAY};
      color: ${Color.WHITE};
      cursor: default;
      &:hover {
        background-color: ${Color.GRAY};
      }
    `}
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 5rem 1rem 0 1rem;

  @media (min-width: 768px) {
    padding: 10rem 2rem 0 2rem;
  }
`;
