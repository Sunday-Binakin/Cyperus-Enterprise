import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  image: string;
  inventory: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

// Load cart from localStorage (SSR-safe)
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('cyperus_cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage (SSR-safe)
const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('cyperus_cart', JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Load cart from localStorage on app start
    loadCart: (state) => {
      state.items = loadCartFromStorage();
    },
    
    // Add item to cart
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.product_id === action.payload.product_id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      saveCartToStorage(state.items);
    },
    
    // Update item quantity
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.product_id !== productId);
      } else {
        const item = state.items.find(item => item.product_id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
      
      saveCartToStorage(state.items);
    },
    
    // Remove item from cart
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product_id !== action.payload);
      saveCartToStorage(state.items);
    },
    
    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
    
    // Toggle cart popover
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    // Set cart popover state
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;
export const selectCartTotalItems = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export const {
  loadCart,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
