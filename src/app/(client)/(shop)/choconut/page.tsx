import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import ProductGrid from '@/app/components/clients/shop/ProductGrid';
import { CHOCONUT_PRODUCTS } from '@/app/data/products/choconut';

export const metadata: Metadata = {
  title: 'Choconut - Cyperus Enterprise',
  description: 'Explore our premium Choconut products - the perfect blend of chocolate and coconut flavors',
};

export default function ChoconutPage() {
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
              {/* Page Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Choconut</h1>
              
              {/* Breadcrumb Navigation */}
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
                      <span className="ml-1 text-sm font-medium text-white md:ml-2">Choconut</span>
                    </div>
                  </li>
                </ol>
              </nav>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                Discover the perfect harmony of chocolate and coconut in our premium Choconut collection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Choconut Products</h2>
          <div className="w-24 h-1 bg-[#EFE554] mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience the rich, indulgent taste of our carefully crafted Choconut products. 
            Each variety offers a unique blend of premium chocolate and coconut flavors.
          </p>
        </div>
        <ProductGrid products={CHOCONUT_PRODUCTS} categoryPath="choconut" />
      </div>
    </div>
  );
}
