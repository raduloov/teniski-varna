import { useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseConfig';
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

    const mappedProducts = [];
    for (const product of products) {
      const imageRef = ref(storage, `images/${product.title}-men-white`);
      const imageUrl = await getDownloadURL(imageRef);

      mappedProducts.push({ ...product, mainImage: imageUrl });
    }

    setIsLoading(false);
    return mappedProducts;
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

  return { getAllProducts, getProductById, isLoading };
};
