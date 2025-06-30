import { ShoppingCart } from 'lucide-react';

interface CartIndicatorProps {
  itemCount: number;
}

export default function CartIndicator({ itemCount }: CartIndicatorProps) {
  return (
    <div className='relative'>
      <ShoppingCart className='w-6 h-6 text-white' />
      <span className='absolute -top-2 -right-2 bg-[#EFE554] text-white text-xs rounded-full px-2 py-0.5'>
        {itemCount}
      </span>
    </div>
  );
} 