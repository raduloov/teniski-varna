import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { DetailsContainer } from '../containers/DetailsContainer';
import { useProducts } from '../hooks/useProducts';
import { Product, TShirtSize } from '../domain/models/ProductDTO';
import styled from 'styled-components';
import { ActivityIndicator } from '../components/common/ActivityIndicator';
import { Color } from '../assets/constants';

export const DetailsPage = () => {
  const [product, setProduct] = useState<Product>();
  const [selectedSize, setSelectedSize] = useState<TShirtSize | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const { getProductById, isLoading } = useProducts();
  const { productId } = useParams();
  const navigate = useNavigate();

  const setProductFromFirebase = async () => {
    const product = await getProductById(productId ?? '');
    setProduct(product);
  };

  useEffect(() => {
    setProductFromFirebase();
  }, []);

  const goBack = () => navigate(-1);
  const increaseQuantity = () => setSelectedQuantity((q) => (q += 1));
  const decreaseQuantity = () => {
    if (selectedQuantity <= 1) {
      return;
    }
    setSelectedQuantity((q) => (q -= 1));
  };

  if (isLoading) {
    return (
      <ActivityIndicatorWrapper>
        <ActivityIndicator size={100} color={Color.ACCENT} />
      </ActivityIndicatorWrapper>
    );
  }

  return (
    <>
      {product && (
        <DetailsContainer
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          selectedQuantity={selectedQuantity}
          onGoBack={goBack}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          product={product}
        />
      )}
    </>
  );
};

const ActivityIndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
