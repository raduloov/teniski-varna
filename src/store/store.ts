import { createSlice, configureStore } from '@reduxjs/toolkit';

export type InitialStateType = {
  id: string;
  quantity: number;
}[];

const initialState: InitialStateType = [];

const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, item) => {
      state.push(item.payload);
    },
    removeFromCart: (state, item) => {
      const id = item.payload;
      state.filter((item) => item.id !== id);
    }
  }
});
export const userActions = userSlice.actions;
export const store = configureStore({ reducer: { cart: userSlice.reducer } });
