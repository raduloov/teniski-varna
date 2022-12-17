import { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import {
  collection,
  getDocs,
  query,
  where,
  documentId
} from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseConfig';
import { Product } from '../domain/models/ProductDTO';

export const useProducts = (id?: string) => {
  const [products, setProducts] = useState<Product[]>([]);

  const productCollectionRef = collection(db, 'products');

  const getProducts = async () => {
    const data = await getDocs(productCollectionRef);
    const products = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Product[];

    const mappedProducts = [];
    for await (const product of products) {
      const imageRef = ref(storage, `images/${product.image}`);
      const imageUrl = await getDownloadURL(imageRef);

      mappedProducts.push({ ...product, image: imageUrl });
    }

    setProducts(mappedProducts);
  };

  const getProductById = async (id: string) => {
    const q = query(productCollectionRef, where(documentId(), '==', id));
    const data = await getDocs(q);

    const products = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Product[];

    const mappedProducts = [];
    for await (const product of products) {
      const imageRef = ref(storage, `images/${product.image}`);
      const imageUrl = await getDownloadURL(imageRef);

      mappedProducts.push({ ...product, image: imageUrl });
    }

    setProducts(mappedProducts);
  };

  useEffect(() => {
    if (id) {
      getProductById(id);
    } else {
      getProducts();
    }
  }, []);

  return { products };
};
