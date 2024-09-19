import { useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Product } from '../domain/models/ProductDTO';

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const productCollectionRef = collection(db, 'products');

  const getAllProducts = async (): Promise<Product[]> => {
    setIsLoading(true);

    const data = await getDocs(productCollectionRef);
    const products = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Product[];

    setIsLoading(false);
    return products;
  };

  const getProductById = async (id: string): Promise<Product | undefined> => {
    setIsLoading(true);

    const docRef = doc(db, 'products', id);
    const productDoc = await getDoc(docRef);

    if (productDoc) {
      const product = { ...productDoc.data(), id: productDoc.id } as Product;

      setIsLoading(false);
      return product;
    }
  };

  const queryProducts = async (searchTerm: string) => {
    setIsLoading(true);

    const q = query(
      collection(db, 'products'),
      where('title', '>=', searchTerm),
      where('title', '<=', searchTerm + '\uf8ff')
    );
    const data = await getDocs(q);
    const products = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Product[];

    setIsLoading(false);
    return products;
  };

  return { getAllProducts, getProductById, queryProducts, isLoading };
};
