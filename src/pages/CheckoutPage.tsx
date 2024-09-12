import React, { useEffect } from 'react';
import * as MyPOSEmbedded from 'mypos-embedded-checkout';

export const CheckoutPage = () => {
  const testOID = Math.random().toString(36).substr(2, 9);
  //change to guid or uuid later

  const paymentParams = {
    Amount: 23.45,
    Currency: 'BGN',
    OrderID: testOID,
    SID: '768323',
    WalletNumber: '40559548405',
    KeyIndex: 1,
    URL_OK: window.location.href,
    URL_Cancel: window.location.href,
    URL_Notify: window.location.href,
    CardTokenRequest: 0,
    PaymentParametersRequired: 3,
    cartItems: [
      {
        article: 'HP ProBook 6360b sticker',
        quantity: 2,
        price: 10,
        currency: 'BGN'
      },
      {
        article: 'Delivery',
        quantity: 1,
        price: 3.45,
        currency: 'BGN'
      }
    ]
  };

  const callbackParams = {
    onSuccess: function (data: any) {
      console.log('success callback');
      console.log(data);
    },

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
      <h1>Checkout</h1>
      <div id="embeddedCheckout"></div>
    </div>
  );
};

