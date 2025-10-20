import { Metadata } from 'next';
import ProductCategoryPage from '@/components/features/product/ProductCategoryPage';
import { CITRUS_LIMON_CLOVE_PRODUCTS } from '@/app/data/products/citrusLimonClove';

export const metadata: Metadata = {
  title: 'Citrus Limon & Clove - Cyperus Enterprise',
  description: 'Explore our premium Citrus Limon & Clove tigernut products',
};

export default function CitrusLimonClovePage() {
  return (
    <ProductCategoryPage
      title="Citrus Limon & Clove"
      description="Discover the unique combination of citrus and clove in our premium tigernut products, offering a sophisticated flavor experience."
      products={CITRUS_LIMON_CLOVE_PRODUCTS}
      categoryPath="citrus-limon-clove"
    />
  );
}
