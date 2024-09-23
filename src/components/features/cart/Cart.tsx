import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Modal,
  ModalEnterAnimation,
  ModalExitAnimation
} from '../../common/Modal';
import { Button } from '../../common/Button';
import {
  CartProduct,
  mapProductToCartProduct
} from '../../../domain/mappers/cartProductMapper';
import { useAppDispatch } from '../../../hooks/useRedux';
import { cartActions, LocalItem } from '../../../store/cartSlice';
import { CartProductCard } from './CartProductCard';
import { useProducts } from '../../../hooks/useProducts';
import { getLocalItems } from '../../../store/utils';
import {
  getDiscountedPrice,
  getDiscountForProduct,
  TShirtColor
} from '../../../containers/adminPanel/utils';
import { useNavigate } from 'react-router';
import { useDiscounts } from '../../../hooks/useDiscounts';
import { ActivityIndicator } from '../../common/ActivityIndicator';
import { Color } from '../../../assets/constants';
import { ShippingData, useShipping } from '../../../hooks/useShipping';
import { useModalClose } from '../../../hooks/useModalClose';
import { ScreenSize, useScreenSize } from '../../../hooks/useScreenSize';

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  cartItems: Array<CartProduct>;
}

export const Cart = ({ setShowModal, showModal, cartItems }: Props) => {
  const [shipping, setShipping] = useState<ShippingData>({
    shippingCost: 0,
    minimumAmount: 0
  });
  const { getProductById } = useProducts();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getActiveDiscounts, isLoading: isFetchingDiscounts } = useDiscounts();
  const { getShipping, isLoading: isFetchingShipping } = useShipping();
  const { closing, handleClose } = useModalClose(() => setShowModal(false));
  const screenSize = useScreenSize();

  const isLargeScreen = screenSize === ScreenSize.LARGE;

  const setShippingFromFirebase = async () => {
    const shippingData = await getShipping();
    setShipping(shippingData);
  };

  const setItemsToCart = async () => {
    const activeDiscounts = await getActiveDiscounts();
    const localCartItems: LocalItem[] = getLocalItems();

    const cartItems: CartProduct[] = [];

    for await (const localCartItem of localCartItems) {
      const product = await getProductById(localCartItem.id);

      if (product) {
        const existingItem = cartItems.find(
          (item) =>
            item.id === localCartItem.id && item.size === localCartItem.size
        );

        if (!existingItem) {
          const discount = getDiscountForProduct(product, activeDiscounts);
          const discountedPrice = getDiscountedPrice(product.price, discount);

          const mappedProduct = mapProductToCartProduct(
            product,
            localCartItem.color as TShirtColor,
            localCartItem.image,
            1,
            localCartItem.size,
            localCartItem.type,
            discountedPrice
          );
          cartItems.push(mappedProduct);
        } else {
          const itemIndex = cartItems.findIndex(
            (item) => item.id === localCartItem.id
          );
          cartItems[itemIndex].quantity++;
        }
      }
    }

    dispatch(cartActions.fillCart(cartItems));
  };

  useEffect(() => {
    setShippingFromFirebase();
    setItemsToCart();
  }, []);

  const cartPrice = cartItems.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  const isFreeShipping = cartPrice >= shipping.minimumAmount;
  const shippingPrice =
    isFreeShipping || cartItems.length === 0 ? 0 : shipping.shippingCost;
  const totalPrice = cartPrice + shippingPrice;

  const isLoading = isFetchingDiscounts || isFetchingShipping;

  return (
    <>
      {showModal && (
        <Modal
          onClose={handleClose}
          enterAnimation={ModalEnterAnimation.SLIDE_DOWN}
          exitAnimation={ModalExitAnimation.SLIDE_RIGHT}
          closing={closing}
          backButton
          additionalStyles={`
            ${
              isLargeScreen
                ? `
                left: 50%;
                transform: translate(-50%);
              `
                : `
                width: 100%;
              `
            }
          `}
        >
          <Container>
            <CartHeader>Кошница</CartHeader>
            {isLoading ? (
              <ActivityIndicatorWrapper>
                <ActivityIndicator color={Color.ACCENT} size={100} />
              </ActivityIndicatorWrapper>
            ) : (
              <>
                <CartContainer>
                  <>
                    {cartItems.length > 0 &&
                      cartItems.map((product) => (
                        <CartProductCard key={product.id} product={product} />
                      ))}
                  </>
                </CartContainer>
                <CartFooter>
                  <CartPriceContainer>
                    Тениски:<p>{cartPrice.toFixed(2)}лв</p>
                  </CartPriceContainer>
                  <CartPriceContainer>
                    Доставка:<p>{shippingPrice}лв</p>
                  </CartPriceContainer>
                  {!isFreeShipping && (
                    <FreeShippingText>
                      Поръчай за още{' '}
                      <RemainingAmount>
                        {shipping.minimumAmount - cartPrice}лв
                      </RemainingAmount>{' '}
                      и доставката е безплатна
                    </FreeShippingText>
                  )}
                  <CartDivider></CartDivider>
                  <CartPriceContainer>
                    Общо: <p>{totalPrice.toFixed(2)}лв</p>
                  </CartPriceContainer>
                  <Button
                    label={'Купи'}
                    onClick={() => navigate('checkout')}
                  ></Button>
                </CartFooter>
              </>
            )}
          </Container>
        </Modal>
      )}
    </>
  );
};

const ActivityIndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 92vh;
  width: 100%;
`;

const CartHeader = styled.h1`
  position: absolute;
  color: #000000;
  background-color: transparent;
  font-size: 1.25rem;
  font-weight: 500;
  top: 6.5%;
  right: calc(50% + -32px);
`;

const CartContainer = styled.div`
  padding: 2rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  overflow-y: auto;
`;

const CartFooter = styled.div`
  margin-top: auto;
  background-color: #ffffff;
  z-index: 12;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2rem;
  border-top-right-radius: 2.5rem;
  border-top-left-radius: 2.5rem;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.15);
`;

const RemainingAmount = styled.span`
  font-weight: 600;
  color: ${Color.RED};
`;

const FreeShippingText = styled.p`
  font-size: 0.8rem;
  color: ${Color.DARK_GRAY};
`;

const CartPriceContainer = styled.div`
  display: flex;
  p {
    margin-left: auto;
    font-weight: 600;
    color: #000000;
  }
`;

const CartDivider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #000000;
  opacity: 0.05;
  border-radius: 1rem;
`;
