import React from 'react';
import styled from 'styled-components';
import { Product } from '../../../domain/models/ProductDTO';
import { ProductCard } from './ProductCard';
import { Label } from '../../../hooks/useLabels';
import { useAppSelector } from '../../../hooks/useRedux';
import { getDiscountForProduct } from '../../../containers/adminPanel/utils';

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
  const activeDiscounts = useAppSelector(
    (state) => state.discounts.activeDiscounts
  );

  return (
    <ProductsContainer>
      {products.map((product) => {
        if (selectedLabel && !product.labels.includes(selectedLabel.id)) {
          return null;
        }

        const discount = getDiscountForProduct(product, activeDiscounts);

        return (
          <ProductCard
            product={product}
            discount={discount}
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
