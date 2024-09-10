import { TShirtColor } from './../../containers/adminPanel/utils';
import { TShirtSize } from './../models/ProductDTO';
import { Product } from '../models/ProductDTO';

export interface CartProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  color: TShirtColor;
  size: TShirtSize;
  quantity: number;
}

export const mapProductToCartProduct = (
  product: Product,
  color: TShirtColor,
  image: string,
  quantity: number,
  selectedSize: TShirtSize,
  discountedPrice?: number
): CartProduct => ({
  id: product.id,
  title: product.title,
  description: product.description,
  image,
  price: discountedPrice ?? product.price,
  color,
  size: selectedSize,
  quantity
});
