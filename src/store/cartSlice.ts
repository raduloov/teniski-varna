import {
  CartProduct,
  mapProductToCartProduct
} from './../domain/mappers/cartProductMapper';
import { createSlice } from '@reduxjs/toolkit';

export type InitialState = Array<CartProduct>;

const initialState: InitialState = [];

const getLocalItems = (): CartProduct[] =>
  JSON.parse(localStorage.getItem('cartItems') ?? '[]');

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fillCartFromLocalStorage: (state) => {
      const localItems = getLocalItems();

      localItems.forEach((localItem) => {
        if (!state.find((item) => item.id === localItem.id)) {
          state.push(localItem);
        }
      });
    },
    addToCart: (state, { payload }) => {
      const product: CartProduct = mapProductToCartProduct(
        payload.product,
        payload.selectedQuantity,
        payload.selectedSize
      );

      const localItems = getLocalItems();
      const itemExistsInState = state.find(
        (item) => item.id === product.id && item.size === product.size
      );
      const itemExistsInLocalStorage = localItems.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (!itemExistsInState && !itemExistsInLocalStorage) {
        state.push(product);
        localItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(localItems));
      } else {
        const stateIndex = state.findIndex(
          (item) => item.id === product.id && item.size === product.size
        );
        state[stateIndex].quantity++;
        const localIndex = localItems.findIndex(
          (item) => item.id === product.id && item.size === product.size
        );
        localItems[localIndex].quantity++;
        localStorage.setItem('cartItems', JSON.stringify(localItems));
      }
    },
    removeFromCart: (state, { payload }) => {
      const localItems = getLocalItems();
      const stateIndex = state.findIndex(
        (item) => item.id === payload.item.id && item.size === payload.item.size
      );
      const currentStateQuantity = state[stateIndex].quantity;
      const localIndex = localItems.findIndex(
        (item) => item.id === payload.item.id && item.size === payload.item.size
      );
      const currentLocalQuantity = localItems[localIndex].quantity;

      if (currentStateQuantity === 1 && currentLocalQuantity === 1) {
        state.splice(stateIndex, 1);
        localItems.splice(localIndex, 1);
        localStorage.setItem('cartItems', JSON.stringify(localItems));
      } else {
        state[stateIndex].quantity--;
        localItems[localIndex].quantity--;
        localStorage.setItem('cartItems', JSON.stringify(localItems));
      }
    }
  }
});

export const cartActions = cartSlice.actions;
