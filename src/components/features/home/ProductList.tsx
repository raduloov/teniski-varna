import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Product } from '../../../domain/models/ProductDTO';
import { ProductCard } from './ProductCard';
import { Label } from '../../../hooks/useLabels';
import { getDiscountForProduct } from '../../../containers/adminPanel/utils';
import { Discount, useDiscounts } from '../../../hooks/useDiscounts';
import InfiniteScroll from 'react-infinite-scroller';
import { ActivityIndicator } from '../../common/ActivityIndicator';
import { Color } from '../../../assets/constants';
import { productAppearAnimation } from '../../../utils/animations';

interface Props {
  products: Product[];
  onLoadMore?: () => void;
  allProductsHaveBeenFetched?: boolean;
  selectedLabel?: Label;
  onSelectProductToEdit?: (productId: string) => void;
}

export const ProductList = ({
  products,
  onLoadMore,
  allProductsHaveBeenFetched,
  selectedLabel,
  onSelectProductToEdit
}: Props) => {
  const [activeDiscounts, setActiveDiscounts] = useState<Discount[]>([]);
  const { getDiscounts } = useDiscounts();

  const setDiscountsFromFirebase = async () => {
    const discounts = await getDiscounts();
    setActiveDiscounts(discounts);
  };

  useEffect(() => {
    setDiscountsFromFirebase();
  }, []);

  return (
    <StyledInfiniteScroll
      pageStart={0}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      loadMore={onLoadMore ?? (() => {})}
      hasMore={!allProductsHaveBeenFetched}
      loader={
        <Loader key={'loader'}>
          <Text>Зареждане на още продукти...</Text>
          <ActivityIndicator size={100} color={Color.ACCENT} />
        </Loader>
      }
      threshold={0}
    >
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
    </StyledInfiniteScroll>
  );
};

const Text = styled.p`
  font-size: 1rem;
  color: ${Color.GRAY};
  text-align: center;
`;

const Loader = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${Color.WHITE};
  border-radius: 10px;
  padding: 1rem;
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));
  ${productAppearAnimation}

  @media (min-width: 768px) {
    width: 150px;
  }

  @media (min-width: 1366px) {
    width: 220px;
  }

  @media (min-width: 1600px) {
    width: 250px;
  }
`;

const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1366px) {
    grid-gap: 1rem;
  }

  @media (min-width: 1600px) {
    grid-gap: 3rem;
  }
`;
