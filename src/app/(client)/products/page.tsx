'use client';

import { useState, useEffect } from 'react';
import { productService } from '@/app/lib/product-service';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  inventory: number;
  is_active: boolean;
  variants?: Variant[];
}

interface Variant {
  id: string;
  product_id: string;
  name: string;
  price_modifier: number;
  inventory: number;
  is_active: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, isLoading: cartLoading } = useCart();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts({
        category: selectedCategory || undefined,
        limit: 50
      });
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }

    try {
      setLoading(true);
      const data = await productService.searchProducts(searchQuery);
      setProducts(data || []);
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Failed to search products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product: Product, variant?: Variant) => {
    try {
      const finalPrice = variant 
        ? product.price + variant.price_modifier 
        : product.price;

      await addItem({
        product_id: product.id,
        variant_id: variant?.id,
        name: product.name,
        variant_name: variant?.name,
        price: finalPrice,
        image: product.image_url || '/placeholder-product.jpg',
        inventory: variant ? variant.inventory : product.inventory
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image_url || '/placeholder-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                {product.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-blue-600">
                    GH₵{product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.inventory}
                  </span>
                </div>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Variants:</p>
                    <div className="space-y-1">
                      {product.variants.filter(v => v.is_active).map((variant) => (
                        <div key={variant.id} className="flex items-center justify-between text-sm">
                          <span>{variant.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-medium">
                              +GH₵{variant.price_modifier.toFixed(2)}
                            </span>
                            <button
                              onClick={() => handleAddToCart(product, variant)}
                              disabled={cartLoading || variant.inventory === 0}
                              className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={cartLoading || product.inventory === 0}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {cartLoading ? 'Adding...' : product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
