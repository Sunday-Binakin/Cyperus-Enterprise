import { Metadata } from 'next';
import ProductCategoryPage from '@/components/features/product/ProductCategoryPage';
import { ORIGINAL_PRODUCTS } from '@/app/data/products/original';

export const metadata: Metadata = {
  title: 'Original - Cyperus Enterprise',
  description: 'Explore our premium Original tigernut products',
};

export default function OriginalPage() {
  return (
    <ProductCategoryPage
      title="Original"
      description="Explore our premium Original tigernut products with authentic natural flavors."
      products={ORIGINAL_PRODUCTS}
      categoryPath="original"
    />
  );
}
