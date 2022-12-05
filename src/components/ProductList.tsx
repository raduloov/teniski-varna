import React from 'react';
import styled from 'styled-components';
import { ProductCard } from './ProductCard';
import { Product } from '../hooks/useProducts';

interface Props {
  products: Array<Product>;
}

export const ProductList = ({ products }: Props) => {
  return (
    <ProductsContainer>
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </ProductsContainer>
  );
};

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;
