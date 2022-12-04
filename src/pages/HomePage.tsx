import React, { useEffect, useState } from 'react';
import { HomeContainer } from '../containers/HomeContainer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const HomePage = () => {
  const [products, setProducts] = useState<any>([]); // TODO Yavor: Create type for products
  const productCollectionRef = collection(db, 'products');

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);

  return <HomeContainer products={products} />;
};
