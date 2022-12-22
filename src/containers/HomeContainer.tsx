import React, { useState } from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { ActivityIndicator } from '../components/ActivityIndicator';
import { Banner } from '../components/Banner';
import { Header } from '../components/Header';
import { categories, HorizontalScroll } from '../components/HorizontalScroll';
import { ProductList } from '../components/ProductList';
import { Product } from '../domain/models/ProductDTO';

interface Props {
  products: Array<Product>;
  isLoading: boolean;
}

export const HomeContainer = ({ products, isLoading }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const [topNavigationShow, setTopNavigationShow] = useState<boolean>(false);

  return (
    <>
      <Header
        setTopNavigationShow={setTopNavigationShow}
        topNavigationShow={topNavigationShow}
      />
      <Banner />
      <HorizontalScroll
        categories={categories}
        selected={selectedCategory}
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ProductListContainer>
        {isLoading && <ActivityIndicator size={75} color={Color.ACCENT} />}
        {products.length > 0 && <ProductList products={products} />}
      </ProductListContainer>
    </>
  );
};

const ProductListContainer = styled.div`
  z-index: 10;
  background-color: transparent;
  margin-top: 10px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
`;
