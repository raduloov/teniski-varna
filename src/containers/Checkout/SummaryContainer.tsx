import React, { useState } from 'react';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { SummaryItemsContainer } from '../../components/features/summary/SummaryItemsContainer';
import { Button } from '../../components/common/Button';
import { CartProduct } from '../../domain/mappers/cartProductMapper';
import { PromoCode, usePromoCodes } from '../../hooks/usePromoCodes';
import { icons } from '../../assets/icons';
import { ActivityIndicator } from '../../components/common/ActivityIndicator';
import { Input } from '../../components/common/Input';

interface Props {
  cartItems: CartProduct[];
  totalPice: number;
  finalPrice?: number;
  isValidPromoCodeSet: boolean;
  onApplyPromoCode: (promoCode: PromoCode | null) => void;
  onContinue: () => void;
}

export const SummaryContainer = ({
  cartItems,
  totalPice,
  finalPrice,
  isValidPromoCodeSet,
  onApplyPromoCode,
  onContinue
}: Props) => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [isPromoCodeValid, setIsPromoCodeValid] = useState<boolean | null>(
    null
  );
  const { checkPromoCode, isLoading: isCheckingPromoCode } = usePromoCodes();

  const checkPromoCodeValidity = async () => {
    const code = await checkPromoCode(promoCode);
    setIsPromoCodeValid(!!code);
    onApplyPromoCode(code ?? null);
  };

  return (
    <SummaryWrapper>
      <SummaryTitle>Обобщение</SummaryTitle>
      <SummaryItemsContainer cartItems={cartItems} />
      <Divider />
      <PriceAndPromoCodeWrapper>
        <InputWrapper>
          <Input
            value={promoCode}
            placeholder={'Промо код'}
            onChange={(e) => setPromoCode(e.target.value)}
            onEnterKey={checkPromoCodeValidity}
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
              <Text>Потвърди промо код</Text>
            )}
            {isPromoCodeValid === false && !isCheckingPromoCode && (
              <>
                <Text>Промо кодът не е валиден</Text>
                <icons.FaTimes size={20} color={Color.WHITE} />
              </>
            )}
            {isPromoCodeValid === true && !isCheckingPromoCode && (
              <>
                <Text>Промо кодът е добавен</Text>
                <icons.FaCheck size={20} color={Color.WHITE} />
              </>
            )}
          </PromoCodeButton>
        </InputWrapper>
        <PriceWrapper>
          {isValidPromoCodeSet && (
            <DiscountedPrice>{totalPice.toFixed(2)}лв</DiscountedPrice>
          )}
          <Price discounted={isValidPromoCodeSet}>
            {(finalPrice ?? totalPice).toFixed(2)}лв
          </Price>
        </PriceWrapper>
      </PriceAndPromoCodeWrapper>
      <Divider />
      <Button label={'Продължи'} onClick={onContinue} />
    </SummaryWrapper>
  );
};

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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PriceWrapper = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
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

const PriceAndPromoCodeWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
`;

const SummaryTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${Color.DARK_GRAY};
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
