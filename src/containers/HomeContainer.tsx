import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { ActivityIndicator } from '../components/common/ActivityIndicator';
import { BannerSlider } from '../components/features/home/BannerSlider';
import { HorizontalScroll } from '../components/common/HorizontalScroll';
import { ProductList } from '../components/features/home/ProductList';
import { Product } from '../domain/models/ProductDTO';
import { Label, useLabels } from '../hooks/useLabels';
import { ScrollToTopButton } from '../components/features/home/ScrollToTopButton';
import { useElementOnScreen } from '../hooks/useElementOnScreen';
import { EmptyProductList } from '../components/common/EmptyList';

interface Props {
  products: Product[];
  onLoadMore: () => void;
  allProductsHaveBeenFetched: boolean;
  searchTerm: boolean;
  isLoading: boolean;
}

export const HomeContainer = ({
  products,
  onLoadMore,
  allProductsHaveBeenFetched,
  searchTerm,
  isLoading
}: Props) => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<Label>();
  const { getLabels } = useLabels();
  const { containerRef: topRef, isVisible: isHeaderVisible } =
    useElementOnScreen();
  const { containerRef: bottomRef, isVisible: isFooterVisible } =
    useElementOnScreen();

  const setLabelsFromFirebase = async () => {
    const fetchedLabels = await getLabels();
    setLabels(fetchedLabels);
  };

  useEffect(() => {
    setLabelsFromFirebase();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setSelectedLabel(undefined);
    }
  }, [searchTerm]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div ref={topRef}></div>
      <BannerSlider />
      <HorizontalScroll
        labels={labels}
        selected={selectedLabel}
        onSelectLabel={(label: Label) => setSelectedLabel(label)}
      />
      <ProductListContainer>
        {isLoading && <ActivityIndicator size={75} color={Color.ACCENT} />}
        {!isLoading && products.length === 0 && <EmptyProductList />}
        {!isLoading && products.length > 0 && (
          <ProductList
            products={products}
            onLoadMore={onLoadMore}
            allProductsHaveBeenFetched={allProductsHaveBeenFetched}
            selectedLabel={selectedLabel}
          />
        )}
      </ProductListContainer>
      <div ref={bottomRef}></div>
      <ScrollToTopButtonWrapper>
        <ScrollToTopButton
          onScrollToTop={scrollToTop}
          showButton={!isHeaderVisible}
          isFooterVisible={isFooterVisible}
        />
      </ScrollToTopButtonWrapper>
    </>
  );
};

const ScrollToTopButtonWrapper = styled.div`
  position: relative;
`;

export const ProductListContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 3rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
`;
