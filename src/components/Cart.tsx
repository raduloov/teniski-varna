import React from 'react';
import styled from 'styled-components';
import { Modal } from './Modal';
import { CartProductCard } from './CartProductCard';
import { Button } from './Button';

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export const Cart = ({ setShowModal, showModal }: Props) => {
  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CartHeader>My Cart</CartHeader>
          <CartContainer>
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
          </CartContainer>
          <CartFooter>
            <p>
              Sub Total:<h1>$220.85</h1>
            </p>
            <p>
              Shipping:<h1>$220.85</h1>
            </p>
            <CartDivider></CartDivider>
            <p>
              Bag Total: <h1>$220.85</h1>
            </p>
            <Button label={'Checkout'}></Button>
          </CartFooter>
        </Modal>
      )}
    </>
  );
};

const CartHeader = styled.h1`
  position: absolute;
  color: #000000;
  font-size: 1.25rem;
  font-weight: 500;
  top: 6.5%;
  right: calc(50% + -32px);
`;
const CartContainer = styled.div`
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;
const CartFooter = styled.div`
  background-color: #ffffff;
  z-index: 12;
  position: sticky;
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
  p {
    display: flex;
    h1 {
      margin-left: auto;
      font-weight: 600;
      color: #000000;
    }
  }
`;
const CartDivider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #000000;
  opacity: 0.05;
  border-radius: 1rem;
`;
