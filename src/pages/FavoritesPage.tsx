import React from 'react';
import { ProductList } from '../components/features/home/ProductList';
import { ProductListContainer } from '../containers/HomeContainer';
import { Product } from '../domain/models/ProductDTO';

export const FavoritesPage = () => {
  const localStorageProducts: Array<Product> = JSON.parse(
    localStorage.getItem('Favorites') || '[]'
  );
  if (!localStorageProducts.length) {
    return <div>You have no items in favorites.</div>;
  }
  return (
    <ProductListContainer>
      {localStorageProducts.length && (
        <ProductList products={localStorageProducts} />
      )}
    </ProductListContainer>
  );
};
