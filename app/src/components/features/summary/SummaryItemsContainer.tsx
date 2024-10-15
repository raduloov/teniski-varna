import React from 'react';
import styled from 'styled-components';
import { CartProduct } from '../../../domain/mappers/cartProductMapper';
import { SummaryItemCard } from './SummaryItemCard';

interface Props {
  cartItems: CartProduct[];
}

export const SummaryItemsContainer = ({ cartItems }: Props) => {
  return (
    <Wrapper disableScroll={cartItems.length < 3}>
      {cartItems.length > 0 &&
        cartItems.map((product, index) => (
          <SummaryItemCard
            key={`${product.id}-${product.size}-${index}`}
            product={product}
          />
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ disableScroll: boolean }>`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  padding: 1rem 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
