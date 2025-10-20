import { Metadata } from 'next';
import ProductCategoryPage from '@/components/features/product/ProductCategoryPage';
import { LEMON_GRASS_PRODUCTS } from '@/app/data/products/lemonGrass';

export const metadata: Metadata = {
  title: 'Lemon Grass - Cyperus Enterprise',
  description: 'Explore our premium Lemon Grass tigernut products',
};

export default function LemonGrassPage() {
  return (
    <ProductCategoryPage
      title="Lemon Grass"
      description="Refresh yourself with our Lemon Grass tigernut products, featuring a bright and citrusy flavor profile."
      products={LEMON_GRASS_PRODUCTS}
      categoryPath="lemon-grass"
    />
  );
}
