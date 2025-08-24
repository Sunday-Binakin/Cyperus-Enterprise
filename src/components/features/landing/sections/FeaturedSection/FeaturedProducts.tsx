'use client'
import { FEATURED_PRODUCTS } from './constants';
import ProductCard from './ProductCard';
import Link from 'next/link';

export default function FeaturedProducts() {
  // Get first 4 products for mobile view
  const mobileProducts = FEATURED_PRODUCTS.slice(0, 4);

  return (
    <div className="w-full bg-black py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <p className="text-[#EFE554] text-lg font-medium mb-4">Our Signature Tigernut Products</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold">
            Tigernut Goodness, The Cyperus Way
            </h2>
        </div>

        {/* Mobile View - Only first 4 products */}
        <div className="md:hidden space-y-4">
          {mobileProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
          
          {/* View All Featured Button for Mobile */}
          <div className="mt-6 flex justify-center">
            <Link 
              href="/" 
              className="w-full max-w-sm mx-auto block text-center border border-gray-300 text-white py-3 px-6 rounded-lg hover:bg-gray-800 hover:border-[#EFE554] transition-all duration-300"
            >
              View All Featured Products
            </Link>
          </div>
        </div>

        {/* Desktop View - All products in grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}