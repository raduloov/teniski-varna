import React from 'react';
import styled from 'styled-components';
import { CartProduct } from '../../../domain/mappers/cartProductMapper';
import { SummaryItemCard } from './SummaryItemCard';
import { flattenItems } from './utils';

interface Props {
  cartItems: CartProduct[];
}

export const SummaryItemsContainer = ({ cartItems }: Props) => {
  const flattenedItems = flattenItems(cartItems);

  return (
    <Wrapper disableScroll={cartItems.length < 3}>
      {cartItems.length > 0 &&
        flattenedItems.map((product, index) => (
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
  padding: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;