import { Product } from '@/app/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  categoryPath?: string;
}

export default function ProductGrid({ products, categoryPath = 'bitter-kola' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} categoryPath={categoryPath} />
      ))}
    </div>
  );
}
