import { useState, useEffect, useMemo } from 'react';
import { mockProducts, Product } from '@/app/lib/mock-data';
import { FEATURED_PRODUCTS } from '@/app/components/clients/Landing-Page/featured/constants';

export function useProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Convert featured products to match Product interface
  const convertedFeaturedProducts: Product[] = useMemo(() => 
    FEATURED_PRODUCTS.map(product => ({
      id: product.id.toString(),
      name: product.name,
      description: product.name, // Use name as description for now
      category: product.name.split(':')[0].trim(), // Extract category from name
      price: product.price * 100, // Convert cedis to pesewas to match mockProducts format
      image_url: product.image,
      is_active: true,
      stock_quantity: 50, // Default stock
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })), 
    []
  );

  // Combine all products: mock products + featured products
  const ALL_PRODUCTS = useMemo(() => {
    const activeeMockProducts = mockProducts.filter(product => product.is_active);
    return [...activeeMockProducts, ...convertedFeaturedProducts];
  }, [convertedFeaturedProducts]);

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    
    return ALL_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [searchQuery, ALL_PRODUCTS]);

  // Set searching state when there's a query
  useEffect(() => {
    setIsSearching(searchQuery.trim().length > 0);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasResults: searchResults.length > 0,
  };
}
