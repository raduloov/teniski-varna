import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { CartProduct } from '../../../domain/mappers/cartProductMapper';
import { useAppDispatch } from '../../../hooks/useRedux';
import { cartActions } from '../../../store/cartSlice';
import { CartProductCard } from './CartProductCard';
import { useNavigate } from 'react-router';
interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  cartItems: Array<CartProduct>;
}

export const Cart = ({ setShowModal, showModal, cartItems }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cartActions.fillCartFromLocalStorage());
  }, []);

  const cartPrice = cartItems.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  const shippingPrice = cartItems.length > 0 ? 4.99 : 0;
  const totalPrice = cartPrice + shippingPrice;

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CartMainContainer>
            <CartHeader>Количка</CartHeader>
            <CartContainer>
              <>
                {cartItems.length > 0 &&
                  cartItems.map((product) => (
                    <CartProductCard key={product.id} product={product} />
                  ))}
              </>
            </CartContainer>
            <CartFooter>
              <CartPriceContainer>
                Тениски:<p>{cartPrice.toFixed(2)}лв</p>
              </CartPriceContainer>
              <CartPriceContainer>
                Доставка:<p>{shippingPrice}лв</p>
              </CartPriceContainer>
              <CartDivider></CartDivider>
              <CartPriceContainer>
                Общо: <p>{totalPrice.toFixed(2)}лв</p>
              </CartPriceContainer>
              <Button
                label={'Купи'}
                onClick={() => navigate('checkout')}
              ></Button>
            </CartFooter>
          </CartMainContainer>
        </Modal>
      )}
    </>
  );
};

const CartMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 92vh;
  width: 100%;
`;

const CartHeader = styled.h1`
  position: absolute;
  color: #000000;
  background-color: transparent;
  font-size: 1.25rem;
  font-weight: 500;
  top: 6.5%;
  right: calc(50% + -32px);
`;

const CartContainer = styled.div`
  padding: 2rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  overflow-y: auto;
`;

const CartFooter = styled.div`
  margin-top: auto;
  background-color: #ffffff;
  z-index: 12;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2rem;
  border-top-right-radius: 2.5rem;
  border-top-left-radius: 2.5rem;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.15);
`;

const CartPriceContainer = styled.div`
  display: flex;
  p {
    margin-left: auto;
    font-weight: 600;
    color: #000000;
  }
`;

const CartDivider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #000000;
  opacity: 0.05;
  border-radius: 1rem;
`;
