'use client';

import { notFound, useParams } from 'next/navigation';
import { CHOCONUT_PRODUCTS } from '@/app/data/products/choconut';
import { ClientOnly } from '@/app/components/clients/ClientOnly';
import { Breadcrumb } from '@/app/components/clients/shop/product-detail/Breadcrumb';
import { ProductImage } from '@/app/components/clients/shop/product-detail/ProductImage';
import { ProductInfo } from '@/app/components/clients/shop/product-detail/ProductInfo';
import { ProductTabs } from '@/app/components/clients/shop/product-detail/ProductTabs';
import { RelatedProducts } from '@/app/components/clients/shop/product-detail/RelatedProducts';
import { ProductDetailSkeleton } from '@/app/components/clients/shop/product-detail/ProductDetailSkeleton';

// This is the client component that renders the product page
function ProductDetailContent() {
  const params = useParams();
  const product = CHOCONUT_PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Choconut', href: '/choconut' },
    { label: product.name, href: ``, active: true },
  ];

  // Mock reviews data - in a real app, this would come from your backend
  const mockReviews = [
    {
      id: '1',
      user: 'Sarah M.',
      rating: 5,
      comment: 'Amazing choconut! The perfect balance of chocolate and coconut flavors.',
      date: '2024-01-15',
    },
    {
      id: '2',
      user: 'Mike R.',
      rating: 4,
      comment: 'Great quality and taste. Would definitely recommend to choconut lovers.',
      date: '2024-01-10',
    },
    {
      id: '3',
      user: 'Lisa K.',
      rating: 5,
      comment: 'Best choconut I have ever tasted! Rich flavor and premium quality.',
      date: '2024-01-08',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid lg:grid-cols-2 gap-12 mt-8">
          <ProductImage src={product.image} alt={product.name} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs 
          reviews={mockReviews}
          description="Our premium Choconut products are crafted with the finest ingredients, combining rich chocolate flavors with the tropical essence of coconut. Each product is carefully processed to maintain maximum flavor and nutritional value."
        />

        <RelatedProducts products={CHOCONUT_PRODUCTS} currentProductId={product.id} categoryPath="choconut" />
      </div>
    </div>
  );
}

// This is the main page component that uses ClientOnly wrapper
export default function ChoconutProductPage() {
  return (
    <ClientOnly fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent />
    </ClientOnly>
  );
}
