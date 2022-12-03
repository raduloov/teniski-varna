import React from 'react';
import styled from 'styled-components';
import { ProductCard } from './ProductCard';

export const ProductList = () => {
  return (
    <ProductsContainer>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </ProductsContainer>
  );
};

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;
