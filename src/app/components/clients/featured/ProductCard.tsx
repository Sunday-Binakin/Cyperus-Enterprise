'use client'
import Image from 'next/image';
import { TiShoppingCart } from 'react-icons/ti';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ name, price, image }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  }).format(price);

  return (
    <div className="bg-black rounded-lg overflow-hidden group border border-gray-700 p-3">
      <div className="relative h-[200px] w-full rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300 p-2"
        />
      </div>
      <div className="p-4 space-y-3 flex flex-col items-center">
        <h3 className="text-white text-lg font-semibold text-center h-[60px] m-2">
          {name}
        </h3>
        <p className="text-[#EFE554] text-xl font-bold text-center mt-4">
          {formattedPrice.replace('GHS', 'GH₵')}
        </p>
        <div className="w-full flex flex-row justify-center relative text-white py-3 rounded font-semibold overflow-hidden group">
          <span className="relative z-10 transition-colors duration-300 flex items-center justify-center hover:text-[#EFE554] gap-2"><TiShoppingCart />ADD TO BASKET</span>
          <div className="absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </div>
      </div>
    </div>
  );
}