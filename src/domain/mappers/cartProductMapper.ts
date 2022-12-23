import { TShirtSize } from './../models/ProductDTO';
import { Product } from '../models/ProductDTO';

export interface CartProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  size: TShirtSize;
  quantity: number;
}

export const mapProductToCartProduct = (
  product: Product,
  quantity: number,
  selectedSize: TShirtSize
): CartProduct => ({
  id: product.id,
  title: product.title,
  description: product.description,
  image: product.image,
  price: product.price,
  size: selectedSize,
  quantity: quantity
});
