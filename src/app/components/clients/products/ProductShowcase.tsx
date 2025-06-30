'use client'
import ProductGrid from './ProductGrid';
import ContentSection from './ContentSection';

export default function ProductShowcase() {
  return (
    <div className="w-full bg-black py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <ProductGrid />
        <ContentSection />
      </div>
    </div>
  );
} 