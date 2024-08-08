import React from 'react';
import styled from 'styled-components';
import { Product } from '../../../domain/models/ProductDTO';
import { ProductCard } from './ProductCard';
import { Label } from '../../../hooks/useLabels';

interface Props {
  products: Array<Product>;
  selectedLabel?: Label;
  onSelectProductToEdit?: (productId: string) => void;
}

export const ProductList = ({
  products,
  selectedLabel,
  onSelectProductToEdit
}: Props) => {
  return (
    <ProductsContainer>
      {products.map((product) => {
        if (selectedLabel && !product.labels.includes(selectedLabel.id)) {
          return null;
        }
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
