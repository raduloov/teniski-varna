import React from 'react';
import { ProductList } from '../components/features/home/ProductList';
import { ProductListContainer } from '../containers/HomeContainer';
import { Product } from '../domain/models/ProductDTO';
import { EmptyProductList } from '../components/common/EmptyList';

export const FavoritesPage = () => {
  const localStorageProducts: Product[] = JSON.parse(
    localStorage.getItem('Favorites') || '[]'
  );

  return (
    <ProductListContainer>
      {localStorageProducts.length === 0 ? (
        <EmptyProductList />
      ) : (
        <ProductList
          products={localStorageProducts}
          allProductsHaveBeenFetched
        />
      )}
    </ProductListContainer>
  );
};
