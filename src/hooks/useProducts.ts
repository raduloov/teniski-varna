import { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseConfig';
import { Product } from '../domain/models/ProductDTO';

export const useProducts = (id?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const productCollectionRef = collection(db, 'products');

  const getProducts = async () => {
    setIsLoading(true);

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
    setIsLoading(false);
  };

  const getProductById = async (id: string) => {
    setIsLoading(true);

    const docRef = doc(db, 'products', id);
    const product = (await getDoc(docRef)).data() as Product;

    const imageRef = ref(storage, `images/${product.image}`);
    const imageUrl = await getDownloadURL(imageRef);

    const mappedProduct = { ...product, image: imageUrl };

    setProducts([mappedProduct]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      getProductById(id);
    } else {
      getProducts();
    }
  }, []);

  return { products, isLoading };
};
