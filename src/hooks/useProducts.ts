import { useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseConfig';
import { Product } from '../domain/models/ProductDTO';
import { DEFAULT_TSHIRT_COLOR } from '../assets/constants';

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
    for await (const product of products) {
      const imageRef = ref(
        storage,
        `images/${product.image}-${DEFAULT_TSHIRT_COLOR}`
      );
      const imageUrl = await getDownloadURL(imageRef);

      mappedProducts.push({ ...product, image: imageUrl });
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

      const imageRef = ref(
        storage,
        `images/${product.image}-${DEFAULT_TSHIRT_COLOR}`
      );
      const imageUrl = await getDownloadURL(imageRef);

      const mappedProduct = { ...product, image: imageUrl };

      setIsLoading(false);
      return mappedProduct;
    }
  };

  return { getAllProducts, getProductById, isLoading };
};
