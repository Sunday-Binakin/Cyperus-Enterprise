import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  product_id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  inventory: number;
  rating?: number;
  reviews?: number;
  featured?: boolean;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating';
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  categories: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  selectedCategory: 'all',
  sortBy: 'name',
};

// Mock products data
const mockProducts: Product[] = [
  {
    product_id: '1',
    name: 'Premium Ginger Powder',
    price: 299,
    image: '/images/clients/products/ginger.jpg',
    description: 'High-quality organic ginger powder for cooking and health benefits.',
    category: 'Spices',
    inventory: 50,
    rating: 4.8,
    reviews: 124,
    featured: true,
  },
  {
    product_id: '2',
    name: 'Coconut Oil Extract',
    price: 450,
    image: '/images/clients/products/coconut.jpg',
    description: 'Pure coconut oil extracted using traditional methods.',
    category: 'Oils',
    inventory: 30,
    rating: 4.6,
    reviews: 89,
    featured: true,
  },
  {
    product_id: '3',
    name: 'Turmeric Capsules',
    price: 599,
    image: '/images/clients/products/turmeric.jpg',
    description: 'Natural turmeric supplements for anti-inflammatory benefits.',
    category: 'Supplements',
    inventory: 75,
    rating: 4.9,
    reviews: 203,
    featured: false,
  },
  {
    product_id: '4',
    name: 'Organic Honey',
    price: 350,
    image: '/images/clients/products/honey.jpg',
    description: 'Raw organic honey harvested from local beekeepers.',
    category: 'Natural Sweeteners',
    inventory: 40,
    rating: 4.7,
    reviews: 156,
    featured: true,
  },
  {
    product_id: '5',
    name: 'Moringa Powder',
    price: 399,
    image: '/images/clients/products/moringa.jpg',
    description: 'Nutrient-rich moringa leaf powder for daily wellness.',
    category: 'Superfoods',
    inventory: 60,
    rating: 4.5,
    reviews: 78,
    featured: false,
  },
];

// Async thunk to load products (simulates API call)
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProducts;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set search term and filter products
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      filterProducts(state);
    },
    
    // Set selected category and filter products
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      filterProducts(state);
    },
    
    // Set sort order and sort products
    setSortBy: (state, action: PayloadAction<ProductsState['sortBy']>) => {
      state.sortBy = action.payload;
      sortProducts(state);
    },
    
    // Update product inventory (for purchase simulation)
    updateInventory: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find(p => p.product_id === productId);
      if (product && product.inventory >= quantity) {
        product.inventory -= quantity;
        // Also update in filtered items
        const filteredProduct = state.filteredItems.find(p => p.product_id === productId);
        if (filteredProduct) {
          filteredProduct.inventory -= quantity;
        }
      }
    },
    
    // Clear all filters
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = 'all';
      state.sortBy = 'name';
      filterProducts(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.categories = [...new Set(action.payload.map(p => p.category))];
        filterProducts(state);
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load products';
      });
  },
});

// Helper function to filter products
function filterProducts(state: ProductsState) {
  let filtered = [...state.items];
  
  // Filter by search term
  if (state.searchTerm) {
    const term = state.searchTerm.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }
  
  // Filter by category
  if (state.selectedCategory !== 'all') {
    filtered = filtered.filter(product => product.category === state.selectedCategory);
  }
  
  state.filteredItems = filtered;
  sortProducts(state);
}

// Helper function to sort products
function sortProducts(state: ProductsState) {
  switch (state.sortBy) {
    case 'name':
      state.filteredItems.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price-low':
      state.filteredItems.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      state.filteredItems.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      state.filteredItems.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
  }
}

// Selectors
export const selectAllProducts = (state: { products: ProductsState }) => state.products.items;
export const selectFilteredProducts = (state: { products: ProductsState }) => state.products.filteredItems;
export const selectProductsLoading = (state: { products: ProductsState }) => state.products.isLoading;
export const selectProductsError = (state: { products: ProductsState }) => state.products.error;
export const selectProductCategories = (state: { products: ProductsState }) => state.products.categories;
export const selectSearchTerm = (state: { products: ProductsState }) => state.products.searchTerm;
export const selectSelectedCategory = (state: { products: ProductsState }) => state.products.selectedCategory;
export const selectSortBy = (state: { products: ProductsState }) => state.products.sortBy;
export const selectFeaturedProducts = (state: { products: ProductsState }) => 
  state.products.items.filter(product => product.featured);
export const selectProductById = (productId: string) => (state: { products: ProductsState }) =>
  state.products.items.find(product => product.product_id === productId);

export const {
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  updateInventory,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
