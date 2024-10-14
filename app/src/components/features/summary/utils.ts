import { CartProduct } from '../../../domain/mappers/cartProductMapper';

export const flattenItems = (cartItems: CartProduct[]): CartProduct[] =>
  cartItems.flatMap((product) => {
    const quantity = product.quantity;
    const items = Array.from({ length: quantity }, () => product);
    return items;
  });
