import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { ActivityIndicator } from '../components/common/ActivityIndicator';
import { Banner } from '../components/features/home/Banner';
import { HorizontalScroll } from '../components/common/HorizontalScroll';
import { ProductList } from '../components/features/home/ProductList';
import { Product } from '../domain/models/ProductDTO';
import { Label, useLabels } from '../hooks/useLabels';
import { ScrollToTopButton } from '../components/features/home/ScrollToTopButton';
import { useElementOnScreen } from '../hooks/useElementOnScreen';

interface Props {
  products: Array<Product>;
  isLoading: boolean;
}

export const HomeContainer = ({ products, isLoading }: Props) => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<Label>(labels[0]);
  const { getLabels } = useLabels();
  const { containerRef, isVisible } = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  });

  const setLabelsFromFirebase = async () => {
    const fetchedLabels = await getLabels();
    setLabels(fetchedLabels);
  };

  useEffect(() => {
    setLabelsFromFirebase();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div ref={containerRef}></div>
      <Banner />
      <HorizontalScroll
        labels={labels}
        selected={selectedLabel}
        onSelectLabel={(label: Label) => setSelectedLabel(label)}
      />
      <ProductListContainer>
        {isLoading && <ActivityIndicator size={75} color={Color.ACCENT} />}
        {products.length > 0 && (
          <ProductList products={products} selectedLabel={selectedLabel} />
        )}
      </ProductListContainer>
      <ScrollToTopButton onScrollToTop={scrollToTop} showButton={!isVisible} />
    </>
  );
};

export const ProductListContainer = styled.div`
  z-index: 10;
  background-color: transparent;
  margin-top: 10px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
`;
