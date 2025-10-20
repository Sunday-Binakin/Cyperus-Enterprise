'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import ProductGrid from '@/components/features/product/ProductGrid';
import { ORIGINAL_PRODUCTS } from '@/app/data/products/original';
import { CHOCONUT_PRODUCTS } from '@/app/data/products/choconut';
import { BITTER_KOLA_PRODUCTS } from '@/app/data/products/bitterKola';
import { GINGER_PRODUCTS } from '@/app/data/products/ginger';
import { LEMON_GRASS_PRODUCTS } from '@/app/data/products/lemonGrass';
import { CITRUS_LIMON_CLOVE_PRODUCTS } from '@/app/data/products/citrusLimonClove';
import { Product } from '@/app/types/product';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Combine all products
  const allProducts: Product[] = useMemo(() => [
    ...ORIGINAL_PRODUCTS,
    ...CHOCONUT_PRODUCTS,
    ...BITTER_KOLA_PRODUCTS,
    ...GINGER_PRODUCTS,
    ...LEMON_GRASS_PRODUCTS,
    ...CITRUS_LIMON_CLOVE_PRODUCTS,
  ], []);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return allProducts;
    }
    return allProducts.filter(product => product.category === selectedCategory);
  }, [selectedCategory, allProducts]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)));
    return ['All', ...uniqueCategories];
  }, [allProducts]);

  // Get category path mapping
  const getCategoryPath = (category: string) => {
    const pathMap: Record<string, string> = {
      'Original': 'original',
      'Choconut': 'choconut',
      'Bitter Kola': 'bitter-kola',
      'Ginger': 'ginger',
      'Lemon Grass': 'lemon-grass',
      'Citrus Limon & Clove': 'citrus-limon-clove',
    };
    return pathMap[category] || 'products';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/clients/hero/slider1.JPG)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="container mx-auto px-4">
              {/* Breadcrumb Navigation */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">All Products</h1>
              <nav className="flex mb-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li className="inline-flex items-center">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-white">
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </Link>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <ChevronRight className="w-4 h-4 mx-1 text-gray-300" />
                      <span className="ml-1 text-sm font-medium text-white md:ml-2">Products</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Browse Our Products</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#EFE554] text-black shadow-lg scale-105'
                    : 'bg-gray-800 text-white border border-gray-700 hover:border-[#EFE554] hover:text-[#EFE554]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="text-gray-400">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        <ProductGrid 
          products={filteredProducts} 
          categoryPath={selectedCategory === 'All' ? 'products' : getCategoryPath(selectedCategory)}
        />
      </div>
    </div>
  );
}
