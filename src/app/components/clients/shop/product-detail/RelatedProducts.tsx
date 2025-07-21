import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/types/product';
import { TiShoppingCart } from 'react-icons/ti';

type RelatedProductsProps = {
  products: Product[];
  currentProductId: string;
  categoryPath?: string;
};

export function RelatedProducts({ products, currentProductId, categoryPath = 'bitter-kola' }: RelatedProductsProps) {
  // Filter out the current product and get up to 4 related products
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#EFE554] transition-colors duration-300">
              <Link href={`/${categoryPath}/${product.id}`} className="block">
                <div className="relative h-[200px] w-full rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 p-2"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  />
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2 flex flex-col items-center">
                  <h3 className="text-white text-lg font-semibold text-center line-clamp-2">
                  {/* <h3 className="text-white text-lg font-semibold text-center h-[60px] line-clamp-2"> */}
                    {product.name}
                  </h3>
                  <p className="text-[#EFE554] text-xl font-bold text-center">
                    GH₵{product.price.toFixed(2)}
                  </p>
                  <div className="w-full flex flex-row justify-center relative text-white  rounded font-semibold overflow-hidden group">
                    <button 
                      className="relative z-10 transition-colors duration-300 flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add to cart functionality here
                      }}
                      aria-label="Add to cart"
                    >
                      <TiShoppingCart /><span className="ml-2 hover:text-[#EFE554]">ADD TO BASKET</span>
                    </button>
                    <div className="absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* <div className="mt-8 text-center">
          <Link 
            href="/bitter-kola" 
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-[#EFE554] hover:bg-[#d4ce4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EFE554] transition-colors"
          >
            View All Products
          </Link>
        </div> */}
      </div>
    </section>
  );
}
