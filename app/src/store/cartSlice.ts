import { TShirtSize, TShirtType } from '../domain/models/ProductDTO';
import {
  CartProduct,
  mapProductToCartProduct
} from '../domain/mappers/cartProductMapper';
import { createSlice } from '@reduxjs/toolkit';
import { getLocalItems, cartItemExists } from './utils';

export type LocalItem = {
  id: string;
  color: string;
  image: string;
  size: TShirtSize;
  type: TShirtType;
};

export type InitialState = CartProduct[];

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
          payload.image,
          payload.selectedQuantity,
          payload.selectedSize,
          payload.selectedType
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
        image: product.image,
        size: product.size,
        type: product.type
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

      if (currentStateQuantity === 1 || payload.remove) {
        state.splice(stateIndex, 1);
        const filteredItems = localItems.filter(
          (item) => item.id !== payload.product.id
        );
        localStorage.setItem('cartItems', JSON.stringify(filteredItems));
      } else {
        state[stateIndex].quantity--;
        localItems.splice(localIndex, 1);
        localStorage.setItem('cartItems', JSON.stringify(localItems));
      }
    },
    clearCart: (state) => {
      state.splice(0, state.length);
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
  }
});

export const cartActions = cartSlice.actions;
