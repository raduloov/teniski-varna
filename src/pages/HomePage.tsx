import React, { useEffect, useState } from 'react';
import { HomeContainer } from '../containers/HomeContainer';
import { Product } from '../domain/models/ProductDTO';
import { useProducts } from '../hooks/useProducts';
import { useAppSelector } from '../hooks/useRedux';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData>>();
  const [allProductsHaveBeenFetched, setAllProductsHaveBeenFetched] =
    useState<boolean>(false);
  const { searchTerm } = useAppSelector((state) => state.search);
  const {
    getAllProducts,
    getNextBatch,
    queryProducts,
    isLoading: isFetchingProducts
  } = useProducts();

  const setProductsFromFirebase = async () => {
    if (searchTerm !== '') {
      const { products: filteredProducts, lastDoc } = await queryProducts(
        4,
        searchTerm
      );
      setProducts(filteredProducts);
      setLastDoc(lastDoc);
    } else {
      const { products, lastDoc } = await getAllProducts(4);
      setProducts(products);
      setLastDoc(lastDoc);
    }
  };

  const setNextBatch = async () => {
    if (!lastDoc) {
      return;
    }

    const { nextBatch, lastDocFromBatch } = await getNextBatch(
      4,
      lastDoc,
      searchTerm
    );
    setLastDoc(lastDocFromBatch);

    if (nextBatch.length === 0) {
      setAllProductsHaveBeenFetched(true);
      return;
    }
    setProducts([...products, ...nextBatch]);
  };

  useEffect(() => {
    setProductsFromFirebase();
    if (searchTerm === '') {
      setAllProductsHaveBeenFetched(false);
    }
  }, [searchTerm]);

  return (
    <HomeContainer
      products={products}
      onLoadMore={setNextBatch}
      allProductsHaveBeenFetched={allProductsHaveBeenFetched}
      searchTerm={searchTerm === ''}
      isLoading={isFetchingProducts}
    />
  );
};
