import { useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  limit,
  query,
  where,
  startAfter,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Product } from '../domain/models/ProductDTO';

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const productCollectionRef = collection(db, 'products');

  const getAllProducts = async (limitData?: number) => {
    setIsLoading(true);

    const data = limitData
      ? await getDocs(
          query(productCollectionRef, orderBy('title'), limit(limitData))
        )
      : await getDocs(query(productCollectionRef));

    const products: Product[] = [];
    data.docs.forEach((doc) => {
      products.push({
        ...doc.data(),
        id: doc.id
      } as Product);
    });

    const lastDoc = data.docs[data.docs.length - 1];

    setIsLoading(false);
    return { products, lastDoc };
  };

  const getNextBatch = async (
    limitData: number,
    lastDoc: QueryDocumentSnapshot<DocumentData>,
    searchTerm?: string
  ) => {
    setIsLoading(true);

    const q =
      searchTerm !== ''
        ? query(
            collection(db, 'products'),
            where('title', '>=', searchTerm),
            where('title', '<=', searchTerm + '\uf8ff'),
            orderBy('title'),
            startAfter(lastDoc),
            limit(limitData)
          )
        : query(
            collection(db, 'products'),
            orderBy('title'),
            startAfter(lastDoc),
            limit(limitData)
          );

    const data = await getDocs(q);

    const lastDocFromBatch = data.docs[data.docs.length - 1];

    const products = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Product[];

    setIsLoading(false);
    return { nextBatch: products, lastDocFromBatch };
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

  const queryProducts = async (limitData: number, searchTerm: string) => {
    setIsLoading(true);

    const q = query(
      collection(db, 'products'),
      where('title', '>=', searchTerm),
      where('title', '<=', searchTerm + '\uf8ff'),
      orderBy('title'),
      limit(limitData)
    );
    const data = await getDocs(q);
    const products = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Product[];

    const lastDoc = data.docs[data.docs.length - 1];

    setIsLoading(false);
    return { products, lastDoc };
  };

  return {
    getAllProducts,
    getProductById,
    getNextBatch,
    queryProducts,
    isLoading
  };
};
