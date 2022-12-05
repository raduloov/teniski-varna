import { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseConfig';

export type Product = any; // TODO Yavor: Create type for products

export const useProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([]);

  const productCollectionRef = collection(db, 'products');

  const getProducts = async () => {
    const data = await getDocs(productCollectionRef);
    const products: Product = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    const mappedProducts = [];
    for await (const product of products) {
      const imageRef = ref(storage, `images/${product.image}`);
      const imageUrl = await getDownloadURL(imageRef);

      mappedProducts.push({ ...product, image: imageUrl });
    }

    setProducts(mappedProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products };
};
