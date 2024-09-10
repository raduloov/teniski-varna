import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './cartSlice';
import { discountSlice } from './discountSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    discounts: discountSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
