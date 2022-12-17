import { Product } from '../models/ProductDTO';

export interface CartProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

export const mapProductToCartProduct = (
  product: Product,
  quantity: number
): CartProduct => ({
  id: product.id,
  title: product.title,
  description: product.description,
  image: product.image,
  price: product.price,
  quantity: quantity
});
