import { Metadata } from 'next';
import { BITTER_KOLA_PRODUCTS } from '@/app/data/products/bitterKola';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = BITTER_KOLA_PRODUCTS.find((p) => p.id === params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found - Cyperus Enterprise',
    };
  }

  return {
    title: `${product.name} - Cyperus Enterprise`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return BITTER_KOLA_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export const dynamicParams = false; // Only use statically generated pages
