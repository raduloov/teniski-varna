import React, { useEffect, useState } from 'react';
import { HomeContainer } from '../containers/HomeContainer';
import { Product } from '../domain/models/ProductDTO';
import { useProducts } from '../hooks/useProducts';
import { useAppSelector } from '../hooks/useRedux';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { searchTerm } = useAppSelector((state) => state.search);
  const {
    getAllProducts,
    queryProducts,
    isLoading: isFetchingProducts
  } = useProducts();

  const setProductsFromFirebase = async () => {
    if (searchTerm !== '') {
      const filteredProducts = await queryProducts(searchTerm);
      setProducts(filteredProducts);
    } else {
      const products = await getAllProducts();
      setProducts(products);
    }
  };

  useEffect(() => {
    setProductsFromFirebase();
  }, [searchTerm]);

  return (
    <HomeContainer
      products={products}
      searchTerm={searchTerm === ''}
      isLoading={isFetchingProducts}
    />
  );
};
