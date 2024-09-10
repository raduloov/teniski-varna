import { createSlice } from '@reduxjs/toolkit';
import { Discount } from '../hooks/useDiscounts';

type InitialState = {
  activeDiscounts: Array<Discount>;
};

const initialState: InitialState = { activeDiscounts: [] };

export const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    setActiveDiscounts: (state, { payload }) => {
      const activeDiscounts = payload.filter(
        (discount: Discount) => discount.active
      );

      state.activeDiscounts = activeDiscounts;
    }
  }
});

export const discountActions = discountSlice.actions;
