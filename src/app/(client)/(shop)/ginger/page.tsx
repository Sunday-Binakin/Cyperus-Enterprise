import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import ProductGrid from '@/app/components/clients/shop/ProductGrid';
import { GINGER_PRODUCTS } from '@/app/data/products/ginger';

export const metadata: Metadata = {
  title: 'Ginger - Cyperus Enterprise',
  description: 'Explore our premium Ginger tigernut products',
};

export default function GingerPage() {
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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Ginger</h1>
              <nav className="flex  mb-6" aria-label="Breadcrumb">
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
                      <span className="ml-1 text-sm font-medium text-white md:ml-2">Ginger</span>
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
          <h2 className="text-3xl font-bold text-white mb-4">Our Ginger Products</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        <ProductGrid products={GINGER_PRODUCTS} categoryPath="ginger" />
      </div>
    </div>
  );
}
