import React from 'react';
import styled from 'styled-components';
import { Product } from '../../../domain/models/ProductDTO';
import { ProductCard } from './ProductCard';

interface Props {
  products: Array<Product>;
  onSelectProductToEdit?: (productId: string) => void;
}

export const ProductList = ({ products, onSelectProductToEdit }: Props) => {
  return (
    <ProductsContainer>
      {products.map((product) => {
        return (
          <ProductCard
            product={product}
            onSelectProductToEdit={onSelectProductToEdit}
            key={product.id}
          />
        );
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
