import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../common/Input';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { icons } from '../../../assets/icons';
import { Color } from '../../../assets/constants';
import { Cart } from '../cart/Cart';
import { useAppSelector } from '../../../hooks/useRedux';
import { HeaderLinks } from './HeaderLinks';
import { useLocation, useNavigate } from 'react-router';
import { CartButton } from '../cart/CartButton';
import { useElementOnScreen } from '../../../hooks/useElementOnScreen';

interface Props {
  topNavigationShow: boolean;
  setTopNavigationShow: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ChevronContainerProps {
  topNavigationShow: boolean;
}

export const Header = ({ setTopNavigationShow, topNavigationShow }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [headerContainerHeight, setHeaderContainerHeight] = useState<number>(0);
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
    <HeaderContainer height={headerContainerHeight}>
      <Cart
        cartItems={cartItems}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <LogoContainer ref={fixedCartButtonRef}>
        <LogoButton onClick={() => navigate('/')}>
          <Logo />
        </LogoButton>
        <CartButton
          onOpenCart={() => setShowModal(true)}
          itemsQuantity={cartItemsQuantity}
          isInBounds={cartIsVisible}
        />
      </LogoContainer>
      <Input value={''} icon={icons.FaSearch} />
      {topNavigationShow && (
        <HeaderLinks
          height={headerContainerHeight}
          setHeaderContainerHeight={setHeaderContainerHeight}
        />
      )}
      <ChevronContainer topNavigationShow={topNavigationShow}>
        <icons.BsChevronCompactDown
          color={Color.GRAY}
          onClick={() => setTopNavigationShow(!topNavigationShow)}
        />
      </ChevronContainer>
    </HeaderContainer>
  );
};

const LogoButton = styled.div`
  cursor: pointer;
  svg {
    cursor: pointer;
    width: 4.5rem;
    height: 4.5rem;
  }
`;

const HeaderContainer = styled.div<{ height: number }>`
  position: relative;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  height: ${({ height }) => (height ? height + 15 : 0) + 200}px;
  z-index: 800;
  background-color: ${Color.WHITE};
  svg:last-child {
    padding: 0;
    cursor: pointer;
  }
`;

const ChevronContainer = styled.div<ChevronContainerProps>`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 0rem;
  svg {
    cursor: pointer;
    ${(props) => props.topNavigationShow && 'transform: rotate(180deg);'}
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
