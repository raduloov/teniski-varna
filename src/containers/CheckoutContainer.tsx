import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveData,
  OnApproveActions,
  OrderResponseBody
} from '@paypal/paypal-js';
import { useAppSelector } from '../hooks/useRedux';
import styled from 'styled-components';
import { Input } from '../components/common/Input';
import speedy from '../assets/images/speedy.webp';
import { Color } from '../assets/constants';
import { Button, ButtonSize } from '../components/common/Button';
import { useNavigate } from 'react-router';

export const CheckoutContainer = () => {
  const navigate = useNavigate();
  const [orderPaid, setOrderPaid] = useState<boolean>(false);
  const [buyWithSpeedy, setBuyWithSpeedy] = useState<boolean>(false);
  const cartItems = useAppSelector((state) => state.cart);
  const totalPrice =
    cartItems.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    ) + 5.0;
  console.log((totalPrice / 1.96).toFixed(2).toString());
  const createOrderHandler = (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value:
              totalPrice > 20 ? (totalPrice / 1.96).toFixed(2).toString() : ''
          }
        }
      ]
    });
  };
  const handleOrderApproved = (order: OrderResponseBody | undefined) => {
    if (order) {
      setOrderPaid(true);
      console.log(order);
      navigate(-1);
    }
  };
  const onApproveHandler = async (
    data: OnApproveData,
    actions: OnApproveActions
  ) => {
    const order = await actions.order?.capture();
    handleOrderApproved(order);
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
          onApprove={onApproveHandler}
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
`;

const CheckoutMainContainer = styled.div`
  position: relative;
  margin: auto;
  margin-top: 35%;
  width: 85%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 5%;
  font-weight: 600;
  color: #000000;
`;
