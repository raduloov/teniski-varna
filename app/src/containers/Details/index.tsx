import React from 'react';
import { ScreenSize, useScreenSize } from '../../hooks/useScreenSize';
import {
  Product,
  TShirtSize,
  TShirtType
} from '../../domain/models/ProductDTO';
import { TShirtColor } from '../adminPanel/utils';
import { DetailsContainerDesktop } from './DetailsContainerDesktop';
import { DetailsContainerMobile } from './DetailsContainerMobile';

export interface Props {
  product: Product;
  tShirtTypes: TShirtType[];
  discountedPrice: number | null;
  selectedType: TShirtType | null;
  onSelectType: (type: TShirtType) => void;
  selectedSize: TShirtSize | null;
  onSelectSize: (size: TShirtSize) => void;
  selectedColor: TShirtColor | null;
  onSelectColor: (color: TShirtColor) => void;
  imageHasLoaded: boolean;
  onImageLoad: () => void;
  selectedQuantity: number;
  onGoBack: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onShowSizeInfo: () => void;
  showSizeInfo: boolean;
  onShowShippingInfo: () => void;
  showShippingInfo: boolean;
  onShowMaterialsInfo: () => void;
  showMaterialsInfo: boolean;
  onToggleCart: () => void;
  showCart: boolean;
}

export const DetailsContainer = ({ ...props }: Props) => {
  const screenSize = useScreenSize();

  return screenSize === ScreenSize.LARGE ? (
    <DetailsContainerDesktop {...props} />
  ) : (
    <DetailsContainerMobile {...props} />
  );
};
