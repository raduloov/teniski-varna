import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { categories, HorizontalScroll } from '../components/HorizontalScroll';

export const HomeContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  return (
    <>
      <Header />
      <HorizontalScroll
        categories={categories}
        selected={selectedCategory}
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <Container>{/* Add poster and product cards here */}</Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 10px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;
