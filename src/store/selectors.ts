/**
 * Redux Selectors
 * Memoized selectors for derived state to prevent unnecessary re-renders
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

// ============================================================================
// Cart Selectors
// ============================================================================

/**
 * Select all cart items
 */
export const selectCartItems = (state: RootState) => state.cart.items;

/**
 * Select total number of items in cart (sum of all quantities)
 */
export const selectCartTotalItems = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

/**
 * Select total price of all items in cart
 */
export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

/**
 * Select specific cart item by product ID
 */
export const selectCartItemById = (productId: string) =>
  createSelector(
    [selectCartItems],
    (items) => items.find(item => item.product_id === productId)
  );

/**
 * Check if cart is empty
 */
export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0
);

// ============================================================================
// Auth Selectors
// ============================================================================

/**
 * Select authentication initialization status
 */
export const selectAuthIsInitialized = (state: RootState) => state.auth.isInitialized;

/**
 * Select authentication status
 */
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

/**
 * Select current user
 */
export const selectCurrentUser = (state: RootState) => state.auth.user;

/**
 * Select user's email (if authenticated)
 */
export const selectUserEmail = createSelector(
  [selectCurrentUser],
  (user) => user?.email ?? null
);

/**
 * Select user's full name (if available)
 */
export const selectUserFullName = createSelector(
  [selectCurrentUser],
  (user) => user?.firstName ? user.firstName : user?.email?.split('@')[0] ?? 'Guest'
);

// ============================================================================
// Products Selectors
// ============================================================================

/**
 * Select all products
 */
export const selectAllProducts = (state: RootState) => state.products.list;

/**
 * Select product by ID
 */
export const selectProductById = (productId: string) =>
  createSelector(
    [selectAllProducts],
    (products) => products.find(product => product.id === productId)
  );

