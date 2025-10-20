import { Metadata } from 'next';
import ProductCategoryPage from '@/components/features/product/ProductCategoryPage';
import { CHOCONUT_PRODUCTS } from '@/app/data/products/choconut';

export const metadata: Metadata = {
  title: 'Choconut - Cyperus Enterprise',
  description: 'Explore our premium Choconut products - the perfect blend of chocolate and coconut flavors',
};

export default function ChoconutPage() {
  return (
    <ProductCategoryPage
      title="Choconut"
      description="Experience the rich, indulgent taste of our carefully crafted Choconut products. Each variety offers a unique blend of premium chocolate and coconut flavors."
      products={CHOCONUT_PRODUCTS}
      categoryPath="choconut"
    />
  );
}
