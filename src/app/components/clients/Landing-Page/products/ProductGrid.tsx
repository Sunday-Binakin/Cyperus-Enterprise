import { PRODUCTS } from './constants';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className='flex flex-col gap-4'>
        <ProductCard {...PRODUCTS[0]} />
        <ProductCard {...PRODUCTS[1]} />
      </div>
      <div className='flex flex-col gap-4 mt-[100px]'>
        <ProductCard {...PRODUCTS[2]} />
        <ProductCard {...PRODUCTS[3]} />
      </div>
    </div>
  );
} 