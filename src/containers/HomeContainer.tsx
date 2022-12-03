import React, { useState } from 'react';
import styled from 'styled-components';
import { Banner } from '../components/Banner';
import { Header } from '../components/Header';
import { categories, HorizontalScroll } from '../components/HorizontalScroll';
import { ProductList } from '../components/ProductList';

export const HomeContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  return (
    <>
      <Header />
      <Banner />
      <HorizontalScroll
        categories={categories}
        selected={selectedCategory}
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <Container>
        <ProductList />
      </Container>
    </>
  );
};

const Container = styled.div`
  z-index: 10;
  background-color: transparent;
  margin-top: 10px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
`;
