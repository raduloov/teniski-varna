import {
  CartProduct,
  mapProductToCartProduct
} from './../domain/mappers/cartProductMapper';
import { createSlice } from '@reduxjs/toolkit';

export type InitialState = Array<CartProduct>;

const initialState: InitialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const product: CartProduct = mapProductToCartProduct(
        payload.product,
        payload.selectedQuantity
      );

      if (!state.find((item) => item.id === product.id)) {
        state.push(product);
      } else {
        const index = state.findIndex((item) => item.id === product.id);
        state[index].quantity++;
      }
    },
    removeFromCart: (state, { payload }) => {
      const index = state.findIndex(
        (product) => product.id === payload.product.id
      );
      const currentQuantity = state.find(
        (product) => product.id === payload.product.id
      )?.quantity;

      if (currentQuantity === 1) {
        state.splice(index, 1);
      } else {
        state[index].quantity--;
      }
    }
  }
});

export const cartActions = cartSlice.actions;
