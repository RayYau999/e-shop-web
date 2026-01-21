import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from "../feature/type/EShopCommonTypes";
import { ReactNode } from "react";

interface CartState {
    items: Product[];
    length: number;
}

export const initialState: CartState = { items: [], length: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      state.length = state.items.length;
    },
    clearItems: (state) => {
        state.items = [];
    }
  }
});

export const { addItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;