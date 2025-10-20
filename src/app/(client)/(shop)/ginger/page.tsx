import { Metadata } from 'next';
import ProductCategoryPage from '@/components/features/product/ProductCategoryPage';
import { GINGER_PRODUCTS } from '@/app/data/products/ginger';

export const metadata: Metadata = {
  title: 'Ginger - Cyperus Enterprise',
  description: 'Explore our premium Ginger tigernut products',
};

export default function GingerPage() {
  return (
    <ProductCategoryPage
      title="Ginger"
      description="Experience the warming, spicy flavor of our Ginger tigernut products, perfect for those who love a zesty kick."
      products={GINGER_PRODUCTS}
      categoryPath="ginger"
    />
  );
}
