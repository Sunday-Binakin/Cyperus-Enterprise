import { useState, useEffect, useMemo } from 'react';
import { ORIGINAL_PRODUCTS } from '@/app/data/products/original';
import { CHOCONUT_PRODUCTS } from '@/app/data/products/choconut';
import { BITTER_KOLA_PRODUCTS } from '@/app/data/products/bitterKola';
import { GINGER_PRODUCTS } from '@/app/data/products/ginger';
import { LEMON_GRASS_PRODUCTS } from '@/app/data/products/lemonGrass';
import { CITRUS_LIMON_CLOVE_PRODUCTS } from '@/app/data/products/citrusLimonClove';
import type { Product } from '@/app/types/product';

// Category path mapping for navigation
const CATEGORY_PATH_MAP: Record<string, string> = {
  'Original': 'original',
  'Choconut': 'choconut',
  'Bitter Kola': 'bitter-kola',
  'Ginger': 'ginger',
  'Lemon Grass': 'lemon-grass',
  'Citrus Limon & Clove': 'citrus-limon-clove',
};

export function useProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Combine all products from all categories
  const ALL_PRODUCTS: Product[] = useMemo(() => {
    return [
      ...ORIGINAL_PRODUCTS,
      ...CHOCONUT_PRODUCTS,
      ...BITTER_KOLA_PRODUCTS,
      ...GINGER_PRODUCTS,
      ...LEMON_GRASS_PRODUCTS,
      ...CITRUS_LIMON_CLOVE_PRODUCTS,
    ];
  }, []);

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    
    return ALL_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.netWeight && product.netWeight.toLowerCase().includes(query))
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
    getCategoryPath: (category: string) => CATEGORY_PATH_MAP[category] || 'products',
  };
}
