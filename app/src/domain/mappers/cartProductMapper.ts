import { TShirtColor } from '../../containers/adminPanel/utils';
import { TShirtSize, TShirtType } from '../models/ProductDTO';
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
  type: TShirtType;
}

export interface MYPOSProduct {
  article: string;
  quantity: number;
  price: number;
  currency: string;
}

export const mapProductToCartProduct = (
  product: Product,
  color: TShirtColor,
  image: string,
  quantity: number,
  selectedSize: TShirtSize,
  selectedType: TShirtType,
  discountedPrice?: number
): CartProduct => ({
  id: product.id,
  title: product.title,
  description: product.description,
  image,
  price: discountedPrice ?? product.price,
  color,
  size: selectedSize,
  quantity,
  type: selectedType
});

export const mapCartItemsToMyPosProduct = (
  cartItems: CartProduct[]
): MYPOSProduct[] =>
  cartItems.map(
    (item: CartProduct): MYPOSProduct => ({
      article: item.title,
      quantity: item.quantity,
      price: item.price,
      currency: 'BGN'
    })
  );
