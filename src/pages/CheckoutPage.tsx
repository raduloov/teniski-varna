import React, { useEffect } from 'react';
import * as MyPOSEmbedded from 'mypos-embedded-checkout';

export const CheckoutPage = () => {
  console.log(MyPOSEmbedded);
  const paymentParams = {
    sid: '000000000000010',
    walletNumber: '61938166610',
    amount: 23.45,
    currency: 'EUR',
    orderID: Math.random().toString(36).substr(2, 9),
    urlNotify: MyPOSEmbedded.IPC_URL + '/client/ipcNotify',
    urlOk: window.location.href,
    urlCancel: window.location.href,
    keyIndex: 1,
    cartItems: [
      {
        article: 'HP ProBook 6360b sticker',
        quantity: 2,
        price: 10,
        currency: 'EUR'
      },
      {
        article: 'Delivery',
        quantity: 1,
        price: 3.45,
        currency: 'EUR'
      }
    ]
  };

  const callbackParams = {
    isSandbox: true,
    onSuccess: function (data: any) {
      console.log('success callback');
      console.log(data);
      document!.getElementById(
        'paymentDetails'
      )!.innerHTML = `Order ID:<br/>${data['OrderID']}<br/><br/>Reference:<br/>${data['IPC_Trnref']}<br/><br/>Date:<br/>${data['RequestDateTime']}<br/><br/>STAN:<br/>${data['RequestSTAN']}`;
    },
    onError: function () {
      console.log('error');
      alert('An error occured');
    }
  };
  useEffect(() => {
    MyPOSEmbedded.createPayment(
      'myPOSEmbeddedCheckout',
      paymentParams,
      callbackParams
    );
  }, []);
  return (
    <div>
      <h1>Checkout</h1>
      <div id="myPOSEmbeddedCheckout"></div>
    </div>
  );
};
