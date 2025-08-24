import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/lib/mock-data';
import { ShoppingCart } from 'lucide-react';

interface SearchResultsProps {
  results: Product[];
  isVisible: boolean;
  onClose: () => void;
}

export default function SearchResults({ results, isVisible, onClose }: SearchResultsProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-black border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
      {results.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No products found
        </div>
      ) : (
        <div className="py-2">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="flex items-center gap-3 p-3 hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0"
              onClick={onClose}
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={product.image_url || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-300 truncate">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-semibold text-[#EFE554]">
                    ₵{(product.price / 100).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {product.category}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Stock: {product.stock_quantity}
                </div>
              </div>
              <div className="flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-[#EFE554] transition-colors" />
              </div>
            </Link>
          ))}
          {results.length > 5 && (
            <div className="p-3 text-center border-t border-gray-700">
              <Link
                href="/products"
                className="text-sm text-[#EFE554] hover:text-white font-medium transition-colors"
                onClick={onClose}
              >
                View all products →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
