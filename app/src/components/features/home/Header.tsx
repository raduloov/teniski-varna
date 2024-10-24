import React, { useState } from 'react';
import styled from 'styled-components';
import { icons } from '../../../assets/icons';
import { Color } from '../../../assets/constants';
import { Cart } from '../cart/Cart';
import { useAppSelector } from '../../../hooks/useRedux';
import { CartButton } from '../cart/CartButton';
import { useElementOnScreen } from '../../../hooks/useElementOnScreen';
import { ReactComponent as Logo } from '../../../assets/images/logo-horizontal.svg';
import { MenuMobile } from '../menu/MenuMobile';
import { Search } from './Search';
import { ScreenSize, useScreenSize } from '../../../hooks/useScreenSize';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';

export const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const cartItems = useAppSelector((state) => state.cart);
  const navigate = useCustomNavigate();
  const { containerRef: fixedCartButtonRef, isVisible: cartIsVisible } =
    useElementOnScreen({ threshold: 0.4 });
  const screenSize = useScreenSize();

  const isSmallScreen = screenSize === ScreenSize.SMALL;

  const cartItemsQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCloseCart = () => {
    setShowCart(false);
    setShowMenu(false);
  };

  return (
    <HeaderContainer>
      <Cart
        cartItems={cartItems}
        showCart={showCart}
        onCloseCart={handleCloseCart}
      />
      {isSmallScreen && (
        <MenuMobile
          showMenu={showMenu}
          onCloseMenu={() => setShowMenu(false)}
        />
      )}
      <LogoContainer ref={fixedCartButtonRef}>
        <MenuButtonWrapper>
          {isSmallScreen && (
            <MenuButton onClick={() => setShowMenu(true)}>
              <icons.HiOutlineMenu color={Color.GRAY} size={25} />
            </MenuButton>
          )}
        </MenuButtonWrapper>
        <TitleWrapper onClick={() => navigate('/')}>
          <Logo />
        </TitleWrapper>

        {isSmallScreen && (
          <CartButtonWrapper>
            <CartButton
              onOpenCart={() => setShowCart(true)}
              itemsQuantity={cartItemsQuantity}
              isInBounds={cartIsVisible}
            />
          </CartButtonWrapper>
        )}
      </LogoContainer>
      {isSmallScreen && <Search />}
      {!isSmallScreen && (
        <SearchAndCartWrapper>
          <Search />
          <CartButton
            onOpenCart={() => setShowCart(true)}
            itemsQuantity={cartItemsQuantity}
            isInBounds={cartIsVisible}
          />
        </SearchAndCartWrapper>
      )}
    </HeaderContainer>
  );
};

const SearchAndCartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
  min-height: 3.5rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 10rem;
  }

  @media (min-width: 768px) {
    svg {
      width: 15rem;
    }
  }
`;

const CartButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MenuButtonWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 50%;
  background-color: ${Color.WHITE};
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));
`;

const HeaderContainer = styled.div`
  position: relative;
  padding: 1rem 1.5rem 1rem 1.5rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  z-index: 800;
  background-color: ${Color.WHITE};

  @media (min-width: 768px) {
    box-shadow: none;
  }
`;

const LogoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`;
