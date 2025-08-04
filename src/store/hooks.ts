import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';
import { selectCartItems, selectCartTotalItems, selectCartTotalPrice } from './cartSlice';
import { selectAllProducts, selectFilteredProducts, selectProductsLoading, selectProductsError, selectProductCategories, selectSearchTerm, selectSelectedCategory, selectSortBy } from './productsSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Cart hooks
export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return {
    cartItems,
    totalItems,
    totalPrice,
    dispatch,
  };
};

// Products hooks
export const useProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const categories = useAppSelector(selectProductCategories);
  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const sortBy = useAppSelector(selectSortBy);

  return {
    products,
    filteredProducts,
    isLoading,
    error,
    categories,
    searchTerm,
    selectedCategory,
    sortBy,
    dispatch,
  };
};

// Auth hooks
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const user = authState?.user ?? null;
  const isAuthenticated = !!user;
  const isLoading = authState?.isLoading ?? false;
  const error = authState?.error ?? null;

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    dispatch,
  };
};
