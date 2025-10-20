'use client';

import { notFound, useParams } from 'next/navigation';
import { BITTER_KOLA_PRODUCTS } from '@/app/data/products/bitterKola';
import { ClientOnly } from '@/components/shared/ClientOnly';
import { Breadcrumb } from '@/components/features/product/product-detail/Breadcrumb';
import { ProductImage } from '@/components/features/product/product-detail/ProductImage';
import { ProductInfo } from '@/components/features/product/product-detail/ProductInfo';
import { ProductTabs } from '@/components/features/product/product-detail/ProductTabs';
import { RelatedProducts } from '@/components/features/product/product-detail/RelatedProducts';
import { ProductDetailSkeleton } from '@/components/features/product/product-detail/ProductDetailSkeleton';

// This is the client component that renders the product page
function ProductDetailContent() {
  const params = useParams();
  const product = BITTER_KOLA_PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Bitter Kola', href: '/bitter-kola' },
    { label: product.name, href: ``, active: true },
  ];

  // Mock reviews data - in a real app, this would come from your backend
  const mockReviews = [
    {
      id: '1',
      user: 'John Doe',
      rating: 5,
      comment: 'Amazing product! The quality is outstanding and it arrived quickly.',
      date: 'July 5, 2023',
    },
    {
      id: '2',
      user: 'Jane Smith',
      rating: 4,
      comment: 'Very good product. Would recommend to others.',
      date: 'June 28, 2023',
    },
  ];

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Product Details */}
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 p-6">
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo product={product} />
          </div>
          
          {/* Product Tabs */}
          <div className="border-t border-gray-800 px-6 py-8">
            <ProductTabs 
              description={product.description} 
              reviews={mockReviews} 
            />
          </div>
          
          {/* Related Products */}
          <div className="border-t border-gray-800 py-12 px-6">
            <RelatedProducts 
              products={BITTER_KOLA_PRODUCTS} 
              currentProductId={product.id} 
              categoryPath="bitter-kola"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// This is the main component that wraps everything
export default function ProductDetailPage() {
  return (
    <ClientOnly fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent />
    </ClientOnly>
  );
}
