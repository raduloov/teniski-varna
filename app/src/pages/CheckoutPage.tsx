import React, { useEffect, useState } from 'react';
import * as MyPOSEmbedded from 'mypos-embedded-checkout';
import { v4 as uuid4 } from 'uuid';
import {
  cartItemsMapperToMYPOSObject,
  CartProduct,
  mapProductToCartProduct,
  MYPOSProduct as MyPosProduct
} from '../domain/mappers/cartProductMapper';
import { CheckoutContainer } from '../containers/Checkout/CheckoutContainer';
import {
  getDiscountedPrice,
  getMyPosNote,
  getTotalPrice
} from '../containers/Checkout/utils';
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

export const CheckoutPage = () => {
  const [showSummary, setShowSummary] = useState<boolean>(true);
  const [showMyPos, setShowMyPos] = useState<boolean>(false);
  const [shipping, setShipping] = useState<ShippingData>({
    shippingCost: 0,
    minimumAmount: 0
  });
  const [items, setItems] = useState<CartProduct[]>([]);
  const [myPosItems, setMyPosItems] = useState<CartProduct | MyPosProduct[]>(
    []
  );
  const [totalPice, setTotalPrice] = useState<number>(0);
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

    const myPosCartItems = cartItemsMapperToMYPOSObject(mappedItems);
    const myPosTotalPrice = getTotalPrice(mappedItems);

    const isShippingFree = myPosTotalPrice > shipping.minimumAmount;
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

  const createMyPos = async () => {
    const myPosNote = getMyPosNote(items, promoCode);

    const paymentParams = {
      Amount: finalPrice ?? totalPice,
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
      items: myPosItems,
      Note: myPosNote
    };

    console.log('paymentParams', paymentParams);

    if (showMyPos) {
      MyPOSEmbedded.createPayment(
        'embeddedCheckout',
        paymentParams,
        callbackParams
      );
    }
  };

  const onContinueToDelivery = () => {
    setShowSummary(false);
    scrollToTop();
  };

  const onContinueToMyPos = () => {
    createMyPos();
    scrollToTop();
    setShowMyPos(true);
  };

  const applyPromoCode = (promoCode: PromoCode | null) => {
    setPromoCode(promoCode);

    if (promoCode) {
      const discountedPrice = getDiscountedPrice(
        totalPice,
        promoCode.percentage
      );
      setFinalPrice(discountedPrice);
    } else {
      setFinalPrice(undefined);
    }
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
          totalPrice={totalPice}
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
      {!isLoading && showMyPos && (
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
