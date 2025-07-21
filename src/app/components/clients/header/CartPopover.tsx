'use client';

import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPopover() {
  const { items, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  }).format(totalPrice).replace('GHS', 'GH₵');

  return (
    <div className="absolute right-0 mt-2 w-80 bg-black rounded-lg shadow-lg border border-gray-800 z-50">
      <div className="p-4">
        {items.length > 0 ? (
          <>
            <div className="max-h-48 overflow-y-auto">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 py-2 ${
                    index !== 0 ? 'border-t border-gray-800' : ''
                  }`}
                >
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-white font-medium line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-[#EFE554]">
                      {new Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: 'GHS',
                        minimumFractionDigits: 2
                      }).format(item.price).replace('GHS', 'GH₵')}
                    </p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex justify-between text-white mb-4">
                <span>Total:</span>
                <span className="font-semibold text-[#EFE554]">{formattedTotal}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  className="bg-white text-black px-4 py-2 rounded text-center text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  View Basket
                </Link>
                <Link
                  href="/checkout"
                  className="bg-[#EFE554] text-black px-4 py-2 rounded text-center text-sm font-medium hover:bg-[#dbd348] transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 py-4">Your cart is empty</p>
        )}
      </div>
    </div>
  );
}
