import React from 'react';
import styled from 'styled-components';
import { Product } from '../../../domain/models/ProductDTO';
import { ProductCard } from '../cart/ProductCard';

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
