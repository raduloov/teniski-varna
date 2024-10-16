import React from 'react';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { SummaryItemsContainer } from '../../components/features/summary/SummaryItemsContainer';
import { Button } from '../../components/common/Button';
import { CartProduct } from '../../domain/mappers/cartProductMapper';
import { PromoCode, usePromoCodes } from '../../hooks/usePromoCodes';
import { icons } from '../../assets/icons';
import { ActivityIndicator } from '../../components/common/ActivityIndicator';
import { Input } from '../../components/common/Input';
import { ScreenSize, useScreenSize } from '../../hooks/useScreenSize';
import { ShippingData } from '../../hooks/useShipping';

interface Props {
  cartItems: CartProduct[];
  totalPrice: number;
  finalPrice?: number;
  shipping: ShippingData;
  enteredPromoCode: string;
  setEnteredPromoCode: (promoCode: string) => void;
  isPromoCodeValid: boolean | null;
  setIsPromoCodeValid: (isValid: boolean | null) => void;
  onApplyPromoCode: (promoCode: PromoCode | null) => void;
  onContinue: () => void;
}

export const SummaryContainer = ({
  cartItems,
  totalPrice,
  finalPrice,
  shipping,
  enteredPromoCode,
  setEnteredPromoCode,
  isPromoCodeValid,
  setIsPromoCodeValid,
  onApplyPromoCode,
  onContinue
}: Props) => {
  const { checkPromoCode, isLoading: isCheckingPromoCode } = usePromoCodes();
  const screenSize = useScreenSize();

  const isSmallScreen = screenSize === ScreenSize.SMALL;
  const isFreeShipping = totalPrice >= shipping.minimumAmount;

  const checkPromoCodeValidity = async () => {
    const code = await checkPromoCode(enteredPromoCode);
    setIsPromoCodeValid(!!code);
    onApplyPromoCode(code ?? null);
  };

  return (
    <SummaryWrapper>
      <LargeText>Обобщение</LargeText>
      <SummaryItemsContainer cartItems={cartItems} />
      {!isFreeShipping && (
        <FreeShippingText>
          Поръчай за още{' '}
          <RemainingAmount>
            {shipping.minimumAmount - totalPrice}лв
          </RemainingAmount>{' '}
          и доставката е безплатна
        </FreeShippingText>
      )}
      <Divider />
      <PromoCodeWrapper>
        <LargeText>Промо код</LargeText>
        <InputWrapper>
          <Input
            value={enteredPromoCode}
            placeholder={'PROMOCODE'}
            onChange={(e) => setEnteredPromoCode(e.target.value.toUpperCase())}
            onEnterKey={checkPromoCodeValidity}
            centered
            additionalStyles={`
              font-size: 26px;
              padding: 8px;
            `}
          />
          <PromoCodeButton
            isValid={isPromoCodeValid}
            isLoading={isCheckingPromoCode}
            onClick={checkPromoCodeValidity}
          >
            {isCheckingPromoCode && (
              <ActivityIndicator size={20} color={Color.DARK_GRAY} />
            )}
            {isPromoCodeValid === null && !isCheckingPromoCode && (
              <Text>Приложи промо код</Text>
            )}
            {isPromoCodeValid === false && !isCheckingPromoCode && (
              <>
                <Text>Промо кодът не е валиден</Text>
                <icons.FaTimes size={20} color={Color.WHITE} />
              </>
            )}
            {isPromoCodeValid === true && !isCheckingPromoCode && (
              <>
                <Text>Промо кодът е приложен</Text>
                <icons.FaCheck size={20} color={Color.WHITE} />
              </>
            )}
          </PromoCodeButton>
        </InputWrapper>
      </PromoCodeWrapper>
      <Divider />
      <PriceAndCtaWrapper isSmallScreen={isSmallScreen}>
        <PriceWrapper>
          <MediumText>Общо:</MediumText>
          <Column>
            {isPromoCodeValid && (
              <DiscountedPrice>{totalPrice.toFixed(2)}лв</DiscountedPrice>
            )}
            <Price discounted={!!isPromoCodeValid}>
              {(finalPrice ?? totalPrice).toFixed(2)}лв
            </Price>
          </Column>
          {!isFreeShipping && <p>({shipping.shippingCost}лв доставка)</p>}
        </PriceWrapper>
        {isSmallScreen && <Divider />}
        <Button label={'Продължи'} onClick={onContinue} />
      </PriceAndCtaWrapper>
    </SummaryWrapper>
  );
};

const RemainingAmount = styled.span`
  font-weight: 600;
  color: ${Color.RED};
`;

const FreeShippingText = styled.p`
  font-size: 0.9rem;
  color: ${Color.DARK_GRAY};
`;

const PromoCodeButton = styled.div<{
  isValid: boolean | null;
  isLoading: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  gap: 5px;
  padding: 0.3rem;
  background-color: ${({ isValid, isLoading }) => {
    if (isLoading) return Color.LIGHT_GRAY;
    if (isValid === null) return Color.LIGHT_GRAY;
    if (isValid === true) return Color.GREEN_CHECK;
    if (isValid === false) return Color.LIGHT_RED;
  }};
  color: ${({ isValid }) => (isValid === null ? Color.DARK_GRAY : 'white')};
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-left: 5px;
`;

const MediumText = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  @media (min-width: 1366px) {
    display: grid;
    grid-template-columns: 2.5fr 1fr;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: last baseline;
  gap: 10px;
  justify-self: flex-start;
`;

const PriceAndCtaWrapper = styled.div<{ isSmallScreen: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;

  ${({ isSmallScreen }) =>
    isSmallScreen &&
    `
      grid-template-columns: 1fr;
      gap: 0;
    `}
`;

const DiscountedPrice = styled.p`
  font-size: 16px;
  text-decoration: line-through;
`;

const Price = styled.p<{ discounted: boolean }>`
  font-size: 30px;
  font-weight: 600;
  color: ${({ discounted }) => (discounted ? Color.RED : Color.BLACK)};
`;

const PromoCodeWrapper = styled.div`
  /* margin-top: 20px; */
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
`;

const LargeText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${Color.DARK_GRAY};
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
