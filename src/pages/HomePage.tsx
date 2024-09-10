import React, { useEffect, useState } from 'react';
import { HomeContainer } from '../containers/HomeContainer';
import { Product } from '../domain/models/ProductDTO';
import { useProducts } from '../hooks/useProducts';
import { useDiscounts } from '../hooks/useDiscounts';
import { discountActions } from '../store/discountSlice';
import { useAppDispatch } from '../hooks/useRedux';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useAppDispatch();
  const { getAllProducts, isLoading: isFetchingProducts } = useProducts();
  const { getDiscounts, isLoading: isFetchingDiscounts } = useDiscounts();

  const setProductsFromFirebase = async () => {
    const products = await getAllProducts();
    setProducts(products);
  };

  const setDiscountsFromFirebase = async () => {
    const discounts = await getDiscounts();
    dispatch(discountActions.setActiveDiscounts(discounts));
  };

  useEffect(() => {
    setProductsFromFirebase();
    setDiscountsFromFirebase();
  }, []);

  return (
    <HomeContainer
      products={products}
      isLoading={isFetchingProducts || isFetchingDiscounts}
    />
  );
};
