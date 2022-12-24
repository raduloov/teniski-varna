import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { CreateOrderActions, CreateOrderData } from '@paypal/paypal-js';
import { useAppSelector } from '../hooks/useRedux';
import styled from 'styled-components';
import { Input } from '../components/common/Input';
import speedy from '../assets/images/speedy.webp';
import { Color } from '../assets/constants';
import { Button, ButtonSize } from '../components/common/Button';

export const CheckoutContainer = () => {
  const [buyWithSpeedy, setBuyWithSpeedy] = useState<boolean>(false);
  const cartItems = useAppSelector((state) => state.cart);
  const totalPrice = cartItems.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  console.log(totalPrice);
  const createOrderHandler = (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toFixed(2).toString()
          }
        }
      ]
    });
  };
  return (
    <CheckoutMainContainer>
      <CheckoutTitle>Плащане</CheckoutTitle>

      {buyWithSpeedy && (
        <form>
          <Input type="text" value={''} placeholder={'Три Имена'} />
          <Input type="text" value={''} placeholder={'Адрес или офис'} />
          <Input type="text" value={''} placeholder={'Телефон'} />
          <Button label="Купи" size={ButtonSize.SMALL}></Button>
        </form>
      )}
      <ButtonContainer>
        <button onClick={() => setBuyWithSpeedy(!buyWithSpeedy)}>
          <img src={speedy}></img>
        </button>
        <PayPalButtons
          style={{
            shape: 'pill'
          }}
          createOrder={createOrderHandler}
        ></PayPalButtons>
      </ButtonContainer>
    </CheckoutMainContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  padding: 2rem;
  button {
    display: flex;
    img {
      margin: auto;
      width: 55px;
      height: 16px;
    }
    background-color: ${Color.MEDIUM_GRAY};
    width: 100%;
    border-radius: 23px;
    padding: 0.6rem;
  }
  overflow-y: scroll;
`;

const CheckoutMainContainer = styled.div`
  position: relative;
  margin: auto;
  margin-top: 35%;
  width: 85%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  gap: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const CheckoutTitle = styled.h1`
  font-size: 2rem;
  padding-top: 5%;
  font-weight: 600;
  color: #000000;
`;
