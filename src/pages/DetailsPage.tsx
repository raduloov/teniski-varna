import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { SizeLabel } from '../components/SizeSelector';
import { DetailsContainer } from '../containers/DetailsContainer';
import { collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useProducts } from '../hooks/useProducts';

export const DetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState<SizeLabel | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<number>(1);
  const { productId } = useParams();
  const navigate = useNavigate();

  const productCollectionRef = collection(db, 'products');

  const goBack = () => navigate(-1);
  const increaseQuantity = () => setSelectedQuality((q) => (q += 1));
  const decreaseQuantity = () => {
    if (selectedQuality <= 1) {
      return;
    }
    setSelectedQuality((q) => (q -= 1));
  };

  const product = useProducts(productId).products[0];
  console.log(product);
  return (
    <DetailsContainer
      selectedSize={selectedSize}
      onSelectSize={setSelectedSize}
      selectedQuality={selectedQuality}
      onGoBack={goBack}
      onIncreaseQuantity={increaseQuantity}
      onDecreaseQuantity={decreaseQuantity}
      product={product}
    />
  );
};
