import { Metadata } from 'next';
import ProductCategoryPage from '@/components/features/product/ProductCategoryPage';
import { BITTER_KOLA_PRODUCTS } from '@/app/data/products/bitterKola';

export const metadata: Metadata = {
  title: 'Bitter Kola - Cyperus Enterprise',
  description: 'Explore our premium Bitter Kola products',
};

export default function BitterKolaPage() {
  return (
    <ProductCategoryPage
      title="Bitter Kola"
      description="Discover our premium Bitter Kola tigernut products, known for their unique and distinctive taste."
      products={BITTER_KOLA_PRODUCTS}
      categoryPath="bitter-kola"
    />
  );
}

