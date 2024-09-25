import React, { useEffect, useState } from 'react';
import * as MyPOSEmbedded from 'mypos-embedded-checkout';
import { Input } from '../components/common/Input';
import { usePromoCodes } from '../hooks/usePromoCodes';

export const CheckoutPage = () => {
  const [promoCode, setPromoCode] = useState<string>('');

  const { checkPromoCode } = usePromoCodes();

  const checkPromoCodeValidity = async () => {
    const code = await checkPromoCode(promoCode);

    console.log('promo code: ', code);
  };

  const testOID = Math.random().toString(36).substr(2, 9);
  //change to guid or uuid later

  const paymentParams = {
    Amount: 1.55,
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
        price: 1,
        currency: 'BGN'
      },
      {
        article: 'няква доставка',
        quantity: 1,
        price: 0.55,
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
      <Input
        value={promoCode}
        placeholder={'Промо код'}
        onChange={(e) => setPromoCode(e.target.value)}
        onEnterKey={checkPromoCodeValidity}
      />
      <h1>Checkout</h1>
      <div id="embeddedCheckout"></div>
    </div>
  );
};
