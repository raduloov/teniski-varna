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
import {
  defaultImageDetails,
  getDiscountedPrice,
  getDiscountForProduct,
  TShirtColor
} from '../containers/adminPanel/utils';
import { useDiscounts } from '../hooks/useDiscounts';

export const DetailsPage = () => {
  const [product, setProduct] = useState<Product>();
  const [tShirtTypes, setTShirtTypes] = useState<TShirtType[]>([]);
  const [selectedType, setSelectedType] = useState<TShirtType | null>(null);
  const [selectedSize, setSelectedSize] = useState<TShirtSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<TShirtColor>(
    TShirtColor.WHITE
  );
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [imageHasLoaded, setImageHasLoaded] = useState<boolean>(false);
  const [showSizeInfo, setShowSizeInfo] = useState<boolean>(false);
  const [showShippingInfo, setShowShippingInfo] = useState<boolean>(false);
  const [showMaterialsInfo, setShowMaterialsInfo] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const { getProductById, isLoading: isFetchingProduct } = useProducts();
  const { productId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { getDiscounts, isLoading: isFetchingDiscounts } = useDiscounts();

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
    const activeDiscounts = await getDiscounts();

    if (product) {
      const tShirtTypes = getTShirtTypes(product);
      const selectedType = state && state.type ? state.type : tShirtTypes[0];
      const selectedColor = determineSelectedColor(
        product.images[tShirtTypes[0]]
      );
      const discount = getDiscountForProduct(product, activeDiscounts);
      const discountedPrice = getDiscountedPrice(product.price, discount);

      setTShirtTypes(tShirtTypes as TShirtType[]);
      setSelectedType(selectedType);
      setSelectedColor(selectedColor);
      setDiscountedPrice(discountedPrice ?? null);
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
    setImageHasLoaded(false);
    setSelectedType(type);

    const images = product ? product.images[type] : defaultImageDetails[type];
    setSelectedColor(getFirstAvailableColor(images));
  };

  const determineSelectedColor = (
    images: ImagesMen | ImagesWomen | ImagesKids | ImagesOversized
  ) => {
    if (state && state.color) {
      return state.color;
    }
    return getFirstAvailableColor(images);
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

  const onShowShippingInfo = () => {
    setShowMaterialsInfo(false);
    setShowShippingInfo((state) => !state);
  };

  const onShowMaterialsInfo = () => {
    setShowShippingInfo(false);
    setShowMaterialsInfo((state) => !state);
  };

  if (isFetchingProduct || isFetchingDiscounts) {
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
          onShowSizeInfo={() => setShowSizeInfo((state) => !state)}
          showSizeInfo={showSizeInfo}
          onShowCart={() => setShowCart((state) => !state)}
          showCart={showCart}
          onShowShippingInfo={onShowShippingInfo}
          showShippingInfo={showShippingInfo}
          onShowMaterialsInfo={onShowMaterialsInfo}
          showMaterialsInfo={showMaterialsInfo}
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
