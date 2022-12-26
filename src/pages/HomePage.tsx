import React, { useEffect, useState } from 'react';
import { HomeContainer } from '../containers/HomeContainer';
import { Product } from '../domain/models/ProductDTO';
import { useProducts } from '../hooks/useProducts';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { getAllProducts, isLoading } = useProducts();

  const setProductsFromFirebase = async () => {
    const products = await getAllProducts();
    setProducts(products);
  };

  useEffect(() => {
    setProductsFromFirebase();
  }, []);

  return <HomeContainer products={products} isLoading={isLoading} />;
};
