import { TShirtColor } from './../../containers/adminPanel/utils';
import { ProductImages, TShirtSize } from './../models/ProductDTO';
import { Product } from '../models/ProductDTO';

export interface CartProduct {
  id: string;
  title: string;
  description: string;
  images: ProductImages;
  price: number;
  color: TShirtColor;
  size: TShirtSize;
  quantity: number;
}

export const mapProductToCartProduct = (
  product: Product,
  color: TShirtColor,
  quantity: number,
  selectedSize: TShirtSize
): CartProduct => ({
  id: product.id,
  title: product.title,
  description: product.description,
  images: product.images,
  price: product.price,
  color: color,
  size: selectedSize,
  quantity: quantity
});
