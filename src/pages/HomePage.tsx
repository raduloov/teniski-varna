import React from 'react';
import { HomeContainer } from '../containers/HomeContainer';
import { useProducts } from '../hooks/useProducts';

export const HomePage = () => {
  const { products, isLoading } = useProducts();

  return <HomeContainer products={products} isLoading={isLoading} />;
};
