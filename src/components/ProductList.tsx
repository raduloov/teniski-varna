import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductCard } from './ProductCard';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase/firebaseConfig';

interface Props {
  products: Array<any>;
}

export const ProductList = ({ products }: Props) => {
  const [images, setImages] = useState<Array<string>>([]);

  const imagesListRef = ref(storage, 'images/');
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImages((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <ProductsContainer>
      {products.map((product) => {
        return (
          <ProductCard
            image={images[0]}
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        );
      })}
    </ProductsContainer>
  );
};

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;
