import { CartProduct } from '../domain/mappers/cartProductMapper';
import { LocalItem } from './cartSlice';

export const getLocalItems = (): LocalItem[] =>
  JSON.parse(localStorage.getItem('cartItems') ?? '[]');

export const cartItemExists = (
  item: CartProduct | LocalItem,
  payload: CartProduct
): boolean =>
  item.id === payload.id &&
  item.size === payload.size &&
  item.color === payload.color;
