import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem { id: string; qty: number }
export interface CartState { items: CartItem[] }

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) existing.qty += action.payload.qty; else state.items.push(action.payload);
    },
    clearCart(state) { state.items = []; },
  },
});

export const { addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;