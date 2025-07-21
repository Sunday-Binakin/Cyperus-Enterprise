'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TiShoppingCart } from 'react-icons/ti';
import { useCart } from '@/app/context/CartContext';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  const router = useRouter();
  const { items, addItem } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  }).format(price);

  useEffect(() => {
    console.log('Cart items:', items);
    console.log('Current product ID:', id);
    setIsInCart(items.some(item => item.id === id));
  }, [items, id]);

  const addToCart = () => {
    console.log('Adding to cart:', { id, name, price, image });
    addItem({ id, name, price, image });
  };

  const handleClick = () => {
    console.log('Button clicked');
    console.log('isInCart:', isInCart);
    if (isInCart) {
      console.log('Navigating to cart');
      router.push('/cart');
    } else {
      console.log('Adding to cart');
      addToCart();
    }
  };

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
        <button 
          onClick={handleClick}
          className={`w-full flex flex-row justify-center items-center relative py-3 rounded font-semibold ${
            isInCart 
              ? 'bg-[#4A651F] text-white hover:bg-[#3a4f18]' 
              : 'bg-transparent text-white hover:bg-[#EFE554] hover:text-black'
          } transition-all duration-300`}
        >
          <TiShoppingCart className="text-xl mr-2" />
          <span>
            {isInCart ? 'VIEW BASKET' : 'ADD TO BASKET'}
          </span>
        </button>
      </div>
    </div>
  );
}

 