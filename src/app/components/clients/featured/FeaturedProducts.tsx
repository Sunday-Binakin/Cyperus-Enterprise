'use client'
import { FEATURED_PRODUCTS } from './constants';
// import { TiShoppingCart } from "react-icons/ti";

import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  return (
    <div className="w-full bg-black py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#EFE554] text-lg font-medium mb-4">OUR FEATURED TIGERNUTS PRODUCTS</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold">
            A Sneek Peak At Our Nutty Goodness
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
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