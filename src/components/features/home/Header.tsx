import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../common/Input';
import { icons } from '../../../assets/icons';
import { Color } from '../../../assets/constants';
import { Cart } from '../cart/Cart';
import { useAppSelector } from '../../../hooks/useRedux';
import { useLocation, useNavigate } from 'react-router';
import { CartButton } from '../cart/CartButton';
import { useElementOnScreen } from '../../../hooks/useElementOnScreen';
import { ReactComponent as Logo } from '../../../assets/images/logo-horizontal.svg';

export const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const cartItems = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { containerRef: fixedCartButtonRef, isVisible: cartIsVisible } =
    useElementOnScreen({
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    });

  useEffect(() => {
    // When user clicks on toast, navigate home with openCart in state
    // TODO: Maybe refactor this to use a global state
    if (state) {
      setShowModal(true);
    }

    // Reset the state so that the modal doesn't open again
    window.history.replaceState({}, '');
  }, []);

  const cartItemsQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <HeaderContainer>
      <Cart
        cartItems={cartItems}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <LogoContainer ref={fixedCartButtonRef}>
        <MenuButtonWrapper>
          <icons.HiOutlineMenu size={30} color={Color.GRAY} />
        </MenuButtonWrapper>
        <TitleWrapper onClick={() => navigate('/')}>
          <Logo />
        </TitleWrapper>
        <CartButtonWrapper>
          <CartButton
            onOpenCart={() => setShowModal(true)}
            itemsQuantity={cartItemsQuantity}
            isInBounds={cartIsVisible}
          />
        </CartButtonWrapper>
      </LogoContainer>
      <Input value={''} icon={icons.FaSearch} />
    </HeaderContainer>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  svg {
    width: 10rem;
  }
`;

const CartButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MenuButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
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
`;

const LogoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`;
