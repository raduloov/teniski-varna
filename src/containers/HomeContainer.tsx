import React, { useState } from 'react';
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
    </>
  );
};
