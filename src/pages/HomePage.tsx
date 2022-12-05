import React, { useEffect, useState } from 'react';
import { HomeContainer } from '../containers/HomeContainer';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseConfig';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

export const HomePage = () => {
  const [products, setProducts] = useState<any>([]); // TODO Yavor: Create type for products
  const productCollectionRef = collection(db, 'products');

  const getProducts = async () => {
    const data = await getDocs(productCollectionRef);
    const products = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    products.forEach((product: any) => {
      const imageRef = ref(storage, `images/${product.image}`);
      getDownloadURL(imageRef).then((imageUrl) => console.log(imageUrl));
    });

    setProducts(products);
  };

  // const getImages = () => {
  //   const imagesListRef = ref(storage, 'images/');

  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImages((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // };

  useEffect(() => {
    getProducts();
    // getImages();
  }, []);

  return <>{products.length > 0 && <HomeContainer products={products} />}</>;
};
