import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { DetailsContainer } from '../containers/DetailsContainer';
import { useProducts } from '../hooks/useProducts';
import { TShirtSize } from '../domain/models/ProductDTO';

export const DetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState<TShirtSize | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const { productId } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const increaseQuantity = () => setSelectedQuantity((q) => (q += 1));
  const decreaseQuantity = () => {
    if (selectedQuantity <= 1) {
      return;
    }
    setSelectedQuantity((q) => (q -= 1));
  };

  const { products } = useProducts(productId);
  const [product] = products ?? [];

  return (
    <DetailsContainer
      selectedSize={selectedSize}
      onSelectSize={setSelectedSize}
      selectedQuantity={selectedQuantity}
      onGoBack={goBack}
      onIncreaseQuantity={increaseQuantity}
      onDecreaseQuantity={decreaseQuantity}
      product={product}
    />
  );
};
