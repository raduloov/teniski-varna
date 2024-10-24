import React, { useEffect, useState } from 'react';
import * as MyPOSEmbedded from 'mypos-embedded-checkout';
import { v4 as uuid4 } from 'uuid';
import {
  mapCartItemsToMyPosProduct,
  CartProduct,
  mapProductToCartProduct,
  MYPOSProduct as MyPosProduct
} from '../domain/mappers/cartProductMapper';
import { CheckoutContainer } from '../containers/Checkout/CheckoutContainer';
import {
  getDiscountedPrice,
  getTotalPrice,
  OrderShippingInfo
} from '../components/features/checkout/utils';
import { ShippingData, useShipping } from '../hooks/useShipping';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { icons } from '../assets/icons';
import { Color } from '../assets/constants';
import { PromoCode } from '../hooks/usePromoCodes';
import { scrollToTop } from '../utils/scrollToTop';
import { SummaryContainer } from '../containers/Checkout/SummaryContainer';
import { useCustomNavigate } from '../hooks/useCustomNavigate';
import { flattenItems } from '../components/features/summary/utils';
import {
  getDiscountForProduct,
  TShirtColor
} from '../containers/adminPanel/utils';
import { useProducts } from '../hooks/useProducts';
import { useDiscounts } from '../hooks/useDiscounts';
import { ActivityIndicator } from '../components/common/ActivityIndicator';
import { useAppSelector } from '../hooks/useRedux';
import { useMailgun } from '../hooks/useMailgun';
import { sendEmailToAdmin, sendEmailToCustomer } from '../utils/emailUtils';

export const CheckoutPage = () => {
  const [showSummary, setShowSummary] = useState<boolean>(true);
  const [showMyPos, setShowMyPos] = useState<boolean>(false);
  const [shipping, setShipping] = useState<ShippingData>({
    shippingCost: 0,
    minimumAmount: 0
  });
  const [items, setItems] = useState<CartProduct[]>([]);
  const [myPosItems, setMyPosItems] = useState<MyPosProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>();
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [enteredPromoCode, setEnteredPromoCode] = useState<string>('');
  const [isPromoCodeValid, setIsPromoCodeValid] = useState<boolean | null>(
    null
  );

  const cartItems = useAppSelector((state) => state.cart);
  const { getProductById, isLoading: isFetchingProduct } = useProducts();
  const { getActiveDiscounts, isLoading: isFetchingDiscount } = useDiscounts();
  const navigate = useCustomNavigate();
  const { getShipping } = useShipping();
  const { sendEmail } = useMailgun();

  const isFreeShipping = totalPrice >= shipping.minimumAmount;

  const setShippingFromFirebase = async () => {
    const shippingData = await getShipping();
    setShipping(shippingData);
  };

  const createSummary = async () => {
    const flattenedItems = flattenItems(cartItems);
    const activeDiscounts = await getActiveDiscounts();

    const mappedItems: CartProduct[] = [];

    for (const item of flattenedItems) {
      const product = await getProductById(item.id);

      if (product) {
        const discount = getDiscountForProduct(product, activeDiscounts);
        const discountedPrice = getDiscountedPrice(product.price, discount);

        const mappedProduct = mapProductToCartProduct(
          product,
          item.color as TShirtColor,
          item.image,
          1,
          item.size,
          item.type,
          discountedPrice
        );

        mappedItems.push(mappedProduct);
      }
    }

    const myPosCartItems = mapCartItemsToMyPosProduct(mappedItems);
    const myPosTotalPrice = getTotalPrice(mappedItems);

    const isShippingFree = myPosTotalPrice >= shipping.minimumAmount;
    const amount = isShippingFree
      ? myPosTotalPrice
      : myPosTotalPrice + shipping.shippingCost;
    const myPosFinalItems = isShippingFree
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

    setItems(mappedItems);
    setMyPosItems(myPosFinalItems);
    setTotalPrice(myPosTotalPrice);
    setFinalPrice(amount);
  };

  const createMyPos = async (orderShippingInfo: OrderShippingInfo) => {
    const paymentParams = {
      // sid: process.env.REACT_APP_MYPOS_SID,
      sid: '000000000000010',
      ipcLanguage: 'bg',
      walletNumber: '61938166610',
      // walletNumber: process.env.REACT_APP_MYPOS_WALLET_NUMBER,
      amount: finalPrice ?? totalPrice,
      currency: 'BGN',
      orderID: uuid4(),
      urlNotify: 'https://teniski-varna-api.vercel.app/myPos/notify',
      urlOk: window.location.href,
      urlCancel: window.location.href,
      keyIndex: 1,
      cartItems: myPosItems
    };

    const callbackParams = {
      isSandbox: true,
      // eslint-disable-next-line
      onSuccess: (data: any) => {
        console.log('success', data);
        navigate('/thank-you', {
          state: { fromCheckout: true },
          replace: true
        });
        sendEmailToCustomer(sendEmail, orderShippingInfo);
        sendEmailToAdmin(
          sendEmail,
          orderShippingInfo,
          items,
          promoCode,
          finalPrice ?? totalPrice,
          shipping.shippingCost
        );
      },

      // eslint-disable-next-line
      onError: (data: any) => {
        console.log('error');
        console.log(data);
      }
    };

    console.log('paymentParams', paymentParams);

    MyPOSEmbedded.createPayment(
      'embeddedCheckout',
      paymentParams,
      callbackParams
    );
  };

  const onContinueToDelivery = () => {
    setShowSummary(false);
    scrollToTop();
  };

  const onContinueToMyPos = (orderShippingInfo: OrderShippingInfo) => {
    setShowMyPos(true);
    scrollToTop();

    // make sure the div is rendered before creating the MyPos payment
    setTimeout(() => {
      createMyPos(orderShippingInfo);
    }, 100);
  };

  const applyPromoCode = (promoCode: PromoCode | null) => {
    setPromoCode(promoCode);

    if (promoCode) {
      const discountedTotalPrice = getDiscountedPrice(
        totalPrice,
        promoCode.percentage
      );

      const discountedMyPosItems = myPosItems.map((item) => {
        if (item.article === 'Доставка') {
          return {
            ...item,
            price: shipping.shippingCost
          };
        }
        const discountedItemPrice = getDiscountedPrice(
          item.price,
          promoCode.percentage
        );

        return {
          ...item,
          price: discountedItemPrice
        };
      });
      setMyPosItems(discountedMyPosItems);

      setFinalPrice(
        isFreeShipping
          ? discountedTotalPrice
          : discountedTotalPrice + shipping.shippingCost
      );
    } else {
      setFinalPrice(undefined);
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      return navigate('/');
    }

    try {
      setShippingFromFirebase();
      createSummary();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`💥 Нещо се обърка :( ${error.message}`);
    }
  }, [cartItems]);

  const isLoading = isFetchingProduct || isFetchingDiscount;

  return (
    <>
      {isLoading && (
        <LoadingWrapper>
          <ActivityIndicator size={100} color={Color.ACCENT} />
        </LoadingWrapper>
      )}
      {!isLoading && showSummary && !showMyPos && (
        <SummaryContainer
          cartItems={items}
          totalPrice={totalPrice}
          finalPrice={finalPrice}
          shipping={shipping}
          enteredPromoCode={enteredPromoCode}
          setEnteredPromoCode={setEnteredPromoCode}
          isPromoCodeValid={isPromoCodeValid}
          setIsPromoCodeValid={setIsPromoCodeValid}
          onApplyPromoCode={(promoCode) => applyPromoCode(promoCode)}
          onContinue={onContinueToDelivery}
        />
      )}
      {!isLoading && !showMyPos && !showSummary && (
        <CheckoutContainer
          onGoBack={() => setShowSummary(true)}
          onContinueToMyPos={onContinueToMyPos}
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

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

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
