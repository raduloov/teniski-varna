import React, { useEffect, useState } from 'react';
import * as MyPOSEmbedded from 'mypos-embedded-checkout';
import { v4 as uuid4 } from 'uuid';
import { useLocation } from 'react-router';
import { cartItemsMapperToMYPOSObject } from '../domain/mappers/cartProductMapper';
import { CheckoutContainer } from '../containers/Checkout/CheckoutContainer';
import { getMyPosNote, getTotalPrice } from '../containers/Checkout/utils';
import { ShippingData, useShipping } from '../hooks/useShipping';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { icons } from '../assets/icons';
import { Color } from '../assets/constants';
import { PromoCode } from '../hooks/usePromoCodes';

export const CheckoutPage = () => {
  const [showMyPos, setShowMyPos] = useState<boolean>(false);
  const [shipping, setShipping] = useState<ShippingData>({
    shippingCost: 0,
    minimumAmount: 0
  });
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const { state } = useLocation();
  const { getShipping, isLoading: isFetchingShipping } = useShipping();

  const setShippingFromFirebase = async () => {
    const shippingData = await getShipping();
    setShipping(shippingData);
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
    if (!state || !state.cartItems || isFetchingShipping) {
      return;
    }

    try {
      setShippingFromFirebase();

      const myPosCartItems = cartItemsMapperToMYPOSObject(state.cartItems);
      const myPosNote = getMyPosNote(state.cartItems, promoCode);
      const myPosTotalPrice = getTotalPrice(
        state.cartItems,
        promoCode?.percentage
      );

      const isShippingFree = myPosTotalPrice > shipping.minimumAmount;
      const amount = isShippingFree
        ? myPosTotalPrice
        : myPosTotalPrice + shipping.shippingCost;
      const cartItems = isShippingFree
        ? myPosCartItems
        : [
            ...myPosCartItems,
            {
              article: 'Доставка',
              quantity: 1,
              price: shipping.shippingCost,
              currency: 'BGN'
            }
          ];

      const paymentParams = {
        Amount: amount,
        Currency: 'BGN',
        OrderID: uuid4(),
        SID: process.env.REACT_APP_MYPOS_SID,
        WalletNumber: process.env.REACT_APP_MYPOS_WALLET_NUMBER,
        KeyIndex: 1,
        URL_OK: window.location.href,
        URL_Cancel: window.location.href,
        URL_Notify: window.location.href,
        CardTokenRequest: 0,
        PaymentParametersRequired: 3,
        // do we need cartItems here?
        cartItems,
        Note: myPosNote
      };

      console.log('paymentParams', paymentParams);
      console.log('amount', amount);

      if (showMyPos) {
        MyPOSEmbedded.createPayment(
          'embeddedCheckout',
          paymentParams,
          callbackParams
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`💥 Нещо се обърка :( ${error.message}`);
    }
  }, [showMyPos, promoCode, state]);

  return (
    <>
      {!showMyPos && (
        <CheckoutContainer
          onGoToCheckout={() => setShowMyPos(true)}
          onApplyPromoCode={(promoCode) => setPromoCode(promoCode)}
        />
      )}
      {showMyPos && (
        <MyPosWrapper>
          <BackButton onClick={() => setShowMyPos(false)}>
            <icons.FaChevronLeft />
            <p>Обратно към Данни за Доставка</p>
          </BackButton>
          <div id="embeddedCheckout" />
        </MyPosWrapper>
      )}
    </>
  );
};

const BackButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${Color.DARK_GRAY};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const MyPosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;
