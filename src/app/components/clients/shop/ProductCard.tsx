import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/data/products/bitterKola';
import { TiShoppingCart } from 'react-icons/ti';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = `GH₵${product.price.toFixed(2)}`;

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden group border border-gray-800 p-3 hover:border-[#EFE554] transition-colors duration-300">
      <Link href={`/bitter-kola/${product.id}`}>
        <div className="relative h-[200px] w-full rounded-lg overflow-hidden bg-gray-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-3 flex flex-col items-center">
        <h3 className="text-white text-lg font-semibold text-center h-[60px] m-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[#EFE554] text-xl font-bold text-center mt-2">
          {formattedPrice}
        </p>
        <button 
          className={`w-full flex flex-row justify-center relative py-3 rounded font-semibold overflow-hidden group border transition-colors duration-300 ${
            product.stock > 0 
              ? 'border-[#EFE554] text-white hover:bg-[#EFE554] hover:text-black' 
              : 'border-gray-600 text-gray-500 cursor-not-allowed'
          }`}
          disabled={product.stock === 0}
        >
          <span className="flex items-center justify-center gap-2">
            <TiShoppingCart className="text-xl" />
            {product.stock > 0 ? 'ADD TO BASKET' : 'OUT OF STOCK'}
          </span>
        </button>
      </div>
    </div>
  );
}
