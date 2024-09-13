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
      <LogoContainer>
        <LogoButton onClick={() => navigate('/')}>
          <Logo />
        </LogoButton>
        <FixedCartWrapper>
          <CartContainer onClick={() => setShowModal(true)}>
            <icons.MdOutlineShoppingBag />
            <CartItemTick>{cartItemsQuantity}</CartItemTick>
          </CartContainer>
        </FixedCartWrapper>
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
`;

const HeaderContainer = styled.div<{ height: number }>`
  position: relative;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  height: ${({ height }) => (height ? height + 15 : 0) + 200}px;
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
  svg {
    cursor: pointer;
    width: 4.5rem;
    height: 4.5rem;
  }
`;

const FixedCartWrapper = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 800;
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));
`;

const CartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 50%;
  background-color: ${Color.WHITE};
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
