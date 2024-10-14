import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './cartSlice';
import { searchSlice } from './searchSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    search: searchSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
