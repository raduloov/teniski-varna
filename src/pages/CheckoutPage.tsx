import React, { useEffect, useState } from 'react';
import * as MyPOSEmbedded from 'mypos-embedded-checkout';
import { v4 as uuid4 } from 'uuid';
import { useLocation } from 'react-router';
import {
  cartItemsMapperToMYPOSObject,
  CartProduct
} from '../domain/mappers/cartProductMapper';
import { CheckoutContainer } from '../containers/Checkout/CheckoutContainer';

export const CheckoutPage = () => {
  const { state } = useLocation();
  const [showMyPos, setShowMyPos] = useState<boolean>(false);
  console.log('state', state.cartItems);
  const myPosCartItems = cartItemsMapperToMYPOSObject(state.cartItems);
  const cartItemsNote = state.cartItems
    ?.map(
      (item: CartProduct) =>
        `${item.color}, ${item.type}, ${item.title}, ${item.size}, ${item.description}`
    )
    .join(', ');
  const [myPosPriceTotal, setMyPosPriceTotal] = useState<number>(
    +myPosCartItems
      ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2) || 0
  );
  const isShippingFree = myPosPriceTotal >= 100;

  const paymentParams = {
    Amount: isShippingFree ? myPosPriceTotal : myPosPriceTotal + 5,
    Currency: 'BGN',
    OrderID: uuid4(),
    SID: '768323',
    WalletNumber: '40559548405',
    KeyIndex: 1,
    URL_OK: window.location.href,
    URL_Cancel: window.location.href,
    URL_Notify: window.location.href,
    CardTokenRequest: 0,
    PaymentParametersRequired: 3,
    cartItems: [
      ...myPosCartItems,
      !isShippingFree
        ? { article: 'Доставка', quantity: 1, price: 5, currency: 'BGN' }
        : ''
    ],
    Note: cartItemsNote
  };

  const callbackParams = {
    // eslint-disable-next-line
    onSuccess: function (data: any) {
      console.log('success callback');
      console.log(data);
    },

    // eslint-disable-next-line
    onError: function (data: any) {
      console.log('error');
      console.log(data);
    }
  };

  useEffect(() => {
    MyPOSEmbedded.createPayment(
      'embeddedCheckout',
      paymentParams,
      callbackParams
    );
  }, []);

  return (
    <div>
      {!showMyPos && (
        <CheckoutContainer onGoToCheckout={() => setShowMyPos(true)} />
      )}
      {showMyPos && <div id="embeddedCheckout"></div>}
    </div>
  );
};
