import { createSlice } from '@reduxjs/toolkit';

export type InitialState = {
  searchTerm: string;
};

const initialState: InitialState = {
  searchTerm: ''
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.searchTerm = payload;
    }
  }
});

export const searchActions = searchSlice.actions;
