import React from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';

interface Props {
  totalPrice: number;
  minimumAmount: number;
}

export const RemainingForFreeShipping = ({
  totalPrice,
  minimumAmount
}: Props) => {
  return (
    <FreeShippingText>
      Поръчай за още{' '}
      <RemainingAmount>
        {(minimumAmount - totalPrice).toFixed(2)}лв
      </RemainingAmount>{' '}
      и доставката е безплатна
    </FreeShippingText>
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
