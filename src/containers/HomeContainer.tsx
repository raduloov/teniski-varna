import React, { useState } from 'react';
import styled from 'styled-components';
import { Banner } from '../components/Banner';
import { Header } from '../components/Header';
import { categories, HorizontalScroll } from '../components/HorizontalScroll';
import { Products } from '../components/Products';

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
        <Products />
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
`;
