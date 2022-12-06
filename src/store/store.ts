import { createSlice, configureStore } from '@reduxjs/toolkit';

export type InitialStateType = {
  id: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}[];

const initialState: InitialStateType = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, item) => {
      const product = {
        id: item.payload.product.id,
        description: item.payload.product.description,
        image: item.payload.product.image,
        price: item.payload.product.price,
        quantity: item.payload.selectedQuantity
      };
      if (!state.find((item) => item.id === product.id)) state.push(product);
      else {
        const index = state.findIndex((item) => item.id === product.id);
        state[index].quantity++;
      }
    },
    removeFromCart: (state, item) => {
      console.log(item);
      const index = state.findIndex(
        (product) => product.id === item.payload.product.id
      );
      const currentQuantity = state.find(
        (product) => product.id === item.payload.product.id
      )?.quantity;
      if (currentQuantity === 1) {
        state.splice(index, 1);
      } else {
        state[index].quantity--;
      }
    }
  }
});
export const userActions = cartSlice.actions;
export const store = configureStore({ reducer: cartSlice.reducer });
