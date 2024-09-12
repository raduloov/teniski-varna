import React, { useEffect } from 'react';
import * as MyPOSEmbedded from 'mypos-embedded-checkout';

export const CheckoutPage = () => {
  const testOID = Math.random().toString(36).substr(2, 9);
  //change to guid or uuid later

  const paymentParams = {
    Amount: 0.11,
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
        article: 'Някаква тениска',
        quantity: 1,
        price: 0.5,
        currency: 'BGN'
      },
      {
        article: 'няква доставка',
        quantity: 1,
        price: 0.6,
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

