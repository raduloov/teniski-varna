import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { ActivityIndicator } from '../components/common/ActivityIndicator';
import { Banner } from '../components/features/home/Banner';
import { HorizontalScroll } from '../components/common/HorizontalScroll';
import { ProductList } from '../components/features/home/ProductList';
import { Product } from '../domain/models/ProductDTO';
import { useLabels } from '../hooks/useLabels';

interface Props {
  products: Array<Product>;
  isLoading: boolean;
}

export const HomeContainer = ({ products, isLoading }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const { getLabels } = useLabels();

  const setCategoriesFromFirebase = async () => {
    const fetchedCategories = await getLabels();
    const categories = fetchedCategories.map((label) => label.name);
    setCategories(categories);
  };

  useEffect(() => {
    setCategoriesFromFirebase();
  }, []);

  return (
    <>
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

export const ProductListContainer = styled.div`
  z-index: 10;
  background-color: transparent;
  margin-top: 10px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
`;
