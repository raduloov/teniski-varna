import React, { useEffect } from 'react';
import * as MyPOSEmbedded from 'mypos-embedded-checkout';

export const CheckoutPage = () => {
  const paymentParams = {
    sid: '768323',
    ipcLanguage: 'bg',
    walletNumber: '40559548405',
    amount: 23.45,
    currency: 'BGN',
    orderID: Math.random().toString(36).substr(2, 9),
    urlNotify: MyPOSEmbedded.IPC_URL + '/client/ipcNotify',
    urlOk: window.location.href,
    urlCancel: window.location.href,
    keyIndex: 1,
    cartItems: [
      {
        article: 'HP ProBook 6360b sticker',
        quantity: 2,
        price: 1,
        currency: 'BGN'
      }
    ]
  };

  const callbackParams = {
    isSandbox: true,
    onSuccess: function (data: any) {
      console.log('success callback');
      console.log(data);
    },

    onError: function () {
      console.log('error');
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
