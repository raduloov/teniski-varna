import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { DetailsContainer } from '../containers/DetailsContainer';
import { useProducts } from '../hooks/useProducts';
import {
  ImagesKids,
  ImagesMen,
  ImagesOversized,
  ImagesWomen,
  Product,
  TShirtSize,
  TShirtType
} from '../domain/models/ProductDTO';
import styled from 'styled-components';
import { ActivityIndicator } from '../components/common/ActivityIndicator';
import { Color } from '../assets/constants';
import { TShirtColor } from '../containers/adminPanel/utils';

export const DetailsPage = () => {
  const [product, setProduct] = useState<Product>();
  const [tShirtTypes, setTShirtTypes] = useState<TShirtType[]>([]);
  const [selectedType, setSelectedType] = useState<TShirtType | null>(null);
  const [selectedSize, setSelectedSize] = useState<TShirtSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<TShirtColor>(
    TShirtColor.WHITE
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [imageHasLoaded, setImageHasLoaded] = useState<boolean>(false);
  const { getProductById, isLoading } = useProducts();
  const { productId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const getTShirtTypes = (product: Product) => {
    const types = [];

    // Use this implementation to retain the order of the types
    if (Object.values(product.images.men).some((url) => url)) {
      types.push(TShirtType.MEN);
    }
    if (Object.values(product.images.women).some((url) => url)) {
      types.push(TShirtType.WOMEN);
    }
    if (Object.values(product.images.kids).some((url) => url)) {
      types.push(TShirtType.KIDS);
    }
    if (Object.values(product.images.oversized).some((url) => url)) {
      types.push(TShirtType.OVERSIZED);
    }

    return types;
  };

  const setProductFromFirebase = async () => {
    const product = await getProductById(productId ?? '');

    if (product) {
      const tShirtTypes = getTShirtTypes(product);
      const firstAvailableColor = getFirstAvailableColor(
        product.images[tShirtTypes[0]]
      );

      setTShirtTypes(tShirtTypes as TShirtType[]);
      setSelectedType(tShirtTypes[0] as TShirtType);
      setSelectedColor(firstAvailableColor);
      setProduct(product);
    }
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

  const selectColor = (color: TShirtColor) => {
    setSelectedColor(color);

    if (selectedColor !== color) {
      setImageHasLoaded(false);
    }
  };

  const selectType = (type: TShirtType) => {
    setSelectedType(type);
    setSelectedColor(getFirstAvailableColor(product!.images[type]));
  };

  const getFirstAvailableColor = (
    images: ImagesMen | ImagesWomen | ImagesKids | ImagesOversized
  ) => {
    for (const [color, url] of Object.entries(images)) {
      if (url) {
        return color as TShirtColor;
      }
    }
    return TShirtColor.WHITE;
  };

  const { discountedPrice } = state;

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
          tShirtTypes={tShirtTypes}
          selectedType={selectedType}
          onSelectType={selectType}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          selectedColor={selectedColor}
          onSelectColor={(color) => selectColor(color)}
          imageHasLoaded={imageHasLoaded}
          onImageLoad={() => setImageHasLoaded(true)}
          selectedQuantity={selectedQuantity}
          onGoBack={goBack}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          product={product}
          discountedPrice={discountedPrice}
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
