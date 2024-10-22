import React from 'react';
import * as MyPOSEmbedded from 'mypos-embedded-checkout';
import { v4 as uuid4 } from 'uuid';

export const MyPosPage = () => {
  const paymentParams = {
    sid: process.env.REACT_APP_MYPOS_SID,
    ipcLanguage: 'en',
    walletNumber: process.env.REACT_APP_MYPOS_WALLET_NUMBER,
    amount: 1.65,
    currency: 'BGN',
    orderID: uuid4(),
    urlNotify: 'https://teniski-varna-api.vercel.app/myPos/notify',
    urlOk: window.location.href,
    urlCancel: window.location.href,
    keyIndex: 1,
    // CardTokenRequest: 0,
    // PaymentParametersRequired: 3,
    cartItems: [
      {
        article: 'HP ProBook 6360b sticker',
        quantity: 2,
        price: 0.5,
        currency: 'BGN'
      },
      {
        article: 'Delivery',
        quantity: 1,
        price: 0.65,
        currency: 'BGN'
      }
    ],
    note: 'myPosNote'
  };

  console.log('paymentParams', paymentParams);

  const callbackParams = {
    // isSandbox: true,
    onSuccess: function (data: any) {
      console.log('success callback');
      console.log(data);
    },
    onError: function (data: any) {
      console.log('error');
      console.log(data);
    }
  };

  // useEffect(() => {
  //   MyPOSEmbedded.createPayment(
  //     'embeddedCheckout',
  //     paymentParams,
  //     callbackParams
  //   );
  // }, []);
  return (
    <>
      <button
        onClick={() => {
          MyPOSEmbedded.createPayment(
            'embeddedCheckout',
            paymentParams,
            callbackParams
          );
        }}
      >
        mypos
      </button>
      <div id="embeddedCheckout"></div>
    </>
  );
};
