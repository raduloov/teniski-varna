import { TShirtSize } from './../domain/models/ProductDTO';
import {
  CartProduct,
  mapProductToCartProduct
} from './../domain/mappers/cartProductMapper';
import { createSlice } from '@reduxjs/toolkit';
import { getLocalItems, cartItemExists } from './utils';

export type LocalItem = {
  id: string;
  color: string;
  size: TShirtSize;
};

export type InitialState = Array<CartProduct>;

const initialState: InitialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fillCart: (state, { payload }) => {
      Object.assign(state, payload);
    },
    addToCart: (state, { payload }) => {
      let product: CartProduct;
      if (!payload.selectedQuantity || !payload.selectedSize) {
        product = payload.product;
      } else {
        product = mapProductToCartProduct(
          payload.product,
          payload.selectedColor,
          payload.selectedQuantity,
          payload.selectedSize
        );
      }

      const localItems = getLocalItems();
      const itemExistsInState = state.find((item) =>
        cartItemExists(item, product)
      );
      const itemExistsInLocalStorage = localItems.find((localItem) =>
        cartItemExists(localItem, product)
      );

      const localItem: LocalItem = {
        id: product.id,
        color: product.color,
        size: product.size
      };

      if (!itemExistsInState && !itemExistsInLocalStorage) {
        state.push(product);
        localItems.push(localItem);
        localStorage.setItem('cartItems', JSON.stringify(localItems));
      } else {
        const stateIndex = state.findIndex((item) =>
          cartItemExists(item, product)
        );
        state[stateIndex].quantity++;
        localItems.push(localItem);
        localStorage.setItem('cartItems', JSON.stringify(localItems));
      }
    },
    removeFromCart: (state, { payload }) => {
      const localItems = getLocalItems();
      const stateIndex = state.findIndex((item) =>
        cartItemExists(item, payload.product)
      );
      const currentStateQuantity = state[stateIndex].quantity;
      const localIndex = localItems.findIndex((item) =>
        cartItemExists(item, payload.product)
      );

      if (currentStateQuantity === 1) {
        state.splice(stateIndex, 1);
        localItems.splice(localIndex, 1);
        localStorage.setItem('cartItems', JSON.stringify(localItems));
      } else {
        state[stateIndex].quantity--;
        localItems.splice(localIndex, 1);
        localStorage.setItem('cartItems', JSON.stringify(localItems));
      }
    }
  }
});

export const cartActions = cartSlice.actions;
