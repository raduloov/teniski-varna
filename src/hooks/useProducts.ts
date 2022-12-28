import { availableTShirtColors } from './../containers/adminPanel/utils';
import { useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseConfig';
import { Product, ProductImages } from '../domain/models/ProductDTO';

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
      const imageUrls: ProductImages = {
        white: '',
        black: '',
        red: '',
        blue: ''
      };

      for (const color of availableTShirtColors) {
        const imageRef = ref(storage, `images/${product.title}-${color}`);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls[color] = imageUrl;
      }

      mappedProducts.push({ ...product, images: imageUrls });
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

      const imageUrls: ProductImages = {
        white: '',
        black: '',
        red: '',
        blue: ''
      };

      for (const color of availableTShirtColors) {
        const imageRef = ref(storage, `images/${product.title}-${color}`);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls[color] = imageUrl;
      }

      const mappedProduct = { ...product, images: imageUrls };

      setIsLoading(false);
      return mappedProduct;
    }
  };

  return { getAllProducts, getProductById, isLoading };
};
