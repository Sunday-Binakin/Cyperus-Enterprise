import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/types/product';
import { TiShoppingCart } from 'react-icons/ti';
import { useCart } from '@/app/context/CartContext';
import { useState } from 'react';
import { toast } from 'sonner';

type RelatedProductsProps = {
  products: Product[];
  currentProductId: string;
  categoryPath?: string;
};

export function RelatedProducts({ products, currentProductId, categoryPath = 'bitter-kola' }: RelatedProductsProps) {
  const { addItem } = useCart();
  const [addingItems, setAddingItems] = useState<Set<string>>(new Set());

  // Filter out the current product and get up to 4 related products
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0 || addingItems.has(product.id)) return;
    
    setAddingItems(prev => new Set(prev).add(product.id));
    
    try {
      addItem({
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        inventory: product.stock
      });
      
      toast.success(`${product.name} added to cart!`, {
        duration: 2000,
        style: {
          background: '#4A651F',
          color: 'white',
          border: '1px solid #EFE554',
        },
      });
    } catch {
      toast.error('Failed to add item to cart');
    } finally {
      setTimeout(() => {
        setAddingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 500);
    }
  };

  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map((product) => {
            const isAdding = addingItems.has(product.id);
            
            return (
              <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#EFE554] transition-colors duration-300 group">
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
                      {product.name}
                    </h3>
                    <p className="text-[#EFE554] text-xl font-bold text-center">
                      GH₵{product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
                
                <div className="px-4 pb-4">
                  <button 
                    className={`w-full flex flex-row justify-center relative text-white rounded font-semibold overflow-hidden group border transition-all duration-300 py-2 ${
                      product.stock > 0 && !isAdding
                        ? 'border-[#EFE554] hover:bg-[#EFE554] hover:text-black'
                        : 'border-gray-600 text-gray-500 cursor-not-allowed'
                    } ${isAdding ? 'scale-95 bg-[#4A651F] border-[#4A651F]' : ''}`}
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={product.stock === 0 || isAdding}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <span className="relative z-10 transition-colors duration-300 flex items-center justify-center gap-2">
                      <TiShoppingCart className={`transition-transform duration-300 ${isAdding ? 'scale-110' : ''}`} />
                      {isAdding ? 'ADDING...' : product.stock > 0 ? 'ADD TO BASKET' : 'OUT OF STOCK'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
